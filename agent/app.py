import time
import socketio
import asyncio
import logging
import argparse
from aiohttp import web

from browser_use_agent import BrowserUseAgent

AGENT_CLASS = BrowserUseAgent

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class AutomataOperator:
    def __init__(self, miner_uid):
        self.sio = socketio.AsyncServer(
            async_mode='aiohttp', 
            cors_allowed_origins='*',
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
            await self._clean_session()

        @self.sio.on('new-task')
        async def new_task(sid, data):
            logger.info(f'New task received from {sid}: {data}')

            task = data.get('task')
            url = data.get('url')
            if not task:
                await self.sio.emit('error', {'message': 'No task provided'}, to=sid)
                return

            agent = AGENT_CLASS(task, url)
            await self.sio.emit('socket-id', {'sid': sid}, to=sid)
            await self.sio.emit('action', {'action': 'Initialize browser'}, to=sid)   
            await agent.init_agent()

            self.sessions[sid] = {
                'agent': agent,
                'state': 'idle',
                'updated_at': time.time()
            }

            send_screenshot_task = asyncio.create_task(self._send_screenshot(sid))
            await self._perform_task(sid)
            send_screenshot_task.cancel()

        @self.sio.on('continue-task')
        async def continue_task(sid, data):
            logger.info(f'Continuing task received from {sid}: {data}')

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

            send_screenshot_task = asyncio.create_task(self._send_screenshot(sid))
            await self._perform_task(sid)
            send_screenshot_task.cancel()

        @self.sio.on('disconnect')
        async def disconnect(sid):
            logger.info(f'Client disconnected: {sid}')

    async def _perform_task(self, sid, max_steps=25):
        self.sessions[sid]['state'] = 'busy'
        agent = self.sessions[sid]['agent']

        for _ in range(max_steps):
            done, valid = await agent.take_step()
            
            model_thought = agent.get_model_thought()
            next_goal = model_thought['next_goal']
            previous_success = model_thought['previous_success']
            await self.sio.emit('action', {'action': next_goal, 'previous_success': previous_success}, to=sid)            

            if done and valid:
                break

        result = agent.get_result()
        await self.sio.emit('result', result, to=sid)

        self.sessions[sid]['state'] = 'idle'
        self.sessions[sid]['updated_at'] = time.time()

    async def _send_screenshot(self, sid):
        while True:
            await asyncio.sleep(0.5)
            session = self.sessions.get(sid)
            if not session:
                continue
            agent = session['agent']

            screenshot = await agent.take_screenshot()
            if screenshot:
                await self.sio.emit('screenshot', {'screenshot': screenshot}, to=sid)

    async def _clean_session(self):  
        for sid, session in list(self.sessions.items()):  
            unused_time = time.time() - session['updated_at']  
            if unused_time > 30 * 60:  
                await session['agent'].close()  
                del self.sessions[sid]          


    def run(self, host='0.0.0.0', port=5000):
        web.run_app(self.app, host=host, port=port)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Arguments for Operator.')  

    parser.add_argument('-m', '--miner-uid', type=int, required=True, help='Miner UID')

    args = parser.parse_args()
    miner_uid = args.miner_uid
    port = 5000 + miner_uid

    operator = AutomataOperator(miner_uid)
    operator.run(port=port)

