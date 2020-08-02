import { searchReducer } from './reducer';
import { useReducer, useEffect } from 'react';

import { TEXT_INPUT_MINIMUM_CHARACTER_LIMIT, ZERO } from '../constants/app_conts';
import { clearResultList, initFetchAllJobsFromAPI, fetchAllJobsFromAPISuccess, fetchAllJobsFromAPIFailure } from './actions';
import { getProp, isArrayEmpty } from '../utils/utils';
import { flattenAllJobsWithContact } from './helpers';

const initialState = {
    isLoading: false,
    isError: false,
    searchValue: "",
    data: [],
};

export const useSearchDataByQuery = ({ service }) => {

    const [state, dispatch] = useReducer(searchReducer, initialState);
    const {
        data,
        isLoading,
        isError,
        searchValue
    } = state;

    useEffect(() => {
        const fetchData = async () => {
            let componentMounted = true;
            try {
                // check if less than 3 character
                const inputLength = getProp(searchValue, 'length', ZERO);
                if (inputLength >= TEXT_INPUT_MINIMUM_CHARACTER_LIMIT) {
                    dispatch(initFetchAllJobsFromAPI());
                    const allJobWithContactData = await service.getJobsWithContactByQuery(searchValue, "contact");
                    const allJobWithContactList = isArrayEmpty(allJobWithContactData) ? [] : allJobWithContactData;
                    if (getProp(allJobWithContactList, 'error', false)) {
                        dispatch(fetchAllJobsFromAPIFailure());
                    } else {
                        if (componentMounted) {
                            dispatch(fetchAllJobsFromAPISuccess(flattenAllJobsWithContact(allJobWithContactList)));
                        }
                    }
                }
                if (!inputLength) {
                    dispatch(clearResultList());
                }
            } catch (error) {
                console.log(error);
            }
            return () => {
                componentMounted = false;
            }
        };
        fetchData();
    }, [searchValue]);

    return [
        data,
        searchValue,
        isLoading,
        isError,
        dispatch
    ]
}