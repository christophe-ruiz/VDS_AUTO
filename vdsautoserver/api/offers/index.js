const {Offer} = require('../../models')
const manageAllErrors = require("../../utils/routes/route-management");

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res) => {
    try {
        const o = Offer.get()
        console.log("GET MECHANICS")
        console.log(o)
        res.status(200).json(o)
    } catch (e) {
        manageAllErrors(res, e)
    }
})


router.put('/', (req, res) => {
    try {
        console.log("TEAM")
        console.log(req.body.offers)
        Offer.update(req.body.offers)
        res.status(200).json(req.body.offers)
    } catch (err) {
        manageAllErrors(res, err)
    }
})


module.exports = router
