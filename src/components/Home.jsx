import React, { Component } from "react";
import CryptoCurrency from "./CryptoCurrency/CryptoCurrency";
import Select from "./Select/Select";
import "./Home.scss";

const currency  = [
  { value: 'USD', label: 'USD' , symbol: '$'},
  { value: 'EUR', label: 'EUR' , symbol: '€'},
  { value: 'RUB', label: 'RUB' , symbol: '₽'},
  { value: 'GBP', label: 'GBP' , symbol: '£'}
];

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCurrency: currency[0],
      data: {}
    }
  };

  handleChange = (value) => {
    this.setState({ selectedCurrency:  currency[value]});
  };

  render() {
    const { selectedCurrency } = this.state;
    return (
      <div className="wrapper">
        <Select
          value={selectedCurrency.value}
          onChange={this.handleChange}
          currency={currency}
        />
        <CryptoCurrency
          selectedOption={selectedCurrency}
        />
      </div>
    );
  }
}

export default Home;
