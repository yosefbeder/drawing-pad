import { useEffect, useRef, useState } from 'react';

const useCanvas = (draw?: (ctx: CanvasRenderingContext2D) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (!ctx) {
      alert("Your browser doesn't support canvas, so You can't use are app :(");
      return;
    }

    setCtx(ctx);

    if (draw) {
      draw(ctx);
    }
  }, [draw]);

  return { ref: canvasRef, ctx };
};

export default useCanvas;
