import express from "express";

import auth from "../middleware/auth.js";
import {
  getClientsBySearch,
  getAllClients,
  createClient,
  getClientByTheirEmail,
  getClient,
  updateClientEmail,
  updateClientName,
  updateClientPhone,
  updateClientCoordinator,
} from "../controllers/clients.js";

const router = express.Router();

router.post("/createClient", auth, createClient);
router.get("/search/:email", getClientsBySearch);
router.get("/search/client/:email", getClientByTheirEmail);
router.get("/clients", getAllClients);
router.get("/getClient/:id", getClient);

router.patch("/emailUpdate/:id/:email", updateClientEmail);
router.patch("/nameUpdate/:id/:name", updateClientName);
router.patch("/phoneUpdate/:id/:phone_number", updateClientPhone);
router.patch("/managerUpdate/:id/:id_supervisor", updateClientCoordinator);

export default router;
