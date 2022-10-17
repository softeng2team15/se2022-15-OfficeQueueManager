'use strict';
const express=require('express');
const customer=require('./services/customer');
const app=express();
const port=3001;
app.get('/api/customer/waitingTime/:ticketId',async(req,res)=>{
    try {
        const ret=await customer.getWaitingTime(parseInt(req.params.ticketId));
        return res.status(200).json(ret);
    } catch (error) {
        return res.status(error.status).json(error.message);
    }
});
/* AUTHENTICATION CONTROL
const passport = require('passport');
const LocalStrategy = require('passport-local'); 
const session=require('express-session');
const cors = require('cors');
passport.use(new LocalStrategy((username, password, callback)=>{
    studentsDao.login(username, password).then((user) => { 
        if (!user)  return callback(null, false, { message: 'Incorrect username and/or password.' });
        return callback(null, user);
    }); 
}));
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function (user, cb) { // this user is id + email + name
    return cb(null, user);
    // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});
  
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({error: 'Not authorized'});
}
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOptions));

app.use(session({
    secret: "the sky is red!",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


app.delete('/api/logout',isLoggedIn,async(req,res)=>{
    req.logOut(()=>{
        return res.status(204).end();
    });
})

app.post('/api/login', passport.authenticate('local'), (req,res) => {
    // This function is called if authentication is successful.
    // req.user contains the authenticated user.
    res.json(req.user.username);
});
*/

const ticketDAO = require("./dao/ticketDAO");

app.get("/api/:serviceID/queueLength", async (req, res) => {
	return await ticketDAO.getQueueLength(req.params.serviceID).then(
		data => {
			return res.status(200).json({ length: data });
		},
		err => {
			return res.status(500).send(err);
		}
	);
});

app.get("/api/:serviceID/serviceTime", async (req, res) => {
	return await ticketDAO.getServiceTime(req.params.serviceID).then(
		data => {
			return res.status(200).json(data);
		},
		err => {
			return res.status(500).send(err);
		}
	);
});

app.listen(port, () =>
	console.log(`Server started at http://localhost:${port}.`)
);
