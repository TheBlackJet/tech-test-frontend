import React from 'react';
import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import { TEXT_INPUT_MINIMUM_CHARACTER_LIMIT, ZERO } from '../constants/app_conts';
import { useSearchDataByQuery } from './customHooks';
import { changeSearchInputValue } from './actions';

import './QuestionOne.css';
import { SearchInput } from './SearchInput';
import { SearchResultWrapper } from './SearchResultWrapper';
import { Loading } from "./Loading";
import { Error } from "./Error";
import { NoResult } from "./NoResult";

export const QuestionOne = ({ service }) => {

  const [
    data,
    searchValue,
    isLoading,
    isError,
    dispatch
  ] = useSearchDataByQuery({ service });

  return (
    <SectionGroup>
      <SectionPanel>
        <SearchInput inputValue={searchValue} onInputChange={(value) => handleSearchInputValueChange({ value, dispatch })} />
        {data && <SearchResultWrapper data={data} />}
        {isLoading && <Loading />}
        {isError && <Error />}
        {searchValue.length >= TEXT_INPUT_MINIMUM_CHARACTER_LIMIT && data.length === ZERO && !isLoading && <NoResult />}
      </SectionPanel>
    </SectionGroup>
  )
}

const handleSearchInputValueChange = async ({ value, dispatch }) => {
  dispatch(changeSearchInputValue(value));
}