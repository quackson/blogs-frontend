<template>
  <el-card :shadow="hover">
    <div style="text-align:center;">
      <el-avatar :size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <h1 class="me-author-name">{{userInfo.userName}}</h1>
    <div class="follow" style="text-align:center;" @click="followUser" v-if="followstate==0" >
      <el-button type="primary" plain size="medium" style="font-size:18px;">Follow</el-button>
    </div>
    <div class="follow" style="text-align:center;" v-if="followstate==1" @click="unfollowUser">
      <el-button type="info" plain size="medium" style="font-size:18px;">Unfollow</el-button>
    </div>
    <div class="me-author-description" style="text-align:center;margin-top:5%;margin-bottom:10%;">
    <el-col>
      <span><i class="el-icon-message"></i>{{userInfo.email}}</span>
    </el-col>
    <el-col>
      <span><i class="el-icon-phone"></i>{{userInfo.contactInfo}}</span>
    </el-col>
    <el-col>
      <span><i class="el-icon-location-outline"></i>{{userInfo.graduate}}</span>
    </el-col>
    </div>

  </el-card>

</template>

<script>
  import {followUser, unfollowUser, checkSate} from '@/api/user'

  export default {
    name: 'CardMe',
    props: {
      userInfo: {
          'userName':String,
          'email':String,
          'contactInfo':String,
          'userId':Number,
          'graduate':String
        },
      userMe: {
          'userName':String,
          'email':String,
          'contactInfo':String,
          'userId':Number,
          'graduate':String
        }
    },
    created() {     
      this.checkSate()
    },
    data() {
      return {
        followstate:-1
      }
    },
    methods: {
      followUser(){
        let that = this
        followUser(userInfo.userId).then(data => {
          if (data.code == 0) {
            that.followstate = 1;
          }else{
            that.$message({type: 'error', message: data.reason, showClose: true})
          }
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: "错误", showClose: true})
          }
        })
      },
      unfollowUser(){
        let that = this
        unfollowUser(userInfo.userId).then(data => {
          if (data.code == 0) {
            that.followstate = 0;
          }else{
            that.$message({type: 'error', message: data.reason, showClose: true})
          }
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: "错误", showClose: true})
          }
        })
      },
      checkSate(){
        let that=this;
        var follow=false;
        /*
        checkSate(userInfo.userId).then(data => {
          if (data.code == 0) {
            if(data.content){
              that.followstate = 1;
            }else{
              that.followstate = 0;
            }
          }else{
            that.$message({type: 'error', message: data.reason, showClose: true})
          }
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '错误', showClose: true})
          }
        */
        follow = true;
        if(follow){
          that.followstate = 1;
        }else{
          that.followstate = 0;
        }
      }
    }
  }
</script>

<style scoped>
  .follow {
    margin-top:5%;
    margin-bottom:5%;
  }
  .me-author-name {
    text-align: center;
    font-size: 30px;
    border-bottom: 1px solid #5FB878;
  }

  .me-author-description {
    padding-left: 10px 0;
  }

  .me-icon-job {
    padding-left: 16px;
  }

  .me-author-tool {
    text-align: center;
    padding-top: 10px;
  }

  .me-author-tool i {
    cursor: pointer;
    padding: 4px 10px;
    font-size: 30px;
  }
</style>
