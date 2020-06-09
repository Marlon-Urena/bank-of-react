import React, { Component } from "react";
import { Link } from "react-router-dom";

class Debit extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h1>Debits</h1>
      </div>
    );
  }
}
export default Debit;
