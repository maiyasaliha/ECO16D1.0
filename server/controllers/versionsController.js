const Version = require('../models/versionsModel'); 

exports.createVersion = async (req, res) => {
    const { columnName, rowNumber, oldValue, newValue, userName, organisation } = req.body;

    try {
        const latestMatchingVersion = await Version.findOne({
            columnName,
            rowNumber,
            oldValue,
            newValue
        }).sort({ timestamp: -1 });

        const latestVersion = await Version.findOne().sort({ timestamp: -1 });

        if (!isValidColumn(organisation, columnName)) {
            return res.status(200).json({
                message: 'Invalid version.',
            });
        }
        if (latestMatchingVersion) {
            const currentTimestamp = new Date();
            const latestTimestamp = latestMatchingVersion.timestamp;
            const timeDifference = currentTimestamp - latestTimestamp;

            const minuteInMillis = 60 * 1000;
            if (timeDifference < minuteInMillis) {
                return res.status(200).json({
                    message: 'Latest version found within a minute. No new version created.',
                    version: latestMatchingVersion
                });
            }
        }
        if (
            latestVersion &&
            latestVersion.columnName === columnName &&
            latestVersion.rowNumber === rowNumber &&
            latestVersion.oldValue === oldValue &&
            latestVersion.newValue === newValue
        ) {
            return res.status(200).json({
                message: 'Latest version found. No new version created.',
                version: latestVersion
            });
        }

        if (newValue === oldValue) {
            return res.status(200).json({
                message: 'No change made. Version not saved',
            });
        }

        const version = new Version({
            columnName,
            rowNumber,
            oldValue,
            newValue,
            userName,
            organisation
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
        const versions = await Version.find({ columnName, rowNumber }).sort({ timestamp: -1 });
        res.status(200).json(versions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch version entries', error });
    }
};

function isValidColumn(organisation, columnName) {
    const ecoheaders = [
        'date ajoutée', 'BMID', 'Nom du client', 'Raison du retour', 'BM Raison du retour', 'SKU', 'Nom du produit', 
        'IMEI', 'Transporteur', 'Numéro de suivi', 'Customer Informed about non-compliance', 'Customer informed if locked?', 
        'Refunded', 'Returned to SG', 'Date returned to SG', 'Waybill No.'
    ];
    const axeheaders = [
        'Date de réception Axe', 'Contenu conforme ?', 
        'IMEI de réception', 'État de l`appareil', 'Commentaires (Rayures ? Bosses ?)', 
        'Lien Google pour les images (https://drive.google.com/drive/folders/1SNzn0LkNwHqi_IO4i-FcuWr7ytwRjS3D?usp=sharing)'
    ];
    if (organisation === 'ECO') {
        return ecoheaders.includes(columnName);        
    }
    if (organisation === 'AXE') {
        return axeheaders.includes(columnName); 
    }
}