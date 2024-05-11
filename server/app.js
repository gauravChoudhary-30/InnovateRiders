import express from "express";
import cors from "cors";
import { LIMIT } from "./src/constants.js";
import authRoute from "./src/routes/authRoute.js"

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json({ limit: `${LIMIT}` }));
app.use(express.urlencoded({ extended: true, limit: `${LIMIT}` }));
app.use(express.static("public"));


app.use("", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;