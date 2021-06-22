const manageAllErrors = require("../../utils/routes/route-management");
const {Mechanic} = require("../../models");
const { Router } = require('express');
const router = new Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/avi/");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
})

router.get('/', (req, res) => {
    try {
        const m = Mechanic.get()
        console.log("GET MECHANICS")
        console.log(m)
        res.status(200).json(m)
    } catch (e) {
        manageAllErrors(res, e)
    }
})

router.put('/', (req, res) => {
    try {
        console.log("TEAM")
        console.log(req.body.team)
        Mechanic.update(req.body.team)
        res.status(200).json(req.body.team)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/', (req, res) => {
    try {
        Mechanic.suppr(req.body);
        res.status(200).json(req.body);
    } catch (e) {
        manageAllErrors(res, e);
    }
})

module.exports = router
