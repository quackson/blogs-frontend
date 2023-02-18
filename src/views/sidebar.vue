<template>
  <el-col :span="4">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#FFEFD5"
      text-color="#696969"
      active-text-color="#000000"
      style="font-size:30px;height:100%;position:fixed;margin-top:0%;">
      <el-menu-item index="1">
          <i class="el-icon-edit"></i>
          <span slot="title" style="font-size:20px;" @click="goUserEdit()">个人信息</span>
      </el-menu-item>
      
    </el-menu>
  </el-col>
</template>

<script>
  export default {
    name: 'SideBar',
    props: {
      
    },
    data() {
      return {
      }
    },
    computed: {
      
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      goUserEdit(){
        this.$router.push("/userboard");
      },
      goUserInfos(){
        this.$router.push("/userinfos");
      },
      goUserBlogs(){
        this.$router.push("/userblogs");
      }
    }
  }
</script>

<style>
  
  