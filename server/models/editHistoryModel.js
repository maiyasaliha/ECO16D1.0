const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    rowIndex: {
        type: Number,
        required: true,
    },
    colIndex: {
        type: Number,
        required: true,
    },
    previousValue: {
        type: String,
        required: true,
    },
    newValue: {
        type: String,
        required: true,
    },
    editedBy: {
        type: String,
        required: true,
    },
    timestamp: { 
        type: Date, 
        required: true,
        default: Date.now 
    },
    year: {
        type: Number,
        required: true,
    },
    quarter: {
        type: Number,
        required: true,
    }
});

const EditHistory = mongoose.model('EditHistory', userSchema);
module.exports = EditHistory;