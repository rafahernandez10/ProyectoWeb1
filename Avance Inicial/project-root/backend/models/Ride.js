const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    driver: String,
    from: String,
    to: String,
    date: Date,
    seatsAvailable: Number
});

module.exports = mongoose.model('Ride', rideSchema);
