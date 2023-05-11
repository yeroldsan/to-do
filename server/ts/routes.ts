import express, { Router } from "express";
import controllers from "./controllers";

const router: Router = express.Router();

router
  .get("/", controllers.getAllTasks)
  .post("/new", controllers.createTask)
  .delete("/delete/:id", controllers.deleteTask)
  .put("/update/:id", controllers.updateTask)
  .patch("/update-status/:id", controllers.statusTask);

export default router;
