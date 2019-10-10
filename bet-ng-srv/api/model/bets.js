const mongoose = require('mongoose');



const betSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    teams: [String, String] ,
    quotation: [Number,Number,Number],
    competition: String,
    country: String,
    score: [Number,Number],
    result: String,
    dateOfMatch: String,
	createdOn: { type: Date, default: Date.now }
});


module.exports = [mongoose.model('Bet', betSchema),betSchema];