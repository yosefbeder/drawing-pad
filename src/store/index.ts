import { createStore, combineReducers, applyMiddleware } from 'redux';
import configsReducer from './reducers/configs';
import appReducer from './reducers/app';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({});

const reducer = combineReducers({
  configs: configsReducer,
  app: appReducer,
});

export const store = createStore(reducer, composeEnhancers(applyMiddleware()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
