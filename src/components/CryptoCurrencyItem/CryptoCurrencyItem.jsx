import React, { Component } from "react";
import axios from 'axios'
import "./CryptoCurrencyItem.scss";

class CryptoCurrencyItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      volume: 0,
      price:{},
      percent: {},
      enablePercent: false,
      period: [ 'Hour', 'Day', 'Week', 'Month' ]
    }
  }

  componentDidMount() {
    const { name, selectedOption } = this.props;
    this.loadExchangePrice(name, selectedOption);
  }

  componentWillReceiveProps(nextProps) {
    const { name, selectedOption } = nextProps;
    this.loadExchangePrice(name, selectedOption);
  }

  loadExchangePrice(name, selectedOption) {
    const apiUrl = `https://apiv2.bitcoinaverage.com/indices/global/ticker/${name}${selectedOption.value}`;
    axios.get(apiUrl)
      .then(res => {
        this.setState({
          price: res.data.changes.percent,
          percent: res.data.changes.price,
          volume: res.data.volume,
        });
      })
      .catch(err => console.log(err))
  }

  onCheck = () => {
    this.setState({
      enablePercent: !this.state.enablePercent,
    })
  };

  getImage = () => {
    const { title } = this.props;
    let Bitcoin = require("../../assets/images/content/Bitcoin.png");
    let Litecoin = require("../../assets/images/content/Litecoin.png");
    let Ethereum = require('../../assets/images/content/Ethereum.png');

    if (window.devicePixelRatio > 1) {
      Bitcoin = require('../../assets/images/content/Bitcoin_x2.png');
      Litecoin = require('../../assets/images/content/Litecoin_x2.png');
      Ethereum = require('../../assets/images/content/Ethereum_x2.png');
    }

    if (title === 'Bitcoin') {
      return Bitcoin
    } else if (title === 'Litecoin') {
      return Litecoin
    } else if (title === 'Ethereum') {
      return Ethereum
    }
  };

  render() {
    const { name, title, selectedOption } = this.props;
    const { price, volume, period, percent, enablePercent } = this.state;
    const extraClass = this.props.title.toLowerCase();

    return (
      <li className={"crypto__section " + extraClass}>
        <h2 className="crypto__title">{title}</h2>
        <div className="crypto__img-wrapper">
          <img className="crypto__img" src={this.getImage()} alt={title} />
        </div>
        <div className="crypto__info">
          <div className="crypto__info-price">
            <span>Price:</span>
            <span>
              {selectedOption.symbol}
              {volume.toFixed(2)}
            </span>
          </div>
          <div className="crypto__info-percent">
            <span>Percent change</span>
            <span className="crypto__info-checkbox">
              <input
                type="checkbox"
                className="checkbox"
                id={`${name}-checkbox`}
                checked={enablePercent}
                onChange={this.onCheck}
              />
              <label htmlFor={`${name}-checkbox`}/>
            </span>
          </div>
          <ul className="crypto__info-period">
            {period.map((item, index) => {
              let value = item.toLowerCase();
              return (
                <li key={index} className="crypto__info-period-item">
                  <span className="crypto__info_opacity">{item} change</span>
                  <span className={(percent[value] > 0 || price[value] > 0) ?
                    "crypto__info-value" :
                    "crypto__info-value_negative"
                  }>
                    {enablePercent ? `${percent[value]}%` : `${price[value]} ${selectedOption.symbol}`}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </li>
    );
  };
}

export default CryptoCurrencyItem;
