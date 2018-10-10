import React, { Component } from "react";
import "./CryptoCurrency.scss";
import CryptoCurrencyItem from "../CryptoCurrencyItem/CryptoCurrencyItem.jsx";

class CryptoCurrency extends Component {
  constructor(props){
    super(props);
    this.state = {
      crypto:[
        {title: 'Ethereum', name: 'ETH'},
        {title: 'Litecoin', name: 'LTC'},
        {title: 'Bitcoin', name: 'BTC'}
      ]
    }
  }

  render() {
    return (
      <ul className="crypto__container">
        {
          this.state.crypto.map((item, index) => {
            return (
              <CryptoCurrencyItem key={index}
                                  selectedOption={this.props.selectedOption}
                                  title={item.title}
                                  name={item.name}/>
            )
          })
        }
      </ul>
    );
  };
}

export default CryptoCurrency;
