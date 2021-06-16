const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Mechanic', {
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    title: Joi.string().required(),
    avi: Joi.string(),
})
