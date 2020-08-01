import React from 'react';
import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'

import { useJobsData } from './customHooks';
import './QuestionThree.css'
import { JobPanelView } from './JobPanelView';


export const JobContext = React.createContext(null);

export const QuestionThree = ({ service }) => {
  const [jobData] = useJobsData({ service });

  return (
    <SectionGroup>
      <SectionPanel>
        <JobContext.Provider value={jobData}>
          <JobPanelView />
        </JobContext.Provider>
      </SectionPanel>
    </SectionGroup>
  )
}




















