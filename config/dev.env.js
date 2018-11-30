'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SOCKET_DOMAIN: '"http://localhost"',
  SOCKET_PORT: '"3000"'
})
