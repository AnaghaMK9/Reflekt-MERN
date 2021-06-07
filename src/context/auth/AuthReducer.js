import {
    AUTH_ERROR,
    CLEAR_ERRORS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SET_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_FAIL,
    CLEAR_STATUS
} from "../types";

const reducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                loading: false,
                isAuthenticated: true
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                loading: false,
                error: action.payload.errors
            }
        case FORGOT_PASSWORD_SUCCESS:
            localStorage.setItem('token_one', action.payload.token);
            return {
                ...state,
                loading: false,
            }
        case RESET_PASSWORD_SUCCESS:
            //localStorage.setItem('token_one', action.payload.token);
            return {
                ...state,
                loading: false,
                msg: action.payload.status,
                isAuthenticated: true
            }
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                loading: false,
                error: action.payload.errors
            }
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload.errors
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case CLEAR_STATUS:
            return {
                ...state,
                msg: null
            }
        default:
            return state;
    }
}
export default reducer;