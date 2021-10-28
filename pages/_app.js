//FROM: 
// https://github.com/zeit/next.js/blob/master/examples/with-sentry
// https://github.com/vercel/next.js/blob/canary/examples/with-loading/pages/_app.js

import { useEffect } from 'react'
import NProgress from 'nprogress'
import { useRouter } from 'next/router'
import 'fontsource-fira-sans/latin.css'

import '../public/static/nprogress.css'

import axios from 'axios'

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log(config)
  return config
}, function (error) {
  // Do something with request error
  console.error(error)
  return Promise.reject(error)
})

export default function App({ Component, pageProps, err }) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  // Workaround for https://github.com/vercel/next.js/issues/8592
  return <Component {...pageProps} err={err} />
}
