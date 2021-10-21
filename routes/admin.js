const express = require('express');
const router = express.Router();
require("stream") 
//Importar o mogoose
const mogoose = require("mongoose");
//Chamar arquivo do model
require("../models/Categoria");
require("../models/Local");
//Chamar função que passa a referência do model para uma variável
const Equip = mogoose.model("equipamentos");
const Local = mogoose.model("localidade");

router.get('/index', (req, res) => {
    res.render('admin/index');
});

router.get('/cadastrarequip',(req, res) => {
  res.render('admin/cadastrarequip');
});

//rota de listagem
router.get('/listarequip', (req, res) => {
    
    Equip.find().lean().sort({date: 'desc'}).then((equipamentos) => {
        res.render("admin/listarequip", {equipamentos: equipamentos})
    
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os equipamentos"+err);
        res.redirect("/admin");
    })
});

//rota de editar
router.get("/listarequip/edit/:id", (req, res) => {
    Equip.findOne({_id:req.params.id}).lean().then((edit) => {
        res.render("admin/editarequip", {edit: edit})
    }).catch((err) => {
        req.flash("error_msg", "Equipamento inexistente");
        res.redirect("/admin/listarequip")

    });
});

router.post("/listarequip/edit", (req, res) => {
    
    Equip.findOne({_id: req.body.id}).then((edit) => {

        edit.equipamento = req.body.equip
        edit.quantidade = req.body.quantd
        edit.marca = req.body.marca
        edit.modelo = req.body.modelo

        edit.save().then(() => {
            req.flash("success_msg", "Equipamento editado com sucesso!");
            res.redirect("/admin/listarequip");
        }).catch((err) => {
            req.flash("error_msg", "Erro ao salvar a edição do equipamento");
            res.redirect("/admin/listarequip");
        })

    }).catch((err) => {
        req.flash("error_msg", "Erro ao salvar equipamento");
        res.redirect("/admin/listarequip");

    })
});

router.post("/cadastrarequip/add", (req, res) => {

    const erros = [];

    if(!req.body.equip || typeof req.body.equip == undefined || req.body.equip == null || req.body.equip == Number){
        erros.push({texto: "Equipamento inválido!"});
    }
    if(!req.body.quantd || typeof req.body.quantd == undefined || req.body.quantd == null){
        erros.push({texto: "Quantidade inválida!"});
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

router.post("/listarequip/delet", (req, res) => {
    Equip.remove({_id: req.body.id}).then(() =>{
        req.flash("success_msg", "Equipamento removido com sucesso");
        res.redirect("/admin/listarequip");
    }).catch((err) => {
        req.flash("error_msg", "Falha ao remover equipamento");
        res.redirect("/admin/listarequip");
    })
})

router.get("/equipamentos", (req, res) => {
    res.render("admin/equipamentos");
})

router.post("/cadastrarlocal/add", (req, res) => {
    const newLocal = {
        local: req.body.local,
        nucleo: req.body.nucleo,
        setor: req.body.setor
    }

    new Local(newLocal).save().then(() =>{
        req.flash("success_msg", "Localidade cadastrada com sucesso!");
        res.redirect('/admin/listarlocal');
    }).catch((err) => {
        req.flash("error_msg", "Erro ao salvar localidade");
  
    });
});
router.get("/listarlocal", (req, res) => {
    res.render("admin/local");
});
router.get("/cadastrarlocal", (req, res) => {
    res.render("admin/cadastrarlocal");
});

module.exports = router;