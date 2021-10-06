const { text } = require("body-parser");
const { Double } = require("bson");
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
const Schema = mongoose.Schema;

const Equip = new Schema({
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

mongoose.model("equipamentos", Equip);