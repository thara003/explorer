export const axiosErrorHandler = (error) => {
  if (error?.response) {
    const errorMessage = `
      ${error?.request?.['__sentry_xhr__']?.url}
      ${error.response?.status} - ${error.response.statusText}
      ${error.response?.data?.error}
    `
    throw new Error(errorMessage)
    // throw new Error(` \n `)
  } else {
    throw new Error(error?.request?.['__sentry_xhr__']?.url)
  }
}
