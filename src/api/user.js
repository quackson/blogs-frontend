import request from '@/request'

export function getPersonalInfo(id) {
  return request({
    url: '/getPersonalInfo',
    method: 'get',
    params: {
      userId: id
    }
  })
}

export function followUser(uid) {
  return request({
    url: '/blogger/${uid}/subsribe',
    method: 'post'
  })
}

export function unfollowUser(uid) {
  return request({
    url: '//blooger/${uid}/unsubscribe',
    method: 'post'
  })
}

export function checkSate(uid) {
  return request({
    url: '/blogger/${uid}/subsribed',
    method: 'post'
  })
}