import { createStore, combineReducers } from 'redux';
import configsReducer from './reducers/configs';
import appReducer from './reducers/app';

const reducer = combineReducers({
  configs: configsReducer,
  app: appReducer,
});

export const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
