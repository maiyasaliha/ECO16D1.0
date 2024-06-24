const { ObjectId } = require('mongoose').Types;
const Principale = require('../models/principaleModel');

exports.getCellRows = async (req, res) => {
    try {
        const rows = await Principale.find();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching cell rows:', error);
        res.status(500).json({ error: 'Could not fetch Cell Rows documents' });
    }
};

exports.getCellRowById = async (req, res) => {
    const { id } = req.params;
    try {
        if (ObjectId.isValid(id)) {
            const row = await Principale.findById(id);
            if (row) {
                res.status(200).json(row);
            } else {
                res.status(404).json({ error: 'Cell Row not found' });
            }
        } else {
            res.status(400).json({ error: 'Invalid Cell Row ID' });
        }
    } catch (error) {
        console.error('Error fetching cell row by ID:', error);
        res.status(500).json({ error: 'Could not fetch Cell Row document' });
    }
};

exports.postCellRow = async (req, res) => {
    const cr = req.body;
    try {
        const result = await Principale.create(cr);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating new cell row:', error);
        res.status(500).json({ error: 'Could not create a new Cell Row document' });
    }
};

exports.updateCellRow = async (req, res) => {
    const { _id, field, value } = req.body;
    try {
        if (ObjectId.isValid(_id)) {
            const result = await Principale.updateOne(
                { _id },
                { $set: { [field]: value } }
            );
            if (result.nModified > 0) {
                res.status(200).json({ message: 'Document updated successfully' });
            } else {
                res.status(404).json({ error: 'Document not found' });
            }
        } else {
            res.status(400).json({ error: 'Invalid document ID' });
        }
    } catch (error) {
        console.error('Error updating cell row:', error);
        res.status(500).json({ error: 'Could not update the Cell Row document' });
    }
};

exports.updateCellValue = async (req, res) => {
    const { id } = req.params;
    const { field, value } = req.body;
    try {
        if (ObjectId.isValid(id)) {
            const result = await Principale.updateOne(
                { _id: id },
                { $set: { [field]: value } }
            );
            if (result.nModified > 0) {
                res.status(200).json({ message: `Field ${field} updated successfully` });
            } else {
                res.status(404).json({ error: 'Document not found' });
            }
        } else {
            res.status(400).json({ error: 'Invalid document ID' });
        }
    } catch (error) {
        console.error('Error updating cell value:', error);
        res.status(500).json({ error: 'Could not update the field' });
    }
};

exports.getCell = async (req, res) => {
    const { rowIndex, colIndex } = req.params;
    try {
        const skip = parseInt(rowIndex, 10) || 0;
        const fieldIndex = parseInt(colIndex, 10);

        const rowData = await Principale
            .findOne()
            .skip(skip)
            .select(`field${fieldIndex + 1}`)
            .exec();

        if (!rowData) {
            return res.status(404).json({ error: 'No data found for the given rowIndex.' });
        }

        const fieldValue = rowData[`field${fieldIndex + 1}`];

        console.log('Field value:', fieldValue);
        res.status(200).json({ value: fieldValue });
    } catch (error) {
        console.error('Error fetching cell data:', error);
        res.status(500).json({ error: 'An error occurred while fetching cell data.' });
    }
};
