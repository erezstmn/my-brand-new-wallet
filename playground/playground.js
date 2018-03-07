const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/NZTsg8YgOzPFipCjvbHl"));

// web3.eth.accounts.wallet.create(1);
console.log(web3.eth.accounts.wallet);