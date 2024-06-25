const mongoose = require('mongoose');

const ecoSchema = new mongoose.Schema({
    A: {
        type: String,
        default: '',
    },
    B: {
        type: String,
        default: '',
    },
    C: {
        type: String,
        default: '',
    },
    D: {
        type: String,
        default: '',
    },
    E: {
        type: String,
        default: '',
    },
    F: {
        type: String,
        default: '',
    },
    G: {
        type: String,
        default: '',
    },
    H: {
        type: String,
        default: '',
    },
    I: {
        type: String,
        default: '',
    },
    J: {
        type: String,
        default: '',
    },
    K: {
        type: String,
        default: '',
    },
    L: {
        type: String,
        default: '',
    }
});

const Eco = mongoose.model('Eco', ecoSchema);
module.exports = Eco;