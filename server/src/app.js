require("dotenv").config();
const express = require("express");
const cors = require("cors");
const articles = require("./routes/articles");
const { notFound, errorHandler } = require("./middleware/errors");

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/articles", articles);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
