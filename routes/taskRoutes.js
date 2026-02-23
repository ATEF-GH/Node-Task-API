import express from "express";
import authorization from "../middleware/authorization.js";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  toggleTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.use(authorization);

router.post("/", createTask);
router.get("/", getAllTasks);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);
router.put("/toggle/:taskId", toggleTask);

export default router;
