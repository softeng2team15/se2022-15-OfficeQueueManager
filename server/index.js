'use strict';
const express=require('express');
const app=express();
const port=3001;
const dao = require('./dao/dao');

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
app.listen(port, () => console.log(`Server started at http://localhost:${port}.`));

app.get('/api/services', async (req, res) => {
    dao.getServiceList()
      .then(services => {res.json(services)})
      .catch(() => res.status(500).end());
  
  });
  
  app.post('/api/ticket/new', async (req, res) => {
    
      dao.newTicket(req.body.serviceID)
      .then(ticketID => {res.json(ticketID); console.log("INDEX:" + res.json(ticketID))})
      .catch(() => res.status(500).end());
  });
  
  app.put('/api/ticket/counter', async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
      }
  
      try {
          await dao.updateCounterToTicket(req.body.ticketID, req.body.counterID);
          res.status(204).end();
      } catch (err) {
          res.status(503).json({ error: `Database error during the insertion of study plan.` });
      }
  });
  
  app.put('/api/ticket/done', async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
      }
  
      try {
          await dao.setDoneToTicket(req.body.ticketID);
          res.status(204).end();
      } catch (err) {
          res.status(503).json({ error: `Database error during the insertion of study plan.` });
      }
  
  });