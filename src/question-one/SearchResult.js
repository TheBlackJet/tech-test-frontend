import React from 'react';
import { ZERO } from '../constants/app_conts';
import { SearchResultHeader } from './SearchResultHeader';
import { getProp, convertUTCTimeToDateString } from '../utils/utils';

export const SearchResult = ({ data = [] }) => {
    return (
      data.length > ZERO && <>
        <SearchResultHeader />
        {
          data.map((item, index) => {
            return (
              <div className="question-one__result-item" key={`${index}`}>
                <div className="question-one__result-item--name">{getProp(item, 'name', '')}</div>
                <div className="question-one__result-item--period">{convertUTCTimeToDateString(getProp(item, 'start', ''))} - {convertUTCTimeToDateString(getProp(item, 'end', ''))}</div>
                <div className="question-one__result-item--assigned-contact">{getProp(item, 'contact', '')}</div>
              </div>
            );
          })}
      </>
    );
  }