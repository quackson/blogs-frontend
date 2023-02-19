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
    url: '/blogger/'+uid+'/subscribe',
    method: 'post'
  })
}

export function unfollowUser(uid) {
  return request({
    url: '/blogger/'+uid+'/unsubscribe',
    method: 'post'
  })
}

export function checkSate(uid) {
  return request({
    url: '/blogger/'+uid+'/subscribed',
    method: 'get'
  })
}

export function getBlogInfo(uid) {
  return request({
    url: '/blog/'+uid,
    method: 'get'
  })
}

export function getUserBlog(uid, pageint, perpage) {
  const info = {
      page: pageint - 1, 
      perpage: perpage
  }
  //console.log(info)
  return request({
    url: '/blog/'+uid+'/post',
    method: 'get',
    params: info
  })
}

export function getUserTags(uid) {

	const info = {
      page: 1, 
      perpage: 10
    }
  return request({
    url: '/blogger/'+uid+'/tag',
    method: 'get',
    params: info
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

export function uploadavatar(fd, userID){
  var file = {
    file: fd
  }
	return request({
		url:"/blogger/"+userID+"/avatar",
		method:'patch',
    headers: {
          'Content-type': 'multipart/form-data'
        },
		data: fd
	})
}