const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = new Router();

router.get('/', (req, res) => {
    res.status(200).json("applications")
})

router.post('/', (req, res) => {
    try {
        const id = Date.now().toString()
        console.log(req)
        let attachementList = [
            {
                path: req.body.resume,
            },
            {
                path: req.body.coverletter,
            },
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
            text: `Nom: ${req.body.nom}\n
            Prénom: ${req.body.prenom}\n
            E-mail: ${req.body.email}\n
            Tél.: ${req.body.phone}\n
            Message ajouté:\n${req.msg}`,
            html:
                '<div>' +
                    '<h1>Candidature spontanée</h1>' +
                    `<p>Nom: ${req.body.nom}</p>` +
                    `<p>Prénom: ${req.body.prenom}</p>` +
                    `<p>E-mail: ${req.body.email}</p>` +
                    `<p>Tél.: ${req.body.phone}</p>` +
                    `<p>Message ajouté.: <br> ${req.body.msg}</p>` +
                '</div>',
            attachements: attachementList
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
        res.status(201).json({
            id: id,
            msg: "success"
        })
    } catch (e) {
        console.error(e)

        res.status(500).json({
            msg: "Internal Error"
        })
    }
})

module.exports = router
