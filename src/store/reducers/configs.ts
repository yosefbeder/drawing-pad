import { ConfigsType, ConfigType } from '../../types';

import { PENCIL, ERASER } from '../constants/configs';

const canvasColor = 'hsl(200, 20%, 20%)';

const intialState: ConfigsType = {
  pencil: { size: 2, blur: 1, color: '#fff' },
  eraser: { size: 15, blur: 5, color: canvasColor },
};

const configsReducer = (
  state: ConfigsType = intialState,
  action: {
    type: typeof PENCIL | typeof ERASER;
    payload: ConfigType;
  },
): ConfigsType => {
  if (action.type === PENCIL) {
    return {
      ...state,
      pencil: action.payload,
    };
  }

  if (action.type === ERASER) {
    return {
      ...state,
      eraser: { ...action.payload, color: canvasColor },
    };
  }

  return state;
};

export default configsReducer;
