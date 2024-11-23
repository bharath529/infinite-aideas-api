const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Infinite AIdeas API documentation',
    version,
    license: {
      name: 'MIT',
      url: '',
    },
  },
  servers: [
    {
      url: `https://infinite-aideas-api.onrender.com/v1`,
    },
  ],
};

module.exports = swaggerDef;
