const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { emailService } = require('../services');

const createEmail = catchAsync(async (req, res) => {
  const email = await emailService.createEmail(req.body);
  res.status(httpStatus.CREATED).send(email);
});

const getEmails = catchAsync(async (req, res) => {
  const result = await emailService.queryEmails(req);
  res.send(result);
});

const getEmail = catchAsync(async (req, res) => {
  const email = await emailService.getEmailById(req.params.id);
  if (!email) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Email not found' });
    return;
  }
  res.send(email);
});

const updateEmail = catchAsync(async (req, res) => {
  const email = await emailService.updateEmailStatus(req.params.id, req.body.status);
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
