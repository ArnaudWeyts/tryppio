import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import configureStore from './helpers/configureStore';

import App from './containers/App';

import registerServiceWorker from './registerServiceWorker';

import './App.css';

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

const store = configureStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
