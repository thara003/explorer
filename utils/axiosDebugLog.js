/* global module */

module.exports = {
  request: function (debug, config) {
    debug(`Request for ${config.url} with headers:`)
    debug(config.headers)
  },
  response: function (debug, response) {
    debug(`Response from ${response.config.url} with headers`)
    debug(response.headers)
    debug(response.data)
  },
  error: function (debug, error) {
    // Read https://www.npmjs.com/package/axios#handling-errors for more info
    debug('Boom', error)
  }
}
