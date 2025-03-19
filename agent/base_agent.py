from abc import ABC, abstractmethod
from typing import Tuple


class BaseAgent(ABC):
    def  __init__(self, task: str, initial_url: str = None):
        self.task = task
        self.initial_url = initial_url

    @abstractmethod
    async def init_agent(self) -> None:
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
    def get_next_goal(self) -> str:
        pass
    
    @abstractmethod
    def get_result(self) -> str:
        pass
