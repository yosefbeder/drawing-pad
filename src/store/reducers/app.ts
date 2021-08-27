import { Tool } from '../../types';
import { CHANGE_TOOL, PUSH_PATH, UNDO, REDO } from '../constants/app';
import { Path } from '../../types';

interface AppType {
  selectedTool: Tool;
  paths: { past: Path[]; present: Path | null; future: Path[] };
}

type ActionType = {
  type: typeof CHANGE_TOOL | typeof PUSH_PATH;
  payload?: Tool | Path;
};

const intialState: AppType = {
  selectedTool: 'pencil',
  paths: {
    past: [],
    present: null,
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
    /*
      If present null
        push to it
        don't touch past
        reset future
        
      push action.payload to it
      push preset to past
      reset future
    */
    if (!state.paths.present) {
      return {
        ...state,
        paths: {
          ...state.paths,
          present: action.payload as Path,
          future: [],
        },
      };
    }

    return {
      ...state,
      paths: {
        past: [...state.paths.past, state.paths.present],
        present: action.payload as Path,
        future: [],
      },
    };
  }

  if (action.type === UNDO) {
    /*
      If past is empty
        push present to future
        set present to null

      push last past to present and present to future
    */

    if (state.paths.past.length === 0) {
      return {
        ...state,
        paths: {
          ...state.paths,
          present: null,
          future: [state.paths.present!, ...state.paths.future],
        },
      };
    }

    return {
      ...state,
      paths: {
        past: state.paths.past.slice(0, -1),
        present: state.paths.past[state.paths.past.length - 1],
        future: [state.paths.present!, ...state.paths.future],
      },
    };
  }

  if (action.type === REDO) {
    /* 
      If present is null
        insert the first element in future to it
        don't touch past

      insert the first element in future to it
      push present to past
    */

    if (!state.paths.present) {
      return {
        ...state,
        paths: {
          ...state.paths,
          present: state.paths.future[0],
          future: state.paths.future.slice(1),
        },
      };
    }

    return {
      ...state,
      paths: {
        past: [...state.paths.past, state.paths.present!],
        present: state.paths.future[0],
        future: state.paths.future.slice(1),
      },
    };
  }

  return state;
};

export default appReducer;
