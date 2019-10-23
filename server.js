const express = require("express");
const connectDb = require("./config/db");
const todoListsRouter = require("./routes/todo-lists");

const app = express();
connectDb();
const PORT = process.env.PORT || 3004;
app.use(express.json());
app.use("/api/todo-lists", todoListsRouter);

app.listen(PORT, () => {
  console.log("Server has started");
});

module.exports = app;
