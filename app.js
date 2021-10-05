const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require('./routes/admin');
const path = require('path');
const { extname } = require("path");
const mongoose = require("mongoose");
// Configurações
    // Body-Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    // Handlebars
    app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
    app.set('view engine', '.hbs');
    // Mongoose
    mongoose.connect("mongodb://localhost/estoquesup").then(() => {
        console.log("..Conexão com o banco estabelicida com sucesso!");
        console.log("..Conexão com o banco estabelecida com sucesso!");
    }).catch((err) => {
        console.log("Erro ao se comunicar com o banco de dados"+err);
    })
    //Public
    app.use(express.static(path.join(__dirname,"public")));
    app.use((req, res, next) => {
        console.log('Middleware');
        next();
    })
//Rota
app.use('/admin', admin);

const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor Rodando! ");
})