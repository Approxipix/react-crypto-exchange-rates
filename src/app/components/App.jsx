import React, { Component } from "react";
import Select from "./Select/Select.jsx";
import CryptoCurrency from "./CryptoCurrency/CryptoCurrency.jsx";
import "./App.scss";

const currency  = [
  { value: 'USD', label: 'USD' , symbol: '$'},
  { value: 'EUR', label: 'EUR' , symbol: '€'},
  { value: 'RUB', label: 'RUB' , symbol: '₽'},
  { value: 'GBP', label: 'GBP' , symbol: '£'}
];

class App extends Component {
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
        <Select value={selectedCurrency.value}
                onChange={this.handleChange}
                currency={currency}/>
        <CryptoCurrency selectedOption={selectedCurrency}/>
      </div>
    );
  }
}

export default App;
