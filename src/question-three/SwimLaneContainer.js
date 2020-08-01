import React from 'react';
import { SwimLaneItem } from './SwimLaneItem';
import { ColorList } from './ColorList';

export const SwimLaneContainer = () => {
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