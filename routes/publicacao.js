var express = require("express");
var router = express.Router();
var Publicacao = require("../models/Publicacao");
var ObjectId = require('mongodb').ObjectId;

router.get("/", function(req, res){
    res.render('publicacoes_index');
});

router.get('/busca', async function(req, res){
    
    const busca = req.query.busca;

    if(!busca){
        let publicacoes = await Publicacao.findSome({});
        res.render('publicacoes_busca', {status: "Todas as publicações", 
                                             publicacoes: publicacoes,
                                             titulo: "Titulo",
                                             autor: "Autor",
                                             data: "Data"});
    }else{
        let publicacoes = await Publicacao.findSome({titulo: new RegExp(`${busca}`, 'i')});

        if(publicacoes.length == 0){
            res.render('publicacoes_busca', {status: "Publicações não encontradas"});
        }else{
            res.render('publicacoes_busca', {status: "Publicações encontradas", 
                                             publicacoes: publicacoes,
                                             titulo: "Titulo",
                                             autor: "Autor",
                                             data: "Data"});
        }
    }
});

router.get("/nova", async function(req, res){
    res.render('nova_publicacao');
});

router.post("/nova", async function(req, res){
    await Publicacao.insert(req.body);
    res.redirect("/publicacoes/nova");
});

router.get("/busca/:id", async function(req, res){
    let publicacao = await Publicacao.findOne( new ObjectId(req.params.id));

    let new_values = { $set: { visualizacoes: publicacao.visualizacoes + 1 } };
    await Publicacao.updateOne( new ObjectId(req.params.id), new_values);
    res.render('publicacao', publicacao);
});

module.exports = router;