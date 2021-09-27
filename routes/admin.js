const express = require('express');
const router = express.Router();
//Importar o mogoose
const mogoose = require("mongoose");
//Chamar arquivo do model
require("../models/Categoria");
//Chamar função que passa a referência do model para uma variável
const Categoria = mogoose.model("categorias")

router.get('/',(req, res) => {
    res.render("admin/index");
});
router.get('/cadequip',(req, res) => {
    res.render("admin/cadastrarequip");
});
router.get('/listarequip', (req, res) => {
    res.render("admin/listarequip");
});
router.post("/categoria/new", (req, res) => {
    const newCategoria = {
        equipamento: req.body.equip,
        quantidade: req.body.quantd,
        marca: req.body.marca,
        modelo: req.body.modelo
    }
})

module.exports = router;