export const API_ENDPOINTS = {
    JSON_SERVER: 'http://localhost:3400',
    GRAPHQL_SERVER: 'http://localhost:3500/graphql'
}

export const API_PATH = {
    JOBS: '/jobs',
    JOB_ALLOCATIONS : '/jobAllocations',
    CONTACTS : '/contacts',
    ACTIVITIES : '/activities',
    ACTIVITY_ALLOCATIONS : '/activityAllocations',
    RESOURCES : '/resources',
    DEFAULT: '/'
}


export const TEXT_INPUT_MINIMUM_CHARACTER_LIMIT = 3;
export const ZERO = 0;


export const Q1_CHANGE_VALUE_OF_SEARCH_INPUT = "Q1/SEARCH_INPUT/CHANGE_VALUE";
export const Q1_FETCH_ALL_JOBS_FROM_API_INIT = "Q1/JOBS_API/FETCH_INIT";
export const Q1_FETCH_ALL_JOBS_FROM_API_SUCCESS = "Q1/JOBS_API/FETCH_SUCCESS";
export const Q1_FETCH_ALL_JOBS_FROM_API_FAILURE = "Q1/JOBS_API/FETCH_FAILURE";
export const Q1_CLEAR_RESULT_LIST = "Q1/RESULT_LIST/CLEAR";


export const EVENT_TYPE = {
    JOB: 'job',
    ACTIVITY: 'activity'
}