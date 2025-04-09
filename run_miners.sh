cd agent
conda activate automata
pm2 start app.py --name miner_5001 -- --port 5001
pm2 start app.py --name miner_5002 -- --port 5002
pm2 start app.py --name miner_5003 -- --port 5003
pm2 start app.py --name miner_5004 -- --port 5004
pm2 start app.py --name miner_5005 -- --port 5005
pm2 start app.py --name miner_5006 -- --port 5006
pm2 start app.py --name miner_5007 -- --port 5007
pm2 start app.py --name miner_5008 -- --port 5008
pm2 start app.py --name miner_5009 -- --port 5009
pm2 start app.py --name miner_5010 -- --port 5010
conda deactivate
cd ..