import React from 'react';
import Root from './Root';

const AppStyle = {
  height: '100%',
  width: '100%',
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={AppStyle}>
        <Root/>
      </div>
    );
  }
}
