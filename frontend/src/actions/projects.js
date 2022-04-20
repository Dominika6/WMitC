import { CREATE_PROJECT, DELETE } from "../constants/actionTypes";
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
