import { getProp } from '../utils/utils';
import {
    Q1_CHANGE_VALUE_OF_SEARCH_INPUT,
    Q1_FETCH_ALL_JOBS_FROM_API_INIT,
    Q1_FETCH_ALL_JOBS_FROM_API_SUCCESS,
    Q1_FETCH_ALL_JOBS_FROM_API_FAILURE,
    Q1_CLEAR_RESULT_LIST
  } from '../constants/app_conts';

export const searchReducer = (state, action) => {
    switch (action.type) {
      case Q1_CHANGE_VALUE_OF_SEARCH_INPUT:
        return {
          ...state,
          searchValue: getProp(action, 'payload', ''),
        };
      case Q1_FETCH_ALL_JOBS_FROM_API_INIT:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case Q1_FETCH_ALL_JOBS_FROM_API_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: getProp(action, 'payload', [])
        };
      case Q1_FETCH_ALL_JOBS_FROM_API_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
          data: []
        };
      case Q1_CLEAR_RESULT_LIST:
        return {
          ...state,
          isLoading: false,
          searchValue: "",
          data: []
        };
      default:
        throw new Error();
    }
  }