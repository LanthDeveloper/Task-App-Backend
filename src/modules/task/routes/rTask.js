//src/modules/auth/routes/rForm.js
import { Router } from "express";
import cTask from "../controllers/cTask.js";

const routes = Router();

routes.get("/", cTask.getTasks);
routes.post("/", cTask.createTask);
routes.put("/:id", cTask.updateTask);
routes.delete("/:id", cTask.deleteTask);

export default routes;
