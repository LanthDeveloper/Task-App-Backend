//src/modules/auth/index.js

// Import required modules
import { Router } from "express";

// Import middlewares
import isAuthenticated from "../auth/middlewares/mwAuth.js";

// Import routes
import routesTask from "./routes/rTask.js";

const routes = Router();

routes.use(isAuthenticated, routesTask);

const taskModule = { routes };
export default taskModule;
