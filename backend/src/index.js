require("dotenv").config({ path: "./src/.env" });
const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT;

// Middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'https://hoc-python.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
// Routes
routes(app);
const path = require("path");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connect success");
  })
  .catch((error) => {
    console.log(error);
  });
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
