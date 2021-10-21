const mongoose = require("mongoose");
const { text } = require("stream/consumers");
const Schema = mongoose.Schema;

const Local = new Schema({
    local: {
        type: String,
        required: true
    },
    nucleo: {
        type: String,
        required: true
    },
    setor: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    },
    equip: {
        type: Schema.Types.ObjectId,
        ref: "equipamentos",
        required: true
    }
});

mongoose.model("localidade", Local);