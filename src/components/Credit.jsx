import React, { Component } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

class Credit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      amount: 0,
      date: new Date().toDateString(),
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddTransaction(
      {
        id: uuidv4(),
        description: this.state.description,
        amount: this.state.amount,
        date: this.state.date,
      },
      "debits"
    );
  };

  render() {
    const credits = () =>
      this.props.credits.map((credit) => {
        const dateString = (new Date(credit.date)).toDateString();  
        return (       
          <>
            <ul key={credit.id}>
              <li>Description: {credit.description}</li>
              <li>Amount: {credit.amount}</li>
              <li>Date: {dateString}</li>
            </ul>
          </>
        );
      });

    return (
      <div>
        <Link to="/">Home</Link>
        <h1>Credits</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Description: </label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Amount: </label>
            <input
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Add Debit" />
        </form>
        <div>Account Balance: {this.props.accountBalance.toFixed(2)}</div>
        <>{credits()}</>
      </div>
    );
  }
}
export default Credit;
