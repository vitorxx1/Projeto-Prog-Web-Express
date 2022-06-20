var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get('/', function(req, res){
    res.render('login');
 });

router.post("/", async function(req, res){
    var record = await User.findOne(req.body.username);
    if(!record){
        console.log("nao existe")
    } else{
        res.send(record);
    }
})

module.exports = router;