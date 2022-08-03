import { LOGIN } from "../constants/actionTypes";
import { Api } from "../api";

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await Api.getInstance().login(formData);
    dispatch({ type: LOGIN, data });
    history.push("/");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
