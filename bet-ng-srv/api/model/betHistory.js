const mongoose = require('mongoose');
const Resultat=require('./resultat');



const betHistorySchema = new mongoose.Schema({
    results:[Resultat[1]],
    totalQuotation: Number,
    miseTotale: Number,
    totalGain:Number,
    isTicketWin: Boolean,
	createdOn: { type: Date, default: Date.now }
});


module.exports = [mongoose.model('BetHistory', betHistorySchema),betHistorySchema];