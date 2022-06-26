var express = require("express");
var router = express.Router();
var User = require("../models/User");
var sha256 = require('js-sha256');
var session = require('express-session');

session({secret: "Your secret key",
                  resave: false,
                  saveUninitialized: false,
                  cookie: {
                     expires: 600000,
                  },
});

router.get('/', function(req, res){
    req.session.destroy();
    res.redirect('login');
 });

router.post("/", async function(req, res){
    if(req.session.user != null){
        res.redirect('login');
    } else {
        res.redirect('/');
    }
})

module.exports = router;