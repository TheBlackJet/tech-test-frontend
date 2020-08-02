import React from 'react';
import { SettingItem } from './SettingItem';

export const Settings = () => {
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