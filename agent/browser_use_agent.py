# browser_use_agent.py

from typing import Tuple, List, Dict, Any
import logging

from langchain_openai import ChatOpenAI

# Import the original browser-based Agent and helpers from your 'browser_use' module
from browser_use import Agent
from browser_use.agent.views import AgentState
from browser_use.browser.browser import Browser, BrowserConfig

from interfaces import AgentInterface

logger = logging.getLogger(__name__)


class BrowserUseAgent(AgentInterface):
    """
    A high-level wrapper around the 'browser_use' Agent.

    - Hides all direct references to Browser, BrowserConfig, etc.
    - Exposes a simple interface: add_new_task(...) and take_step(...)
    - Instantiates the underlying Agent and assigns self.take_step to that Agent's method,
      making this class conform to the same interface as a simpler BasicAgent might.
    """

    def __init__(
        self,
        task: str,
        initial_actions: List[Dict[str, Any]] = None,
        llm=None
    ):
        """
        :param task: The initial task or instruction for the agent.
        :param initial_actions: Any browser-related setup actions,
                                e.g. [{'open_tab': {'url': 'https://example.com'}}].
        :param llm: Optionally inject a custom LLM; defaults to ChatOpenAI('gpt-4o').
        """
        self.task = task
        self.initial_actions = initial_actions or []
        self.llm = llm if llm else ChatOpenAI(model='gpt-4o')

        # We haven't set up the 'browser_use' Agent yet.
        self.browser = None
        self.browser_context = None
        self.agent_state = None
        self.agent = None

    async def init_agent(self) -> None:
        """
        Initialize the underlying browser-based agent:
          1. Create a Browser instance and new context.
          2. Create the original `Agent` from `browser_use`.
          3. Store references so we can call it later.
        """
        logger.info("Initializing BrowserUseAgent with a new Browser context.")
        self.browser = Browser(config=BrowserConfig(headless=True))
        self.browser_context = await self.browser.new_context()
        self.agent_state = AgentState()

        # Create the original browser_use.Agent instance
        self.agent = Agent(
            task=self.task,
            llm=self.llm,
            browser=self.browser,
            browser_context=self.browser_context,
            injected_agent_state=self.agent_state,
            initial_actions=self.initial_actions,
        )

    def add_new_task(self, new_task: str):
        """
        Provide a new task or sub-instruction to the underlying agent.
        If the agent isn't initialized yet, we'll update the stored task
        so it's applied when the agent is eventually initialized.
        """
        logger.debug(f"Adding/updating task from '{self.task}' to '{new_task}'")
        self.task = new_task
        if self.agent is not None:
            self.agent.add_new_task(new_task)

    async def take_step(self) -> Tuple[bool, bool]:
        """
        Delegates to the underlying Agent's take_step() method.
        If the agent hasn't been initialized yet, we do so first.

        Returns:
            (done, valid): 
              - done (bool): True if the task is completed.
              - valid (bool): True if the step had no critical error.
        """
        if self.agent is None:
            await self.init_agent()

        return await self.agent.take_step()

    @property
    def state(self) -> AgentState:
        """
        Expose the underlying AgentState if external code needs to read it.
        """
        return self.agent_state
