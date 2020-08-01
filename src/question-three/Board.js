import React from 'react';
import { Header } from './Header';
import { HeaderText } from './HeaderText';
import { JobList } from './JobList';
import { SwimLaneContainer } from './SwimLaneContainer';


export const Board = () => {
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