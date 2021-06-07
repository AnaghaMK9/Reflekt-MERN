import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

import AuthContext from './AuthContext.js';
import AuthReducer from './AuthReducer.js';
import setAuthToken from '../setAuthToken.js';

import {
    SET_LOADING, USER_LOADED,
    REGISTER_SUCCESS, REGISTER_FAIL,
    AUTH_ERROR, CLEAR_ERRORS,
    LOGIN_SUCCESS, LOGIN_FAIL,
    FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    CLEAR_STATUS
} from '../types.js';

function AuthState(props) {
    const initialState = {
        token: localStorage.getItem('token'),
        loading: false,
        error: null,
        isAuthenticated: false,
        user: null,
        msg: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    /* Loading User */
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('https://murmuring-hollows-36087.herokuapp.com/api/user/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            });
        }
    }

    useEffect(() => {
        if (localStorage.token) {
            loadUser();
        }
        // eslint-disable-next-line
    }, []);

    /* Registration */
    const userRegister = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            setLoading();
            const res = await axios.post('https://murmuring-hollows-36087.herokuapp.com/api/user/register',
                formData,
                config
            );
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data,
            });
        }
    }

    /* Login */
    const login = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        try {
            setLoading();
            const res = await axios.post('https://murmuring-hollows-36087.herokuapp.com/api/user/login',
                formData,
                config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data,
            });
        }
    }

    /* sends reset link to email*/
    const forgotPassword = async (email) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        try {
            setLoading();
            const res = await axios.post(`https://murmuring-hollows-36087.herokuapp.com/api/user/forgot_password`, { email }, config);
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FORGOT_PASSWORD_FAIL,
                payload: err.response.data,
            });
        }
    }

    /* resets the password */
    const resetPassword = async (password) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        if (localStorage.token_one) {
            setAuthToken(localStorage.token_one);
        }
        try {
            setLoading();
            const res = await axios.put(`https://murmuring-hollows-36087.herokuapp.com/api/user/reset_password`,
                { password }, config);
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: res.data,
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload: err.response.data,
            });
        }

    }

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        });
    }

    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        });
    }

    const clearStatus = () => {
        dispatch({
            type: CLEAR_STATUS
        });
    }
    return (
        <AuthContext.Provider
            value={{
                loading: state.loading,
                error: state.error,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                token: state.token,
                msg: state.msg,
                userRegister,
                loadUser,
                setLoading,
                login,
                forgotPassword,
                resetPassword,
                clearErrors,
                clearStatus
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;