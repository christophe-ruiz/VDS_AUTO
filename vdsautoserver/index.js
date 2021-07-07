const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();

const logger = require('./utils/logger');

const api = require('./api');


((cb) => {
    const app = express()
    app.disable('x-powered-by')
    app.use(cors())
    app.use(bodyParser.json({limit: '100mb'}))
    app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}));
    app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'))
    app.use('/api', api)
    app.use('*', (req, res) => res.status(404).end())

    app.use(fileUpload({
        createParentPath: true,
        limits: {
            fileSize: 25 * (1024 ** 3)
        },
    }));
    const server = app.listen(process.env.PORT, () => cb && cb(server))
})((server => {
    logger.info(`Server is listening on port ${server.address().port}`)
}))
