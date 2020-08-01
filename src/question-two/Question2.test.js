import React from 'react';
import { render, screen } from '@testing-library/react';
import { Swimlane } from '../components/swimlane/Swimlane';

describe('Test Question Two', () => {
    test('test question two component render 1', async () => {
        const RANGE_START = new Date('2018-09-01T00:00:00Z')
        const RANGE_END = new Date('2018-09-01T24:00:00Z')

        const workforceEventData = [
            {
                id: 0, 
                title: "Sam Seaborn",
                cards: [
                    {
                        id: 1,
                        description: "Shield some wiring",
                        start: "2018-09-01T09:00:00Z",
                        end: "2018-09-01T13:00:00Z",
                    }
                ]
            }
        ]

        render(<Swimlane start={RANGE_START} end={RANGE_END} lanes={workforceEventData} />);
        expect(await screen.findByText(/Sam Seaborn/)).toBeInTheDocument();
    });

    test('test question two component render 2', async () => {
        const RANGE_START = new Date('2018-09-01T00:00:00Z')
        const RANGE_END = new Date('2018-09-01T24:00:00Z')

        const workforceEventData = [
            {
                id: 0, 
                title: "John Le",
                cards: [
                    {
                        id: 1,
                        description: "Paint the door",
                        start: "2018-09-01T09:00:00Z",
                        end: "2018-09-01T13:00:00Z",
                    },
                    {
                        id: 2,
                        description: "Paint the door",
                        start: "2018-09-01T14:00:00Z",
                        end: "2018-09-01T15:00:00Z",
                    }
                ]
            },
            {
                id: 1, 
                title: "Alice",
                cards: [
                    {
                        id: 1,
                        description: "Paint the door",
                        start: "2018-09-01T09:00:00Z",
                        end: "2018-09-01T13:00:00Z",
                    },
                    {
                        id: 2,
                        description: "Buy cake",
                        start: "2018-09-01T14:00:00Z",
                        end: "2018-09-01T15:00:00Z",
                    }
                ]
            },

        ]

        render(<Swimlane start={RANGE_START} end={RANGE_END} lanes={workforceEventData} />);
        expect(await screen.findByText(/Alice/)).toBeInTheDocument();
    });
});

