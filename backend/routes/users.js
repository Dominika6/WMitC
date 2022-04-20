import express from "express";

import { login, createUser, getAllUsers, getTeamBySearch, updatePassword } from "../controllers/users.js";


const router = express.Router();

router.post('/login', login);
router.post('/createUser', createUser);
router.get('/search/:email', getTeamBySearch);
router.get('/users', getAllUsers);
router.patch('/passwordUpdate/:id', updatePassword);

export default router;