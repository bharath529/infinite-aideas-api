const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { policyService } = require('../services');

const createPolicy = catchAsync(async (req, res) => {
  const policy = await policyService.createPolicy(req.body);
  res.status(httpStatus.CREATED).send(policy);
});

const getPolicies = catchAsync(async (req, res) => {
  const filter = { ...req.query };
  const options = {
    sortBy: req.query.sortBy || 'createdAt:desc',
    limit: req.query.limit || 10,
    page: req.query.page || 1,
  };
  const result = await policyService.queryPolicies(filter, options);
  res.send(result);
});

const getPolicy = catchAsync(async (req, res) => {
  const policy = await policyService.getPolicyById(req.params.policyId);
  if (!policy) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Policy not found' });
    return;
  }
  res.send(policy);
});

const updatePolicy = catchAsync(async (req, res) => {
  const policy = await policyService.updatePolicyById(req.params.policyId, req.body);
  res.send(policy);
});

const deletePolicy = catchAsync(async (req, res) => {
  await policyService.deletePolicyById(req.params.policyId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPolicy,
  getPolicies,
  getPolicy,
  updatePolicy,
  deletePolicy,
};
