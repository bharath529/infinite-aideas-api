const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEmail = {
  body: Joi.object().keys({
    subject: Joi.string().required(),
    emailBody: Joi.string().required(),
    emailId: Joi.string().email().required(),
    user: Joi.string().required().custom(objectId),
    policyNumber: Joi.string(),
    policyId: Joi.string().custom(objectId),
    category: Joi.string().valid('enquire', 'claim', 'feedback', 'others').required(),
  }),
};

const getEmails = {
  query: Joi.object().keys({
    subject: Joi.string(),
    category: Joi.string().valid('enquire', 'claim', 'feedback', 'others'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEmail = {
  params: Joi.object().keys({
    emailId: Joi.string().required().custom(objectId),
  }),
};

const updateEmail = {
  params: Joi.object().keys({
    emailId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      subject: Joi.string(),
      emailBody: Joi.string(),
      category: Joi.string().valid('enquire', 'claim', 'feedback', 'others'),
    })
    .min(1), // Ensure at least one field is being updated
};

const deleteEmail = {
  params: Joi.object().keys({
    emailId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createEmail,
  getEmails,
  getEmail,
  updateEmail,
  deleteEmail,
};
