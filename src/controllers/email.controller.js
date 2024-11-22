const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { emailService } = require('../services');

const createEmail = catchAsync(async (req, res) => {
  const email = await emailService.createEmail(req.body);
  res.status(httpStatus.CREATED).send(email);
});

const getEmails = catchAsync(async (req, res) => {
  const filter = { ...req.query };
  const options = {
    limit: req.query.limit || 10,
    page: req.query.page || 1,
    sortBy: req.query.sortBy || 'createdAt:desc',
  };
  const result = await emailService.queryEmails(filter, options);
  res.send(result);
});

const getEmail = catchAsync(async (req, res) => {
  const email = await emailService.getEmailById(req.params.emailId);
  if (!email) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Email not found' });
    return;
  }
  res.send(email);
});

const updateEmail = catchAsync(async (req, res) => {
  const email = await emailService.updateEmailById(req.params.emailId, req.body);
  res.send(email);
});

const deleteEmail = catchAsync(async (req, res) => {
  await emailService.deleteEmailById(req.params.emailId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEmail,
  getEmails,
  getEmail,
  updateEmail,
  deleteEmail,
};
