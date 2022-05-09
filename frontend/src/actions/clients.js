import * as api from "../api";
import {
  CREATE_CLIENT,
  END_LOADING,
  FETCH_ALL,
  FETCH_CLIENT,
  START_LOADING,
  UPDATE_CLIENT,
} from "../constants/actionTypes";

export const createClient = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.createClient(formData);
    dispatch({ type: CREATE_CLIENT, data });
    history.push("/createClient");
  } catch (error) {
    console.log(error);
  }
};

// get my clients ( od Supervisora )
export const getClientsBySearch = (email) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchClientsBySearch(email);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getClientByTheirEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.getClientByTheirEmail(email);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getAllClients = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchClients(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getClient = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchClient(id);
    dispatch({ type: FETCH_CLIENT, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updateClientEmail = (clientDatas) => async (dispatch) => {
  try {
    const { data } = await api.updateClientEmail(clientDatas);
    dispatch({ type: UPDATE_CLIENT, payload: data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const updateClientName = (clientDatas) => async (dispatch) => {
  try {
    const { data } = await api.updateClientName(clientDatas);
    dispatch({ type: UPDATE_CLIENT, payload: data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const updateClientPhone = (clientDatas) => async (dispatch) => {
  try {
    const { data } = await api.updateClientPhone(clientDatas);
    dispatch({ type: UPDATE_CLIENT, payload: data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const updateClientCoordinator = (clientDatas) => async (dispatch) => {
  try {
    const { data } = await api.updateClientCoordinator(clientDatas);
    dispatch({ type: UPDATE_CLIENT, payload: data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
