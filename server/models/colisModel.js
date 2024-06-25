const mongoose = require('mongoose');

const colisSchema = new mongoose.Schema({
    dateCreee: {
        type: String,
        default: '',
    },
    BMID: {
        type: String,
        default: '',
    },
    nomDuClient: {
        type: String,
        default: '',
    },
    informations: {
        type: String,
        default: '',
    },
});

const Colis = mongoose.model('Colis', colisSchema);
module.exports = Colis;