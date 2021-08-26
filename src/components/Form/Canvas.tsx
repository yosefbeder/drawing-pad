import React from 'react';
import useCanvas from '../../hooks/useCanvas';
import classes from './Form.module.css';
import { applyStyles } from '../../utils/canvas';

interface CanvasProps {
  size: number;
  blur: number;
  color: string;
}

const Canvas: React.FC<CanvasProps> = props => {
  const canvasRef = useCanvas(ctx => {
    ctx.clearRect(0, 0, 150, 150);

    const fullCircle = Math.PI * 2;

    applyStyles(ctx, props);

    ctx.beginPath();
    ctx.arc(112.5, 75, 37.5, 0, fullCircle / 2, true);
    ctx.arc(37.5, 75, 37.5, 0, fullCircle / 2);
    ctx.stroke();
  });

  return (
    <canvas
      className={classes.canvas}
      ref={canvasRef}
      width={150}
      height={150}
    ></canvas>
  );
};

export default Canvas;
