var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get('/', function(req, res){
    res.render('cadastro');
 });

router.post("/", async function(req, res){
    var usuario = await User.findOne(req.body.username);
    if(!usuario){
        await User.insert(req.body);
        res.redirect("/cadastro");
    } else{
        res.send("username ja cadastrado");
    }
})

module.exports = router;