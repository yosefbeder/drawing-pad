import { useEffect, useRef } from 'react';

const useCanvas = (draw: (ctx: CanvasRenderingContext2D) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (!ctx) {
      alert("Your browser doesn't support canvas, so You can't use are app :(");
      return;
    }

    draw(ctx);
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
