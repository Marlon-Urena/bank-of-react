import React, { Component } from "react";
import { Link } from "react-router-dom";

class Debit extends Component {
  render() {
    const debits = () =>
      this.props.debits.map((debit) => {
        return (
          <div className="debit">
            <ul>
              <li>Description: {debit.description}</li>
              <li>Amount: {debit.amount}</li>
              <li>Date: {debit.date}</li>
            </ul>
          </div>
        );
      });

    return (
      <div>
        <Link to="/">Home</Link>
        <h1>Debits</h1>
    <div>Account Balance: {this.props.accountBalance.toFixed(2)}</div>
        <div>{debits()}</div>
      </div>
    );
  }
}
export default Debit;
