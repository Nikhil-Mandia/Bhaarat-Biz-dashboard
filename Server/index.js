const express = require("express");
const connectDB = require("./config/db");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Connect Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Inject socket.io into request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Define Routes
app.use("/api/users", require("./routes/user"));
app.use("/api/earnings", require("./routes/earning"));
app.use("/api/messages", require("./routes/message"));
app.use("/api/network", require("./routes/network"));
app.use("/api/performance", require("./routes/performance"));
app.use("/api/rewards", require("./routes/reward"));
app.use("/api/team", require("./routes/team"));
app.use("/api/wallet", require("./routes/wallet"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  // Handle incoming messages
  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });
});
