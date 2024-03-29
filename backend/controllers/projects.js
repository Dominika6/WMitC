import express from "express";

import Projects from "../models/projects.js";
import Clients from "../models/clients.js";
import mongoose from "mongoose";

const router = express.Router();

export const createProject = async (req, res) => {
  const { client, name, description } = req.body;
  try {
    const existingClient = await Clients.findOne({ email: client });
    if (!existingClient)
      return res.status(400).json({ messsage: "Client do not exist." });
    const result = await Projects.create({
      id_client: client,
      project_name: name,
      project_description: description,
    });
    res
      .status(200)
      .json({ result: result, message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No project with that id");
  await Projects.findByIdAndRemove(id);
  res.json({ message: "Project deleted successfully" });
};

export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Projects.find();
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMyClientsProjects = async (req, res) => {
  const { email } = req.params;
  try {
    const myClients = await Clients.find({ id_supervisor: email });
    const allProjects = await Projects.find();
    const myClientsProjects = [];
    for (let i = 0; i < myClients.length; i++) {
      for (let j = 0; j < allProjects.length; j++) {
        if (myClients[i].email === allProjects[j].id_client) {
          myClientsProjects.push(allProjects[j]);
        }
      }
    }
    res.status(200).json({ data: myClientsProjects });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getClientProjects = async (req, res) => {
  const { email } = req.params;
  try {
    const projects = await Projects.find({ id_client: email });
    res.status(200).json({ data: projects });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
