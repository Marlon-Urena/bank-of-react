import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/LogIn";
import Axios from "axios";
import Debit from "./components/Debit";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: "john_doe",
        memberSince: "08/23/99",
      },
      debits: [],
      credits: [],
    };
  }

  componentDidMount() {
    const debitUrl = `https://moj-api.herokuapp.com/debits`;
    const creditUrl = `https://moj-api.herokuapp.com/credits`;
    Axios.all([
      Axios.get(debitUrl),
      Axios.get(creditUrl)
    ])
    .then( resArr => {
      const debitData = resArr[0].data;
      const creditData = resArr[1].data;
      this.setState({ debits: debitData, credits: creditData });
      this.updateAccountBalance(this.state.debits,'debits');
      this.updateAccountBalance(this.state.credits,'credits');
    })
    .catch( err => {console.log(err)});
    
  }


  /**
   * Possible to merge functionality of both addTransaction and updateAccountBalance.
   * Will work on another time...maybe.
   */
  addTransaction = (newTransaction, type) => {
    this.setState( state => {
      let amount = newTransaction.amount;
      const transactions = [...state[type], newTransaction];
      if(type === 'debits') {
        amount = -amount
      }
      return {
        [type]: transactions,
        accountBalance: state.accountBalance + amount,
      };
    });
  }

  updateAccountBalance = (transactions,type) => {
    let debitValue = 0, creditValue = 0;
    if(type === 'credits') {
      for(const transaction of transactions) {
        creditValue+=transaction.amount;
        this.setState({accountBalance: this.state.accountBalance + transaction.amount})
      }
      console.log('Credit Value: ' + creditValue);
      return;
    }
    for(const transaction of transactions) {
      debitValue+=transaction.amount;
      this.setState({accountBalance: this.state.accountBalance - transaction.amount})
    }
    console.log('Debit Value: ' +  debitValue);
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const DebitComponent = () =>(
      <Debit debits={this.state.debits} accountBalance={this.state.accountBalance} onAddTransaction={this.addTransaction}/>
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/debit" render={DebitComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
