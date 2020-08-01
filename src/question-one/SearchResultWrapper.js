import React from 'react';
import { SearchResult } from './SearchResult';

export const SearchResultWrapper = ({ data = [] }) => {
    return <div className="question-one__result-wrapper">
      <SearchResult data={data} />
    </div>
  }