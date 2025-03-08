from dotenv import load_dotenv

load_dotenv()

import base64
import asyncio
import socketio
from aiohttp import web

from langchain_openai import ChatOpenAI
from browser_use import Agent
from browser_use.browser.browser import Browser

async def send_screenshot(context, sio, client_sid):    
    pages = context.pages
    print('Page Length', len(pages))
    if len(pages) > 0:
        page = pages[-1]
        screenshot = await page.screenshot()
        screenshot_b64 = base64.b64encode(screenshot).decode('utf-8')
        await sio.emit('screenshot', {'screenshot': screenshot_b64}, to=client_sid)

class AutoppiaAgent:
    def __init__(self):
        self.status = 'idle'
        self.client_sid = None

        self.sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')
        self.app = web.Application()
        self.sio.attach(self.app)

        self.app.router.add_get('/status', self.get_agent_status)
        self._register_events()

    def get_agent_status(self, request):
        available = self.client_sid == None
        return web.json_response({'available': available})

    def _register_events(self):
        @self.sio.on('connect')
        async def connect(sid, environ):
            if self.client_sid == None:
                print(f'Client connected: {sid}')   
                self.client_sid = sid
                self.browser = Browser() 
            else:
                await self.sio.emit('error', {'error': 'Another client is using the agent'}, to=sid)
                await self.sio.disconnect(sid)

        @self.sio.on('perform-task')
        async def perform_task(sid, data): 
            if self.client_sid != sid:
                await self.sio.emit('error', {'error': 'Another client is using the agent'}, to=sid)
                return

            if self.status == 'running':
                await self.sio.emit('error', {'error': 'Agent is busy'}, to=sid)
                return
            else:
                print(f'Performing task: {data}...')
                await self._perform_task(sid, data)

        @self.sio.on('disconnect')
        async def disconnect(sid):            
            print(f'Client disconnected: {sid}')
            await self.browser.close()
            self.client_sid = None

    async def _perform_task(self, sid, data):
        self.status = 'running'
        task = data.get('task', None)
        url = data.get('url', None)
        if not task:
            await self.sio.emit('error', {'message': 'No task provided'}, to=sid)
            return

        agent = Agent(
            task=task,
            llm=ChatOpenAI(model='gpt-4o'),
            browser=self.browser,
            send_screenshot_callback=send_screenshot,
            socketio_server=self.sio, 
            client_socket_id=sid,
        )
        await agent.run()
        self.status = 'idle'

    def run(self, host='0.0.0.0', port=5000):
        web.run_app(self.app, host=host, port=port)


if __name__ == '__main__':
    agent = AutoppiaAgent()
    agent.run()