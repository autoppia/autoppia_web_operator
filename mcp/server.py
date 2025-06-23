import httpx
import asyncio
import logging
from typing import Any, Dict, Optional

from fastmcp import FastMCP
from fastmcp.server.dependencies import get_http_headers

mcp = FastMCP("Automata MCP")

logger = logging.getLogger(__name__)

BASE_URL = "https://api-automata.autoppia.com/api/v1"
MAX_RETRIES = 3
TIMEOUT = 30

@mcp.tool
async def run_task(
    task: str, 
    initial_url: Optional[str] = None
) -> Dict[str, str]:
    """
    Run a specified task by sending a request to the task endpoint.

    Args:
        task (str): The name of the task to run.
        initial_url (Optional[str]): An optional URL to include in the payload.

    Returns:
        Dict[str, str]: The JSON response from the server after executing the task.

    Raises:
        httpx.HTTPError: If the request to run the task fails.
    """ 
    headers = get_http_headers()
    payload = {
        "task": task,
        "url": initial_url
    }

    endpoint = f"{BASE_URL}/run_task"

    try:
        response = await _execute_with_retry(endpoint, method="POST", headers=headers, payload=payload)
        return response
    except Exception as e:
        logger.error(f"Failed to run task: {e}")
        raise

@mcp.tool
async def get_task(
    task_id: str
) -> Dict[str, Any]:
    """
    Retrieve the details of a specific task by its ID.

    Args:
        task_id (str): The ID of the task to retrieve.

    Returns:
        Dict[str, Any]: A dictionary containing the task details.

    Raises:
        httpx.HTTPError: If the request to get the task fails.
    """
    headers = get_http_headers()
    endpoint = f"{BASE_URL}/task/{task_id}"

    try:
        response = await _execute_with_retry(endpoint, method="GET", headers=headers)
        return response
    except Exception as e:
        logger.error(f"Failed to get task: {e}")
        raise

@mcp.tool
async def get_task_status(
    task_id: str
) -> Dict[str, Any]:
    """
    Retrieve the status of a specific task by its ID.

    Args:
        task_id (str): The ID of the task whose status is to be retrieved.

    Returns:
        Dict[str, Any]: A dictionary containing the task status.

    Raises:
        httpx.HTTPError: If the request to get the task status fails.
    """
    headers = get_http_headers()
    endpoint = f"{BASE_URL}/task/{task_id}/status"

    try:
        response = await _execute_with_retry(endpoint, method="GET", headers=headers)
        return response
    except Exception as e:
        logger.error(f"Failed to get task status: {e}")
        raise

@mcp.tool
async def get_task_screenshots(
    task_id: str
) -> Dict[str, Any]:
    """
    Retrieve the screenshots of a specific task by its ID.

    Args:
        task_id (str): The ID of the task whose screenshots are to be retrieved.

    Returns:
        Dict[str, Any]: A dictionary containing the task screenshots.

    Raises:
        httpx.HTTPError: If the request to get the task screenshots fails.
    """
    headers = get_http_headers()
    endpoint = f"{BASE_URL}/task/{task_id}/screenshots"

    try:
        response = await _execute_with_retry(endpoint, method="GET", headers=headers)
        return response
    except Exception as e:
        logger.error(f"Failed to get task screenshots: {e}")
        raise

@mcp.tool
async def get_task_gif(
    task_id: str
) -> Dict[str, Any]:
    """
    Retrieve the GIF of a specific task by its ID.

    Args:
        task_id (str): The ID of the task whose GIF are to be retrieved.

    Returns:
        Dict[str, Any]: A dictionary containing the task GIF.

    Raises:
        httpx.HTTPError: If the request to get the task GIF fails.
    """
    headers = get_http_headers()
    endpoint = f"{BASE_URL}/task/{task_id}/gif"

    try:
        response = await _execute_with_retry(endpoint, method="GET", headers=headers)
        return response
    except Exception as e:
        logger.error(f"Failed to get task gif: {e}")
        raise

async def _execute_with_retry(
    endpoint: str,
    method: str = "GET",
    headers: Optional[Dict[str, str]] = None,
    payload: Optional[Dict[str, str]] = None
) -> Dict[str, Any]:
    """
    Execute an HTTP request with retry logic.

    Args:
        endpoint (str): The API endpoint to call.
        method (Optional[str]): The HTTP method to use (default is "GET").
        payload (Optional[Dict[str, str]]): The JSON payload to send with the request.

    Returns:
        Dict[str, str]: The JSON response from the server.

    Raises:
        httpx.HTTPError: If the request fails after the maximum number of retries.
    """
    for attempt in range(MAX_RETRIES):
        try:
            async with httpx.AsyncClient() as client:
                response = await client.request(
                    method,
                    endpoint,
                    json=payload,
                    headers=headers,
                    timeout=TIMEOUT,
                )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            logger.error(f"HTTP error occurred: {e}")
            if attempt < MAX_RETRIES - 1:
                logger.info(f"Retrying... ({attempt + 1}/{MAX_RETRIES})")
                await asyncio.sleep(1)
                continue
            else:
                logger.error(f"Max retries reached. Failed to execute request.")
                raise 

async def main():
    await mcp.run_async(
        transport="streamable-http", 
        host="0.0.0.0",
        port=8080,
    )

if __name__ == "__main__":
    asyncio.run(main())