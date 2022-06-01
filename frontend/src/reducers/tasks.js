import {
  CREATE_TASK,
  // DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_TASK,
  PROJECT_HOURS,
  SORT_TASKS,
  START_LOADING,
  USER_SUMMARY_TABLE,
  CLIENT_SUMMARY_TABLE,
  TEAM_SUMMARY_TABLE,
  UPDATE_TASK,
} from "../constants/actionTypes";

export default (state = { isLoading: true, tasks: [] }, action) => {
  switch (action.type) {
    case CREATE_TASK:
      alert(`${action?.data?.message}`);
      window.location.reload();
      return { ...state, tasks: [...state.tasks, action.payload] };

    case FETCH_BY_SEARCH:
      return {
        ...state,
        tasks: action.payload,
        archived_tasks: action.archived_tasks,
      };

    case FETCH_ALL:
      return { ...state, tasks: action.payload };

    case FETCH_TASK:
      return { ...state, task: action.payload };

    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    // case DELETE:
    //   return {
    //     ...state,
    //     tasks: state.tasks.filter((task) => task._id !== action.payload),
    //   };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };

    case PROJECT_HOURS:
      return {
        ...state,
        project_tasks: action.project_tasks,
        project_hours_data: action.hours_data,
      };

    case SORT_TASKS:
      return {
        ...state,
        archived_tasks: action.archived_tasks,
        new_tasks: action.new_tasks,
        in_progress_tasks: action.in_progress_tasks,
        done_tasks: action.done_tasks,
      };

    case USER_SUMMARY_TABLE:
      return {
        ...state,
        user_summary_table: action.user_summary_table,
      };

    case TEAM_SUMMARY_TABLE:
      return {
        ...state,
        team_summary_table: action.team_summary_table,
      };

    case CLIENT_SUMMARY_TABLE:
      return {
        ...state,
        client_summary_table: action.client_summary_table,
      };

    default:
      return state;
  }
};
