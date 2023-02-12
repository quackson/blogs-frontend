import Vuex from 'vuex'
import Vue from 'vue'
import {getToken, setToken, removeToken} from '@/request/token'
import {login, getUserInfo, logout, register} from '@/api/login'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: -1,
    name:  "",
    avatarUrl:  "",
    contact: "",
    email: "",
    graduate: "",    
    token: getToken(),
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_id: (state, ID) => {
      state.id = ID;
    },
    SET_name: (state, name) => {
      state.name = name
    },
    SET_avatarUrl: (state, avatarUrl) => {
      state.avatarUrl = avatarUrl
    },
    SET_contact: (state, contact) => {
      state.contact = contact
    },
    SET_email: (state, email) => {
      state.email = email
    },
    SET_graduate: (state, graduate) => {
      state.graduate = graduate
    }
  },
  actions: {
    login({commit}, user, state) {

      console.log('login')
      console.log(user)
      //modify      
      commit('SET_ID', 1);
      return new Promise((resolve, reject) => {
        login(user.contact, user.password).then(data => {
            commit('SET_id', data.content.id)
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
      console.log("store getUserInfo")
      console.log(state.id)

      //modify
      commit('SET_id', 1)
            commit('SET_name', 'testuser')
            commit('SET_avatarUrl', 'https://img0.baidu.com/it/u=1250551608,2180019998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500')
            commit('SET_email', 'xxxxxxxxxx')
            commit('SET_graduate', 'xxxxxxxxxx')
            commit('SET_contact', 'xxxxxxxxxx')
      getUserInfo(state.id).then(data => {
          if (data.content) {
            console.log('SET_name')
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
    // 退出
    logout({commit, state}) {
      
      commit('SET_id', "")
          commit('SET_name', "")
          commit('SET_avatarUrl', "")
          commit('SET_email', "")
          commit('SET_graduate', "")
          commit('SET_contact', "")
          resolve()
    },
    // 前端 登出
    fedLogOut({commit}) {
      
      commit('SET_id', "")
      commit('SET_name', "")
      commit('SET_avatarUrl', "")
      commit('SET_email', "")
      commit('SET_graduate', "")
      commit('SET_contact', "")
      resolve()
    },

    register({commit, state}, user) {
      return new Promise((resolve, reject) => {
        register(user.contact, user.email, user.name, user.password).then((data) => {
            commit('SET_id', data.content)
            commit('SET_name', user.name)
            commit('SET_avatarUrl', 'https://img0.baidu.com/it/u=1250551608,2180019998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500')
            commit('SET_email', user.email)
            commit('SET_graduate', 'non')
            commit('SET_contact', user.contact)
            console.log(state.id)
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
