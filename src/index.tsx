import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';

import routes from './Routes';
import reducers from './reducers';
const promise = require('redux-promise');

import 'semantic-ui-css/semantic.min.css';

const createStoreWithMiddleware = applyMiddleware(
  // wire up redux-promise to our app
  promise
)(createStore);

export const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('#app'));
