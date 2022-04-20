import { START_LOADING, END_LOADING, FETCH_TEAM, FETCH_ALL, UPDATE_PASSWORD } from "../constants/actionTypes";

export default (state = { isLoading: true, users: [] }, action) => {

    switch (action.type){
        case FETCH_TEAM:
            return { ...state, users: action.payload };
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return { ...state, users: action.payload};
        case UPDATE_PASSWORD:
            return { ...state, users: state.users.map((user) => user._id === action.payload._id? action.payload : user) };
        default:
            return state;
    }
};
