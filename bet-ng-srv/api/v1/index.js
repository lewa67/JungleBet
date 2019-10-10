const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const Bets = require('../model/bets');
const User = require('../../auth/model/user');
const Bet= Bets[0];
const BetHistory=require("../model/betHistory")
const History=BetHistory[0]
const Resultats = require('../model/resultat');
const Resultat=Resultats[0];
const passport= require("passport");
Articles=require('../model/article');
const jwt = require('jsonwebtoken');
const fs= require("file-system");
const publicKey = fs.readFileSync(path.resolve(__dirname,'../../key/public.key'));



function authorize(role){
    
    return (req, res, next)=>{
        let payload=jwt.verify(req.cookies['TOKEN'],publicKey)
        req.payloadRole=payload.roles
        req.roleAsked=role
        if(payload.roles.includes(role)){
            req.isAuthorized=true;
            req.username=payload.username
            
        }
        next()
    }
    
    }

async function addBet(query,bet)
{
  await  User.findOne(query).exec().then(async user=>{
        if(user.betsHistory==undefined){
            user.betsHistory=[];
        }
        user.betsHistory.push(bet);
        // console.log(user.betsHistory)
        try { user.save()}
            catch(error){
                console.log(error)
            }
    });
    
    
}

router.post('/betHistory', (req,res)=>{
    User.findOne(req.query).exec().then(user=>{
        if(user.betsHistory==undefined){
            user.betsHistory=[]
        }
        history=new History({miseTotale: req.body.miseTotale, totalGain: req.body.totalGain, totalQuotation: req.body.totalQuotation })
        for(let i=0;i<req.body.bets.length;i++){
            
        
            history.results.push(new Resultat({bet:req.body.bets[i],winingbet:req.body.winingbets[i],winner: req.body.winners[i]}))
        
            // console.log(req.body.bets[i],req.body.winingbets[i],req.body.winners[i],req.body.miseTotale, req.body.totalGain,req.body.totalQuotation)
        }
        
       user.betsHistory.push(history)
        user.save()
        res.status(200).json(user)});


}
)

router.post('/addRole', (req,res)=>{
   
    
    User.findOne({username: req.body.username}).exec().then(user=>{
        user.roles.push(req.body.role)
        user.save()
        res.status(200).json(user)});


}
)

router.post('/deleteRole', (req,res)=>{
   
    
    User.findOne({username: req.body.username}).exec().then(user=>{
        for( var i = 0; i < user.roles.length; i++){ 
            if ( user.roles[i] === req.body.role) {
              user.roles.splice(i, 1); 
            }
         }
        user.save()
        res.status(200).json(user)});


}
)

router.get('/user', passport.authenticate('jwt', {session: false}),authorize("Bettor"),(req,res)=>{
console.log(req.isAuthorized,req.username)
    User
    .findOne(req.query)
    .exec()
    .then(user =>{
        console.log(String(user.username)==req.username && req.isAuthorized==true)
        if((String(user.username)==req.username && req.isAuthorized==true)||(req.payloadRole.includes("Admin"))){
            res.status(200).json(user)
        }
        else{
            res.status(403).json({msg:"It's not your account"})
        }
    } )
    .catch(err => res.status(500).json ({message: "User not found !!", error: err}))
})

router.get('/userList', passport.authenticate('jwt', {session: false}),authorize("Bettor"),(req,res)=>{
    console.log(req.isAuthorized,req.username)
        User
        .find(req.query)
        .exec()
        .then(user =>{
            console.log(String(user.username)==req.username && req.isAuthorized==true)
            if((req.payloadRole.includes("Admin"))){
                res.status(200).json(user)
            }
            else{
                res.status(403).json({msg:"It's not your account"})
            }
        } )
        .catch(err => res.status(500).json ({message: "User not found !!", error: err}))
    })



router.post('/roles', (req,res)=>{
   console.log(req.body.username)
//    console.log(typeof(req.body.roles.split(",")[0]))
    User
    .findOne({username:req.body.username})
    .exec()
    .then( user => { 
       
        // console.log(typeof(user.roles))
        res.status(200).json(user.roles)})
    .catch(err => res.status(500).json ({message: "User not found !!", error: err}))
})

router.post('/user', (req,res)=>{
    console.log("req.body",req.body)
    user=new User(req.body);
    user.save((err, bet) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(201).json(bet);
	});
})

router.get('/user/:id', (req,res)=>{
    id=req.params.id;
    User
    .findById(id)
    .exec()
    .then(user=> {res.status(200).json(bet);
    console.log(user);
    })
    .catch(err=> res.status(500).json({message: "User not found!!", error: err}))
} )


router.get('/bet', passport.authenticate('jwt', {session: false}), (req,res)=>{


    console.log(req.query)

    
        Bet
    .find(req.query)
    .exec()
    .then(bets => {res.status(200).json(bets);
    })
    .catch(err=> res.status(500).json({
        message: "Bets not founded !!",
        error: err
    }))
    

} )

router.get('/articles', (req,res)=>{


    console.log(req.query)

    
        Articles
    .find(req.query)
    .exec()
    .then(article => {res.status(200).json(article);
    })
    .catch(err=> res.status(500).json({
        message: "Articles not founded !!",
        error: err
    }))
    

} )

router.get('/articles/:id', (req,res)=>{
    id=req.params.id;
    Articles
    .findById(id)
    .exec()
    .then(article=> {res.status(200).json(article);
    console.log(article);
    })
    .catch(err=> res.status(500).json({message: "Aticle not found!!", error: err}))
} )

router.get('/bet/:id', (req,res)=>{
    id=req.params.id;
    Bet
    .findById(id)
    .exec()
    .then(bet=> {res.status(200).json(bet);
    console.log(bet);
    })
    .catch(err=> res.status(500).json({message: "Bet not found!!", error: err}))
} )
router.delete('/bet', (req,res)=>{
    
    Bet
    .findOneAndDelete(req.query)
    .exec()
    .then(bet=> {res.status(200).json(bet);
    console.log(bet);
    })
    .catch(err=> res.status(500).json({message: "Bet not found!!", error: err}))
} )

router.delete('/user', (req,res)=>{
    
    User
    .findOneAndDelete(req.query)
    .exec()
    .then(user=> {res.status(200).json(user);
    console.log(user);
    })
    .catch(err=> res.status(500).json({message: "User not found!!", error: err}))
} )

router.post('/bet', (req,res)=>{
    console.log("req.body",req.body)
    bet=new Bet(req.body);
    bet.save((err, bet) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(201).json(bet);
	});
})

router.get('/ping', (req, res) => {
	res.status(200).json({ msg: 'pong', date: new Date()});
});

module.exports=router;


