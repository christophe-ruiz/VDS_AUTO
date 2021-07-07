const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Contacts', {
    phone: Joi.string().required(),
    mail: Joi.string().required(),
    hours: Joi.string().required(),
})
