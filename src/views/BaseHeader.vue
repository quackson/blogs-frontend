<template>
  <el-header class="me-area">
    <div class="background">
    <el-row class="me-header">

      <el-col :span="2" class="me-header-left">
        <router-link to="/" class="home">
          <i  class="el-icon-news" style="color:#ffffff;"/>
        </router-link>
      </el-col>

      <el-col v-if="!simple" :span="8">
        <el-menu :router=true menu-trigger="click" 
                :default-active="activeIndex"
                mode="horizontal" 
                background-color="#DEB887" 
                text-color="#696969"
                active-text-color="#ffffff">
          <el-menu-item index="/" style = "font-size:20px;">推荐</el-menu-item>
          <el-menu-item index="/alltags" style = "font-size:20px;">全部标签</el-menu-item>
        </el-menu>
      </el-col>

      <template v-else>
        <slot></slot>
      </template>

      <el-col :span="12">
          <el-input
            placeholder="请输入查询内容"
            v-model="input"
            clearable
            style="width:50%; margin-top:1%; font-size:18px;">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>    
      </el-col>

      <el-col :span="2">
        <div class = "me-header-right">
        <el-menu :router=true 
          menu-trigger="click" 
          mode="horizontal" 
          active-text-color="#DEB887" 
          background-color="#DEB887" 
          text-color="#696969">

          <template v-if="!user.login">
            <el-menu-item index="/login">
              <el-button type="text" style = "font-size:20px;">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text" style = "font-size:20px;">注册</el-button>
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu index>
              <template slot="title">
                <img class="me-header-picture" :src="user.avatar"/>
              </template>
              <el-menu-item index @click="logout"><i class="el-icon-back"></i>退出</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
        </div>
      </el-col>

    </el-row>
    </div>
  </el-header>
</template>

<script>
  export default {
    name: 'BaseHeader',
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
        let login = this.$store.state.account.length != 0
        let avatar = this.$store.state.avatar
        return {
          login, avatar
        }
      }
    },
    methods: {
      logout() {
        let that = this
        this.$store.dispatch('logout').then(() => {
          this.$router.push({path: '/'})
        }).catch((error) => {
          if (error !== 'error') {
            that.$message({message: error, type: 'error', showClose: true});
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
