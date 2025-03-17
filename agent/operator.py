# autoppia_operator.py

import socketio
from aiohttp import web
from dotenv import load_dotenv

# The key: we only import the abstract interface, the agent state,
# and define a single "AGENT_CLASS" variable to choose which agent is used.
from interfaces import AgentState
from langchain_openai import ChatOpenAI

# -- CHOOSE YOUR AGENT HERE --
# from basic_agent import BasicAgent
from browser_use_agent import BrowserUseAgent

# By changing this line, you switch from a browser-based agent
# to a simple LLM-based agent, or any other agent implementing the interface.
AGENT_CLASS = BrowserUseAgent

load_dotenv()


class AutoppiaOperator:
    """
    A completely decoupled Socket.IO + aiohttp server that creates
    and manages agent sessions. It doesn't care if the agent uses
    a browser or not; that logic is in the AGENT_CLASS implementation.
    """

    def __init__(self):
        # Socket.IO setup
        self.sio = socketio.AsyncServer(
            async_mode='aiohttp', 
            cors_allowed_origins='*'
        )
        self.app = web.Application()
        self.sio.attach(self.app)

        # Keep track of active sessions by sid
        # Each session has {'agent': AgentInterface, 'state': 'idle' or 'busy'}
        self.sessions = {}

        # Define a simple status endpoint
        self.app.router.add_get('/status', self.get_status)

        # Register Socket.IO event callbacks
        self._register_events()

    def get_status(self, request):
        """
        A quick endpoint to check how many tasks we are handling.
        """
        return web.json_response({'handling_task_amount': len(self.sessions)})

    def _register_events(self):
        """
        Define all Socket.IO event handlers for client interaction.
        """
        @self.sio.on('connect')
        async def connect(sid, environ):
            print(f'Client connected: {sid}')

        @self.sio.on('new-task')
        async def new_task(sid, data):
            """
            A request from the client to start a new task.
            Example payload:
                {
                    "task": "Scrape example.com"
                }
            (Note: The operator no longer checks or cares about URLs.)
            """
            print(f'[new-task] Received from {sid}: {data}')

            task = data.get('task')
            if not task:
                await self.sio.emit('error', {'message': 'No task provided'}, to=sid)
                return

            # We create an AgentState to track the agent's history/progress
            agent_state = AgentState()

            # Instantiate whichever agent class we selected at the top
            agent = AGENT_CLASS(
                task=task,
                llm=ChatOpenAI(model='gpt-4o'),
                state=agent_state
            )

            self.sessions[sid] = {
                'agent': agent,
                'state': 'idle',
            }

            # Perform the agent steps
            await self._perform_task(sid)

        @self.sio.on('continue-task')
        async def continue_task(sid, data):
            """
            A request from the client to give the same agent a new instruction.
            Example payload:
                {
                    "task": "Now click on the next link..."
                }
            """
            print(f'[continue-task] Received from {sid}: {data}')

            task = data.get('task')
            if not task:
                await self.sio.emit('error', {'message': 'No task provided'}, to=sid)
                return

            session_info = self.sessions.get(sid)
            if not session_info:
                await self.sio.emit('error', {'message': 'No existing session for this sid'}, to=sid)
                return

            agent = session_info['agent']
            agent.add_new_task(task)

            await self._perform_task(sid)

    async def _perform_task(self, sid, max_steps=10):
        """
        Runs the agent's `take_step()` method up to max_steps times,
        or until the agent signals it's done.
        """
        self.sessions[sid]['state'] = 'busy'
        agent = self.sessions[sid]['agent']

        for _ in range(max_steps):
            done, valid = await agent.take_step()

            # Optionally inform the client about the current step
            thoughts = agent.state.model_thoughts()
            if thoughts:
                latest = thoughts[-1]
                # 'next_goal' is an example key used by some agent states
                action_str = latest.get("next_goal", "No action found.")
                await self.sio.emit('action', {'action': action_str}, to=sid)

            if done and valid:
                break

        # Emit the final result to the client
        final_result = agent.state.final_result()
        is_successful = agent.state.is_successful()
        await self.sio.emit('result', {'content': final_result, 'success': is_successful}, to=sid)

        self.sessions[sid]['state'] = 'idle'

    def run(self, host='0.0.0.0', port=5000):
        """
        Start the aiohttp web server with Socket.IO.
        """
        web.run_app(self.app, host=host, port=port)


if __name__ == '__main__':
    # Launch the operator
    operator = AutoppiaOperator()
    operator.run()
