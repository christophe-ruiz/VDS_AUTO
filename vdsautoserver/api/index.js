const { Router } = require('express')
const ApplicationRouter = require('./applications')
const MatesRouter = require('./mechanics')
const MessagesRouter = require('./messages')
const ContactsRouter = require('./contacts')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/applications', ApplicationRouter);
router.use('/mechanics', MatesRouter);
router.use('/messages', MessagesRouter);
router.use('/contacts', ContactsRouter);

module.exports = router
