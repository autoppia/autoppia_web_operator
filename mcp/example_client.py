import asyncio
from fastmcp import Client

client = Client("http://127.0.0.1:8080/mcp")

async def main():
    async with client:
        tools = await client.list_tools()
        print(f"Available tools: {tools}")

asyncio.run(main())