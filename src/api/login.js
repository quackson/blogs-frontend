import request from '@/request'

export function login(contact, password) {
  const data = {
    contact: contact,
    password: password
  }
  return request({
    url: '/login',
    method: 'post',
    params:data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function getUserInfo(id) {
  //console.log('getUserInfo')
  //console.log(id)
  return request({
    url: '/blogger/'+id,
    method: 'get'
  })
}

export function register(contact, email, name , password) {
  const data = {
    name: name, 
    password: password, 
    contact: contact, 
    email: email
  }
  console.log(data)
  
  return request({
    url: '/register',
    method: 'post',
    params:data
  })
}

export function updateUserInfo(uid, userInfo) {
  //console.log(uid)
  console.log(userInfo)
  //console.log(request)
  return request({
    url: '/blogger/'+ uid,
    method: 'patch',
    data: userInfo
  })
}

export function getPersonalInfo(id) {
  console.log(id)
  return request({
    url: '/blogger/'+id,
    method: 'get'
  })
}