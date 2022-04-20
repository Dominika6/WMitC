import express from "express";

import auth from '../middleware/auth.js'
import { getTasksBySearch, createTask, deleteTask, getTeamTasksBySearch, commentTask, getTask } from "../controllers/tasks.js";
import { getAllTasks, updateTaskStatus } from "../controllers/tasks.js";


const router = express.Router();

router.post('/createTask', auth, createTask);
router.get('/search/:email', getTasksBySearch);
router.get('/search_team/:email', getTeamTasksBySearch);
router.delete('/delete/:id', deleteTask);
router.get('/tasks', getAllTasks);
router.get('/:id', getTask)
router.patch('/taskStatusUpdate/:id', updateTaskStatus);
router.post('/:id/commentTask', commentTask);


export default router;
