const manageAllErrors = require("../../utils/routes/route-management");
const {Contacts} = require("../../models");
const { Router } = require('express');
const router = new Router();

router.get('/', (req, res) => {
    try {
        const c = Contacts.get()
        console.log("GET CONTACTS")
        console.log(c)
        res.status(200).json(c)
    } catch (e) {
        manageAllErrors(res, e)
    }
})

router.put('/', (req, res) => {
    try {
        Contacts.update(req.body)
        res.status(200).json(req.body)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
