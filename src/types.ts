export interface ConfigType {
  size: number;
  blur: number;
  color: string;
}

export interface ConfigsType {
  pencil: ConfigType;
  eraser: ConfigType;
}

export type Tool = 'pencil' | 'eraser';

export interface Path {
  configs: ConfigType;
  path: [number, number][];
}
