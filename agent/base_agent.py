from abc import ABC, abstractmethod
from typing import Tuple
from pathlib import Path
from playwright.async_api import Browser


class BaseAgent(ABC):
    @abstractmethod
    async def init_agent(
        self,
        browser: Browser,
        task: str, 
        initial_url: str = None, 
        storage_state_path: Path = None
    ) -> None:
        pass
                        
    @abstractmethod
    async def take_step(self) -> Tuple[bool, bool]:
        pass
    
    @abstractmethod
    async def take_screenshot(self) -> str:
        pass
        
    @abstractmethod
    async def close(self) -> None:
        pass

    @abstractmethod
    def add_new_task(self, new_task: str) -> None:
        pass

    @abstractmethod
    def get_model_thought(self) -> dict:
        pass
    
    @abstractmethod
    def get_result(self) -> dict:
        pass
