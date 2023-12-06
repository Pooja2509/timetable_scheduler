import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './autharization/Auth';
// import Table from './output/Table'
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './Reducer'
// import App from './App'

const store = createStore(reducer);


ReactDOM.render( <Provider store = {store}><BrowserRouter><Auth /> </BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
