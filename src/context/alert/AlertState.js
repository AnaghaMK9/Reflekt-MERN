import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AlertContext from './AlertContext.js';
import AlertReducer from './AlertReducer.js';

import { SET_ALERT, REMOVE_ALERT } from '../types.js';
function AlertState(props) {
    const initialState = [];
    const [state, dispatch] = useReducer(AlertReducer, initialState);

    const setAlert = (msg, type) => {
        const id = uuidv4();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        });
        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            });
        }, 5000);
    }

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert
            }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;