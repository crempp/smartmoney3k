import React from 'react';
import ExchTable from './ExchTable';

export default class App extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Hello World</h1>
        <ExchTable/>
      </div>
    );
  }
}