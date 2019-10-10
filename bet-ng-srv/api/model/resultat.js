const mongoose = require('mongoose');
const Bets=require('./bets')
const Bet=Bets[1]

const resultSchema = new mongoose.Schema({
    bet: Bet,
    winingbet:Number,
    isBetWin: Boolean,
    winner: String,
    score: [String],
    finalWinner: String,
	createdOn: { type: Date, default: Date.now }
});


module.exports = [mongoose.model('Result', resultSchema),resultSchema];