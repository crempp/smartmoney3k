import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

import './style/normalize.css';
import './style/main.scss';
import './style/shared.scss';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);