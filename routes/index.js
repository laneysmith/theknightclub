var express = require('express');
var router = express.Router();
var db = require('../db/api');
var auth = require('../auth');

// render index page
router.get('/', function(req, res, next) {
  res.render('index', {id: req.session.userId});
});

// render home page with posts
router.get('/home', auth.notLoggedIn, function(req, res, next) {
  db.findUserById(req.session.userId).then(function(user) {
    res.render('home', {user: user});
  });
});

// render login page
router.get('/login', auth.isLoggedIn, function(req, res, next) {
  res.render('auth/login');
});

// render signup page
router.get('/signup', auth.isLoggedIn, function(req, res, next) {
  res.render('auth/signup');
});

// post credentials to login page
router.post('/login', auth.isLoggedIn, function(req, res, next) {
  auth.passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.render('auth/login', {error: err});
    } else if (user) {
      req.session.userId = user.id;
      res.redirect('/home');
    }
  })(req, res, next);
});

// register credentials to signup page
router.post('/signup', auth.isLoggedIn, function(req, res, next) {
  db.findUserByUsername(req.body.username).then(function(user){
    if (user) {
      console.log('User already exists.');
      res.render('auth/signup', {error: 'Error: user already exists.'});
    } else {
      // console.log(req.body);
      auth.createUser(req.body).then(function(id) {
        req.session.userId = id;
        // console.log('id', id);
        res.redirect('/home');
      });
    }
  }).catch(function(err) {
    next(err);
  });
});

// logout
router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
