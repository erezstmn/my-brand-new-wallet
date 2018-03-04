import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.handleGetBalance = this.handleGetBalance.bind(this);
    this.state = {
      currentBalance: null
    }
  }
  
  handleGetBalance(e){
    e.preventDefault();
    let balance;
    const account = document.getElementById("account").value;    
    axios.get(`/account?account=${account}`).then((res) => {
     balance = res.data;    
     this.setState(() => {       
       return({
        currentBalance: balance
       });
     })
    }) 
  }
  render() {
    return (
      <div>
        <header className="App-header">
          <h1>My Ethereum Wallet</h1>
          <h3>Powered by Infura & Rinkeby</h3>
        </header>
        <form className="App-form">
          <input type="text" id="account" placeholder="Account Number"></input>
            <button onClick={this.handleGetBalance}>Get Balance</button><br/>
            <p>{ this.state.currentBalance ? `This is The balance: ${this.state.currentBalance}` : 'Please Enter an account number'
                }
            </p>
        </form>
      </div>
    );
  }
}

export default App;
