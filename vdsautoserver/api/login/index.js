const { Router } = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const manageAllErrors = require("../../utils/routes/route-management");
const {Login} = require("../../models");

router.get('/', (req, res) => {
    res.status(200).json("login")
});

router.post('/', (req, res) => {
    try {
        let pwd = req.body.pwd;
        bcrypt.compare(pwd, Login.get().pwd, (e, result) => {
            if(result) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }
        });
    } catch (e) {
        manageAllErrors(res, e)
    }
});

module.exports = router
