import { createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import rootReducer from '../reducers';
import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();

const configureStore = () => {
  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk)),
  );

  store.subscribe(
    throttle(() => {
      saveState({
        user: store.getState().user,
        trip: store.getState().trip,
        routing: store.getState().routing,
      });
    }),
    1000,
  );

  return store;
};

export default configureStore;
