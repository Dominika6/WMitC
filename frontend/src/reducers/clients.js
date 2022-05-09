import {
    CREATE_CLIENT,
    END_LOADING,
    FETCH_ALL,
    START_LOADING,
    FETCH_CLIENT,
    UPDATE_CLIENT
} from "../constants/actionTypes";

export default (state = { isLoading: true, clients:[], client:[] }, action) => {
    switch (action.type){
        case CREATE_CLIENT:
            alert(`${action?.data?.message}`)
            window.location.reload()
            return { ...state, clients: [...state.clients, action.payload] };
        case FETCH_ALL:
            return { ...state, clients: action.payload };
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_CLIENT:
            return { ...state, client: action.payload };
        case UPDATE_CLIENT:
            return { ...state, client: action.payload};
        default:
            return state;
    }
};
