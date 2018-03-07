const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://qwer1234:qwer1234@ds259268.mlab.com:59268/eth-accounts');

module.exports = {
    mongoose
};