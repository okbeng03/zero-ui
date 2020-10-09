import axios from 'axios'

const service = axios.create()

service.interceptors.response.use(function (response) {
  const { status, data } = response

  if (status === 200) {
    return data
  } else {
    return Promise.reject(new Error(`status: ${status}`))
  }
}, function (err) {
  return Promise.reject(err)
})

export default service
