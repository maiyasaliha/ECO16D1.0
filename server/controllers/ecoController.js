const Principale = require('../models/principaleModel');

exports.get1strow = async (req, res) => {
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

exports.get2ndrow = async (req, res) => {
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

exports.get3rdrow = async (req, res) => {
    try {
        const records = await Principale.find({
            refunded: { $in: ["FALSE", "false", false] },
            contenuConforme: "Yes",
            etatDeLAppareil: "Unlocked",
        }, 'BMID');
        
        const bmids = records.map(record => record.BMID);
        
        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching non-compliant BMIDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};