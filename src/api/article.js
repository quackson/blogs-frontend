import request from '@/request'
import qs from 'qs'


export function getHotArtices(page, perpage) {
  const info = {
      page: page - 1,
      perpage:perpage
  }
  return request({
    url: '/public/post',
    method: 'get',
    params: info
  })
}

export function getNewArtices() {
  return request({
    url: '/articles/new',
    method: 'get'
  })
}

export function viewArticle(id) {
  return request({
    url: `/articles/view/${id}`,
    method: 'get'
  })
}

export function getArticlesByCategory(id) {
  return request({
    url: `/articles/category/${id}`,
    method: 'get'
  })
}

export function getArticlesByTag(id) {
  return request({
    url: `/articles/tag/${id}`,
    method: 'get'
  })
}


export function publishArticle(article) {
  return request({
    url: '/articles/publish',
    method: 'post',
    data: article
  })
}

export function listArchives() {
  return request({
    url: '/articles/listArchives',
    method: 'get'
  })
}

export function getArticleById(id) {
  return request({
    url: `/articles/${id}`,
    method: 'get'
  })
}

export function getArtices(tag, content) {
  //console.log(tag)
  const params = {
    tags: tag,
    info: content
  }
  //console.log("GET ARTICLES")
  //console.log(params)
  return request({
    url: '/public/search',
    method: 'get',
    params: params, 
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}