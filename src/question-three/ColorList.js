import React from 'react';
import { ColorListItem } from './ColorListItem';

export const ColorList = () => {
    const colorCodeList = ['#FFFFFF', '#E4EEF1', '#3D9BFF', '#223048', '#C4C4C4', '#8D8383'];
  
    return (<div className="board-content__color-list">
      {colorCodeList.map((colorCodeItem, index) => {
        return <ColorListItem key={`${index}`} colorCode={colorCodeItem} />
      })}
    </div>);
  }