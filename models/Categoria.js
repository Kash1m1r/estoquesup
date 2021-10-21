const mongoose = require("mongoose");
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
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model("equipamentos", Equip);