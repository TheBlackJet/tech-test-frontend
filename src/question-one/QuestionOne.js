import React, { useReducer } from 'react';
import { getProp, convertUTCTimeToLocaleString } from '../utils/utils';
import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import { TEXT_INPUT_MINIMUM_CHARACTER_LIMIT, ZERO } from './consts';
import { searchReducer } from './reducer';
import { changeSearchInputValue, clearResultList, initFetchAllJobsFromAPI, fetchAllJobsFromAPISuccess, fetchAllJobsFromAPIFailure } from './actions';

import './QuestionOne.css';

const initialState = {
  isLoading: false,
  isError: false,
  searchValue: "",
  data: [],
};

// type checking
// refactor code
// move action to action creator
// write test
// add break to cancel the request
// check edge case, no result case
// try catch


export const QuestionOne = ({ service }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { data, isLoading, isError, searchValue } = state;
  return (
    <SectionGroup>
      <SectionPanel>
        <SearchInput inputValue={searchValue} onInputChange={(value) => handleSearchInputValueChange({value, dispatch, service})} />
        {data && <SearchResultWrapper data={data} />}
        {isLoading && <Loading />}
        {isError && <Error />}
        {/* {searchValue && data.length === 0 && <NoResult />} */}
      </SectionPanel>
    </SectionGroup>
  )
}


const handleSearchInputValueChange = async ({value, dispatch, service}) => {
  dispatch(changeSearchInputValue(value));
  // check if less than 3 character
  const inputLength = getProp(value, 'length', ZERO);
  if (inputLength >= TEXT_INPUT_MINIMUM_CHARACTER_LIMIT) {
    dispatch(initFetchAllJobsFromAPI());
    const allJobWithContactData = await service.getJobsWithContactByQuery(value, "contact");
    if (getProp(allJobWithContactData, 'error', false)) {
      dispatch(fetchAllJobsFromAPIFailure());
    } else {
      dispatch(fetchAllJobsFromAPISuccess(flattenAllJobsWithContact(allJobWithContactData)));

    }
  }

  if (!inputLength) {
    dispatch(clearResultList());
  }
}

const flattenAllJobsWithContact = (allJobsWithContactData = []) => {
  return allJobsWithContactData.map((item) => ({
    ...item,
    contact: getProp(item, 'contact') ? getProp(item, 'contact.name', undefined) : undefined
  }));
}


const SearchInput = ({ inputValue = "", onInputChange }) => (
  <input type="text" className="question-one__search-input" placeholder="Please enter atleast 3 characters" required minLength={TEXT_INPUT_MINIMUM_CHARACTER_LIMIT} value={inputValue} onChange={(event) => onInputChange(event.target.value)} />
);

const SearchResultWrapper = ({ data = [] }) => {
  return <div className="question-one__result-wrapper">
    <SearchResult data={data} />
  </div>
}

const SearchResult = ({ data = [] }) => {
  return (
    data.length > ZERO && <>
      <SearchResultHeader />
      {
        data.map((item, index) => {
          return (
            <div className="question-one__result-item" key={`${index}`}>
              <div className="question-one__result-item--name">{getProp(item, 'name', '')}</div>
              <div className="question-one__result-item--period">{convertUTCTimeToLocaleString(getProp(item, 'start', ''))} - {convertUTCTimeToLocaleString(getProp(item, 'end', ''))}</div>
              <div className="question-one__result-item--assigned-contact">{getProp(item, 'contact', '')}</div>
            </div>
          );
        })}
    </>
  );
}

const SearchResultHeader = () => {
  return (
    <div className="question-one__result-item--header">
      <div className="question-one__result-item--name">Work Name</div>
      <div className="question-one__result-item--period">Period</div>
      <div className="question-one__result-item--assigned-contact">Assigned Contact</div>
    </div>
  );
}

const Loading = () => {
  return (<div>Loading</div>);
}

const Error = () => {
  return (<div>Error</div>);
}

const NoResult = () => {
  return (<div>No Result, please try again</div>);
}