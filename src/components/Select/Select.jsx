import React, { Component } from "react";
import "./Select.scss";

class Select extends Component {
  constructor(props){
    super(props);
    this.state = {
      isHidden: true
    }
  };

  handleOpen = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  };

  handleClick = (value) => {
    this.props.onChange(value)
  };

  render() {
    const extraClass = `${this.state.isHidden ? '' : 'open'}`;
    const { value, currency } = this.props;
    return (
      <div className="select_section">
        <h1 className="select_title">Select currency to exhange:</h1>
        <div onClick={this.handleOpen} className={"select_dropdown__selected " + extraClass}>
          {value}
          <ul className="select_dropdown">
            {currency.map((item, index) => {
              if(value !== item.value) {
                return(
                  <li
                    key={index}
                    className="select_dropdown-item"
                    onClick={() => this.handleClick(index)}
                  >
                    {item.value}
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </div>
    );
  };
}

export default Select;
