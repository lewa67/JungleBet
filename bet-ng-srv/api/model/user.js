const mongoose = require('mongoose');
const BetHistory=require('./betHistory');




const userSchema = new mongoose.Schema({
    firstname: String ,
    name: String,
    dateofbirth: Date,
    address: String,
    country: String,
    pseudo: String,
    betsHistory: [BetHistory[1]],
    image: String,


	createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);