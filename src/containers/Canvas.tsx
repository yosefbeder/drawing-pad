import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/redux';
import useCanvas from '../hooks/useCanvas';
import { PUSH_PATH } from '../store/constants/app';
import { Path } from '../types';
import { applyStyles } from '../utils/canvas';

const canvasWidth = 960;
const canvasHeight = 500;

const drawPath = (ctx: CanvasRenderingContext2D, path: Path) => {
  applyStyles(ctx, path.configs);

  ctx.beginPath();

  path.points.forEach(point => {
    ctx.lineTo(...point);
  });

  ctx.stroke();
};

const getPosInCanvas = (
  canvasEl: HTMLCanvasElement,
  x: number,
  y: number,
): [number, number] => {
  const { left, top } = canvasEl.getBoundingClientRect();

  return [x - left, y - top];
};

const Canvas = () => {
  /*
    * You have two states here:
      1. curPath: which is the path that you're currently drawing which will be injected into present when you finish drawing.
      2. past + present: which is saved in the redux store.
    
    * How do they update the canvas:
      1. curPath: doesn't clear the canvas each time it gets updated.
      2. past + present: whenever present (when curPath is pushed to present) or past is changed redraw everything.
  */

  // Canvas el related stuff
  const { ref, ctx } = useCanvas();
  const selectedTool = useAppSelector(state => state.app.selectedTool);

  // Global related state
  const past = useAppSelector(state => state.app.paths.past);
  const present = useAppSelector(state => state.app.paths.present);

  // Local state
  const dispatch = useDispatch();
  const curConfigs = useAppSelector(state => state.configs[selectedTool]);
  const [curPath, setCurPath] = useState<Path | null>(null);

  // Updating curPath
  useEffect(() => {
    if (curPath) {
      drawPath(ctx!, curPath);
    }
  }, [curPath]);

  // update present and past
  useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      if (present) {
        [...past, present].forEach(path => drawPath(ctx, path!));
      } else {
        past.forEach(path => drawPath(ctx, path));
      }
    }
  }, [present, past]);

  return (
    <canvas
      className={`canvas canvas--${selectedTool}`}
      ref={ref}
      width={canvasWidth}
      height={canvasHeight}
      onMouseDown={() => {
        const canvasEl = ref.current!;

        setCurPath({ configs: curConfigs, points: [] });

        const pushPoint = (e: MouseEvent) => {
          setCurPath(prev => ({
            ...prev!,
            points: [
              ...(prev?.points || []),
              getPosInCanvas(canvasEl, e.x, e.y),
            ],
          }));
        };

        canvasEl.addEventListener('mousemove', pushPoint);

        document.addEventListener(
          'mouseup',
          () => {
            canvasEl.removeEventListener('mousemove', pushPoint);
            // * We update it this way because we can't access the last state from this callback function
            // * If we dispatch directly with prev we get an error
            let path;

            setCurPath(prev => {
              path = prev;
              return null;
            });

            dispatch({ type: PUSH_PATH, payload: path });
          },
          { once: true },
        );
      }}
    ></canvas>
  );
};

export default Canvas;
