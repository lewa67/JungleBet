const express=require('express');
const router=express.Router();
const User=require('../model/user');
const passport=require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs= require("file-system");
const path=require("path")
const privateKey = fs.readFileSync(path.resolve(__dirname,'../../key/private.key'));
const publicKey = fs.readFileSync(path.resolve(__dirname,'../../key/public.key'));
let userWithState=[];



auth=  (req, res, next)=> {    passport.authenticate('local', {session: false,failureFlash : true}, async (err, user, info) => {
    if (err || user==null) {
        
        // res.send({
        //     message: 'Something is not right',
        //     user   : user
        // });
       
       next()
    }       req.login(user, {session: false}, (err) => {
       
       if (err) {
           res.send(err);
       }           // generate a signed son web token with the contents of user object and return it in the response     
       console.log("USER", user)   
       req.error="User pas trouvé" 
       if(user==false){
           req.error="User doesn't exist"
           console.log(req.error)
       }else{
        const token=jwt.sign({_id: user._id,username:user.username,roles: user.roles}, privateKey,{ algorithm: 'RS256', expiresIn: 120})
    
       
       user.save();
       req.token=token;}
       next();
    //    return res.json({user, token});
    });
})
(req, res);
}

authJWT = (req,res,next)=>{
    passport.authenticate('jwt', {session: false})
    next()

}

authLogout= (req,res,next)=>{ passport.authenticate('jwt', {session: false}, async (err, user, info) => {
    if (err){
        return err
    }
    req.login(user, {session: false}, (err) =>{
     console.log("test1")
     user.tokens.pop();
     console.log("test2")
     user.save();
     console.log("test3")
     return res.json({user,length: user.tokens.length});
    })
    
})}


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




router.post('/register', (req,res)=>{
    console.log('user from req.body:', req.body)
    
    const newUser=new User(req.body);
  

    newUser.save((err,user)=>{
        if(err){
            return res.status(500).json(err)
        }
        req.login(req.body,(err)=>{
            if(err){
                console.log("Error during registration", err)
            }
            res.status(201).json(user);
        })
    })
})

// router.post('/login', passport.authenticate('local',{
//     successRedirect: "/auth/success",
//     failureRedirect: "/auth/failure"
// passport.authenticate('jwt', {session: false}), (req,res)=>{res.send(req.user)}
// }))






router.post('/login', auth, (req,res)=>{
    if(!req.user){
        console.log("STEP 1")
        res.status(400).json({msg:"NO"})
    } else
        res.status(200).json({user: req.user, token:req.token} )
 
   
});



router.get('/success', passport.authenticate('jwt', {session: false}),authorize("Bettor"),(req, res)=>{
    
    console.log(req.payloadRole,
        req.roleAsked)
    if(req.isAuthorized==true){
        console.log(req.cookies['TOKEN'])
        res.status(200).json({msg:"Admin Authorize", user: req.user});
    }else{
        res.status(400).json({msg: "C la merde un peu"})
    }
    
} )

router.get('/usersConnectionState', (req, res)=>{
    res.status(200).json(userWithState);
} )


router.post('/checkToken',(req,res)=>{

    if (jwt.verify(req.body.token,publicKey)){
        res.status(200).json({msg:true})
    }else{
        res.status(500).json({msg:false})

    }

})

router.get('/userConnected',passport.authenticate('jwt',{session: false}),async (req, res)=>{

    if(req.cookies["TOKEN"]){
       payload= await jwt.verify(req.cookies["TOKEN"], publicKey)
       console.log(payload.username)
       userId=payload.username
       res.status(200).json(payload)
    }else{
        res.status(400).json({msg: "something wrong"})
    }
    
})
    
    


router.get('/logout',passport.authenticate('jwt', {session: false}),(req, res)=>{
    // req.logIn(user,{session:false},err=>{
    //    user.tokens.pop() 
    // })
    req.user.tokens.pop();
    req.user.save();
    res.status(200).json({msg:"c faittttt dans la bannnettete", user: req.user, length: req.user.tokens.length});
} )

router.get('/failure', (req,res)=>{
    res.status(200).json({msg: "Not login"})
})

module.exports= {router,userWithState};