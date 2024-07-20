const mongoose = require('mongoose');


const HistorySchema = new mongoose.Schema({
    country: String,
    date: String,
    text: String,
    icon: String,
    tempc: String,
    wind_mph: String,
    humidity: String
});

module.exports = mongoose.model('History', HistorySchema);