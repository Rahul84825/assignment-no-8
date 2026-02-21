require('dotenv').config();

const cors = require('cors');

const express = require('express');

const ConnectDB = require('./databaseConnection');

ConnectDB();

const todoRouter = require('./route/todo');

const PORT = process.env.PORT || 8081;

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://assignment-no-08-rahul.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Home page :->',
  });
});

app.use('/todo', todoRouter);

app.listen(PORT, () => {
  console.log(`the server is running on http://localhost:${PORT}/`);

});
