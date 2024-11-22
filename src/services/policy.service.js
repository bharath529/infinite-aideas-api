const Policy = require('../models/policy.model');

const createPolicy = async (policyData) => {
  return Policy.create(policyData);
};

module.exports = {
  createPolicy,
};
