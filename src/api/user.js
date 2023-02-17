import request from '@/request'

export function getPersonalInfo(id) {
	console.log(id)
  return request({
    url: '/blog/'+id,
    method: 'get'
  })
}

export function followUser(uid) {
  return request({
    url: '/blogger/'+uid+'/subsribe',
    method: 'post'
  })
}

export function unfollowUser(uid) {
  return request({
    url: '/blooger/'+uid+'/unsubscribe',
    method: 'post'
  })
}

export function checkSate(uid) {
  return request({
    url: '/blogger/'+uid+'/subsribed',
    method: 'post'
  })
}

export function getBlogInfo(uid) {
  return request({
    url: '/blog/'+uid,
    method: 'get'
  })
}

export function getUserBlog(uid, pageint, perpage) {
  return request({
    url: '/blog/'+uid+'/post',
    method: 'get',
    params: {
      page: pageint, 
      perpage: perpage
    }
  })
}

export function getUserTags(uid) {

  return request({
    url: '/blogger/'+uid+'/tag',
    method: 'get',
    params: {
      page: 1, 
      perpage: 10
    }
  })
}


export function updateUserInfo(uid, userInfo) {
	//console.log(uid)
	console.log(userInfo)
  return request({
    url: '/blogger/'+ uid,
    method: 'post',
    data: userInfo
  })
}