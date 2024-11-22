const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPolicy = {
  body: Joi.object().keys({
    policyNumber: Joi.string().required(),
    policyType: Joi.string().valid('health', 'vehicle', 'life', 'property', 'other').required(),
    coverageAmount: Joi.number().required(),
    premiumAmount: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    status: Joi.string().valid('active', 'expired', 'cancelled'),
    user: Joi.string().required().custom(objectId),
  }),
};

const getPolicies = {
  query: Joi.object().keys({
    policyNumber: Joi.string(),
    policyType: Joi.string().valid('health', 'vehicle', 'life', 'property', 'other'),
    user: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPolicy = {
  params: Joi.object().keys({
    policyId: Joi.string().required().custom(objectId),
  }),
};

const updatePolicy = {
  params: Joi.object().keys({
    policyId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      policyNumber: Joi.string(),
      policyType: Joi.string().valid('health', 'vehicle', 'life', 'property', 'other'),
      coverageAmount: Joi.number(),
      premiumAmount: Joi.number(),
      startDate: Joi.date(),
      endDate: Joi.date(),
      status: Joi.string().valid('active', 'expired', 'cancelled'),
    })
    .min(1), // Ensure at least one field is provided for update
};

const deletePolicy = {
  params: Joi.object().keys({
    policyId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createPolicy,
  getPolicies,
  getPolicy,
  updatePolicy,
  deletePolicy,
};
