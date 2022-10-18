'use strict';
const express=require('express');
const app=express();
const port=3001;
const {check, validationResult} = require('express-validator');
const customer=require('./services/customer');
const services=require('./dao/services');
const tickets=require('./dao/tickets');
const counter=require('./dao/counter');

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
    services.getServiceList()
      .then(services => {res.json(services)})
      .catch(() => res.status(500).json({ error: `Database error fetching the services list.` }).end());
  
  });
  
  app.post('/api/ticket/new/:serviceID', async (req, res) => {
    tickets.newTicket(req.params.serviceID)
      .then(ticketID => res.json(ticketID))
      .catch(() => res.status(500).end());
  });
  
  app.put('/api/ticket/counter/:ticketID/:counterID', async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
      }
  
      try {
          await tickets.updateCounterToTicket(req.params.ticketID, req.params.counterID);
          res.status(204).end();
      } catch (err) {
          res.status(503).json({ error: `Database error during the insertion of ticket.` });
      }
  });
  
  app.put('/api/ticket/done/:ticketID', async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
      }
  
      try {
          await tickets.setDoneToTicket(req.params.ticketID);
          res.status(204).end();
      } catch (err) {
          res.status(503).json({ error: `Database error while updating ticket status to done.` });
      }
  
  });