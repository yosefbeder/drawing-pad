import { ConfigType } from '../types';

export const applyStyles = (
  ctx: CanvasRenderingContext2D,
  configs: ConfigType,
) => {
  ctx.lineCap = 'round';
  ctx.lineWidth = configs.size;
  ctx.shadowBlur = configs.blur;
  ctx.shadowColor = configs.color;
  ctx.strokeStyle = configs.color;
};
