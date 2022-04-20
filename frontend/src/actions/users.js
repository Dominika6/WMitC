import * as api from "../api";
import { CREATE_USER, END_LOADING, FETCH_ALL, FETCH_TEAM, START_LOADING, UPDATE_PASSWORD } from "../constants/actionTypes";


export const createUser = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.createUser(formData);
        dispatch({ type: CREATE_USER, data });
        history.push('/createUser');
    } catch (error) {
        console.log(error);
    }
}

export const getTeamBySearch = (email) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchTeamBySearch(email);
        dispatch({ type: FETCH_TEAM, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getAllUsers = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchUsers(page);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const updatePassword = (id, passwordData) => async (dispatch) => {
    try {
        const { data } = await api.updatePassword(id, passwordData);
        dispatch({ type: UPDATE_PASSWORD, payload: data });
    } catch (error) {
        console.log(error);
    }
}

