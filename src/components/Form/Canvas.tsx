import React from 'react';
import { useCallback } from 'react';
import useCanvas from '../../hooks/useCanvas';
import classes from './Form.module.css';

interface CanvasProps {
  size: number;
  blur: number;
  color: string;
}

const Canvas: React.FC<CanvasProps> = ({ size, blur, color }) => {
  const canvasRef = useCanvas(
    useCallback(
      ctx => {
        ctx.clearRect(0, 0, 150, 150);

        const fullCircle = Math.PI * 2;

        ctx.lineCap = 'round';
        ctx.lineWidth = size;
        ctx.shadowBlur = blur;
        ctx.shadowColor = color;
        ctx.strokeStyle = color;

        ctx.beginPath();
        ctx.arc(112.5, 75, 37.5, 0, fullCircle / 2, true);
        ctx.arc(37.5, 75, 37.5, 0, fullCircle / 2);
        ctx.stroke();
      },
      [size, blur, color],
    ),
  );

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
