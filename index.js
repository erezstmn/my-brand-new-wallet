const express = require('express');
const Web3 = require('web3');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const {mongoose} = require('./db/mongoose');
const random = require('mongoose-random');
const {Account} = require('./models/account');

var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/NZTsg8YgOzPFipCjvbHl"));

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(bodyParser.json());

let bal; 
let assign = (value) => {
    bal = value;
    console.log(web3.utils.toWei(bal, 'wei'));
};

app.post('/account', async (req, res) =>{    
    let accountNumber = req.body.account_number;
    if (!web3.utils.isAddress(accountNumber)){
        return res.status(400).send('Invalid Address');
    }
    Account.findOne({
        account_number: accountNumber
    }).then((response) => {
        if (response){
            return res.status(409).send(response);
        }          
        let account = new Account({
            account_number:accountNumber
        });
        account.save().then((doc) => {
            res.status(200).send(doc);
        }, (e) => {
            res.status(400).send(e);
        })
    })
})
app.get('/account', (req, res) => { 
    Account.findOneRandom((err, result) => {
      if (err){
        res.status(400).send(err);
      }
      res.status(200).send(result);
    })
});
app.get('/account/balance', async (req, res) => {
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


// const balance = await web3.eth.getBalance(req.query.account );
// let numBalance = parseInt(balance, 10);
// numBalance /= 1000000000000000000;
// res.status(200).send(""+numBalance);
// } catch(e){
//     console.log(e);
// }