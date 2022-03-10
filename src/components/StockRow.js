import React from 'react';
import '../styles/components/StockRow.module.scss';

export default class StockRow extends React.Component {
  constructor(props) {
    super(props);

    // this.classname = '';

    this.state = {}
    // this.state.classname = '';
    // this.state.fading = false;
    // this.state.fadingJustCompleted = false;
    // this.fadingDone = this.fadingDone.bind(this)

    this.handleStockClick = this.handleStockClick.bind(this);
  }

  componentDidMount () {
    // const elm = this.refs.tr
    // elm.addEventListener('animationend', this.fadingDone)
  }

  componentWillUnmount () {
    // const elm = this.refs.tr
    // elm.removeEventListener('animationend', this.fadingDone)
  }

  // componentWillMount () {
  //componentWillReceiveProps (nextProps) {
    // const stock = this.props.stock;
    //
    // if (!this.state.fading && stock.change !== 0 && !this.state.fadingJustCompleted) {
    //   this.setState({fading: true});
    //
    //   if (stock.change > 0) {
    //     // this.setState({classname: 'greenFadeInAnimated'});
    //     this.classname = 'greenFadeInAnimated';
    //   }
    //   else if (stock.change < 0) {
    //     // this.setState({classname: 'redFadeInAnimated'});
    //     this.classname = 'redFadeInAnimated';
    //   }
    // }
  //}

  componentDidUpdate() {
    // this.setState({
    //   fadingJustCompleted: false,
    // });
  }



  fadingDone () {
    // will re-render component, removing the animation class
    // this.setState({
    //   fading: false,
    //   fadingJustCompleted: true,
    //   classname: ''
    // });
  }

  handleStockClick() {
    this.props.onUpdate(this.props.stock);
  }

  render() {
    const stock = this.props.stock;

    let classname = '';

    if (stock.change > 0) {
      classname = 'increase';
    }
    else if (stock.change < 0) {
      classname = 'decrease';
    }

    return (
      <tr ref={(ref) => this.row = ref}
          className={classname}
          onClick={this.handleStockClick} >
        <td>{stock.symbol}</td>
        <td>${stock.price.toFixed(2)}</td>
        <td>${stock.change.toFixed(2)}</td>
        <td>{stock.volume}</td>
      </tr>)
  }
}