const manageAllErrors = require("../../utils/routes/route-management");
const {Contacts} = require("../../models");
const { Router } = require('express');
const checkAdmin = require('../../utils/check-admin');
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

router.put('/', checkAdmin, (req, res) => {
    try {
        Contacts.update(req.body.contact)
        res.status(200).json(req.body.contact)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
