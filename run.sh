cd agent
conda activate automata
pm2 start app.py --name operator
conda deactivate
cd ..

cd backend
pm2 start server.js --name backend
cd ..

cd frontend
pm2 start server.js --name frontend
cd ..