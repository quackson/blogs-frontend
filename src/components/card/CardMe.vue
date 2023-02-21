<template>
  <div class="loading" v-if="!HaveLoad"></div>
  <el-card v-else>
    <div style="text-align:center;" v-if="avatarUrl.length > 0">
      <img :src="avatarUrl"
          contain
          height="100px"
          width="100px">
      </img>
    </div>
    <div style="text-align:center;" v-else>
      <img src="https://img1.baidu.com/it/u=3834820558,1776972742&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
          contain
          height="100px"
          width="100px">
      </img>
    </div>
    <h1 class="me-author-name">{{userinfo.name}}</h1>
    <div style="text-align:center;margin-top:5%;" v-if="!logedIn">
      <el-button type="info" plain size="medium" style="font-size:18px;">尚未登陆</el-button>
    </div>
    <div class="follow" style="text-align:center;margin-top:5%;" @click="followUser" v-else-if="logedIn && (!ifme) && (!followstate)" >
      <el-button type="primary" plain size="medium" style="font-size:18px;">关注</el-button>
    </div>
    <div class="follow" style="text-align:center;margin-top:5%;" v-else-if="logedIn && (!ifme) && followstate" @click="unfollowUser">
      <el-button type="info" plain size="medium" style="font-size:18px;">取消关注</el-button>
    </div>
    <div style="text-align:center;margin-top:5%;" v-else-if="logedIn">
      <el-button type="primary" plain size="medium" style="font-size:18px;" @click="toWrite">写博客</el-button>
    </div>

    <div class="me-author-description" style="text-align:center;margin-top:5%;margin-bottom:10%;">
    <el-col>
      <span><i class="el-icon-message"></i>{{userinfo.email}}</span>
    </el-col>
    <el-col>
      <span><i class="el-icon-phone"></i>{{userinfo.contact}}</span>
    </el-col>
    <el-col>
      <span><i class="el-icon-location-outline"></i>{{userinfo.graduate}}</span>
    </el-col>
    </div>

  </el-card>

</template>

<script>
  import {followUser, unfollowUser, checkSate} from '@/api/user'

  export default {
    name: 'CardMe',
    props: {
      userinfo: {
          name:String,
          email:String,
          contact:String,
          id:Number,
          graduate:String,
          avatarUrl:String
        }
    },
    created() {     
      this.logedIn = this.$store.state.id >= 0;
      if(!this.logedIn) 
          this.HaveLoad = true;
      this.ifme = (this.userinfo.id == this.$store.state.id)
      this.checkSate()
    },
    data() {
      return {
        followstate:false,
        ifme:false,
        logedIn:false,
        avatarUrl:'',
        HaveLoad:false
      }
    },
    watch:{
      'userinfo.id'(val){
        this.logedIn = this.$store.state.id >= 0;
        this.ifme = (this.userinfo.id == this.$store.state.id)
        this.checkSate()
        //console.log("initial card me")
      },
      'userinfo.avatarUrl'(val){
        this.avatarUrl = 'http://10.129.167.54:8079' + this.userinfo.avatarUrl
        //console.log(this.userinfo)
      }
    },
    methods: {
      followUser(){
        let that = this
        if (typeof(that.userinfo.id) == "undefined") {
          return 
        }
        followUser(that.userinfo.id).then(data => {
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
        if (typeof(that.userinfo.id) == "undefined") {
          return 
        }
        unfollowUser(that.userinfo.id).then(data => {
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
      toWrite(){
        this.$router.push("/postboard")
      },
      checkSate(){
        let that=this;
        if (typeof(that.userinfo.id) == "undefined") {
          return 
        }
        that.avatarUrl = 'http://10.129.167.54:8079' + that.userinfo.avatarUrl
        //console.log(that.userinfo)
        //console.log(that.avatarUrl)
        checkSate(that.userinfo.id).then(data => {
          if (data.code == 0) {
            that.followstate = data.content;
          }else{
            that.$message({type: 'error', message: data.reason, showClose: true})
          }
          this.HaveLoad = true;
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '错误', showClose: true})
          }
        })
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
