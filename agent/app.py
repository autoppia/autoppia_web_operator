from dotenv import load_dotenv

load_dotenv()

import asyncio
import socketio
from aiohttp import web

from langchain_openai import ChatOpenAI
from agent.browser_use_agent import Agent
from browser_use.agent.views import AgentState
from browser_use.browser.browser import Browser, BrowserConfig

class AutoppiaAgent:
    def __init__(self):
        self.sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')
        self.app = web.Application()
        self.sio.attach(self.app)

        self.sessions = {}
        self.browser = Browser(
            config=BrowserConfig(
                headless=True,
            )
        )

        self.app.router.add_get('/status', self.get_status)
        self._register_events()

    def get_status(self, request):
        return web.json_response({'handling_task_amount': len(self.sessions)})
    
    def _register_events(self):
        @self.sio.on('connect')
        async def connect(sid, environ):
            print(f'Client connected: {sid}')

        @self.sio.on('new-task')
        async def new_task(sid, data):
            print(f'New task received: {data}')
            task = data.get('task', None)
            url = data.get('url', None)
            if not task:
                await self.sio.emit('error', {'message': 'No task provided'}, to=sid)
                return
            
            if url:
                initial_actions = [{'open_tab': {'url': url}}]
            else:
                initial_actions = []
            
            browser_context = await self.browser.new_context()
            agent_state = AgentState()
            agent = Agent(
                task=task,
                llm=ChatOpenAI(model='gpt-4o'),
                browser=self.browser,
                browser_context=browser_context,
                injected_agent_state=agent_state,
                initial_actions=initial_actions,
            )
            self.sessions[sid] = {
                'agent': agent,
                'agent_state': agent_state,
                'browser_context': browser_context,
                'state': 'idle'
            }

            screenshot_task = asyncio.create_task(self.send_screenshot(sid, self.get_browser_context))
            await self._perform_task(sid)
            screenshot_task.cancel()

        @self.sio.on('continue-task')
        async def continue_task(sid, data):
            print(f'Continuing task received: {data}')
            task = data.get('task', None)
            if not task:
                await self.sio.emit('error', {'message': 'No task provided'}, to=sid)
                return         
            
            agent = self.sessions[sid]['agent']
            agent.add_new_task(task)
            
            screenshot_task = asyncio.create_task(self.send_screenshot(sid, self.get_browser_context))
            await self._perform_task(sid)
            screenshot_task.cancel()

    async def _perform_task(self, sid, max_steps=100):
        self.sessions[sid]['state'] = 'busy'
        agent = self.sessions[sid]['agent']
        agent_state = self.sessions[sid]['agent_state']

        for _ in range(max_steps):
            done, valid = await agent.take_step()
            if done and valid:
                break

            model_thoughts = agent_state.history.model_thoughts()
            await self.sio.emit('action', {'action': model_thoughts[-1].next_goal}, to=sid)
        
        final_result = agent_state.history.final_result()
        is_successful = agent_state.history.is_successful()
        await self.sio.emit('result', {'content': final_result, 'success': is_successful}, to=sid)

        self.sessions[sid]['state'] = 'idle'

    async def send_screenshot(self, sid, get_browser_context):
        while True:
            await asyncio.sleep(0.5)
            browser_context = get_browser_context(sid)
            if browser_context.session:
                screenshot = await browser_context.take_screenshot()
                await self.sio.emit('screenshot', {'screenshot': screenshot}, to=sid)

    def get_browser_context(self, sid):
        return self.sessions[sid]['browser_context']
    
    def run(self, host='0.0.0.0', port=5000):
        web.run_app(self.app, host=host, port=port)


if __name__ == '__main__':
    agent = AutoppiaAgent()
    agent.run()