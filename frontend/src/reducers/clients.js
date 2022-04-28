import { CREATE_CLIENT, END_LOADING, FETCH_ALL, START_LOADING } from "../constants/actionTypes";

export default (state = { isLoading: true, clients:[] }, action) => {
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
        default:
            return state;
    }
};
