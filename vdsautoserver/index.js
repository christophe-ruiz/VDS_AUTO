const http = require('http');
const crypto = require('crypto');
const fs = require("fs");
const express = require("express");
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

const logger = require('./utils/logger')

const api = require('./api')
const hostname = '127.0.0.1';


const port = 3000;


((cb) => {
    const app = express()
    app.disable('x-powered-by')
    app.use(cors())
    app.use(bodyParser.json({}))
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'))
    app.use('/api', api)
    app.use('*', (req, res) => res.status(404).end())

    app.use(fileUpload({
        createParentPath: true,
        limits: {
            fileSize: 25 * (1024 ** 3)
        },
    }));
    const server = app.listen(process.env.PORT || 9428, () => cb && cb(server))
})((server => {
    logger.info(`Server is listening on port ${server.address().port}`)
}))
