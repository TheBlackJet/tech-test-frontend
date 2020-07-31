import React, { useContext } from 'react';
import { getProp } from '../utils/utils';
import { SectionGroup } from '../components/section/SectionGroup'
import { SectionPanel } from '../components/section/SectionPanel'
import { useJobsDataFromAPI } from './customHooks';
import './QuestionThree.css'


const JobContext = React.createContext(null);

export const QuestionThree = ({ service }) => {

  const { jobData } = useJobsDataFromAPI({ service });


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

export const JobPanelView = () => {
  return (
    <div className="job-panel-view__container">
      <Settings />
      <Board />
    </div>
  );
}

const Settings = () => {
  return (
    <div className="job-panel-view__settings">
      <div className="job-panel-view__settings-top">
        <SettingItem />
        <SettingItem />
        <SettingItem />
        <SettingItem />
      </div>
      <div className="job-panel-view__settings-bottom">
        <SettingItem />
      </div>
    </div>
  );
}

const SettingItem = () => {
  return (<div className="job-panel-view__settings-item"></div>);
}


const Board = () => {
  return (
    <div className="job-panel-view__board">
      <Header><HeaderText /></Header>
      <div className="board__content">
        <JobList />
        <SwimLaneContainer />
      </div>
    </div>
  );
}

const Header = ({ children }) => {
  return (
    <div className="board__header">{children}</div>
  )
}

const HeaderText = () => {
  return ('Header');
}

const JobList = () => {
  return (<div className="board-content__job-list">
    <JobListItem />
  </div>);
}

const JobListItem = () => {
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

const SwimLaneContainer = () => {
  return (<div className="board-content__swimlane">
    <SwimLaneItem />
    <SwimLaneItem />
    <SwimLaneItem />
    <SwimLaneItem />
    <SwimLaneItem />
    <SwimLaneItem />
    <SwimLaneItem />
    <SwimLaneItem />
    <SwimLaneItem />
    <ColorList />
  </div>);
}

const SwimLaneItem = () => {
  return (<div className="board-content__swimlane-item"></div>);
}

const ColorList = () => {
  const colorCodeList = ['#FFFFFF', '#E4EEF1', '#3D9BFF', '#223048', '#C4C4C4', '#8D8383'];

  return (<div className="board-content__color-list">   
    {colorCodeList.map((colorCodeItem) => {
      return <ColorListItem colorCode={colorCodeItem}/>
    })}
  </div>);
}

const ColorListItem = ({colorCode}) => {
  return (<div className="board-content__color-list-item">
    <div className="color-list-item__color-view" style={{
      backgroundColor: colorCode
    }}></div>
<div className="color-list-item__color-code">{colorCode}</div>
  </div>);
}