const express= require("express");

const router= express.Router();
const stationsController= require("../controllers/stations.controllers");

router.route("/stations")
        .get(stationsController.getAll);

router.route("/stations/delete")
        .post(stationsController.deleteManyById);

router.route("/stations/count")
        .get(stationsController.getCount);

router.route("/stations/:stationId")
        .get(stationsController.getOne);

module.exports= router;