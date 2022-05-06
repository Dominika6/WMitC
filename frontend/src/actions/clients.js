import * as api from "../api";
import { CREATE_CLIENT, END_LOADING, FETCH_ALL, START_LOADING } from "../constants/actionTypes";


export const createClient = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.createClient(formData);
        dispatch({ type: CREATE_CLIENT, data });

        history.push('/createClient');
    } catch (error) {
        console.log(error);
    }
}

// get my clients ( od Supervisora )
export const getClientsBySearch = (email) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchClientsBySearch(email);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getClientByTheirEmail = (email) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.getClientByTheirEmail(email);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
        console.log('actions/clients', data)
    } catch (error) {
        console.log(error);
    }
}

export const getAllClients = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchClients(page);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}
