const mongoose = require("mongoose");
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
    equip: {
        type: Schema.Types.ObjectId,
        ref: "equipamentos",
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
    
});

mongoose.model("localidade", Local);