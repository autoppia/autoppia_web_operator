const express = require("express");
const cors = require("cors");
const http = require("http");
const { chromium } = require("playwright");
const { ApifiedWebAgent, executeAction } = require("./agent");

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
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const port = 4000;
let broadcasters = {};

io.sockets.on("error", (e) => console.log(e));
io.sockets.on("connection", (socket) => {
  socket.on("broadcaster", (watcher) => {
    broadcasters[watcher] = socket.id;
    socket.to(watcher).emit("broadcaster");
  });
  socket.on("watcher", () => {
    socket.to(broadcasters[socket.id]).emit("watcher");
  });
  socket.on("offer", (id, message) => {
    socket.to(id).emit("offer", socket.id, message);
  });
  socket.on("answer", (id, message) => {
    socket.to(id).emit("answer", socket.id, message);
  });
  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
  });
  socket.on("disconnect", () => {
    socket.to(broadcasters[socket.id]).emit("disconnectPeer", socket.id);
  });
});
server.listen(port, () => console.log(`Server is running on port ${port}`));

app.post("/start", async (req, res) => {
  const { startUrl, tasks, watcher } = req.body;
  console.log("Launching browser with:", startUrl, "Tasks:", tasks);

  try {
    const browser = await chromium.launch({
      headless: false,
      channel: "chrome",
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      args: [
        "--start-maximized",
        "--auto-select-tab-capture-source-by-title=SharedPage",
      ],
      ignoreDefaultArgs: ['--mute-audio']
    });
    const context = await browser.newContext({
      viewport: null,
    });

    const startPage = await context.newPage();
    await startPage.goto(startUrl, { timeout: 60000 });
    await startPage.evaluate(() => {
      document.title = "SharedPage";
    });

    const broadcasterPage = await context.newPage();
    const broadcasterURL = `http://127.0.0.1:${port}/broadcaster.html?watcher=${watcher}`;
    await broadcasterPage.goto(broadcasterURL, { timeout: 60000 });

    // const agent = new ApifiedWebAgent("127.0.0.1", 8000);
    // const actions = await agent.solveTask(tasks)

    // for (const action of actions) {
    //   await executeAction(startPage, action)
    // }

    action = {
      type: "ScrollAction",
      down: true,
      value: 1000
    }

    await executeAction(startPage, action)

    // await context.close()
    // await browser.close()

    res.json({ success: true, message: "Browser launched" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Browser launch failed" });
  }
});
