const path = require('path')
const rewireYarnWorkspaces = require('react-app-rewire-yarn-workspaces')
const getWorkspaces = require('get-yarn-workspaces')

module.exports = function override(config, env) {
  return rewireYarnWorkspaces(config, env)
}
