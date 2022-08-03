import {
  CREATE_CLIENT,
  END_LOADING,
  FETCH_ALL,
  FETCH_CLIENT,
  START_LOADING,
  UPDATE_CLIENT,
} from "../constants/actionTypes";
import { Api } from "../api";

export const createClient = (formData, history) => async (dispatch) => {
  try {
    const { data } = await Api.getInstance().createClient(formData);
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
    } = await Api.getInstance().fetchClientsBySearch(email);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getAllClients = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await Api.getInstance().fetchClients(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getClient = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await Api.getInstance().fetchClient(id);
    dispatch({ type: FETCH_CLIENT, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updateClientEmail = (clientDatas) => async (dispatch) => {
  try {
    const { data } = await Api.getInstance().updateClientEmail(clientDatas);
    dispatch({ type: UPDATE_CLIENT, payload: data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const updateClientPhone = (clientDatas) => async (dispatch) => {
  try {
    const { data } = await Api.getInstance().updateClientPhone(clientDatas);
    dispatch({ type: UPDATE_CLIENT, payload: data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
