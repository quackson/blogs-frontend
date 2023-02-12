<template>
  <el-card :shadow="hover">
    <div style="text-align:center;" v-if="this.$store.state.id >= 0">
      <el-avatar :size="small" src="userInfo.avatarUrl"></el-avatar>
    </div>
    <div style="text-align:center;font-size=55px;" v-else>
      <el-avatar :size="20" src="https://img0.baidu.com/it/u=3768301198,146336525&fm=253&fmt=auto&app=138&f=JPEG?w=220&h=220"></el-avatar>
    </div>
    <h1 class="me-author-name">{{userInfo.name}}</h1>
    <div class="follow" style="text-align:center;" @click="followUser" v-if="!ifme && followstate==0" >
      <el-button type="primary" plain size="medium" style="font-size:18px;">Follow</el-button>
    </div>
    <div class="follow" style="text-align:center;" v-else-if="!ifme && followstate==1" @click="unfollowUser">
      <el-button type="info" plain size="medium" style="font-size:18px;">Unfollow</el-button>
    </div>

    <div class="me-author-description" style="text-align:center;margin-top:5%;margin-bottom:10%;">
    <el-col>
      <span><i class="el-icon-message"></i>{{userInfo.email}}</span>
    </el-col>
    <el-col>
      <span><i class="el-icon-phone"></i>{{userInfo.contact}}</span>
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
          'name':String,
          'email':String,
          'contact':String,
          'id':Number,
          'graduate':String,
          'avatarUrl':String
        }
    },
    created() {     
      this.ifme = (this.userInfo.id == this.$store.state.id)
      //this.ifme = (this.$store.state.id == this.$store.state.id)
      this.checkSate()
    },
    data() {
      return {
        followstate:-1,
        ifme:false
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
