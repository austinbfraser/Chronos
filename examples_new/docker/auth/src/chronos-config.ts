const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

const chronosConfig = {
  // General configuration
  microservice: 'auth',
  interval: 5000,

  // Mode Specific
  mode: 'docker',
  promService: 'docker.for.mac.localhost',

  database: {
    connection: 'REST',
    type: process.env.CHRONOS_DB,
    URI: process.env.CHRONOS_URI,
  },

  notifications: [],
};
export default chronosConfig;
