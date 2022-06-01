import * as api from "../api";

import {
  CREATE_USER,
  END_LOADING,
  FETCH_ALL,
  FETCH_TEAM,
  FETCH_USER,
  SORT_USERS,
  START_LOADING,
  UPDATE_PASSWORD,
  UPDATE_USER,
} from "../constants/actionTypes";

export const createUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createUser(formData);
    dispatch({ type: CREATE_USER, data });
  } catch (error) {
    console.log(error);
  }
};

export const getTeamBySearch = (email) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchTeamBySearch(email);
    dispatch({ type: FETCH_TEAM, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchUsers(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getManagers = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchManagers(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = (id, passwordData) => async (dispatch) => {
  try {
    const { data } = await api.updatePassword(id, passwordData);
    dispatch({ type: UPDATE_PASSWORD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = (userDatas) => async (dispatch) => {
  try {
    console.log(userDatas);
    const { data } = await api.resetPassword(userDatas);
    dispatch({ type: UPDATE_PASSWORD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchUser(id);
    dispatch({ type: FETCH_USER, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserName = (userDatas) => async (dispatch) => {
  try {
    const { data } = await api.updateUserName(userDatas);
    dispatch({ type: UPDATE_USER, payload: data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const updateUserPhone = (userDatas) => async (dispatch) => {
  try {
    const { data } = await api.updateUserPhone(userDatas);
    dispatch({ type: UPDATE_USER, payload: data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const sortUsersByPosition = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchUsers(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });

    const admins = [];
    const managers = [];
    const workers = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].position === "admin") {
        admins.push(data[i]);
      } else if (data[i].position === "manager") {
        managers.push(data[i]);
      } else if (data[i].position === "user") {
        workers.push(data[i]);
      }
    }
    dispatch({ type: SORT_USERS, admins, managers, workers });
  } catch (error) {
    console.log(error);
  }
};
