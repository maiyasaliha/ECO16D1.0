const Principale = require('../models/principaleModel');
exports.getCellRows = async (req, res) => {
    try {
        const rows = await Principale.find();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching cell rows:', error);
        res.status(500).json({ error: 'Could not fetch Cell Rows documents' });
    }
}
exports.getCellRowsQuarter = async (req, res) => {
    try {
        const { year, quarter } = req.query;
        if (!year || !quarter) {
            return res.status(400).json({ error: 'Year and quarter are required' });
        }
        if (![1, 2, 3, 4].includes(Number(quarter))) {
            return res.status(400).json({ error: 'Invalid quarter. Quarter must be between 1 and 4.' });
        }
        const startMonth = (quarter - 1) * 3 + 1;
        const endMonth = quarter * 3;
        const endDayOfMonth = getLastDayOfMonth(endMonth, year);
        const startDateString = constructDateString(startMonth, year, '01');
        const endDateString = constructDateString(endMonth, year, endDayOfMonth);

        console.log('Start Date:', startDateString);
        console.log('End Date:', endDateString);

        const allDocuments = await Principale.find();

        const emptyRows = allDocuments.filter(doc => {
            const fields = doc.toObject();
            return Object.keys(fields).every(key => key === '_id' || key === '__v' || !fields[key]);
        });
        const filteredRows = allDocuments.filter(doc => {
            const dateAjoutee = parseDateString(doc.dateAjoutee);
            return dateAjoutee >= parseDateString(startDateString) && dateAjoutee <= parseDateString(endDateString);
        });

        const combinedRows = [...filteredRows, ...emptyRows];
        console.log('Filtered Rows:', combinedRows.length);

        const responseData = {
            hasData: filteredRows.length > 0,
            combinedRows: combinedRows
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error fetching cell rows:', error);
        res.status(500).json({ error: 'Could not fetch Cell Rows documents' });
    }
};
function constructDateString(month, year, day) {
    const formattedMonth = month.toString().padStart(2, '0');
    return `${day}/${formattedMonth}/${year}`;
}
function parseDateString(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
}
function getLastDayOfMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
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
exports.updateCell = async (req, res) => {
    try {
        const { rowIndex, colIndex, newValue } = req.body;
        const skip = parseInt(rowIndex, 10) || 0;
        const fieldIndex = parseInt(colIndex, 10);
        const results = await Principale
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

exports.updateCellQuarterly = async (req, res) => {
    try {
        const { rowIndex, colIndex, newValue, year, quarter } = req.body;

        if (!year || !quarter) {
            return res.status(400).json({ error: 'Year and quarter are required' });
        }

        if (![1, 2, 3, 4].includes(Number(quarter))) {
            return res.status(400).json({ error: 'Invalid quarter. Quarter must be between 1 and 4.' });
        }

        const startMonth = (quarter - 1) * 3 + 1;
        const endMonth = quarter * 3;
        const endDayOfMonth = getLastDayOfMonth(endMonth, year);

        const startDateString = constructDateString(startMonth, year, '01');
        const endDateString = constructDateString(endMonth, year, endDayOfMonth);

        const allDocuments = await Principale.find();

        const emptyRows = allDocuments.filter(doc => {
            const fields = doc.toObject();
            return Object.keys(fields).every(key => key === '_id' || key === '__v' || !fields[key]);
        });
        const filteredRows = allDocuments
            .filter(doc => {
                const dateAjoutee = parseDateString(doc.dateAjoutee);
                return dateAjoutee >= parseDateString(startDateString) && dateAjoutee <= parseDateString(endDateString);
            })
            // .sort((a, b) => parseDateString(a.dateAjoutee) - parseDateString(b.dateAjoutee));

        const combinedRows = [...filteredRows, ...emptyRows];
        console.log('Filtered Rows:', combinedRows.length);

        if (combinedRows.length === 0) {
            return res.status(404).json({ error: 'No data found for the given year and quarter.' });
        }

        const rowIndexInt = parseInt(rowIndex, 10) || 0;

        if (rowIndexInt >= combinedRows.length) {
            return res.status(404).json({ error: 'No data found for the given rowIndex.' });
        }

        const rowData = combinedRows[rowIndexInt];
        const keys = Object.keys(rowData.toObject());
        const keyToUpdate = keys[colIndex + 1];

        rowData[keyToUpdate] = newValue;

        await rowData.save();

        console.log(`Document with _id ${rowData._id} updated with ${keyToUpdate} successfully.`);
        res.status(200).json({ message: 'Cell updated successfully.' });
    } catch (error) {
        console.error('Error updating cell data:', error);
        res.status(500).json({ error: 'An error occurred while updating cell data.' });
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

exports.getAllBMIDs = async (req, res) => {
    try {
        const records = await Principale.find({ BMID: { $ne: "" } }, 'BMID');
        const bmids = records.map(record => record.BMID);

        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching all BMIDs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllBMIDsId = async (req, res) => {
    try {
        const records = await Principale.find({ BMID: { $ne: "" } }, '_id BMID');
        const bmids = records.map(record => ({ _id: record._id, BMID: record.BMID }));

        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching all BMIDs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getEmptyRows = async (req, res) => {
    try {
        const allDocuments = await Principale.find();
        const emptyRows = allDocuments.filter(doc => {
            const fields = doc.toObject();
            return Object.keys(fields).every(key => key === '_id' || key === '__v' || !fields[key]);
        });

        res.status(200).json(emptyRows);
    } catch (error) {
        console.error('Error fetching empty rows:', error);
        res.status(500).json({ error: 'Could not fetch empty rows documents' });
    }
};

exports.add100CellRow = async (req, res) => {
    try {
        const records = Array(100).fill({});

        await Principale.insertMany(records);
        res.status(201).send({ message: '100 records created successfully' });
      } catch (error) {
        res.status(500).send({ message: 'Error creating records', error });
      }
};

exports.updateCellEmptyRow = async (req, res) => {
    try {
        const { rowIndex, colIndex, newValue } = req.body;

        if (rowIndex == null || colIndex == null || newValue == null) {
            return res.status(400).json({ error: 'rowIndex, colIndex, and newValue are required' });
        }

        const allDocuments = await Principale.find();
        const emptyRows = allDocuments.filter(doc => {
            const fields = doc.toObject();
            return Object.keys(fields).every(key => key === '_id' || key === '__v' || !fields[key]);
        });

        if (emptyRows.length === 0) {
            return res.status(404).json({ error: 'No empty rows found.' });
        }

        const rowIndexInt = parseInt(rowIndex, 10);
        if (rowIndexInt >= emptyRows.length) {
            return res.status(404).json({ error: 'No data found for the given rowIndex.' });
        }

        const rowData = emptyRows[rowIndexInt];
        const keys = Object.keys(rowData.toObject());
        const keyToUpdate = keys[colIndex + 1];

        rowData[keyToUpdate] = newValue;

        await rowData.save();

        console.log(`Document with _id ${rowData._id} updated with ${keyToUpdate} successfully.`);
        res.status(200).json({ message: 'Cell updated successfully.' });
    } catch (error) {
        console.error('Error updating cell data:', error);
        res.status(500).json({ error: 'An error occurred while updating cell data.' });
    }
};

function createSearchRegex(keyword) {
    return new RegExp(keyword, 'i');
}

exports.searchKeyword = async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword) {
            return res.status(400).json({ error: 'Keyword is required' });
        }

        const searchRegex = createSearchRegex(keyword);

        const searchCriteria = {
            $or: [
                { dateAjoutee: { $regex: searchRegex } },
                { BMID: { $regex: searchRegex } },
                { nomDuClient: { $regex: searchRegex } },
                { raisonDuRetour: { $regex: searchRegex } },
                { bmRaisonDuRetour: { $regex: searchRegex } },
                { SKU: { $regex: searchRegex } },
                { nomDuProduit: { $regex: searchRegex } },
                { IMEI: { $regex: searchRegex } },
                { transporteur: { $regex: searchRegex } },
                { numeroDeSuivi: { $regex: searchRegex } },
                { customerInformedAboutNonCompliance: { $regex: searchRegex } },
                { customerInformedIfLocked: { $regex: searchRegex } },
                { refunded: { $regex: searchRegex } },
                { returnedToSG: { $regex: searchRegex } },
                { dateReturnedToSG: { $regex: searchRegex } },
                { waybillNo: { $regex: searchRegex } },
                { dateDeReceptionAxe: { $regex: searchRegex } },
                { contenuConforme: { $regex: searchRegex } },
                { IMEIDeReception: { $regex: searchRegex } },
                { etatDeLAppareil: { $regex: searchRegex } },
                { commentaires: { $regex: searchRegex } },
                { lienGooglePourLesImages: { $regex: searchRegex } },
            ],
        };

        const matchingDocuments = await Principale.find(searchCriteria);

        res.status(200).json(matchingDocuments);
    } catch (error) {
        console.error('Error searching documents:', error);
        res.status(500).json({ error: 'An error occurred while searching for documents' });
    }
};