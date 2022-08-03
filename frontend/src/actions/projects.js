import {
  CREATE_PROJECT,
  END_LOADING_PROJECT,
  FETCH_MY_CLIENTS_PROJECTS,
  START_LOADING_PROJECT,
} from "../constants/actionTypes";
import { Api } from "../api";

export const createProject = (formData, history) => async (dispatch) => {
  try {
    const { data } = await Api.getInstance().createProject(formData);
    dispatch({ type: CREATE_PROJECT, data });

    history.push("/createProject");
  } catch (error) {
    console.log(error);
  }
};

//szukamy po mailu supervisora
export const getMyClientsProjects = (email) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_PROJECT });
    const {
      data: { data },
    } = await Api.getInstance().fetchMyClientsProjects(email);
    dispatch({ type: FETCH_MY_CLIENTS_PROJECTS, payload: data });
    dispatch({ type: END_LOADING_PROJECT });
  } catch (error) {
    console.log(error);
  }
};
