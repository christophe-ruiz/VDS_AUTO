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

router.post('/', upload.single('coverletter'), (req, res) => {
    try {
        const id = Date.now().toString()
        console.log('UPLOAD APPLICATION')

        console.log("file", req.file);
        console.log("body", req.body);
        console.log(req.file.originalname, req.file.path);
        let attachementList = [
            {
                filename: req.file.originalname,
                path: req.file.path,
            },
            // {
            //     path: req.body.coverletter,
            // },
        ];

        let transporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail'
        });

        var message = {
            from: 'no-reply@vds.cruiz.fr',
            to: 'christophe-2010@live.fr',
            subject: 'Candidature spontanée',
        //     text: `Nom: ${req.body.nom}\n
        //     Prénom: ${req.body.prenom}\n
        //     E-mail: ${req.body.email}\n
        //     Téléphone: ${req.body.phone}\n
        //     Message ajouté:\n${req.msg}`,
        //     html:
        //         '<div>' +
        //             '<h1>Candidature spontanée</h1>' +
        //             `<p>Nom: ${req.body.nom}</p>` +
        //             `<p>Prénom: ${req.body.prenom}</p>` +
        //             `<p>E-mail: ${req.body.email}</p>` +
        //             `<p>Téléphone: ${req.body.phone}</p>` +
        //             `<p>Message ajouté.: <br> ${req.body.msg}</p>` +
        //         '</div>',
        //     attachments: attachementList
            text: "hello",
            attachments: attachementList
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
        // fs.unlink(req.file.path, () => {});
        res.status(201).json({
            id: id,
            msg: "success",
            data: req.body
        })
    } catch (e) {
        console.error(e)

        res.status(500).json({
            msg: "Internal Error"
        })
    }
})

module.exports = router
