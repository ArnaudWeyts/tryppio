import { throttle } from 'lodash';
import { applyMiddleware, createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reduxThunk from 'redux-thunk';

import reducers from '../reducers';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const configureStore = () => {
  const store = createStore(
    reducers,
    persistedState,
    composeWithDevTools(applyMiddleware(reduxThunk))
  );

  store.subscribe(
    throttle(() => {
      saveState({
        routing: store.getState().routing,
        trip: store.getState().trip,
        user: store.getState().user
      });
    }),
    1000
  );

  return store;
};

export default configureStore;
