const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Offer', {
    id: Joi.number().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
})
