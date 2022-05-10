import {
  CREATE_TASK,
  DELETE,
  START_LOADING,
  END_LOADING,
  FETCH_TASK,
  FETCH_BY_SEARCH,
  UPDATE_TASK,
  COMMENT,
  SORT_TASKS,
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

export const archiveTask = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateTask(id, {
      implementation_status: "archived",
    });
    dispatch({ type: UPDATE_TASK, payload: data });
    window.location.reload();
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

export const getProjectTasksByCoordinatorEmailWithArchived =
  (email) => async (dispatch) => {
    try {
      console.log("getProjectTasksByCoordinatorEmailWithArchived");
      dispatch({ type: START_LOADING });
      const {
        data: { data },
      } = await api.fetchProjectTasksByCoordinatorEmailWithArchived(email);
      console.log(data);
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

export const sortProjectTasksCoordinatorEmailByStatus =
  (email) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const {
        data: { data },
      } = await api.fetchProjectTasksByCoordinatorEmailWithArchived(email);
      dispatch({ type: FETCH_BY_SEARCH, payload: data });
      dispatch({ type: END_LOADING });

      const new_tasks = [];
      const in_progress_tasks = [];
      const done_tasks = [];
      const archived_tasks = [];

      Array.from(data).map((task_group) =>
        Array.from(task_group).map((task) => {
          task?.implementation_status === "new"
            ? new_tasks.push(task)
            : task?.implementation_status === "in progress"
            ? in_progress_tasks.push(task)
            : task?.implementation_status === "done"
            ? done_tasks.push(task)
            : task?.implementation_status === "archived"
            ? archived_tasks.push(task)
            : console.log("There is a problem reading the status.");
          return archived_tasks;
        })
      );
      dispatch({
        type: SORT_TASKS,
        archived_tasks,
        new_tasks,
        in_progress_tasks,
        done_tasks,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const workSummary = (email) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchProjectTasksByCoordinatorEmailWithArchived(email);
    const archivedTablesToReturn = [];
    const tablesToReturn = [];
    const titles = [
      "Project name",
      "Assigned employee",
      "Estimated hours",
      "Hours worked",
      "Status",
      "Deadline",
    ];
    tablesToReturn.push(titles);
    archivedTablesToReturn.push(titles);

    Array.from(data).map((task_group) =>
      Array.from(task_group).map((task) => {
        if (task?.implementation_status === "archived") {
          const archivedTable = [];
          archivedTable.push(task?.id_project);
          archivedTable.push(task?.id_user);
          archivedTable.push(task?.estimated_hours);
          archivedTable.push(task?.hours_worked);
          archivedTable.push(task?.implementation_status);
          archivedTable.push(task?.deadline.split("T")[0]);
          archivedTablesToReturn.push(archivedTable);
          return archivedTable;
        } else {
          const oneTable = [];
          oneTable.push(task?.id_project);
          oneTable.push(task?.id_user);
          oneTable.push(task?.estimated_hours);
          oneTable.push(task?.hours_worked);
          oneTable.push(task?.implementation_status);
          oneTable.push(task?.deadline.split("T")[0]);
          tablesToReturn.push(oneTable);
          return oneTable;
        }
      })
    );
    dispatch({
      type: FETCH_BY_SEARCH,
      payload: tablesToReturn,
      archived_tasks: archivedTablesToReturn,
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
