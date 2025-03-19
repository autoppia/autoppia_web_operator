import socketio
import asyncio
import logging
from aiohttp import web

from browser_use_agent import BrowserUseAgent

AGENT_CLASS = BrowserUseAgent

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class AutoppiaOperator:
    def __init__(self):
        self.sio = socketio.AsyncServer(
            async_mode='aiohttp', 
            cors_allowed_origins='*'
        )
        self.app = web.Application()
        self.sio.attach(self.app)

        self.sessions = {}

        self.app.router.add_get('/status', self.get_status)
        self._register_events()

    def get_status(self, request):
        return web.json_response({'handling_task_amount': len(self.sessions)})

    def _register_events(self):
        @self.sio.on('connect')
        async def connect(sid, environ):
            logger.info(f'Client connected: {sid}')

        @self.sio.on('new-task')
        async def new_task(sid, data):
            logger.info(f'New task received from {sid}: {data}')

            task = data.get('task')
            url = data.get('url')
            if not task:
                await self.sio.emit('error', {'message': 'No task provided'}, to=sid)
                return

            agent = AGENT_CLASS(task, url)
            await agent.init_agent()

            self.sessions[sid] = {
                'agent': agent,
                'state': 'idle',
            }

            screenshot_task = asyncio.create_task(self.send_screenshot(sid))
            await self._perform_task(sid)
            screenshot_task.cancel()

        @self.sio.on('continue-task')
        async def continue_task(sid, data):
            print(f'Continuing task received from {sid}: {data}')

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

            screenshot_task = asyncio.create_task(self.send_screenshot(sid))
            await self._perform_task(sid)
            screenshot_task.cancel()

        @self.sio.on('disconnect')
        async def disconnect(sid):
            logger.info(f'Client disconnected: {sid}')
            if sid in self.sessions:
                await self.sessions[sid]['agent'].close()
                del self.sessions[sid]

    async def _perform_task(self, sid, max_steps=100):
        self.sessions[sid]['state'] = 'busy'
        agent = self.sessions[sid]['agent']

        for _ in range(max_steps):
            done, valid = await agent.take_step()

            next_goal = agent.get_next_goal()
            await self.sio.emit('action', {'action': next_goal}, to=sid)            

            if done and valid:
                break

        result = agent.get_result()
        await self.sio.emit('result', result, to=sid)

        self.sessions[sid]['state'] = 'idle'

    async def send_screenshot(self, sid):
        while True:
            await asyncio.sleep(0.5)
            session_info = self.sessions.get(sid)
            if not session_info:
                continue
            agent = session_info['agent']
            screenshot = await agent.take_screenshot()
            if screenshot:
                await self.sio.emit('screenshot', {'screenshot': screenshot}, to=sid)

    def run(self, host='0.0.0.0', port=5000):
        web.run_app(self.app, host=host, port=port)


if __name__ == '__main__':
    autoppia_operator = AutoppiaOperator()
    autoppia_operator.run()
