# Miners

cd agent
conda activate automata
pm2 start main.py --name miner_1 -- --miner-uid 1
pm2 start main.py --name miner_2 -- --miner-uid 2
pm2 start main.py --name miner_3 -- --miner-uid 3
pm2 start main.py --name miner_4 -- --miner-uid 4
pm2 start main.py --name miner_5 -- --miner-uid 5
conda deactivate
cd ..

# Backend

cd backend
pm2 start server.js --name backend
cd ..

# Frontend

cd frontend
pm2 start server.js --name frontend
cd ..

# MCP Server

cd mcp
conda activate automata
pm2 start server.py --name mcp
conda activate automata
cd ..