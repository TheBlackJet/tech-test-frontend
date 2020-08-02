import {
    Q1_CHANGE_VALUE_OF_SEARCH_INPUT,
    Q1_FETCH_ALL_JOBS_FROM_API_INIT,
    Q1_FETCH_ALL_JOBS_FROM_API_SUCCESS,
    Q1_FETCH_ALL_JOBS_FROM_API_FAILURE,
    Q1_CLEAR_RESULT_LIST
} from '../constants/app_conts';

// action creators 
export const changeSearchInputValue = (value) => ({
    type: Q1_CHANGE_VALUE_OF_SEARCH_INPUT,
    payload: value
});


export const initFetchAllJobsFromAPI = () => ({
    type: Q1_FETCH_ALL_JOBS_FROM_API_INIT,
});

export const fetchAllJobsFromAPISuccess = (data = []) => ({
    type: Q1_FETCH_ALL_JOBS_FROM_API_SUCCESS,
    payload: data
});

export const fetchAllJobsFromAPIFailure = () => ({
    type: Q1_FETCH_ALL_JOBS_FROM_API_FAILURE,
});

export const clearResultList = () => ({
    type: Q1_CLEAR_RESULT_LIST,
});