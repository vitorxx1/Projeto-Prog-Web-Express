var express = require('express');
var app = express();

//engine para templating
app.set('view engine', 'hbs');
app.set('views','./views');

//arquivos estáticos
app.use(express.static('public'));

//arquivos de rotas
var fipe = require('./routes/fipe.js');
var raiz = require("./routes/raiz.js")

app.use("/", raiz);
app.use("/fipe", fipe);

app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});

app.listen(3000);