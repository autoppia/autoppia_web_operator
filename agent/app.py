import uuid
import time
import json
import socketio
import asyncio
import logging
import argparse
from aiohttp import web
from pathlib import Path

from browser_use_agent import BrowserUseAgent
from playwright.async_api import async_playwright

AGENT_CLASS = BrowserUseAgent

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class AutomataOperator:
    def __init__(self, miner_uid):
        self.sio = socketio.AsyncServer(
            async_mode='aiohttp', 
            cors_allowed_origins='*',
            ping_timeout=60
        )
        self.app = web.Application()
        self.sio.attach(self.app)

        self.sessions = {}
        self.playwright = None
        self.browser = None

        self.app.router.add_get('/status', self.get_status)
        self._register_events()

        self.storage_state_dir = Path('/tmp/automata/storage_states')
        self.storage_state_dir.mkdir(parents=True, exist_ok=True)

    def get_status(self, request):
        return web.json_response({'handling_task_amount': len(self.sessions)})

    def _register_events(self):
        @self.sio.on('connect')
        async def connect(sid, environ):
            logger.info(f'Client connected: {sid}')

        @self.sio.on('new-task')
        async def new_task(sid, data):
            task = data.get('task')
            url = data.get('url')
            logger.info(f'New task received from {sid}:\n Task: {task}\n Initial URL: {url}')

            storage_state = data.get('storageState')
            if not task:
                await self.sio.emit('error', {'message': 'No task provided'}, to=sid)
                return

            storage_state_path = None
            if storage_state:
                storage_state_path = self.storage_state_dir / f'{sid}.json'
                with open(storage_state_path, 'w') as storage_state_file:
                    json.dump(storage_state, storage_state_file, indent=4)

            agent = AGENT_CLASS()
            await self._init_browser()
            await agent.init_agent(self.browser, task, url, storage_state_path)

            self.sessions[sid] = agent

            # send_screenshot_task = asyncio.create_task(self._send_screenshot(sid))
            await self._perform_task(sid)
            # send_screenshot_task.cancel()

        @self.sio.on('continue-task')
        async def continue_task(sid, data):
            logger.info(f'Continuing task received from {sid}: {data}')

            task = data.get('task')
            if not task:
                await self.sio.emit('error', {'message': 'No task provided'}, to=sid)
                return

            agent = self.sessions.get(sid)
            if not agent:
                await self.sio.emit('error', {'message': 'No existing session for this sid'}, to=sid)
                return

            agent.add_new_task(task)

            # send_screenshot_task = asyncio.create_task(self._send_screenshot(sid))
            await self._perform_task(sid)
            # send_screenshot_task.cancel()

        @self.sio.on('disconnect')
        async def disconnect(sid):
            logger.info(f'Client disconnected: {sid}')
            agent = self.sessions.get(sid)
            if agent:
                await agent.close()

    async def _init_browser(self):
        if self.browser:
            return
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(headless=False)

    async def _perform_task(self, sid, max_steps=25):
        agent = self.sessions[sid]

        for _ in range(max_steps):
            done, valid = await agent.take_step()

            screenshot = await agent.take_screenshot()
            if screenshot:
                await self.sio.emit('screenshot', {'screenshot': screenshot}, to=sid)

            model_thought = agent.get_model_thought()
            if not model_thought:
                continue

            next_goal = model_thought['next_goal']
            previous_success = model_thought['previous_success']
            await self.sio.emit('action', {'action': next_goal, 'previous_success': previous_success}, to=sid)            

            if done and valid:
                break

        screenshot = await agent.take_screenshot()
        if screenshot:
            await self.sio.emit('screenshot', {'screenshot': screenshot}, to=sid)
        result = agent.get_result()
        await self.sio.emit('result', result, to=sid)

    # async def _send_screenshot(self, sid):
    #     while True:
    #         await asyncio.sleep(0.5)
    #         agent = self.sessions.get(sid)
    #         if not agent:
    #             print("No agent found for sid")
    #             continue

    #         try:
    #             screenshot = await agent.take_screenshot()
    #             if screenshot:
    #                 await self.sio.emit('screenshot', {'screenshot': screenshot}, to=sid)
    #         except Exception as e:
    #             print(f"Screenshot error: {e}")
    #             # Consider adding a longer sleep or break condition
    #             await asyncio.sleep(2)


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

