import { Tool } from '../../types';
import { CHANGE_TOOL, PUSH_PATH, UNDO, REDO } from '../constants/app';
import { Path } from '../../types';

interface AppType {
  selectedTool: Tool;
  paths: { past: Path[][]; present: Path[]; future: Path[][] };
}

type ActionType = {
  type: typeof CHANGE_TOOL | typeof PUSH_PATH;
  payload?: Tool | Path;
};

const intialState: AppType = {
  selectedTool: 'pencil',
  paths: {
    past: [],
    present: [],
    future: [],
  },
};

const appReducer = (
  state: AppType = intialState,
  action: ActionType,
): AppType => {
  if (action.type === CHANGE_TOOL) {
    return {
      ...state,
      selectedTool: action.payload as Tool,
    };
  }

  if (action.type === PUSH_PATH) {
    // some logic
  }

  if (action.type === UNDO) {
    // some logic
  }

  if (action.type === REDO) {
    // some logic
  }

  return state;
};

export default appReducer;
