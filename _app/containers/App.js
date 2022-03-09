import React from 'react';
import Root from './Root';
import '../../src/styles/containers/App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Root/>
    );
  }
}
