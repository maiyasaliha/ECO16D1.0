const Eco = require('../models/ecoModel');

exports.getCellRows = async (req, res) => {
    try {
        const rows = await Eco.find();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching cell rows:', error);
        res.status(500).json({ error: 'Could not fetch Cell Rows documents' });
    }
};
