const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('mongoose-simple-random');

let s = new Schema({
    account_number: {
        type: String,
        required: true,
        minlength:1,
        trim: true
    }
  });
s.plugin(random);

const Account = mongoose.model('Account', s);

module.exports = {Account};