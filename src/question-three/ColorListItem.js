import React from 'react';

export const ColorListItem = ({ colorCode }) => {
    return (<div className="board-content__color-list-item">
      <div className="color-list-item__color-view" style={{
        backgroundColor: colorCode
      }}></div>
      <div className="color-list-item__color-code">{colorCode}</div>
    </div>);
  }