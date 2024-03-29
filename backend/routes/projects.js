import express from "express";

import {
  createProject,
  getAllProjects,
  getMyClientsProjects,
  getClientProjects,
} from "../controllers/projects.js";
import { deleteProject } from "../controllers/projects.js";

const router = express.Router();

router.post("/createProject", createProject);
router.delete("/delete/:id", deleteProject);
router.get("/projects", getAllProjects);
router.get("/getMyClientsProjects/:email", getMyClientsProjects);
router.get("/getClientProjects/:email", getClientProjects);
export default router;
