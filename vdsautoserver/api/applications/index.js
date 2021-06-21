const { Router } = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/tmp/");
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

            let transporter = nodemailer.createTransport({
                sendmail: true,
                newline: 'unix',
                path: '/usr/sbin/sendmail'
            });

            let offer = ``;
            if (req.body.offerTitle) {
                offer = `<p> Offre selectionnée: ${req.body.offerTitle} ${req.body.offer}.</p>`;
            }

            const message = {
                from: 'no-reply@vds.cruiz.fr',
                to: 'christophe-2010@live.fr',
                subject: 'Candidature spontanée',
                text: `Nom: ${req.body.nom}\n
                Offre: ${req.body.offerTitle} (${req.body.offer})\n
                Prénom: ${req.body.prenom}\n
                E-mail: ${req.body.email}\n
                Téléphone: ${req.body.phone}\n
                Message ajouté:\n${req.body.msg}`,
                html:
                    '<h1>Candidature spontanée</h1>' +
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
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
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
