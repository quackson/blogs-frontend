import Vuex from 'vuex'
import Vue from 'vue'
import {getToken, setToken, removeToken} from '@/request/token'
import {login, getUserInfo, logout, register} from '@/api/login'

import sessionStorage from '@/store/sessionStorage'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: sessionStorage.getValue('id'),
    name: sessionStorage.getValue('name'),
    avatarUrl: sessionStorage.getValue('avatarUrl'),
    contact: sessionStorage.getValue('contact'),
    email: sessionStorage.getValue('email'),
    graduate: sessionStorage.getValue('graduate'), 

    token: getToken(),
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_id: (state, ID) => {
      state.id = ID;
      sessionStorage.setValue('id', ID);
    },
    SET_name: (state, name) => {
      state.name = name
      sessionStorage.setValue('name', name);
    },
    SET_avatarUrl: (state, avatarUrl) => {
      state.avatarUrl = avatarUrl
      sessionStorage.setValue('avatarUrl', avatarUrl);
    },
    SET_contact: (state, contact) => {
      state.contact = contact
      sessionStorage.setValue('contact', contact);
    },
    SET_email: (state, email) => {
      state.email = email
      sessionStorage.setValue('email', email);
    },
    SET_graduate: (state, graduate) => {
      state.graduate = graduate
      sessionStorage.setValue('graduate', graduate);
    }
  },
  actions: {
    login({commit, state}, user) {
      return new Promise((resolve, reject) => {
        login(user.contact, user.password).then(data => {
            
            commit('SET_id', data.content)
            commit('SET_contact', user.contact)                    
            resolve()
        }).catch(error => {
          reject(error)
        })
      })



    },
    // 获取用户信息
    getUserInfo({commit, state}) {
      let that = this
      getUserInfo(state.id).then(data => {
          //console.log(data)
          if (data.content) {
            //console.log('SET_name')
            commit('SET_id', data.content.id)
            commit('SET_name', data.content.name)
            commit('SET_avatarUrl', data.content.avatarUrl)
            commit('SET_email', data.content.email)
            commit('SET_graduate', data.content.graduate)
            commit('SET_contact', data.content.contact)

          }
        }).catch(error => {
          reject(error)
        })
      
    },
    //修改
    updateUserInfo({commit, state}, userInfo) {
      let that = this
            commit('SET_name', userInfo.name)
            commit('SET_avatarUrl', userInfo.avatarUrl)
            commit('SET_email', userInfo.email)
            commit('SET_graduate', userInfo.graduate)
            commit('SET_contact', userInfo.contact)
      
    },
    // 退出
    logout({commit, state}) {      
          commit('SET_id', "-1")
          sessionStorage.setValue('id', -1);
          commit('SET_name', "")
          sessionStorage.setValue('name', '');
          commit('SET_avatarUrl', "")
          sessionStorage.setValue('avatarUrl', '');
          commit('SET_email', "")
          sessionStorage.setValue('email', '');
          commit('SET_graduate', "")
          sessionStorage.setValue('graduate', "");
          commit('SET_contact', "")
          sessionStorage.setValue('contact', "");
    },
    // 前端 登出
    fedLogOut({commit}) {
      commit('SET_id', "-1")
          sessionStorage.setValue('id', -1);
          commit('SET_name', "")
          sessionStorage.setValue('name', '');
          commit('SET_avatarUrl', "")
          sessionStorage.setValue('avatarUrl', '');
          commit('SET_email', "")
          sessionStorage.setValue('email', '');
          commit('SET_graduate', "")
          sessionStorage.setValue('graduate', "");
          commit('SET_contact', "")
          sessionStorage.setValue('contact', "");
      resolve()
    },

    register({commit, state}, user) {
      return new Promise((resolve, reject) => {
        register(user.contact, user.email, user.name, user.password).then((data) => {
            resolve()
          //console.log(data)
        }).catch((error) => {
          console.log("catch error")
          reject(error)
        })
      })
    }
  }
})
