import $ from 'jquery';
require('./mystyles.scss');

import React from 'react';
import ReactDOM from 'react-dom';

// import './index.css';

//main app
import App from './containers/App';

ReactDOM.render(<App/>, document.getElementById('app'))