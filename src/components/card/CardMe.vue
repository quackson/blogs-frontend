<template>
  <el-card>
    <h1 class="me-author-name">{{userInfo.userName}}</h1>
    <div class="follow" style="text-align:center;" v-if="userId>=0">
      <el-button type="primary" plain size="medium" style="font-size:18px;">Follow</el-button>
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
      userId:Number
    },
    created() {     
    },
    data() {
      return {
      }
    },
    methods: {
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
