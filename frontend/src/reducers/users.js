import {
    START_LOADING,
    FETCH_USER,
    END_LOADING,
    FETCH_TEAM,
    FETCH_ALL,
    UPDATE_PASSWORD,
    CREATE_USER,
    UPDATE_USER, FETCH_MANAGERS
} from "../constants/actionTypes";

export default (state = { isLoading: true, users: [], managers: [], loadingUserEnd: false }, action) => {

    switch (action.type){
        case FETCH_TEAM:
            return { ...state, users: action.payload };
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false, loadingUserEnd: true };
        case FETCH_ALL:
            return { ...state, users: action.payload};
        case FETCH_MANAGERS:
            return { ...state, users: action.payload};
        case UPDATE_PASSWORD:
            return { ...state, users: state.users.map((user) => user._id === action.payload._id ? action.payload : user) };
        case CREATE_USER:
            alert(`${action?.data?.message}`);
            window.location.reload();
            return { ...state, users: action?.data };
        case FETCH_USER:
            return { ...state, user: action.payload };
        case UPDATE_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
