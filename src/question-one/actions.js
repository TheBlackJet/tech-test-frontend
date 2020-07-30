import {
    CHANGE_VALUE_OF_SEARCH_INPUT,
    FETCH_ALL_JOBS_FROM_API_INIT,
    FETCH_ALL_JOBS_FROM_API_SUCCESS,
    FETCH_ALL_JOBS_FROM_API_FAILURE,
    CLEAR_RESULT_LIST
} from './consts';

// action creator 

export const changeSearchInputValue = (value) => ({
    type: CHANGE_VALUE_OF_SEARCH_INPUT,
    payload: value
});


export const initFetchAllJobsFromAPI = () => ({
    type: FETCH_ALL_JOBS_FROM_API_INIT,
});

export const fetchAllJobsFromAPISuccess = (data) => ({
    type: FETCH_ALL_JOBS_FROM_API_SUCCESS,
    payload: data
});

export const fetchAllJobsFromAPIFailure = () => ({
    type: FETCH_ALL_JOBS_FROM_API_FAILURE,
});

export const clearResultList = () => ({
    type: CLEAR_RESULT_LIST,
});