import { CREATE_PROJECT } from "../constants/actionTypes";

export default (state = { isLoading: true, projects:[] }, action) => {
    switch (action.type){
        case CREATE_PROJECT:
            return { ...state, projects: [...state.projects, action.payload] };
        default:
            return state;
    }
};
