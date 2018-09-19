import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux"
import {createStore} from "redux"

// TODO: import rootreducer, create store, wrap App in Provider tags

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
