const httpStatus = require('http-status');
const { User, Email } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const getDashboardData = async () => {
  // Aggregate data for emails and users
  try {
    // Count emails by category
    const emailsByCategory = await Email.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]);

    // Count emails by status
    const emailsByStatus = await Email.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);

    // Count emails by priority
    const emailsByPriority = await Email.aggregate([{ $group: { _id: '$priority', count: { $sum: 1 } } }]);

    // Recent emails
    const recentEmails = await Email.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .select('subject senderEmail status category createdAt priority');

    // Pending actions (emails in "new" or "in_progress" state)
    const pendingEmails = await Email.find({ status: { $in: ['new', 'in_progress'] } }).countDocuments();

    // Total users
    const totalUsers = await User.countDocuments();

    // Returning dashboard summary
    return {
      emailsByCategory,
      emailsByStatus,
      emailsByPriority,
      recentEmails,
      pendingEmails,
      totalUsers,
    };
  } catch (error) {
    throw new Error('Failed to fetch dashboard data');
  }
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getDashboardData,
};
