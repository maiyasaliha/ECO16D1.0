const Version = require('../models/versionModel');

exports.saveVersion = async (req, res) => {
    const { dataArray, userName } = req.body;

    if (!dataArray || dataArray.length === 0) {
        return res.status(400).json({ error: 'Data array cannot be empty.' });
    }
    
    try {
        const lastVersion = await Version.findOne().sort({ versionNumber: -1 });
        const newVersionNumber = lastVersion ? lastVersion.versionNumber + 1 : 1;

        const newVersion = new Version({
            versionNumber: newVersionNumber,
            userName,
            dataArray
        });

        await newVersion.save();
        console.log('New version saved:', newVersion);
        res.status(200).json({ message: 'Version saved successfully.' });
    } catch (error) {
        console.error('Error saving version:', error);
        res.status(500).json({ error: 'An error occurred while saving version.' });
    }
};

exports.getAllVersions = async (req, res) => {
    try {
        const versions = await Version.find().sort({ versionNumber: -1 });
        if (versions.length === 0) {
            return res.status(404).json({ message: 'No versions found.' });
        }

        console.log(versions.length);
        res.status(200).json(versions);
    } catch (error) {
        console.error('Error fetching versions:', error);
        res.status(500).json({ error: 'An error occurred while fetching the versions.' });
    }
};