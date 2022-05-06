import { CREATE_PROJECT, END_LOADING_PROJECT, FETCH_MY_CLIENTS_PROJECTS, FETCH_ALL_PROJECT, START_LOADING_PROJECT } from "../constants/actionTypes";

export default (state = { isProjectLoading: true, projects:[], loadingProjectEnd: false }, action) => {
    switch (action.type){
        case CREATE_PROJECT:
            alert(`${action?.data?.message}`);
            window.location.reload();
            return { ...state, projects: [...state.projects, action.payload] };
        case START_LOADING_PROJECT:
            return { ...state, isProjectLoading: true };
        case END_LOADING_PROJECT:
            return { ...state, isProjectLoading: false, loadingProjectEnd: true };
        case FETCH_ALL_PROJECT:
            return { ...state, projects: action.payload};
        case FETCH_MY_CLIENTS_PROJECTS:
            return { ...state, projects: action.payload};
        default:
            return state;
    }
};
