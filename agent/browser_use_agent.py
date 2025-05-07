import logging
from typing import Tuple
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from browser_use import Agent
from browser_use.agent.views import AgentState
from browser_use.browser.browser import Browser, BrowserConfig
from browser_use.browser.context import BrowserContext, BrowserContextConfig

from base_agent import BaseAgent

load_dotenv()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class BrowserUseAgent(BaseAgent):
    def __init__(self, task: str, initial_url: str = None):
        super().__init__(task, initial_url)

        self.browser = None
        self.browser_context = None
        self.agent_state = None
        self.agent = None

    async def init_agent(self) -> None:
        self.browser = Browser(
            config=BrowserConfig(
                headless=True,
                disable_security=False,
                keep_alive=True,
                new_context_config=BrowserContextConfig(
                    keep_alive=True,
                    disable_security=False,
                ),
            )
        )
        self.browser_context = BrowserContext(
            browser=self.browser,
            config=BrowserContextConfig(
                highlight_elements=False,
                keep_alive=True,
                disable_security=False,
            )
        )
        self.agent_state = AgentState()

        if self.initial_url:
            task = F"Go to {self.initial_url}, {self.task}"
        else:
            task = self.task

        self.agent = Agent(
            task=task,
            llm=ChatOpenAI(model='gpt-4o'),
            browser=self.browser,
            browser_context=self.browser_context,
            injected_agent_state=self.agent_state
        )

    async def take_step(self) -> Tuple[bool, bool]:
        if self.agent is None:
            await self.init_agent()

        return await self.agent.take_step()
    
    async def take_screenshot(self) -> str:
        if self.browser_context.session:
            return await self.browser_context.take_screenshot()
        else:
            return None
        
    async def close(self) -> None:
        if self.browser_context:
            await self.browser_context.close()
        if self.browser:
            await self.browser.close()
        
    def add_new_task(self, new_task: str) -> None:
        self.task = new_task
        if self.agent is not None:
            self.agent.add_new_task(new_task)

    def get_model_thought(self) -> dict:
        model_thoughts = self.agent_state.history.model_thoughts()
        next_goal = model_thoughts[-1].next_goal
        previous_success = False if 'Failed' in model_thoughts[-1].evaluation_previous_goal else True
        return {
            'next_goal': next_goal,
            'previous_success': previous_success
        }
    
    def get_result(self) -> dict:
        final_result = self.agent_state.history.final_result()
        is_successful = self.agent_state.history.is_successful()
        return {
            'content': final_result,
            'success': is_successful
        }
        

