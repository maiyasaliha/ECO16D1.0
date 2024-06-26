const Principale = require('../models/principaleModel');

exports.get1stcol = async (req, res) => {
    try {
        const records = await Principale.find({
            customerInformedAboutNonCompliance: { $in: ["FALSE", "false", false] },
            contenuConforme: { $in: ["No", "Standby"] }
        }, 'BMID');
        
        const bmids = records.map(record => record.BMID);
        
        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching non-compliant BMIDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.get2ndcol = async (req, res) => {
    try {
        const records = await Principale.find({
            customerInformedIfLocked: { $in: ["FALSE", "false", false] },
            etatDeLAppareil: "LOCKED"
        }, 'BMID');
        
        const bmids = records.map(record => record.BMID);
        
        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching non-compliant BMIDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.get3rdcol = async (req, res) => {
    try {
        const records = await Principale.find({
            refunded: { $in: ["FALSE", "false", false] },
            contenuConforme: "Yes",
            etatDeLAppareil: "Unlocked",
            raisonDuRetour: { $not: { $regex: "(?i)OOW" } }
        }, 'BMID');
        
        const bmids = records.map(record => record.BMID);
        
        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching non-compliant BMIDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.get4thcol = async (req, res) => {
    try {
        const records = await Principale.find({
            'dateDeReceptionAxe': { $ne: "" },
            'dateReturnedToSG': { $in: ["", null] },
            'SKU': { $regex: /IP/ }
        }, 'BMID');

        const bmids = records.map(record => record.BMID);
        
        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching filtered orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.get5thcol = async (req, res) => {
    try {
        const records = await Principale.find({
            'dateDeReceptionAxe': { $ne: "" },
            'dateReturnedToSG': { $in: [null, ""] },
            'SKU': { $regex: /SS/ },
            'raisonDuRetour': { $regex: /auto|turn|screen|lcd|dead/i }
        }, 'BMID');

        const bmids = records.map(record => record.BMID);
        
        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching filtered BMIDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.get6thCol = async (req, res) => {
    try {
        const records = await Principale.find({
            'dateDeReceptionAxe': { $ne: "" },
            'dateReturnedToSG': { $in: [null, ""] },
            'SKU': { $regex: /SS/ },
            'raisonDuRetour': { $regex: /auto|turn|screen|lcd|dead/i },
            'IMEI': { $eq: '$IMEIDeReception' },
            'IMEI': { $ne: "" },
            'raisonDuRetour': { $not: { $regex: "(?i)OOW" } }
        }, 'BMID');

        const bmids = records.map(record => record.BMID);
        
        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching filtered BMIDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};