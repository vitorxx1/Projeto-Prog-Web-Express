var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get('/', async function(req, res){
    const busca = req.query.busca;

    if(!busca){
        let users = await User.findSome({});
        res.render('users_busca', {status: "Todos os usuários", 
                                             users: users,
                                             username: "Username",
                                             nome: "Nome"});
    }else{
        let users = await User.findSome({username: new RegExp(`${busca}`, 'i')});

        if(users.length == 0){
            res.render('users_busca', {status: "Usuários não encontrados"});
        }else{
            res.render('users_busca', {status: "Usuários encontrados", 
                                             users: users,
                                             username: "Username",
                                             nome: "Nome"});
        }
    }
 });

router.get("/:username", async function(req, res){
    let user = await User.findOne(req.params.username);
    res.render('user', user);
});

module.exports = router;