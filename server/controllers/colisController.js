const Colis = require('../models/colisModel');

exports.getCellRows = async (req, res) => {
    try {
        const rows = await Colis.find();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching cell rows:', error);
        res.status(500).json({ error: 'Could not fetch Cell Rows documents' });
    }
};

exports.postCellRow = async (req, res) => {
    const cr = req.body;
    try {
        const result = await Colis.create(cr);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating new cell row:', error);
        res.status(500).json({ error: 'Could not create a new Cell Row document' });
    }
};

exports.updateCell = async (req, res) => {
    try {
        const { rowIndex, colIndex, newValue } = req.body;

        const skip = parseInt(rowIndex, 10) || 0;
        const fieldIndex = parseInt(colIndex, 10);

        const results = await Colis
            .find({})
            .skip(skip)
            .limit(1);

        if (results.length === 0) {
            return res.status(404).json({ error: 'No data found for the given rowIndex.' });
        }

        const rowData = results[0];
        const keys = Object.keys(rowData.toObject());
        const keyToUpdate = keys[fieldIndex + 1];
        
        rowData[keyToUpdate] = newValue;

        await rowData.save();

        console.log(`Document with _id ${rowData._id} updated with ${keyToUpdate} successfully.`);
        res.status(200).json({ message: 'Cell updated successfully.' });
    } catch (error) {
        console.error('Error updating cell data:', error);
        res.status(500).json({ error: 'An error occurred while updating cell data.' });
    }
};

exports.getAllBMIDs = async (req, res) => {
    try {
        const records = await Colis.find({ BMID: { $ne: "" } }, 'BMID');
        const bmids = records.map(record => record.BMID);

        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching all BMIDs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
