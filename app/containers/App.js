import React from 'react';
import Root from './Root';
import '../style/components/app.scss';

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
