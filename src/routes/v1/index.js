const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const emailRoute = require('./email.route');
const policyRoute = require('./policy.route');
const userController = require('../../controllers/user.controller');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/email',
    route: emailRoute,
  },
  {
    path: '/policy',
    route: policyRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get('/dashboard', userController.getDashboard);

module.exports = router;
