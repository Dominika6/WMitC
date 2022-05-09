import express from "express";

import Clients from "../models/clients.js";
import mongoose from "mongoose";

const router = express.Router();

export const createClient = async (req, res) => {
  const { supervisor, email, phoneNumber, name } = req.body;

  try {
    const existingClient = await Clients.findOne({ email });
    if (existingClient)
      return res.status(400).json({ messsage: "Client already exist." });
    const result = await Clients.create({
      name: name,
      phone_number: phoneNumber,
      email,
      id_supervisor: supervisor,
    });
    res
      .status(200)
      .json({ result: result, message: "Client created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const allClients = await Clients.find();
    res.status(200).json(allClients);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get My Clients ( od Supervisora )
export const getClientsBySearch = async (req, res) => {
  const { email } = req.params;
  try {
    const clients = await Clients.find({ id_supervisor: email });
    res.json({ data: clients });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// clients data
export const getClientByTheirEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const clients = await Clients.find({ email: email });
    res.json({ data: clients });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getClient = async (req, res) => {
  const { id: id } = req.params;
  try {
    const client = await Clients.findById(id);
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateClientEmail = async (req, res) => {
  const { id, email } = req.params;
  try {
    const existingClient = await Clients.findOne({ _id: id });
    if (!existingClient)
      return res.status(404).json({ messsage: "Client doesn't exist." });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No client with that id.");
    const isEmailUsed = await Clients.findOne({ email: email });
    if (isEmailUsed)
      return res
        .status(404)
        .json({ message: "The given email already exist in database." });
    await Clients.findByIdAndUpdate(id, { email: email }, { new: true });
    res.status(200).json({ result: existingClient });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateClientName = async (req, res) => {
  const { id, name } = req.params;
  try {
    const existingClient = await Clients.findOne({ _id: id });
    if (!existingClient)
      return res.status(404).json({ messsage: "Client doesn't exist." });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No client with that id.");
    await Clients.findByIdAndUpdate(id, { name: name }, { new: true });
    res.status(200).json({ result: existingClient });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateClientPhone = async (req, res) => {
  const { id, phone_number } = req.params;
  try {
    const existingClient = await Clients.findOne({ _id: id });
    if (!existingClient)
      return res.status(404).json({ messsage: "Client doesn't exist." });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No client with that id.");
    await Clients.findByIdAndUpdate(
      id,
      { phone_number: phone_number },
      { new: true }
    );
    res.status(200).json({ result: existingClient });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateClientCoordinator = async (req, res) => {
  const { id, id_supervisor } = req.params;
  try {
    const existingClient = await Clients.findOne({ _id: id });
    if (!existingClient)
      return res.status(404).json({ messsage: "Client doesn't exist." });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No client with that id.");
    await Clients.findByIdAndUpdate(
      id,
      { id_supervisor: id_supervisor },
      { new: true }
    );
    res.status(200).json({ result: existingClient });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export default router;
