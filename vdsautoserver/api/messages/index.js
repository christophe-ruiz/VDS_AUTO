const manageAllErrors = require("../../utils/routes/route-management");
const { Router } = require('express');
const {Message} = require("../../models");
const router = new Router();

router.get('/', (req, res) => {
    try {
        const m = Message.get()
        console.log("GET MESSAGE")
        console.log(m)
        res.status(200).json(m.msg)
    } catch (e) {
        manageAllErrors(res, e)
    }
})

router.put('/', (req, res) => {
    try {
        console.log("PUT MESSAGE")
        console.log(req.body.msg)
        Message.update(req.body)
        res.status(200).json(req.body.msg)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
