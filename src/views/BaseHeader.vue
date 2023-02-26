<template>
  <el-header class="me-area">
    <el-row class="me-header" style="display:flex;flex-wrap:wrap;justify-content:left">

      <el-col :span="2" class="me-header-left">
        <router-link to="/" class="home">
          <i  class="el-icon-news" style="color:#ffffff;"/>
        </router-link>
      </el-col>

      <el-col v-if="!simple" :span="6">
        <el-menu :router=true menu-trigger="click" 
                :default-active="activeIndex"
                mode="horizontal" 
                background-color="#DEB887" 
                text-color="#696969"
                active-text-color="#ffffff">
        </el-menu>
      </el-col>

      <template v-else>
        <slot></slot>
      </template>

      <el-col :span="13">
          <el-input
            placeholder="请输入查询内容"
            v-model="input"
            clearable
            style="width:50%; margin-top:1%; font-size:18px;">
            <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
          </el-input>    
      </el-col>

      <el-col :span="3">
        <el-menu :router=true 
          menu-trigger="click" 
          mode="horizontal" 
          active-text-color="#DEB887" 
          background-color="#DEB887" 
          text-color="#F8F8F8">

          <div v-if="!user.login" style="display:flex;flex-wrap:wrap;justify-content:left">
            <el-menu-item >
              <el-button @click="toregister" type="text" style = "font-size:20px;">注册</el-button>
              <el-button @click="tologin" type="text" style = "font-size:20px;">登录</el-button>
            </el-menu-item>
          </div>

          <div v-else>
              <el-menu-item>
                <el-button @click="touser" type="text" style = "font-size:20px;">个人中心</el-button>
              
                <el-button @click="logout" type="text" style = "font-size:20px;">退出</el-button>
              </el-menu-item>
          </div>
        </el-menu>
      </el-col>

    </el-row>
  </el-header>
</template>



<script>
import {getUserInfo} from '@/api/login'


  export default {
    name: 'BaseHeader',
    beforeMount () {
      Vue.prototype.$cookieStore = {
        setCookie,
        getCookie,
        delCookie
      }
    },
    props: {
      activeIndex: String,
      simple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        input:""
      }
    },
    computed: {
      user() {
        let login = this.$store.state.id >= 0
        let avatarUrl = this.$store.state.avatarUrl
        return {
          login, avatarUrl
        }
      }
    },
    created() {
      if(this.$store.state.avatarUrl == 'false')
        this.logout()
    },

    methods: {
      toregister(){
        this.$router.push('/register')
      },
      tologin(){
        this.$router.push('/login')
      },
      search() {
        var tags = []
        var content = this.input
        console.log(tags)
        this.$router.push({
          name:'searchpage',
          params:{
            searchtags:tags,
            searchcontent:content
          }
        })
      },
      logout() {
        let that = this
        this.$store.dispatch('logout').then(() => {
            that.$message.success('已退出');
            this.$router.push('/')
        }).catch((error) => {
          if (error !== 'error') {
            that.$message({message: error, type: 'error', showClose: true});
          }
        })
      },
      touser() {
        var userInfo_ = {
                'name':this.$store.state.name,
                'email':this.$store.state.email,
                'contact':this.$store.state.contact,
                'id':this.$store.state.id,
                'graduate':this.$store.state.graduate,
                'avatarUrl':this.$store.state.avatarUrl,
            }
        //console.log(userInfo_)
        this.$router.push({
          'name':'userboard',
          'params':{
            userInfo: userInfo_
          }
        })
      }
    }
  }
</script>

<style>
  
  .el-header {
    position: fixed;
    z-index: 1024;
    min-width: 100%;
    height:5%;
    background-color:#DEB887;
  }

  .background {
    background-color:#DEB887;
  }

  .home {
    margin-top: 5%;
    font-size: 30px;
  }

  .me-header-left {
    margin-top: 0.5%;
  }

  .me-header-right {
    margin-right: 0.5%;
  }

  .me-title img {
    max-height: 2.4rem;
    max-width: 100%;
  }

  .me-header-picture {
    width: 36px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #5fb878;
  }
</style>
