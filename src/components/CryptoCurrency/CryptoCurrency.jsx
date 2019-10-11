import React, { Component } from "react";
import CryptoCurrencyItem from "../CryptoCurrencyItem/CryptoCurrencyItem";
import "./CryptoCurrency.scss";

class CryptoCurrency extends Component {
  constructor(props){
    super(props);
    this.state = {
      crypto: [
        {title: 'Ethereum', name: 'ETH'},
        {title: 'Litecoin', name: 'LTC'},
        {title: 'Bitcoin', name: 'BTC'}
      ]
    }
  }

  render() {
    const { crypto } = this.state;
    const { selectedOption } = this.props;
    return (
      <ul className="crypto__container">
        {crypto.map((item, index) => (
          <CryptoCurrencyItem
            key={index}
            name={item.name}
            title={item.title}
            selectedOption={selectedOption}
          />
        ))}
      </ul>
    );
  };
}

export default CryptoCurrency;
