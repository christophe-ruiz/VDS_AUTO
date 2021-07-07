const { Router } = require('express');
const router = new Router();
const bcrypt = require('bcrypt');
const manageAllErrors = require("../../utils/routes/route-management");
const {Login} = require("../../models");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.get('/', (req, res) => {
    res.status(200).json("login")
});

router.post('/', (req, res) => {
    try {
        let pwd = req.body.pwd;
        bcrypt.compare(pwd, Login.get().pwd, (e, result) => {
            if(result) {
                res.status(200).json({
                    token: jwt.sign({
                        who: 'vdsamin'
                    }, process.env.TOKEN_SECRET, {expiresIn: "2 days"})
                });
            } else {
                res.status(400).json(result);
            }
        });
    } catch (e) {
        manageAllErrors(res, e)
    }
});

module.exports = router
