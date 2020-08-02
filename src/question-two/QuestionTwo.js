import React from 'react';
import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import { Swimlane } from '../components/swimlane/Swimlane';
import { useSwimlaneData } from './customHooks';
import './QuestionTwo.css';

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date('2018-09-01T00:00:00Z')
const RANGE_END = new Date('2018-09-01T24:00:00Z')

export const QuestionTwo = ({service}) => {
  const [ workforceEventData ] = useSwimlaneData({service});

  return (
    <SectionGroup>
      <SectionPanel>
        <Swimlane start={RANGE_START} end={RANGE_END} lanes={workforceEventData} />
      </SectionPanel>
    </SectionGroup>
  )
}
