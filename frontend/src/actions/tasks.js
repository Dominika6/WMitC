import {
  CREATE_TASK,
  DELETE,
  START_LOADING,
  END_LOADING,
  FETCH_TASK,
  FETCH_BY_SEARCH,
  UPDATE_TASK,
  COMMENT,
} from "../constants/actionTypes";
import * as api from "../api";

export const getTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchTask(id);
    dispatch({ type: FETCH_TASK, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await api.deleteTask(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = (id, status) => async (dispatch) => {
  try {
    const newStatus = { implementation_status: status };
    const { data } = await api.updateTask(id, newStatus);
    dispatch({ type: UPDATE_TASK, payload: data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const updateTaskWorkHours = (taskDatas) => async (dispatch) => {
  try {
    const { data } = await api.updateTaskWorkHours(taskDatas);
    dispatch({ type: UPDATE_TASK, payload: data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const createTask = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.createTask(formData);
    dispatch({ type: CREATE_TASK, data });
    history.push("/createTask");
  } catch (error) {
    console.log(error);
  }
};

// taski konkretnego użytkownika
export const getTasksBySearch = (email) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchTasksBySearch(email);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getProjectTasksByCoordinatorEmail =
  (email) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const {
        data: { data },
      } = await api.getProjectTasksByCoordinatorEmail(email);
      dispatch({ type: FETCH_BY_SEARCH, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

export const getTeamTasksBySearch = (email) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.getTeamTasksBySearch(email);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const commentTask = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentTask(value, id);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
