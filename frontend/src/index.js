import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from "./store";

import "./theme.scss";
// import App from "./components/App/App";
import Login from './components/Login/Login';

ReactDOM.render(
    <Provider store={configureStore()}>
        <Login/>
        {/* <App/> */}
    </Provider>
    , document.getElementById('root')
);
