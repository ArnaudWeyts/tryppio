import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
