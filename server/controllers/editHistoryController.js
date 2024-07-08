const EditHistory = require('../models/editHistoryModel');

exports.createEditHistory = async (req, res) => {
    try {
        const newEditHistory = new EditHistory(req.body);
        await newEditHistory.save();
        res.status(201).json({ message: 'Edit history saved successfully.' });
    } catch (error) {
        console.error('Error saving edit history:', error);
        res.status(500).json({ error: 'An error occurred while saving edit history.' });
    }
};

exports.getEditHistory = async (req, res) => {
    try {
      const { rowIndex, colIndex, year, quarter } = req.query;
      const query = {};
  
      if (rowIndex) query.rowIndex = rowIndex;
      if (colIndex) query.colIndex = colIndex;
      if (year) query.year = year;
      if (quarter) query.quarter = quarter;
  
      const history = await EditHistory.find(query).sort({ timestamp: -1 });
      res.status(200).json(history);
    } catch (error) {
      console.error('Error fetching edit history:', error);
      res.status(500).json({ error: 'An error occurred while fetching edit history.' });
    }
  };
  