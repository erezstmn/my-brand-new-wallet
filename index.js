const express = require('express');
const Web3 = require('web3');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/NZTsg8YgOzPFipCjvbHl"));

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(bodyParser.json());



let bal 
let assign = (value) => {
    bal = value;
    console.log(web3.utils.toWei(bal, 'wei'));
};

app.get('/account', async (req, res) => {
    try{ 
    const balance = await web3.eth.getBalance(req.query.account );
    let numBalance = parseInt(balance, 10);
    numBalance /= 1000000000000000000;
    res.status(200).send(""+numBalance);
    } catch(e){
        console.log(e);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
app.listen(5000);