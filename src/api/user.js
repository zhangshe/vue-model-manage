import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/User/Login',
    method: 'post',
    data
  })
}
export function LoginNew(data) {
  return request({
    url: '/User/LoginNew',
    method: 'post',
    data
  })
}

export function getInfo(query) {
  return request({
    url: '/User/GetUserInfo',
    method: 'get',
    params: query
  })
}

export function logout() {
  return request({
    url: '/User/Logout',
    method: 'post'
  })
}
