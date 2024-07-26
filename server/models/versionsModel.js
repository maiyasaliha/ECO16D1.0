const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    columnName: {
        type: String,
        required: true,
    },
    rowNumber: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date, 
        default: Date.now 
    },
    oldValue: {
        type: String,
    },
    newValue: {
        type: String,
    },
    userName: {
        type: String,
        required: true,
    },
    organisation: {
        type: String,
        required: true,
    },
    sheet: {
        type: String,
        required: true,
    }

});

const Version = mongoose.model('Version', versionSchema);
module.exports = Version;