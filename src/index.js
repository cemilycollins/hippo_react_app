import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'

import './index.css';
import App from './App';
import rootReducer from "./redux/reducers"

export const history = createHistory()

const store = createStore(connectRouter(history)(rootReducer), {}, compose(applyMiddleware(thunk, routerMiddleware(history)), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
