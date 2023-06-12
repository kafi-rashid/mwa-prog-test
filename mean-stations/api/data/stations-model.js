const mongoose = require("mongoose");

const stationSchema = mongoose.Schema({
    st: String,
    ts: Date,
    airTemerature: Number,
    dewPoint: Number,
    pressure: Number,
    wind: {
        direction: Number,
        speed: Number
    },
    visibility: Number,
    precipitationEstimatedObservation: Number
});

mongoose.model(process.env.STATION_MODEL, stationSchema, process.env.DB_STATIONS_COLLECTION);