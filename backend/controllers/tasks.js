import express from "express";
import mongoose from "mongoose";

import Tasks from "../models/tasks.js";
import Projects from "../models/projects.js";
import Users from "../models/users.js";
import Clients from "../models/clients.js";

const router = express.Router();

export const getTasksBySearch = async (req, res) => {
  const { email } = req.params;
  try {
    const tasks = await Tasks.find({ id_user: email });
    res.json({ data: tasks });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTeamTasksBySearch = async (req, res) => {
  const { email } = req.params;
  try {
    const users = await Users.find({ id_supervisor: email });
    const myTeamTasks = [];
    for (let i = 0; i < users.length; i++) {
      myTeamTasks.push(await Tasks.find({ id_user: users[i].email }));
    }
    res.json({ data: myTeamTasks });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// szukanie tasków teamu pogrupowanych na projekty/klienta, po mailu koordynatora
export const getProjectsTasksBySearchArchived = async (req, res) => {
  const { email } = req.params;
  try {
    const clients = await Clients.find({ id_supervisor: email });
    const projects = [];
    for (let i = 0; i < clients.length; i++) {
      projects.push(await Projects.find({ id_client: clients[i].email }));
    }
    const tasks = [];
    for (let i = 0; i < projects.length; i++) {
      for (let j = 0; j < projects[i].length; j++) {
        tasks.push(
          await Tasks.find({ id_project: projects[i][j].project_name })
        );
      }
    }
    res.json({ data: tasks });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  const {
    project,
    id_user,
    name,
    description,
    task_comments,
    deadline,
    implementation_status,
    estimated_hours,
    hours_worked,
  } = req.body;
  try {
    const existingProject = await Projects.findOne({ project_name: project });
    if (!existingProject)
      return res.status(400).json({ messsage: "Project do not exist." });
    const result = await Tasks.create({
      id_project: project,
      id_user: id_user,
      task_name: name,
      task_description: description,
      task_comments: task_comments,
      deadline: deadline,
      implementation_status: implementation_status,
      estimated_hours: estimated_hours,
      hours_worked: hours_worked,
    });
    res
      .status(200)
      .json({ result: result, message: "Task created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No task with that id");
    await Tasks.findByIdAndRemove(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Tasks.find();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { id, implementation_status } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No task with that id");
    await Tasks.findByIdAndUpdate(id, {
      implementation_status: implementation_status,
    });
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.statusMessage(404).json({ message: error.message });
  }
};

export const updateTaskWorkHours = async (req, res) => {
  const { id, value } = req.params;
  try {
    const task = await Tasks.findOne({ _id: id });
    if (!task) return res.status(404).json({ messsage: "Task doesn't exist." });
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No task with that id.");
    task.hours_worked.push(value);
    const updatedTask = await Tasks.findByIdAndUpdate(id, task, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const commentTask = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    const task = await Tasks.findById(id);
    task.task_comments.push(value);
    const updatedTask = await Tasks.findByIdAndUpdate(id, task, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Tasks.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCurrentDatas = () => {
  let last_month;
  let last_month_year;
  let current_month = new Date().getMonth() + 1;
  const current_year = new Date().getFullYear();
  if (current_month === 1) {
    last_month = 12;
    last_month_year = current_year - 1;
  } else {
    last_month = current_month - 1;
    last_month_year = current_year;
  }
  if (current_month < 10) {
    current_month = `0${current_month}`;
  }
  if (last_month < 10) {
    last_month = `0${last_month}`;
  }
  const current_month_date = `${current_month}.${current_year}`;
  const last_month_date = `${last_month}.${last_month_year}`;

  return {
    current_month_date: current_month_date,
    last_month_date: last_month_date,
  };
};

const functionGetWorkedTimeFromTasks = async (tasks) => {
  let hours_table;
  let result = [];
  let all_task_hours;
  let current_month_hours;
  let last_month_hours;
  let all_hours = 0;
  for (let i = 0; i < tasks.length; i++) {
    all_task_hours = 0;
    let k = tasks[i].hours_worked.length;
    for (let j = 0; j < k; j++) {
      hours_table = tasks[i].hours_worked[j].split(":")[0];
      all_task_hours =
        parseInt(all_task_hours) +
        parseInt(tasks[i].hours_worked[j].split(":")[0]);
    }
    all_hours = all_hours + parseInt(all_task_hours);
    current_month_hours = 0;
    last_month_hours = 0;
    const current_datas = getCurrentDatas();

    let checked_month;
    for (let i = 0; i < tasks.length; i++) {
      for (let j = 0; j < tasks[i].hours_worked.length; j++) {
        checked_month = `${tasks[i].hours_worked[j].split(".")[1]}.${
          tasks[i].hours_worked[j].split(".")[2]
        }`;
        if (checked_month === current_datas.current_month_date) {
          current_month_hours =
            current_month_hours +
            parseInt(tasks[i].hours_worked[j].split(":")[0]);
        }
        if (checked_month === current_datas.last_month_date) {
          last_month_hours =
            last_month_hours + parseInt(tasks[i].hours_worked[j].split(":")[0]);
        }
      }
    }
  }
  const hours_data = {
    user_email: tasks[0]?.id_user,
    project_name: tasks[0]?.id_project,
    all_hours: all_hours,
    current_month_hours: current_month_hours,
    last_month_hours: last_month_hours,
  };
  result.push(hours_data);
  return result;
};

export const getClientSummaryTable = async (req, res) => {
  const { email } = req.params;
  try {
    const projects = await Projects.find({ id_client: email });
    let tablica = [];
    tablica.push([
      "Project name",
      "Current month",
      "Last month",
      "Total number of hours",
    ]);

    for (let i = 0; i < projects.length; i++) {
      const tasks = await Tasks.find({ id_project: projects[i].project_name });

      let element = await functionGetWorkedTimeFromTasks(tasks);
      let oneTable = [];
      oneTable.push(element[0]?.project_name);
      oneTable.push(element[0]?.current_month_hours);
      oneTable.push(element[0]?.last_month_hours);
      oneTable.push(element[0]?.all_hours);
      tablica.push(oneTable);
    }
    res.status(200).json(tablica);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// email usera
export const getUserSummaryTable = async (req, res) => {
  const { email } = req.params;
  try {
    let projects_hours_table = [];
    let project_table = [];
    let tablica = [];
    tablica.push([
      "Project name",
      "Current month",
      "Last month",
      "Total number of hours",
    ]);
    const tasks = await Tasks.find({ id_user: email });
    for (let i = 0; i < tasks.length; i++) {
      projects_hours_table.push([tasks[i].id_project, tasks[i].hours_worked]);
    }
    for (let i = 0; i < projects_hours_table.length; i++) {
      for (let j = 0; j < projects_hours_table.length; j++) {
        if (
          projects_hours_table[i][0] === projects_hours_table[j][0] &&
          projects_hours_table[i][1] !== projects_hours_table[j][1]
        ) {
          project_table.push([
            projects_hours_table[i][0],
            projects_hours_table[i][1].concat(projects_hours_table[j][1]),
          ]);
          projects_hours_table.splice(i, 1, "");
          projects_hours_table.splice(j, 1, "");
        }
      }
    }
    let hours_table;
    let all_task_hours = 0;
    let current_month_hours = 0;
    let last_month_hours = 0;
    let all_hours = 0;

    for (let i = 0; i < project_table.length; i++) {
      for (let j = 0; j < project_table[i][1].length; j++) {
        hours_table = project_table[i][1][j].split(":")[0];
        all_task_hours =
          all_task_hours + parseInt(project_table[i][1][j].split(":")[0]);
      }
      all_hours = all_hours + all_task_hours;
      const current_datas = getCurrentDatas();
      let checked_month;
      for (let j = 0; j < project_table[i][1].length; j++) {
        checked_month = `${project_table[i][1][j].split(".")[1]}.${
          project_table[i][1][j].split(".")[2]
        }`;
        if (checked_month === current_datas.current_month_date) {
          current_month_hours =
            current_month_hours +
            parseInt(project_table[i][1][j].split(":")[0]);
        }
        if (checked_month === current_datas.last_month_date) {
          last_month_hours =
            last_month_hours + parseInt(project_table[i][1][j].split(":")[0]);
        }
      }
      let oneTable = [];
      oneTable.push(project_table[i][0]);
      oneTable.push(current_month_hours);
      oneTable.push(last_month_hours);
      oneTable.push(all_hours);
      tablica.push(oneTable);
      all_task_hours = 0;
      all_hours = 0;
      current_month_hours = 0;
      last_month_hours = 0;
    }
    res.status(200).json(tablica);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//email koordynatora
export const getTeamSummaryTable = async (req, res) => {
  const { email } = req.params;
  let tablica = [];
  tablica.push([
    "User email",
    "Current month",
    "Last month",
    "Total number of hours",
  ]);
  try {
    const users = await Users.find({ id_supervisor: email });
    for (let i = 0; i < users.length; i++) {
      const tasks = await Tasks.find({ id_user: users[i].email });
      let element = await functionGetWorkedTimeFromTasks(tasks);
      let oneTable = [];
      oneTable.push(element[0]?.user_email);
      oneTable.push(element[0]?.current_month_hours);
      oneTable.push(element[0]?.last_month_hours);
      oneTable.push(element[0]?.all_hours);
      tablica.push(oneTable);
    }
    res.status(200).json(tablica);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
