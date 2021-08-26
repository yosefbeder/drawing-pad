import React from 'react';
import { useAppSelector } from '../hooks/redux';

const canvasWidth = 960;
const canvasHeight = 500;

const Canvas = () => {
  const selectedTool = useAppSelector(state => state.app.selectedTool);

  return (
    <canvas
      className={`canvas canvas--${selectedTool}`}
      width={canvasWidth}
      height={canvasHeight}
    ></canvas>
  );
};

export default Canvas;
