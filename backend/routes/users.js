import express from "express";

import {
  login,
  createUser,
  getAllUsers,
  getTeamBySearch,
  getManagers,
  updatePassword,
  resetPassword,
  getUser,
  updateUserEmail,
  updateUserName,
  updateUserPhone,
  updateUserCoordinator,
} from "../controllers/users.js";

const router = express.Router();

router.get("/getUser/:id", getUser);
router.get("/users", getAllUsers);
router.get("/search/:email", getTeamBySearch);
router.get("/managers", getManagers);
router.post("/login", login);
router.post("/createUser", createUser);
router.patch("/passwordUpdate/:id", updatePassword);
router.patch("/passwordReset/:id/:tmpPassword", resetPassword);
router.patch("/emailUpdate/:id/:email", updateUserEmail);
router.patch("/nameUpdate/:id/:name", updateUserName);
router.patch("/phoneUpdate/:id/:phone_number", updateUserPhone);
router.patch("/managerUpdate/:id/:id_supervisor", updateUserCoordinator);

export default router;
