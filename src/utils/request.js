import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000// request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.RespCode !== 1) {
      if (res.RespCode === 0) {
        return res
      }
      // if (res.code !== 20000) {
      Message({
        message: res.RespMsg || 'Error',
        // message: res.message || 'Error',
        type: 'error',
        duration: 2 * 1000
        // onClose: function() {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // }
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.RespCode === 401 || res.RespCode === 500 || res.RespCode === 50014) {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
        Message({
          message: res.RespMsg || 'Error',
          type: 'error',
          duration: 2 * 1000,
          onClose: function() {
            store.dispatch('user/logout').then(() => {
              router.push(`/login?redirect=${router.app.$route.fullPath}`)
            })
            // store.dispatch('user/resetToken').then(() => {
            //   location.reload()
            // })
          }
        })
      }
      return Promise.reject(new Error(res.RespMsg || 'Error'))
    } else {
      // return response
      return res
    }
  },
  error => {
    const sta = error.response.status
    if (sta === 401) {
      // Message({
      //   message: '登陆超时，请重新登陆',
      //   type: 'warning',
      //   duration: 2 * 1000
      // })
      store.dispatch('user/logout').then(() => {
        router.push(`/login?redirect=${router.app.$route.fullPath}`)
      })
    } else if (sta === 500) {
      Message({
        message: error.response.data.RespMsg,
        type: 'error',
        duration: 2 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 2 * 1000
        // onClose: function() {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // }
      })
    }
    // console.log('err' + error) // for debug
    // store.dispatch('user/resetToken').then(() => {
    //   location.reload()
    // })
    return Promise.reject(error)
  }
)

export default service
