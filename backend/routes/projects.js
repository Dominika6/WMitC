import express from "express";

import { createProject } from "../controllers/projects.js";
import auth from '../middleware/auth.js'
import { deleteProject } from "../controllers/projects.js";

const router = express.Router();


router.post('/createProject', auth, createProject);
router.delete('/delete/:id', deleteProject);

export default router;
