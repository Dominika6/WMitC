import express from "express";
import Tasks from '../models/tasks.js'
import Projects from "../models/projects.js";
import mongoose from "mongoose";
import Users from "../models/users.js";
import Clients from "../models/clients.js";


const router = express.Router();

export const getTasksBySearch = async (req, res) => {
    const { email } = req.params;
    try {
        const tasks = await Tasks.find({ id_user: email });
        res.json({ data: tasks });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTeamTasksBySearch = async (req, res) => {
    const { email } = req.params;
    try {
        const users = await Users.find({ id_supervisor: email });
        const myTeamTasks = [];
        for (let i = 0; i < users.length; i++){
            myTeamTasks.push(await Tasks.find({id_user: users[i].email}));
        }
        res.json({ data: myTeamTasks });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

// szukanie tasków teamu pogrupowanych na projekty/klienta, po mailu koordynatora
export const getProjectsTasksBySearch = async (req, res) => {
    const { email } = req.params;
    try {
        const clients = await Clients.find({ id_supervisor: email });
        const projects = [];
        for (let i = 0; i < clients.length; i++ ){
            projects.push( await Projects.find( { id_client: clients[i].email}));
        }
        const tasks = [];
        for (let i = 0; i < projects.length; i++){
            for (let j = 0; j < projects[i].length; j++){
                tasks.push( await Tasks.find( {id_project: projects[i][j].project_name}));
            }
        }
        res.json({ data: tasks });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    const { project, id_user, name, description, task_comments, deadline, implementation_status } = req.body;
    try {
        const existingProject = await Projects.findOne({project_name: project});
        if(!existingProject) return res.status(400).json({ messsage: "Project do not exist." });
        const result = await Tasks.create({ id_project: project, id_user: id_user, task_name: name, task_description: description, task_comments: task_comments, deadline: deadline, implementation_status: implementation_status });
        res.status(200).json({ result: result, message:'Task created successfully.' });
    } catch(error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No task with that id');
        await Tasks.findByIdAndRemove(id);
        res.json({ message: 'Task deleted successfully' });
    } catch ( error ){
        res.status(404).json({ message: error.message });
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Tasks.find();
        res.status(200).json(allTasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { implementation_status } = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No task with that id');
        await Tasks.findByIdAndUpdate(id, {implementation_status: implementation_status})
        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        res.statusMessage(404).json({message: error.message});
    }
}

export const commentTask = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    const task = await Tasks.findById(id);
    task.task_comments.push(value);
    const updatedTask = await Tasks.findByIdAndUpdate(id, task, { new: true });
    res.json(updatedTask);
}

export const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Tasks.findById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;