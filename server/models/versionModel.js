const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    versionNumber: { 
        type: Number, 
        required: true 
    },
    userName: { 
        type: String, 
        required: true 
    },
    dataArray: { 
        type: Array, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

const Version = mongoose.model('Version', versionSchema);
module.exports = Version;
