<template>
  <div id="login" v-title data-title="登录">
    <!--<video preload="auto" class="me-video-player" autoplay="autoplay" loop="loop">
          <source src="../../static/vedio/sea.mp4" type="video/mp4">
      </video>-->

    <div class="me-login-box me-login-box-radius">
      <h1>登录</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="contact">
          <el-input placeholder="注册联系方式" v-model="userForm.contact"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item size="medium" class="me-login-button">
          <el-button type="primary" @click.native.prevent="login('userForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import Cookies from 'js-cookie'

  export default {
    name: 'Login',
    data() {
      return {
        userForm: {
          contact: '',
          password: ''
        },
        rules: {
          contact: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {max: 12, message: '不能大于12个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login(formName) {
        let that = this
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log(that.userForm)
            that.$store.dispatch('login', that.userForm).then(() => {

              that.$store.dispatch('getUserInfo').then(() => {              
                }).catch((error) => {
                  if (error !== 'error') {
                    that.$message({message: error, type: 'error', showClose: true});
                  }
                })
              //Cookies.set('JESSIONID', that.$store.state.id)
              //Cookies.set('id', that.$store.state.id)
              //this.$cookieStore.setCookie('JESSIONID', that.$store.state.id, 30);
              //this.$cookieStore.setCookie('id', that.$store.state.id, 30);
              that.$router.push('/')
            }).catch((error) => {
              if (error !== 'error') {
                that.$message({message: error, type: 'error', showClose: true});
              }
            })
            
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  #login {
    min-width: 100%;
    min-height: 100%;
  }

  .me-video-player {
    background-color: transparent;
    width: 100%;
    height: 100%;
    object-fit: fill;
    display: block;
    position: absolute;
    left: 0;
    z-index: 0;
    top: 0;
  }

  .me-login-box {
    position: absolute;
    width: 300px;
    height: 260px;
    background-color: white;
    margin-top: 150px;
    margin-left: -180px;
    left: 50%;
    padding: 30px;
  }

  .me-login-box-radius {
    border-radius: 10px;
    box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
  }

  .me-login-box h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    vertical-align: middle;
  }

  .me-login-design {
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
  }

  .me-login-design-color {
    color: #5FB878 !important;
  }

  .me-login-button {
    text-align: center;
    margin-top:20%;
    height:50%;
  }

  .me-login-button button {
    width: 100%;
  }

</style>
