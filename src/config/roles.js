const allRoles = {
  user: ['getEmails', 'manageEmails'],
  admin: ['getUsers', 'manageUsers', 'manageEmails', 'getEmails'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
