import React, { Component } from "react";
import "./CryptoCurrencyItem.scss";
import axios from 'axios'

class CryptoCurrencyItem extends Component {
  constructor(props){
    super(props);

    this.state = {
      volume: 0,
      price:{},
      percent: {},
      enablePercent: false,
      period: ['Hour', 'Day', 'Week', 'Month']
    }
  }

  onCheck = () => {
    this.setState({
      enablePercent: !this.state.enablePercent,
    })
  };

  componentDidMount() {
    const apiUrl = `https://apiv2.bitcoinaverage.com/indices/global/ticker/${this.props.name}${this.props.selectedOption.value}`;
    axios.get(apiUrl)
      .then(res => {
        const percent = res.data.changes.percent;
        const price = res.data.changes.price;
        const volume = res.data.volume;

        this.setState({ price });
        this.setState({ percent });
        this.setState({ volume });
      })
      .catch(err => console.log(err))
  }

  componentWillReceiveProps(nextprops) {
    const apiUrl = `https://apiv2.bitcoinaverage.com/indices/global/ticker/${nextprops.name}${nextprops.selectedOption.value}`;
    axios.get(apiUrl)
      .then(res => {
        const percent = res.data.changes.percent;
        const price = res.data.changes.price;
        const volume = res.data.volume;

        this.setState({ price });
        this.setState({ percent });
        this.setState({ volume });
      })
      .catch(err => console.log(err))
  }

  getImage = () => {
    let Bitcoin = require('./../../../assets/images/content/Bitcoin.png');
    let Litecoin = require('./../../../assets/images/content/Litecoin.png');
    let Ethereum = require('./../../../assets/images/content/Ethereum.png');

    if (window.devicePixelRatio > 1) {
      Bitcoin = require('./../../../assets/images/content/Bitcoin_x2.png');
      Litecoin = require('./../../../assets/images/content/Litecoin_x2.png');
      Ethereum = require('./../../../assets/images/content/Ethereum_x2.png');
    }

    if (this.props.title === "Bitcoin") {
      return Bitcoin
    } else if (this.props.title === "Litecoin") {
      return Litecoin
    } else if (this.props.title === "Ethereum") {
      return Ethereum
    }
  };

  render() {
    const extraClass = this.props.title.toLowerCase();

    return (
      <li className={"crypto__section " + extraClass}>
        <h2 className="crypto__title">{this.props.title}</h2>
        <div className="crypto__img-wrapper">
          <img className="crypto__img" src={this.getImage()} alt={this.props.title}/>
        </div>
        <div className="crypto__info">
          <div className="crypto__info-price">
            <span>Price:</span>
            <span>
              {this.props.selectedOption.symbol}
              {this.state.volume.toFixed(2)}
            </span>
          </div>
          <div className="crypto__info-percent">
            <span>Percent change</span>
            <span className="crypto__info-checkbox">
              <input type="checkbox"
                     className="checkbox"
                     id={`${this.props.name}-checkbox`}
                     checked={this.state.enablePercent}
                     onChange={this.onCheck}/>
              <label htmlFor={`${this.props.name}-checkbox`}/>
            </span>
          </div>
          <ul className="crypto__info-period">
            {
              this.state.period.map((item, index) => {
                let value = item.toLowerCase();
                return (
                  <li key={index} className="crypto__info-period-item">
                    <span className="crypto__info_opacity">{item} change</span>
                    <span className={(this.state.percent[value] > 0 || this.state.price[value] > 0) ?
                      "crypto__info-value" :
                      "crypto__info-value_negative"}>
                      {this.state.enablePercent ? this.state.percent[value] : this.state.price[value]}
                      {this.state.enablePercent ? '%' : this.props.selectedOption.symbol}
                    </span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </li>
    );
  };
}

export default CryptoCurrencyItem;
