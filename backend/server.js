const express = require("express");
const cors = require("cors");
const http = require("http");
const { chromium } = require("playwright");
// const { ApifiedWebAgent, executeAction } = require("./agent");

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    credentials: true
  }
});

app.use(cors())
app.use(express.json());

const sessions = {};

const deleteSession = async (socketId) => {
  const { browser, context, page } = sessions[socketId];
  await page.close();
  await context.close();
  await browser.close();
  delete sessions[socketId];
};

const performTask = async (socket, page, task) => {
  // Randomly scroll the page
  for (let i = 0; i < 10; i++) {
    await page.evaluate((val) => window.scrollBy(0, val), Math.floor(Math.random() * 200));
    const screenshot = await page.screenshot();
    socket.emit('screenshot', { screenshot: screenshot.toString('base64') });
    await page.waitForTimeout(500);
  }
}

io.on('connection', (socket) => {
  console.log(`A user with id: ${socket.id} connected!`);

  socket.on('start-operator', async (data) => {
    if (sessions[socket.id]) {
      await deleteSession(socket.id);
    }

    const url = data.url || 'https://www.google.com';
    const task = data.task || 'None';
    console.log(`Starting operator with URL: ${url} and task: ${task}`);

    try {
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext({
        viewport: { width: 1600, height: 800 },
      });
      const page = await context.newPage();
      sessions[socket.id] = { browser, context, page };

      await page.goto(url);
      const screenshot = await page.screenshot();
      socket.emit('screenshot', { screenshot: screenshot.toString('base64') });

      if (task) {
        await performTask(socket, page, task);
      }
    }
    catch (error) {
      console.error('Error launching browser:', error);
      socket.emit('error', { message: "Internal Server Error" });
    }
  })

  socket.on('perform-task', async (data) => {
    const { task } = data;
    if (!task) {
      socket.emit('error', { message: "Task is required" });
      return;
    }

    if (sessions[socket.id]) {
      socket.emit('error', { message: "Session not found" });
      return;
    }
    const { page } = sessions[socket.id];

    try {
      await performTask(socket, page, task);
    } catch (error) {
      console.error('Error performing task:', error);
      socket.emit('error', { message: "Internal Server Error" });
    }
  })

  socket.on('disconnect', async () => {
    console.log(`A user with id: ${socket.id} disconnected`);
    if (sessions[socket.id]) {
      await deleteSession(socket.id);
    }
  });
});

const port = 4000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
