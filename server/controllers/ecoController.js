const Principale = require('../models/principaleModel');
const { accessSpreadsheet } = require('../googleConfig/gsheetsapi')

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
            $expr: { $eq: ['$IMEI', '$IMEIDeReception'] },
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

exports.get7thcol = async (req, res) => {
    try {
        const records = await Principale.find({
            'dateDeReceptionAxe': { $ne: "" },
            'dateReturnedToSG': { $in: [null, ""] },
            'SKU': { $regex: /IP/ },
            $expr: { $ne: ['$IMEI', '$IMEIDeReception'] }
        }, 'BMID');

        const bmids = records.map(record => record.BMID);
        
        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching filtered BMIDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
exports.get8thcol = async (req, res) => {
    try {
      const data = await accessSpreadsheet();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.get9thcol = async (req, res) => {
    try {
        const records = await Principale.find({
            'dateDeReceptionAxe': { $ne: "" },
            'dateReturnedToSG': { $in: [null, ""] },
            'SKU': { $regex: /KS23/ }
        }, 'BMID');

        const bmids = records.map(record => record.BMID);

        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching filtered BMIDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.get10thcol = async (req, res) => {
    try {
        const records = await Principale.find({
            'dateDeReceptionAxe': { $ne: "" },
            'dateReturnedToSG': { $in: [null, ""] },
            'SKU': { $regex: /KS23/ },
            'IMEI': { $ne: "" },
            'raisonDuRetour': { $not: { $regex: /OOW/i } },
            $expr: { $eq: ["$IMEI", "$IMEIDeReception"] }
        }, 'BMID');

        const bmids = records.map(record => record.BMID);

        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching filtered BMIDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.get11thcol = async (req, res) => {
    try {
        const records = await Principale.find({
            'dateDeReceptionAxe': { $ne: "" },
            'dateReturnedToSG': { $in: [null, ""] },
            'SKU': { $regex: /IP/ },
            'raisonDuRetour': { $not: { $regex: /OOW/i } },
            $expr: { $eq: ["$IMEI", "$IMEIDeReception"] }
        }, 'BMID');

        const bmids = records.map(record => record.BMID);

        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching filtered BMIDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.get12thcol = async (req, res) => {
    try {
        const records = await Principale.find({
            $or: [
                { 'raisonDuRetour': { $regex: /oow/i } },
                { 'raisonDuRetour': { $regex: /OOW/ } }
            ],
            'dateReturnedToSG': { $in: [null, ""] },
            'waybillNo': { $in: [null, ""] }
        }, 'BMID');

        const bmids = records.map(record => record.BMID);

        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching filtered BMIDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};