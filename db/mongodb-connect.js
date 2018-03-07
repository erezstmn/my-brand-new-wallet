const MongoClient = require('mongodb').MongoClient;
const mongoPath = 'mongodb://qwer1234:qwer1234@ds259268.mlab.com:59268/eth-accounts'

const connect = (account) => { 
    MongoClient.connect(mongoPath, (err, client) => {
        if (err){
            return console.log('Unable to connect to server');
        }
        console.log('Connected to MongoDB server');
        const db = client.db('eth-accounts');

        db.collection('eth-accounts').insertOne(account, (err, result) => {
            if (err){
                return console.log('Unable to insert account', err);
            }
            console.log(JSON.stringify(result.ops, undefined, 2));
        });

        client.close();
    });
};
const getAccounts = (callback) => {
    let accounts
    MongoClient.connect(mongoPath, (err, client) => {
        if (err){
            return console.log('Unable to connect to server');
        }
        console.log('Connected to MongoDB server');
        const db = client.db('eth-accounts');
        db.collection('eth-accounts').find().toArray().then((docs) => {
            // console.log(JSON.stringify(docs, undefined, 2));
            accounts = docs;
            callback(accounts);
        }, (e) =>{
            console.log('Unable to fetch account', e);
        });
        // client.close();
    });
    
}
module.exports= {
    connect,
    getMovies
};