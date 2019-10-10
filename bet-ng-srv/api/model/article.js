const mongoose = require('mongoose');



const articleSchema = new mongoose.Schema({
    title:String,
    textUnderTitle: String,
    image:String,
    textUnderImage: String,
	createdOn: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Article', articleSchema);