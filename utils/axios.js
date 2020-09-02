export const axiosDebugConfig = {
  request: function (debug, config) {
    debug(`Request for ${config.url}`)
    debug('with params:')
    debug(config.params)
    debug('with headers:')
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

export const axiosErrorHandler = (error) => {
  if (error?.response) {
    const errorMessage = `
      ${error?.request?.['__sentry_xhr__'].url}
      ${error.response?.status} - ${error.response.statusText}
      ${error.response?.data?.error}
    `
    throw new Error(errorMessage)
    // throw new Error(` \n `)
  } else {
    throw new Error(error?.request?.['__sentry_xhr__'].url)
  }
}
