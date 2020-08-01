import React, { useContext } from 'react';
import { JobContext } from './QuestionThree';
import { getProp } from '../utils/utils';

export const JobListItem = () => {
    const jobDetailList = useContext(JobContext);
  
    return jobDetailList.map((jobDetail) => {
      const isResourceNumberVisible = !!getProp(jobDetail, 'numberOfAllocation', 0);
      return (
        <div className="board-content__job-list-item" key={`${getProp(jobDetail, 'jobId', null)}`}>
          <div className="job-list-item__title">
            <div className="job-list-item__title--text">{getProp(jobDetail, 'jobName', 'No Name')}</div>
            <div className="job-list-item__title--job-number">(Job #{getProp(jobDetail, 'jobId', null)})</div>
          </div>
          <div className="job-list-item__location">{getProp(jobDetail, 'jobLocation', null)}</div>
          <div className="job-list-item__spacing"></div>
          <div className="job-list-item__date">{getProp(jobDetail, 'date', null)}</div>
          <div className="job-list-item__time">{getProp(jobDetail, 'startTime', null)} - {getProp(jobDetail, 'endTime', null)}</div>
          {isResourceNumberVisible && <div className="job-list-item__resource-number">{getProp(jobDetail, 'numberOfAllocation', 0)}</div>}
        </div>
      );
    })
  
  
  }