const Principale = require('../models/principaleModel');
const { accessSpreadsheet } = require('../googleConfig/gsheetsapi');

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


async function getRecords(query) {
    return await Principale.find(query, 'BMID dateAjoutee');
}

exports.getColumns = async (req, res) => {
    try {
        const { year, quarter, column } = req.query;

        if (!year || !quarter || !column) {
            return res.status(400).json({ error: 'Year, quarter, and column are required' });
        }

        if (![1, 2, 3, 4].includes(Number(quarter))) {
            return res.status(400).json({ error: 'Invalid quarter. Quarter must be between 1 and 4.' });
        }

        const startMonth = (quarter - 1) * 3 + 1;
        const endMonth = quarter * 3;
        const endDayOfMonth = getLastDayOfMonth(endMonth, year);

        const startDateString = constructDateString(startMonth, year, '01');
        const endDateString = constructDateString(endMonth, year, endDayOfMonth);

        const startDate = parseDateString(startDateString);
        const endDate = parseDateString(endDateString);

        let query;
        switch (column) {
            case '1':
                query = {
                    customerInformedAboutNonCompliance: { $in: ["FALSE", "false", false] },
                    contenuConforme: { $in: ["No", "Standby"] }
                };
                break;
            case '2':
                query = {
                    customerInformedIfLocked: { $in: ["FALSE", "false", false] },
                    etatDeLAppareil: "LOCKED"
                };
                break;
            case '3':
                query = {
                    refunded: { $in: ["FALSE", "false", false] },
                    contenuConforme: "Yes",
                    etatDeLAppareil: "Unlocked",
                    raisonDuRetour: { $not: { $regex: "(?i)OOW" } }
                };
                break;
            case '4':
                query = {
                    'dateDeReceptionAxe': { $ne: "" },
                    'dateReturnedToSG': { $in: ["", null] },
                    'SKU': { $regex: /IP/ }
                };
                break;
            case '5':
                query = {
                    'dateDeReceptionAxe': { $ne: "" },
                    'dateReturnedToSG': { $in: [null, ""] },
                    'SKU': { $regex: /SS/ },
                    'raisonDuRetour': { $regex: /auto|turn|screen|lcd|dead/i }
                };
                break;
            case '6':
                query = {
                    'dateDeReceptionAxe': { $ne: "" },
                    'dateReturnedToSG': { $in: [null, ""] },
                    'SKU': { $regex: /SS/ },
                    'raisonDuRetour': { $regex: /auto|turn|screen|lcd|dead/i },
                    $expr: { $eq: ['$IMEI', '$IMEIDeReception'] },
                    'IMEI': { $ne: "" },
                    'raisonDuRetour': { $not: { $regex: "(?i)OOW" } }
                };
                break;
            case '7':
                query = {
                    'dateDeReceptionAxe': { $ne: "" },
                    'dateReturnedToSG': { $in: [null, ""] },
                    'SKU': { $regex: /IP/ },
                    $expr: { $ne: ['$IMEI', '$IMEIDeReception'] }
                };
                break;
            case '8':
                const data = await accessSpreadsheet();
                res.status(200).json(data);
                return;
            case '9':
                query = {
                    'dateDeReceptionAxe': { $ne: "" },
                    'dateReturnedToSG': { $in: [null, ""] },
                    'SKU': { $regex: /KS23/ }
                };
                break;
            case '10':
                query = {
                    'dateDeReceptionAxe': { $ne: "" },
                    'dateReturnedToSG': { $in: [null, ""] },
                    'SKU': { $regex: /KS23/ },
                    'IMEI': { $ne: "" },
                    'raisonDuRetour': { $not: { $regex: /OOW/i } },
                    $expr: { $eq: ["$IMEI", "$IMEIDeReception"] }
                };
                break;
            case '11':
                query = {
                    'dateDeReceptionAxe': { $ne: "" },
                    'dateReturnedToSG': { $in: [null, ""] },
                    'SKU': { $regex: /IP/ },
                    'raisonDuRetour': { $not: { $regex: /OOW/i } },
                    $expr: { $eq: ["$IMEI", "$IMEIDeReception"] }
                };
                break;
            case '12':
                query = {
                    $or: [
                        { 'raisonDuRetour': { $regex: /oow/i } },
                        { 'raisonDuRetour': { $regex: /OOW/ } }
                    ],
                    'dateReturnedToSG': { $in: [null, ""] },
                    'waybillNo': { $in: [null, ""] }
                };
                break;
            default:
                return res.status(400).json({ error: 'Invalid column specified' });
        }

        const records = await getRecords(query);

        const filteredRows = records.filter(doc => {
            const dateAjoutee = parseDateString(doc.dateAjoutee);
            return dateAjoutee >= startDate && dateAjoutee <= endDate;
        });

        const bmids = filteredRows.map(record => record.BMID);

        res.status(200).json(bmids);
    } catch (error) {
        console.error('Error fetching non-compliant BMIDs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};