import abc
from typing import Tuple


class AgentInterface(abc.ABC):
    """
    AgentInterface defines the required methods for any agent implementation.
    """

    @abc.abstractmethod
    async def init_agent(self) -> None:
        pass

    @abc.abstractmethod
    async def take_step(self) -> Tuple[bool, bool]:
        """
        Perform a single step of work or reasoning.

        Returns:
            done (bool): whether the entire agent process (task) is completed
            valid (bool): whether the step was valid (no critical errors)
        """
        pass

    @abc.abstractmethod
    def add_new_task(self, task: str):
        """
        Update or add a new task to the agent's internal queue or state.
        """
        pass


class AgentState:
    """
    Maintains the agent's internal state, including a history 
    of steps, model thoughts, or any relevant data.
    """

    def __init__(self):
        self._history = []

    def add_history(self, item):
        self._history.append(item)

    def model_thoughts(self):
        """
        Returns the recorded model thoughts or relevant step data.
        """
        return self._history

    def final_result(self):
        """
        Extract a final result or conclusion from the history, if applicable.
        """
        return "Final result: " + (self._history[-1]["next_goal"] if self._history else "N/A")

    def is_successful(self) -> bool:
        """
        Decide if the agent has succeeded, for example
        by analyzing the history or other internal flags.
        """
        return bool(self._history)  # simplistic example
