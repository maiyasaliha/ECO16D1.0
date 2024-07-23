const Version = require('../models/versionsModel'); 

exports.createVersion = async (req, res) => {
    const { columnName, rowNumber, oldValue, newValue, userName } = req.body;

    try {
        const version = new Version({
            columnName,
            rowNumber,
            oldValue,
            newValue,
            userName
        });
        console.log("version is ");
        console.log(version);

        await version.save();
        res.status(201).json({ message: 'Version entry created successfully', version });
    } catch (error) {
        console.error("Error creating version entry:", error);
        res.status(500).json({ message: 'Failed to create version entry', error });
    }
};

exports.getVersions = async (req, res) => {
    const { columnName, rowNumber } = req.query;

    try {
        const versions = await Version.find({ columnName, rowNumber });
        res.status(200).json(versions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch version entries', error });
    }
};
