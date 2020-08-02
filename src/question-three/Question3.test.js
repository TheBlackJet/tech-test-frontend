import { render } from '@testing-library/react';
import { JobContext } from './QuestionThree';
import React from 'react';
import { JobPanelView } from './JobPanelView';
import { SwimLaneContainer } from './SwimLaneContainer';
import { Settings } from './Settings';

describe('Test Question Three render', () => {
    test('test question two component render 1', async () => {

        const testData = [{ "jobId": 0, "jobName": "Build a fence", "jobLocation": "Brisbane", "date": "Sat Sep 01 2018", "startTime": "17:00", "endTime": "18:00", "numberOfAllocation": 0 }];
        const tree = (
            <JobContext.Provider value={testData}>
              <JobPanelView />
            </JobContext.Provider>
          )
          const { getByText, container  } = render(tree)
          expect(getByText(/Build a fence/)).toBeInTheDocument();
          expect(getByText(/Brisbane/)).toBeInTheDocument();
          expect(container.firstChild).toHaveClass('job-panel-view__container');
          expect(container.firstChild.firstChild).toHaveClass('job-panel-view__settings') 
    });

    test('test swimlane component render', async () => {
        const { container } = render(<SwimLaneContainer />);
        expect(container.firstChild).toHaveClass('board-content__swimlane');
    });

    test('test Settings component render', async () => {
        const { container } = render(<Settings />);
        expect(container.firstChild).toHaveClass('job-panel-view__settings');
    });

});