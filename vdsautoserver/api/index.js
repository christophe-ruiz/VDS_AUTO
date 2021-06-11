const { Router } = require('express')
const ApplicationRouter = require('./applications')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/applications', ApplicationRouter)
// router.use('/users', UserRouter)

module.exports = router
