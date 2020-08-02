import React from 'react';
import { Settings } from './Settings';
import { Board } from './Board';

export const JobPanelView = () => (
    <div className="job-panel-view__container">
      <Settings />
      <Board />
    </div>
  );