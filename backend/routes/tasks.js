import express from "express";

import auth from "../middleware/auth.js";
import {
  getTasksBySearch,
  createTask,
  deleteTask,
  getTeamTasksBySearch,
  commentTask,
  getTask,
  getProjectsTasksBySearchArchived,
  updateTaskWorkHours,
  getClientSummaryTable,
  getUserSummaryTable,
  getTeamSummaryTable,
  getAllTasks,
  updateTaskStatus,
} from "../controllers/tasks.js";

const router = express.Router();

router.post("/createTask", auth, createTask);
router.get("/search/:email", getTasksBySearch);
router.get("/search_team/:email", getTeamTasksBySearch);
router.get("/search_project_tasks/:email", getProjectsTasksBySearchArchived);
router.delete("/delete/:id", deleteTask);
router.get("/tasks", getAllTasks);
router.get("/:id", getTask);
router.patch("/taskStatusUpdate/:id/:implementation_status", updateTaskStatus);
router.patch("/taskWorkedHoursUpdate/:id/:value", updateTaskWorkHours);
router.post("/:id/commentTask", commentTask);
router.get("/clientSummaryTable/:email", getClientSummaryTable);
router.get("/userSummaryTable/:email", getUserSummaryTable);
router.get("/teamSummaryTable/:email", getTeamSummaryTable);

export default router;
