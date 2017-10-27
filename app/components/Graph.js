import React from 'react';

const GraphStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "grey"
};

export default class Graph extends React.Component {
  render() {
    return (<canvas style={GraphStyle}></canvas>)
  }
}