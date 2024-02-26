const BaseJoi = require('joi');
const sanitizeHTML = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value });
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.problemSchema = Joi.object({
    boulder: Joi.object({
        color: Joi.string().escapeHTML(),
        grade: Joi.string().required(),
        location: Joi.string().required().escapeHTML(),
        attempts: Joi.string().required(),
        sent: Joi.boolean(),
    }),
    route: Joi.object({
        color: Joi.string().escapeHTML(),
        grade: Joi.string().required(),
        location: Joi.string().required().escapeHTML(),
        attempts: Joi.string().required(),
        sent: Joi.boolean()
    })
})