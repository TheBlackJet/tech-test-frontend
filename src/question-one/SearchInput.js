import React from 'react';
import { TEXT_INPUT_MINIMUM_CHARACTER_LIMIT } from '../constants/app_conts';

export const SearchInput = ({ inputValue = "", onInputChange }) => (
    <input type="text" className="question-one__search-input" placeholder="Please enter atleast 3 characters" required minLength={TEXT_INPUT_MINIMUM_CHARACTER_LIMIT} value={inputValue} onChange={(event) => onInputChange(event.target.value)} />
  );