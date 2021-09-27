const { text } = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Categoria = new Schema({
    equipamento: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    }
});

mongoose.model("categorias", Categoria);