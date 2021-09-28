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
    const newEquip = {
        equipamento: req.body.equip,
        quantidade: req.body.quantd,
        marca: req.body.marca,
        modelo: req.body.modelo
    }

    new Equip(newEquip).save().then(() =>{
        console.log("Equipamento cadastrado com sucesso!");
    }).catch((err) => {
        console.log("O equipamento não foi cadastrado"+err);
    });
})

module.exports = router;