import React, { Component } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

class Debit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      amount: 0,
      date: "",
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
    const debits = () =>
      this.props.debits.map((debit) => {
        return (
          <>
            <ul key={debit.id}>
              <li>Description: {debit.description}</li>
              <li>Amount: {debit.amount}</li>
              <li>Date: {debit.date}</li>
            </ul>
          </>
        );
      });

    return (
      <div>
        <Link to="/">Home</Link>
        <h1>Debits</h1>
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
          <div>
            <label>Date: </label>
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
          </div>

          <input type="submit" value="Add Debit" />
        </form>
        <div>Account Balance: {this.props.accountBalance.toFixed(2)}</div>
        <>{debits()}</>
      </div>
    );
  }
}
export default Debit;
