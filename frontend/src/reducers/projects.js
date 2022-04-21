import { CREATE_PROJECT, END_LOADING_PROJECT, FETCH_ALL_PROJECT, START_LOADING_PROJECT } from "../constants/actionTypes";

export default (state = { isProjectLoading: true, projects:[] }, action) => {
    switch (action.type){
        case CREATE_PROJECT:
            return { ...state, projects: [...state.projects, action.payload] };
        case START_LOADING_PROJECT:
            return { ...state, isProjectLoading: true };
        case END_LOADING_PROJECT:
            return { ...state, isProjectLoading: false };
        case FETCH_ALL_PROJECT:
            return { ...state, projects: action.payload};
        default:
            return state;
    }
};
