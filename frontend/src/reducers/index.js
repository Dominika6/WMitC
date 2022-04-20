import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import clients from "./clients";
import tasks from "./tasks";
import projects from "./projects";

export const reducers = combineReducers({ auth, clients, tasks, projects, users });
