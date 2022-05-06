import { CREATE_PROJECT, DELETE, END_LOADING_PROJECT, FETCH_MY_CLIENTS_PROJECTS,  FETCH_ALL_PROJECT, START_LOADING_PROJECT } from "../constants/actionTypes";
import * as api from '../api';


export const createProject = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.createProject(formData);
        dispatch({ type: CREATE_PROJECT, data });

        history.push('/createProject');
    } catch (error) {
        console.log(error);
    }
}

export const deleteProject = (id) => async (dispatch) => {
    try {
        await api.deleteProject(id);
        dispatch({ type: DELETE, payload: id });
    } catch(error) {
        console.log(error);
    }
}

export const getAllProjects = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT });
        const { data } = await api.fetchProjects(page);
        dispatch({ type: FETCH_ALL_PROJECT, payload: data });
        dispatch({ type: END_LOADING_PROJECT })
    } catch (error) {
        console.log(error);
    }
}

//szukamy po mailu supervisora
export const getMyClientsProjects = (email) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_PROJECT});
        const { data: { data } } = await api.fetchMyClientsProjects(email);
        dispatch({ type: FETCH_MY_CLIENTS_PROJECTS, payload: data});
        dispatch({ type: END_LOADING_PROJECT })
    } catch (error) {
        console.log(error)
    }
}
