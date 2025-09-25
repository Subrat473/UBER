require("dotenv").config(); // load .env first
const http = require("http");
const app = require("./app");
const connectToDb = require("./db/db");
const { initializeSocket } = require("./socket");

const port = process.env.PORT || 3000;

// Connect to MongoDB first
connectToDb();

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
