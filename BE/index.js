import express from "express";
import {} from "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
import db from "./models/index.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(router);
db.sync();
app.use("/public", express.static("public"));

app.listen(5000, () => console.log("Server running at port 5000"));
