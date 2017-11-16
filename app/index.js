import React from 'react';
import ReactDOM from 'react-dom';
import Chance from 'chance';
import request from 'es6-request';

import App from './containers/App';

import './style/normalize.css';
import './style/main.scss';
import './style/shared.scss';

// Global randomizer, seeded below using random.org
const chance = null;

let randomizePromise = new Promise((resolve, reject) => {
  let mySeed;
  let chance;

  request.get("https://www.random.org/integers/")
    .query({
      num: "1",
      col: "1",
      min: "1",
      max: "1000000000",
      base: "10",
      format: "plain",
      rnd: "new"
    })
    .then(([body, res]) => {
      mySeed = body;
      chance = new Chance(mySeed);
    });
});

let renderAppPromise = new Promise((resolve, reject) => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});

// Run application
randomizePromise.then(renderAppPromise);