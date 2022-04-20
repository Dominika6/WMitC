import express from "express";

import auth from '../middleware/auth.js'
import { getClientsBySearch, getAllClients, createClient } from "../controllers/clients.js";


const router = express.Router();

router.post('/createClient', auth, createClient);
router.get('/search/:email', getClientsBySearch);
router.get('/clients', getAllClients);


export default router;
