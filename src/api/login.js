import request from '@/request'

export function login(contact, password) {
  const data = {
    contact: contact,
    password: password
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function getUserInfo(id) {
  console.log('/users/'+id)
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
