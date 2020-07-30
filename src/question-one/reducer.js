import { getProp } from '../utils/utils';
import {
    CHANGE_VALUE_OF_SEARCH_INPUT,
    FETCH_ALL_JOBS_FROM_API_INIT,
    FETCH_ALL_JOBS_FROM_API_SUCCESS,
    FETCH_ALL_JOBS_FROM_API_FAILURE,
    CLEAR_RESULT_LIST
  } from './consts';

export const searchReducer = (state, action) => {
    switch (action.type) {
      case CHANGE_VALUE_OF_SEARCH_INPUT:
        return {
          ...state,
          searchValue: getProp(action, 'payload', ''),
        };
      case FETCH_ALL_JOBS_FROM_API_INIT:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case FETCH_ALL_JOBS_FROM_API_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: getProp(action, 'payload', [])
        };
      case FETCH_ALL_JOBS_FROM_API_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
          data: []
        };
      case CLEAR_RESULT_LIST:
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