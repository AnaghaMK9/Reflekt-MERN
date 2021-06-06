import React, { useReducer } from 'react';
import axios from 'axios';

import JournalContext from './JournalContext.js';
import JournalReducer from './JournalReducer.js';

import { SET_JOURNALS, SET_ACTIVE_JOURNAL, ERROR_ALERTS, SET_LOADING, CLEAR_ERRORS } from '../types.js';
function JournalState(props) {

    const initialState = {
        journals: [],
        activeJournal: false,
        loading: false,
        error: null
    }
    const [state, dispatch] = useReducer(JournalReducer, initialState);

    const errorAlerts = (err) => {
        dispatch({
            type: ERROR_ALERTS,
            payload: err
        })
    }

    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS,
        });
    };

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        });
    }

    const setJournals = async () => {
        try {
            const res = await axios.get(`https://murmuring-hollows-36087.herokuapp.com/api/user/all_entries`);
            dispatch({
                type: SET_JOURNALS,
                payload: res.data
            });
        } catch (err) {
            return errorAlerts(err.response.data);
        }
    }

    const addJournal = async (title, journalbody) => {
        try {
            setLoading();
            await axios.post(`https://murmuring-hollows-36087.herokuapp.com/api/user/new_entry`, { title, journalbody });
            setJournals();
        } catch (err) {
            return errorAlerts(err.response.data);
        }
    }

    const updateJournal = async (id, title, journalbody) => {
        try {
            setLoading();
            await axios.put(`https://murmuring-hollows-36087.herokuapp.com/api/user/update_entry/${id}`, { title, journalbody });
            setJournals();
        } catch (err) {
            return errorAlerts(err.response.data);
        }
    }

    const deleteJournal = async (id) => {
        try {
            setLoading();
            await axios.delete(`https://murmuring-hollows-36087.herokuapp.com/api/user/delete_entry/${id}`);
            setJournals();
        } catch (err) {
            return errorAlerts(err.response.data);
        }
    }

    const setActiveJournal = (id) => {
        dispatch({
            type: SET_ACTIVE_JOURNAL,
            payload: id
        });
        setJournals();
    }

    return (
        <JournalContext.Provider
            value={{
                journals: state.journals,
                activeJournal: state.activeJournal,
                loading: state.loading,
                error: state.error,
                clearErrors,
                errorAlerts,
                setLoading,
                setJournals,
                addJournal,
                deleteJournal,
                setActiveJournal,
                updateJournal,
            }}>
            {props.children}
        </JournalContext.Provider>
    )
}

export default JournalState;