const { Router } = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const multer = require('multer');
const path = require("path");

const dotenv = require("dotenv")
dotenv.config()

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join( __dirname + "/tmp/"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({
    storage: storage
})

const router = new Router();


router.get('/', (req, res) => {
    res.status(200).json("applications")
})

router.post('/',
    upload.fields([
        {
            name: 'coverletter',
            maxCount: 1
        },{
            name: 'resume',
            maxCount: 1
        }
    ]),
    (req, res) => {
        try {
            console.log('UPLOAD APPLICATION')
            let attachmentList = [
                {
                    filename: req.files['resume'][0].originalname,
                    path: req.files['resume'][0].path,
                },
                {
                    filename: req.files['coverletter'][0].originalname,
                    path: req.files['coverletter'][0].path,
                },
            ];

            // let transporter = nodemailer.createTransport({
            //     sendmail: true,
            //     newline: 'unix',
            //     path: '/usr/sbin/sendmail'
            // });

            const transporter = nodemailer.createTransport({
                host: process.env.MAIL_SERVER,
                port: process.env.MAIL_OUT_PORT,
                secure: true,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PWD
                }
            })

            let offer = ``;
            if (req.body.offerTitle) {
                offer = `<p> Offre selectionnée: ${req.body.offerTitle} ${req.body.offer}.</p>`;
            }

            const message = {
                from: `"Recrutement VDS Auto" <${process.env.MAIL_USER}>`,
                to: 'vds-auto13@orange.fr',
                subject: 'Candidature',
                text: `Nom: ${req.body.nom}\n
                Offre: ${req.body.offerTitle} (${req.body.offer})\n
                Prénom: ${req.body.prenom}\n
                E-mail: ${req.body.email}\n
                Téléphone: ${req.body.phone}\n
                Message ajouté:\n${req.body.msg}`,
                html:
                    '<h1>Candidature</h1>' +
                    offer +
                    `<p>Nom: ${req.body.nom}</p>` +
                    `<p>Prénom: ${req.body.prenom}</p>` +
                    `<p>E-mail: ${req.body.email}</p>` +
                    `<p>Téléphone: ${req.body.phone}</p>` +
                    `<p>Message ajouté: <br> ${req.body.msg}</p>`,
                attachments: attachmentList
            };

            const confirm = {
                from: `"Recrutement VDS Auto" <${process.env.MAIL_USER}>`,
                to: `${req.body.email}`,
                subject: 'Candidature - VDS Auto',
                text: `Nom: ${req.body.nom}\n
                Offre: ${req.body.offerTitle} (${req.body.offer})\n
                Prénom: ${req.body.prenom}\n
                E-mail: ${req.body.email}\n
                Téléphone: ${req.body.phone}\n
                Message ajouté:\n${req.body.msg}`,
                html:
                    '<h1>Candidature - VDS Auto</h1>' +
                    offer +
                    `<p>Nom: ${req.body.nom}</p>` +
                    `<p>Prénom: ${req.body.prenom}</p>` +
                    `<p>E-mail: ${req.body.email}</p>` +
                    `<p>Téléphone: ${req.body.phone}</p>` +
                    `<p>Message ajouté.: <br> ${req.body.msg}</p>`,
                attachments: attachmentList
            };

            transporter.sendMail(message, (error, info) => {
                if (error) {
                    throw error;
                }
                console.log('Message sent: ', info.messageId);
            });

            transporter.sendMail(confirm, (error, info) => {
                if (error) {
                    throw error;
                }
                console.log('Message sent: ', info.messageId);
            });

            res.status(201).json({
                msg: "success",
                data: req.body
            })
        } catch (e) {
            console.error(e)

            res.status(500).json({
                msg: "Internal Error",
                e: e.msg,
                req: req.body
            })
        } finally {
            setTimeout(() => {
                fs.unlink(__dirname + '/tmp/' + req.files['resume'][0].originalname, () => {});
                fs.unlink(__dirname + '/tmp/' + req.files['coverletter'][0].originalname, () => {});
            }, 60 * 60 * 1000);
        }
    });

module.exports = router
