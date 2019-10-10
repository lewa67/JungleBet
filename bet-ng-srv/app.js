const express = require('express');
const api = require('./api/v1');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport=require('passport')
const session=require('express-session')
const cookieParser=require('cookie-parser')
const Strategy=require('passport-local').Strategy
const auth=require('./auth/routes/index')
const User=require('./auth/model/user')
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const scrapper=require("./scrapping/index");
const scrapperWinamax=require("./scrapping/scrapperUnibet");
const scoreScrapper=require("./scrapping/scoreScrapper");
const fs= require("file-system");
const path=require("path")
const privateKey = fs.readFileSync(path.resolve(__dirname,'./key/private.key'));
const publicKey = fs.readFileSync(path.resolve(__dirname,'./key/public.key'));
app=express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Bets = require('./api/model/bets');
const Bet= Bets[0];

io.on("connection",socket=>{
    socket.on("Logged",(data)=>{

        auth.userWithState.push(data)
            io.emit("ConnectionState",auth.userWithState)
            
        
    })

    

    socket.on("LoggedOut", (data)=>{
        for( var i = 0; i < auth.userWithState.length; i++){ 
            if ( auth.userWithState[i].username === data.username) {
              auth.userWithState.splice(i, 1); 
            }
         }
        io.emit("ConnectionLoggedOut",{username: data.username, state: data.state})
    })

})


const mongoose = require('mongoose');
const connection = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(cookieParser());
app.use(session({
    secret:'my secret',
    resave: true,
    saveUninitialized: true,
    name: "bet-cookie"
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,cb)=>{
    cb(null,user);
})

passport.deserializeUser((user,cb)=>{
    cb(null,user);
})

passport.use(new Strategy({
    usernameField: "username",
    passwordField: "password"
}, (name,pwd,cb)=>{
  User.findOne({username: name}, async (err,user)=>{
      if(err || user==null){
          console.log("Could not find User")
         cb(err)
      }
      else  if (!(await bcrypt.compare(pwd,user.password))){
          console.log("wrong password!!!");
          cb(null,{message: "Mauvais password"})
      } else{
          console.log("Authenticated");
          cb(null,user);
      }
  })
}))

const cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies['TOKEN'])
    {
        token = req.cookies['TOKEN'];
    }
    return token;
};

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey   : publicKey
},
    async function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    try {
        const user = await User.findById(jwtPayload._id);
        return cb(null, user);
    }
    catch (err) {
        return cb(err);
    }
}
));



app.set('port', (process.env.port || 3000));
app.use('/api/v1', api);
app.use('/auth',auth.router);
console.log("Debut de scrapping...")
Bet.find().exec().then(user=>console.log(user[0]));
// scrapper();
// scrapperWinamax();
setInterval(scrapper,1000*30*60)
setInterval(scoreScrapper,1000*30*60)
// scrapper()
// scrapper()
// scoreScrapper()

mongoose.connect('mongodb://localhost:27017/betApp', { useNewUrlParser: true });

connection.on('error', (err) => {
	console.error(`connection to MongoDB error: ${err.message}`); // eslint-disable-line no-console
});

connection.once('open', () => {
    console.log('Connected to MongoDB');
     // eslint-disable-line no-console

	server.listen(app.get('port'), () => {
		console.log(`Express server listening on port ${app.get('port')}`);// eslint-disable-line no-console
	});
});




