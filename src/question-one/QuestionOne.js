import React, { useReducer, useEffect } from 'react';

import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import './QuestionOne.css';

const CHANGE_VALUE_OF_SEARCH_INPUT = "SEARCH_INPUT/CHANGE_VALUE";
const FETCH_ALL_JOBS_FROM_API_INIT = "JOBS_API/FETCH_INIT";
const FETCH_ALL_JOBS_FROM_API_SUCCESS = "JOBS_API/FETCH_SUCCESS";
const FETCH_ALL_JOBS_FROM_API_FAILURE = "JOBS_API/FETCH_FAILURE";
const CLEAR_RESULT_LIST = "RESULT_LIST/CLEAR";

const initialState = {
  isLoading: false,
  isError: false,
  searchValue: "",
  data: [],
  contactList: [] 
};

function searchReducer(state, action) {
  switch (action.type) {
    case CHANGE_VALUE_OF_SEARCH_INPUT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        searchValue: action.data,
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
        data: action.data
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

export const QuestionOne = ({ service }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { data, isLoading, searchValue } = state;
  
  return (
    <SectionGroup>
      <SectionPanel>
        <SearchInput inputValue={searchValue} onInputChange={(value) => handleSearchInputValueChange(value, dispatch, service)} />
        {data.length ? <SearchResult data={data} /> : <></>}
        {isLoading ? <Loading/> : <></>}
      </SectionPanel>
    </SectionGroup>
  )
}


const handleSearchInputValueChange = async (value, dispatch, service) => {
  dispatch({ type: CHANGE_VALUE_OF_SEARCH_INPUT, data: value });
  const { data } = await service.getJobs();
  // check if less than 3 character
  const inputLength = value.length;
  if (inputLength) {
    console.log(value);
    dispatch({ type: FETCH_ALL_JOBS_FROM_API_INIT });
    dispatch({ type: FETCH_ALL_JOBS_FROM_API_SUCCESS, data });
  }

  if (!inputLength){
    dispatch({ type: CLEAR_RESULT_LIST });
  }
}

// action creator 

const setSearchInputValue = (value, dispatch) => {
  if (value.length) {
    dispatch({ type: CHANGE_VALUE_OF_SEARCH_INPUT, data: value });
  }
}



export const SearchInput = ({ inputValue, onInputChange }) => {

  return (
    <input value={inputValue} onChange={(event) => onInputChange(event.target.value)} />
  );
}

export const SearchResult = ({ data }) => {
  return data.map((item, index) => {
    return (
      <div key={`${index}`}>
        <div>{item.name}</div>
        <div>{item.start}</div>
        <div>{item.end}</div>
      </div>
    );
  })
}

export const Loading = () => {
  //console.log(isLoading);
  return (<div>Loading</div>);
}