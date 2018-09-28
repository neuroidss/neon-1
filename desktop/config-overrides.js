// const rewireTypescript = require('react-app-rewire-typescript')
const rewireYarnWorkspaces = require('react-app-rewire-yarn-workspaces')

module.exports = function override(config, env) {
  // config = rewireTypescript(config, env)

  console.log('config:', config)

  return rewireYarnWorkspaces(config, env)
}
