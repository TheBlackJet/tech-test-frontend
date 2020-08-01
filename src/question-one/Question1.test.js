import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionOne } from './QuestionOne';
import { DataService } from '../service/DataService'
import { SearchInput } from './SearchInput';
import { Loading } from './Loading';
import { NoResult } from './NoResult';
import { SearchResult } from './SearchResult';

describe('Test Question One', () => {
    test('test question one component render', () => {
        render(<QuestionOne service={DataService} />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Please enter atleast 3 characters')).toBeInTheDocument();
    });
});


describe('Test Search Input', () => {
    test('test search input component render', () => {
        render(<SearchInput />);
        expect(screen.getByPlaceholderText('Please enter atleast 3 characters')).toBeInTheDocument();
    });
});


describe('Test Loading component', () => {
    test('test loading component render', () => {
        render(<Loading />);
        expect(screen.getByAltText('loader')).toBeInTheDocument();
    });

    test('test loading component when user input', () => {
        act(() => {
            render(<QuestionOne service={DataService} />);
        });
        act(() => {
            userEvent.type(screen.getByRole('textbox'), 'Sydney');
        })
        expect(screen.getByAltText('loader')).toBeInTheDocument();
    });

    test('has Test Search Input accept value', () => {
        act(() => {
            render(<QuestionOne service={DataService} />);
        });
        act(() => {
            userEvent.type(screen.getByRole('textbox'), 'shed');
        })
        expect(screen.getByDisplayValue('shed')).toBeInTheDocument();
        act(() => {
            userEvent.type(screen.getByRole('textbox'), 'Sydney');
        })
        expect(screen.getByDisplayValue('Sydney')).toBeInTheDocument();
    });
});



describe('Test No Result component', () => {
    test('test No Result component render', () => {
        render(<NoResult />);
        expect(screen.getByText('No Result, please try again')).toBeInTheDocument();
    });

});


describe('Test Search Result component', () => {

    const testData1 = [
        {
            "id": 0,
            "name": "Build a fence",
            "contactId": "0",
            "start": "2018-09-01T10:00:00Z",
            "end": "2018-09-01T11:00:00Z",
            "location": "Brisbane"
        },
        {
            "id": 1,
            "name": "Build a shed",
            "contactId": "1",
            "start": "2018-09-01T10:15:00Z",
            "end": "2018-09-01T11:00:00Z",
            "location": "Brisbane"
        }
    ]

    const testData2 = [
        {
            "id": 0,
            "name": "Build a fence",
            "contactId": "0",
            "start": "2018-09-01T10:00:00Z",
            "end": "2018-09-01T11:00:00Z",
            "location": "Brisbane"
        },
        {
            "id": 1,
            "name": "Build a door",
            "contactId": "1",
            "start": "2018-09-01T10:15:00Z",
            "end": "2018-09-01T11:00:00Z",
            "location": "Brisbane"
        }
    ]


    test('test Search Result component render 1', () => {
        render(<SearchResult data={testData1} />);
        expect(screen.getByText('Build a shed')).toBeInTheDocument();
    });

    test('test Search Result component render 2', () => {
        render(<SearchResult data={testData2} />);
        expect(screen.getByText(/door/)).toBeInTheDocument();
    });

});
