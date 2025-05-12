cd agent
conda activate automata
pm2 start app.py --name miner_1 -- --miner-uid 1
pm2 start app.py --name miner_2 -- --miner-uid 2
pm2 start app.py --name miner_3 -- --miner-uid 3
pm2 start app.py --name miner_4 -- --miner-uid 4
pm2 start app.py --name miner_5 -- --miner-uid 5
conda deactivate
cd ..