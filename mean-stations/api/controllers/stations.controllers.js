const mongoose = require("mongoose");
const Station = mongoose.model(process.env.STATION_MODEL);

const getAll = function (req, res) {
    let offset = 0;
    let count = 5;
    const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: ""
    };
    if (req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    Station.find().skip(offset).limit(count).exec().then((stations)=>{
        response.message= stations;
    })
    .catch((err)=>{
        response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
        response.message= err;
    })
    .finally(()=>{
        res.status(response.status).json(response.message);
    });
}

const getCount = function (req, res) {
    const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: ""
    };
    Station.find().count().exec().then((count)=>{
        response.message= count;
    })
    .catch((err)=>{
        response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
        response.message= err;
    })
    .finally(()=>{
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const stationId = req.params.stationId;
    const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: ""
    };
    Station.findById(stationId).exec().then((station)=>{
        if (!station) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        } else {
            response.message= station;
        }
    })
    .catch((err)=>{
        response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
        response.message= err;
    })
    .finally(()=>{
        res.status(response.status).json(response.message);
    });
}

const deleteManyById = function (req, res) {
    const stationIds = req.body;
    const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: ""
    };
    Station.deleteMany({ _id: { $in: stationIds } }).then((response)=>{
        response.message = {
            "message": process.env.STATIONS_DELETED
        };
    })
    .catch((err)=>{
        response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
        response.message= err;
    })
    .finally(()=>{
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll,
    getOne,
    getCount,
    deleteManyById
};