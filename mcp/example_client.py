import asyncio
from fastmcp import Client

client = Client("https://mcp-automata.autoppia.com/mcp")

async def main():
    async with client:
        tools = await client.list_tools()
        print(f"Available tools: {tools}")

asyncio.run(main())