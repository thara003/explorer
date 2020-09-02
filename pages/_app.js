//FROM: https://github.com/zeit/next.js/blob/master/examples/with-sentry

import React from 'react'
// import App from 'next/app'
import sentry from '../utils/sentry'
import Router from 'next/router'
import NProgress from 'nprogress'
import MatomoTracker from '@datapunt/matomo-tracker-js'
import * as Sentry from '@sentry/node'

import '../static/nprogress.css'
import ErrorPage from './_error'
import axios from 'axios'
import axiosDebugLog from 'axios-debug-log'
import axiosDebugConfig from '../utils/axiosDebugConfig'
import { axiosErrorHandler } from '../utils/axiosErrorHander'
axiosDebugLog(axiosDebugConfig)
axios.defaults.errorHandler = axiosErrorHandler

// Intercept route changes on page navigation to show top edge progress bar
Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

if (process.env.SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.SENTRY_DSN,
  })
}

export default function App({ Component, pageProps, err }) {
  // Workaround for https://github.com/vercel/next.js/issues/8592
  return <Component {...pageProps} err={err} />
}

// export default class MyApp extends App {
//   constructor () {
//     super(...arguments)
//     this.state = {
//       hasError: false,
//       errorEventId: undefined
//     }
//   }
//
//   static async getInitialProps ({ Component, ctx }) {
//     try {
//       let pageProps = {}
//
//       if (Component.getInitialProps) {
//         pageProps = await Component.getInitialProps(ctx)
//       }
//
//       return { pageProps }
//     } catch (error) {
//       // Capture errors that happen during a page's getInitialProps.
//       // This will work on both client and server sides.
//       const errorEventId = captureException(error, ctx)
//       return {
//         hasError: true,
//         errorEventId
//       }
//     }
//   }
//
//   static getDerivedStateFromProps (props, state) {
//     // If there was an error generated within getInitialProps, and we haven't
//     // yet seen an error, we add it to this.state here
//     return {
//       hasError: props.hasError || state.hasError || false,
//       errorEventId: props.errorEventId || state.errorEventId || undefined
//     }
//   }
//
//   static getDerivedStateFromError () {
//     // React Error Boundary here allows us to set state flagging the error (and
//     // later render a fallback UI).
//     return { hasError: true }
//   }
//
//   componentDidCatch (error, errorInfo) {
//     const errorEventId = captureException(error, { errorInfo })
//
//     // Store the event id at this point as we don't have access to it within
//     // `getDerivedStateFromError`.
//     this.setState({ errorEventId, hasError: true })
//   }
//
//   componentDidMount() {
//     const MatomoInstance = new window.MatomoTracker({
//       urlBase: 'https://matomo.ooni.org/',
//       siteId: 2,
//       trackerUrl: 'https://matomo.ooni.org/matomo.php',
//       srcUrl: 'https://matomo.ooni.org/matomo.js',
//     })
//     MatomoInstance.trackPageView()
//   }
//
//   render () {
//     return this.state.hasError ? (
//       <ErrorPage errorCode={500} />
//     ) : (
//       // Render the normal Next.js page
//       super.render()
//     )
//   }
// }
