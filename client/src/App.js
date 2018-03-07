import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.handleGetBalance = this.handleGetBalance.bind(this);
    this.handleAddAccount = this.handleAddAccount.bind(this);
    this.handleGetAccount = this.handleGetAccount.bind(this);
    this.state = {
      currentBalance: null,
      hideErrorMessage: true,
      accountNumberToShow: null
    }
  }
  handleAddAccount(e){
    e.preventDefault();
    let accountNumber = document.getElementById("newAccount").value.trim();
    if (!accountNumber){
      this.setState(() => {
        return({
          hideErrorMessage:false
        });
      })
    } else {
      this.setState(() => {
        return({
          hideErrorMessage:true
        });
      })
    }
    axios.post('/account', {
      account_number: accountNumber
    },{
      validateStatus : (status) =>{
        if (status===409){
          alert(`Account number ${accountNumber} allready exists in the wallet`);
          return false;
        }
        return status >= 200 && status < 300;
      }
    }).then((res) =>{
      alert(`Account number ${res.data.account_number} was added to the wallet`)
      console.log(res);
    }).catch((status, e) =>{
      console.log(status);
      console.log(e);
      this.setState(() => {
        return({
          hideErrorMessage:false
        });
      })
    })
  }
  handleGetBalance(e){
    e.preventDefault();
    let balance;       
    axios.get(`/account/balance?account=${this.state.accountNumberToShow}`).then((res) => {
     balance = res.data;    
     this.setState(() => {       
       return({
        currentBalance: balance
       });
     })
    }) 
  }
  handleGetAccount(e){
    e.preventDefault();
    axios.get('/account').then((res) =>{
      console.log(res);
      this.setState(() => {       
        return({
          accountNumberToShow: res.data.account_number
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
        <form>
          <fieldset>
            <legend>Add Account to Wallet</legend>
            <p hidden={this.state.hideErrorMessage}>Please enter a valid account number</p>
            <input type="text" id="newAccount" placeholder="Account Number" size="40"></input>
            <button onClick={this.handleAddAccount}>Add Account</button>
          </fieldset>
        </form>
        <form>
        <fieldset>
          <legend>Get Random Account from Wallet</legend>          
          <button onClick={this.handleGetAccount}>Get Account</button>
          <p>{this.state.accountNumberToShow ? `This is the fetched account:  ${this.state.accountNumberToShow}`:''}</p>
          <button onClick={this.handleGetBalance}>Get Balance</button><br/>
          <p>{ this.state.currentBalance ? `This is The balance: ${this.state.currentBalance}` : ''}
          </p>          
        </fieldset>
</form>
      </div>
    );
  }
}

export default App;
