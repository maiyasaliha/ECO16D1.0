const mongoose = require('mongoose');

const principaleSchema = new mongoose.Schema({
    dateAjoutee: {
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
    raisonDuRetour: {
        type: String,
        default: '',
    },
    bmRaisonDuRetour: {
        type: String,
        default: '',
    },
    SKU: {
        type: String,
        default: '',
    },
    nomDuProduit: {
        type: String,
        default: '',
    },
    IMEI: {
        type: String,
        default: '',
    },
    transporteur: {
        type: String,
        default: '',
    },
    numeroDeSuivi: {
        type: String,
        default: '',
    },
    customerInformedAboutNonCompliance: {
        type: String,
        default: '',
    },
    customerInformedIfLocked: {
        type: String,
        default: '',
    },
    refunded: {
        type: String,
        default: '',
    },
    returnedToSG: {
        type: String,
        default: '',
    },
    dateReturnedToSG: {
        type: String,
        default: '',
    },
    waybillNo: {
        type: String,
        default: '',
    },
    dateDeReceptionAxe: {
        type: String,
        default: '',
    },
    contenuConforme: {
        type: String,
        default: '',
    },
    IMEIDeReception: {
        type: String,
        default: '',
    },
    etatDeLAppareil: {
        type: String,
        default: '',
    },
    commentaires: {
        type: String,
        default: '',
    },
    lienGooglePourLesImages: {
        type: String,
        default: '',
    },

});

const Principale = mongoose.model('Principale', principaleSchema);
module.exports = Principale;