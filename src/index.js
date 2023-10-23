import express from "express";
import cookieParser from "cookie-parser";
import routerAuth from "./routes/auth.routes.js";
import rotuterTasks from "./routes/tasks.routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routerAuth);
app.use('/api',rotuterTasks);

app.listen(3000);
console.log("Server on port 3000");
