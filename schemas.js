const Joi = require('joi');

module.exports.problemSchema = Joi.object({
    boulder: Joi.object({
        color: Joi.string(),
        grade: Joi.string().required(),
        location: Joi.string().required(),
        attempts: Joi.string().required(),
        sent: Joi.boolean(),
    }),
    route: Joi.object({
        color: Joi.string(),
        grade: Joi.string().required(),
        location: Joi.string().required(),
        attempts: Joi.string().required(),
        sent: Joi.boolean()
    })
})