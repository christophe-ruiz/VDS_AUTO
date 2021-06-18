const { Router } = require('express')
const ApplicationRouter = require('./applications')
const MatesRouter = require('./mechanics')
const MessagesRouter = require('./messages')
const ContactsRouter = require('./contacts')
const OffersRouter = require('./offers')
const LoginRouter = require('./login')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/applications', ApplicationRouter);
router.use('/mechanics', MatesRouter);
router.use('/messages', MessagesRouter);
router.use('/contacts', ContactsRouter);
router.use('/offers', OffersRouter);
router.use('/login', LoginRouter);

module.exports = router
