//src/app.js

// Import required modules
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Import middleware
import error from "./middlewares/mwError.js";

// Import modules
import taskModule from "./modules/task/index.js";

// Express app and configure middleware
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:8082",
      "http://localhost:8080",
      "http://127.0.0.1:5500",
      "https://task-app-amazontic.vercel.app",
    ],
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the routes
app.use("/api/tasks", taskModule.routes);

// Define error routes
app.use("*", error.e404);
app.use(error.eDefault);

export default app;
