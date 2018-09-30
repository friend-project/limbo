import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';

import rootReducer from './reducers';
import App from './app';

const middleware = [thunk];
const store = createStore(
  rootReducer,
  window.__INITIAL_STATE__,
  applyMiddleware(...middleware)
) || null;

const hotRender = (Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

hotRender(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    hotRender(require('./app'));
  });
}

