const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helper/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const routers = require("./routers/index");

dotenv.config({
  path: "./config/env/config.env"
});

connectDatabase();

app.use(express.json());

const PORT = process.env.PORT;

app.use("/api", routers);

app.use(customErrorHandler);

app.use((req, res, next) => {
  const error = new Error('I think you are lost');
  error.status = 404;
  res.json({
    message: error.message
  })
}); 


server.listen(PORT, () => {
  console.log(`Listening on ${PORT} : ${process.env.NODE_ENV}`);
});
