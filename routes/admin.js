const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.render("admin/index");
});
router.get('/cadequip',(req, res) => {
    res.render("admin/cadastrarequip");
});
router.get('/listarequip', (req, res) => {
    res.render("admin/listarequip");
});

module.exports = router;