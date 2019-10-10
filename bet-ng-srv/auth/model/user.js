const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const Bet = require('../../api/model/bets');
const BetHistory=require("../../api/model/betHistory")

const userSchema= new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstname: String,
    name: String,
    dateofbirth: Date,
    address: String,
    country: String,
    pseudo: String,
    betsHistory: [BetHistory[1]],
    image: String,
    roles: [] ,
    createdOn: {type: Date, default: Date.now}
})

userSchema.pre("save",  async function(next){ 

    const user=this;
    if(user.isModified("password")){
        user.password= await bcrypt.hash(user.password,8);
    }
console.log("Jai fait un save")
    

next();
}
)
module.exports=mongoose.model("Users",userSchema)