const express = require('express');
const router = express.Router();
//Importar o mogoose
const mogoose = require("mongoose");
//Chamar arquivo do model
require("../models/Categoria");
//Chamar função que passa a referência do model para uma variável
const Equip = mogoose.model("equipamentos");

router.get('/',(req, res) => {
    res.render("admin/index");
})
router.get('/cadequip',(req, res) => {
    res.render("admin/cadastrarequip");
});
router.get('/listarequip', (req, res) => {
    res.render("admin/listarequip");
});

router.post("/listarequip/add", (req, res) => {

    const erros = [];

    if(!req.body.equip || typeof req.body.equip == undefined || req.body.equip == null || req.body.equip == Number){
        erros.push({texto: "Equipamento inválido!"});
    }
    if(!req.body.quantd || typeof req.body.quantd == undefined || req.body.quantd == null){
        erros.push({texto: "Quantidade inválida!"});
    }
    if(typeof req.body.quantd == 'number'){
        erros.push({texto: "Quantidade errada"});
    }
    if(!req.body.marca || typeof req.body.marca == undefined || req.body.marca == null || req.body.marca == Number){
        erros.push({texto: "Marca inválida!"});
    }
    if(!req.body.modelo || typeof req.body.modelo == undefined || req.body.modelo == null){
        erros.push({texto: "Modelo inválido!"});
    }
    if(req.body.quantd = 0 || req.body.quantd < 0){
        erros.push({texto: "Quantidade nula ou inferior a zero"});
    }
    if(erros.length > 0 ){
        res.render("admin/cadastrarequip", {erros: erros});
    }else{
        const newEquip = {
            equipamento: req.body.equip,
            quantidade: req.body.quantd,
            marca: req.body.marca,
            modelo: req.body.modelo
        }
    
        new Equip(newEquip).save().then(() =>{
            req.flash("success_msg", "Equipamento cadastrado com sucesso!");
            res.redirect('/admin/listarequip');
        }).catch((err) => {
            req.flash("error_msg", "Erro ao salvar equipamento");
            console.log("O equipamento não foi cadastrado"+err);
        });
    }


})

module.exports = router;