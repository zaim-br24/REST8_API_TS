import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import router from "./router";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
mongoose.set("strictQuery", true);

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

// const MONGO_URL =
//   "mongodb+srv://zaim:wtQ54dDJMvgSAsqy@cluster0.zfaym.mongodb.net/TsRestApi?retryWrites=true&w=majority"; // DB URI

mongoose.Promise = Promise;
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("connected to DB successfully."));

mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
