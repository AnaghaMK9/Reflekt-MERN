import { SET_JOURNALS, SET_ACTIVE_JOURNAL, ERROR_ALERTS, SET_LOADING, CLEAR_ERRORS } from '../types.js';
const reducer = (state, action) => {
    switch (action.type) {
        case SET_JOURNALS:
            return {
                ...state,
                journals: action.payload,
                loading: false
            }
        case SET_ACTIVE_JOURNAL:
            return {
                ...state,
                activeJournal: action.payload
            }
        case ERROR_ALERTS:
            return {
                ...state,
                error: action.payload.errors,
                loading: false
            }
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
        default:
            return state
    }
}
export default reducer;