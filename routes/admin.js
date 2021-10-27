const express = require('express');
const router = express.Router();

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
    if(req.body.quantd == 0 || req.body.quantd < 0){
        erros.push({texto: "Quantidade nula ou inferior a 0"});
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


});

router.post("/listarequip/delet", (req, res) => {
    Equip.remove({_id: req.body.id}).then(() =>{
        req.flash("success_msg", "Equipamento removido com sucesso");
        res.redirect("/admin/listarequip");
    }).catch((err) => {
        req.flash("error_msg", "Falha ao remover equipamento");
        res.redirect("/admin/listarequip");
    })
});

router.get("/equipamentos", (req, res) => {
    res.render("admin/equipamentos");
});

router.post("/cadastrarlocal/add", (req, res) => {
    const erros = [];

    if(!req.body.local || typeof req.body.local == undefined || req.body.local == null){
        erros.push({texto: "Equipamento inválido!"});
    }
    if(erros.length > 0 ){
        res.render("admin/cadastrarlocal", {erros: erros});
    }else{
        const novoLocal = {
            local: req.body.local,
            nucleo: req.body.nucleo,
            setor: req.body.setor,
            equip: req.body.equipamentos
        }

        new Local(novoLocal).save().then(() => {
            req.flash("success_msg", "Localidade criada com sucesso!");
            res.redirect("/admin/listarlocal")
        }).catch((err) => {
            req.flash("error_msg", "Falha ao criar localidade"+err);
            res.redirect("/admin/listarlocal");   
        })
    }
});
router.get("/listarlocal", (req, res) => {
    Local.find().populate("equip").lean().sort({data: "desc"}).then((localidade) => {
        res.render("admin/local", {localidade: localidade});
    }).catch((err) => {
        req.flash("error_msg", "Falhar ao listar localdades");
        res.redirect("/admin/listarlocal");
    })
    
});
router.get("/cadastrarlocal", (req, res) => {
    Equip.find().lean().then((equipamentos) => {
        res.render("admin/cadastrarlocal", {equipamentos:equipamentos});
    }).catch((err) => {
        req.flash("error_msg", "Falha a listar os equipamentos");
        res.redirect("/listarlocal");
    });
    
});
router.get("/listarlocal/edit/:id", (req, res) => {
    Local.findOne({_id: req.params.id}).lean().then((local) =>{
        Equip.find().lean().then((equipamentos) => {
            res.render("admin/editarlocal", {equipamentos: equipamentos, local: local})
        }).catch((err) => {
            req.flash("error_msg", "Erro ao listar os equipamentos"+err);
            res.redirect("/admin/listarlocal");
        })
    }).catch((err) => {
        req.flash("error_msg", "Erro ao carregar formulário de edição"+err)
        res.redirect("/admin/listarlocal")
    });
});

router.post("/listarlocal/edit", (req, res) => {
    Local.findOne({_id: req.body.id}).then((local) => {

        local.local = req.body.local
        local.nucleo = req.body.nucleo
        local.setor = req.body.setor
        local.equip = req.body.equip

        local.save().then(() => {
            req.flash("success_msg", "Local editado com sucesso");
            res.redirect("/admin/listarlocal");
        }).catch((err) => {
            req.flash("error_msg", "Erro ao editar localidade"+err);
            res.redirect("/admin/listarlocal")
        })
    }).catch((err) => {
        req.flash("error_msg", "Erro ao editar equipamento"+err);
        res.redirect("/admin/listarlocal");
    });
})

router.get("/listarlocal/delet/:id", (req, res) => {

    Local.remove({_id: req.params.id}).then(() => {
        req.flash("success_msg", "Local removido")
        res.redirect("/admin/listarlocal")
    }).catch((err) => {
        req.flash("error_msg", "Ocorreu um erro ao remover local"+err);
        res.redirect("/admin/listarlocal");
    });
});

module.exports = router;