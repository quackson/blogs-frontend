<template>
  <el-card class="me-area" :body-style="{ padding: '16px'}" style="width:90%;margin-left:5%;margin-right:5%;">
    <div class="me-article-header">

      <a @click="view" class="me-article-title">{{title}}</a>
      <span class="me-pull-right me-article-count" style="font-size: 15px;">
	    	<i class="el-icon-view"></i>&nbsp;{{visits}}
        <i class="el-icon-star-off"></i>&nbsp;{{likes}}
	    </span>
    </div>

    <div class="me-artile-description">
      {{content}}
    </div>
    <div class="me-article-footer"  @click="touser()">
	  	<span class="me-article-author" style="font-size: 15px;">
	    	<i class="me-icon-author"></i>&nbsp;{{blogger.name}}
	    </span>

      <el-tag v-for="t in tags" :key="t.name" size="mini" type="success"  style="font-size: 15px;">{{t.name}}</el-tag>

    </div>
  </el-card>
</template>

<script>
  import { formatTime } from "../../utils/time";

  export default {
    name: 'ArticleItem',
    props: {
      id:Number,
      title: String,
      content:String,
      detail: String,
      blogger: {
          id: Number,
          name: String,
          avatarUrl: String,
          contact: String,
          email: String,
          graduate: String
      },
      tags: Array,
      permission: {
          isPublic: Boolean ,
          needReviewComment:  Boolean
      },
      visits: Number,
      likes: Number
    },
    created(){
      //console.log("one article")
      //console.log(this.title)
    },
    data() {
      return {}
    },
    methods: {
      view(id) {
        //this.$router.push('/postboard/'+id)
        this.$router.push({
          name:'readblog',
          params:{
            userid:this.blogger.id,
            blogid:this.id
          }
        })
      },
      touser() {
        this.$router.push({
          name:'user',
          params: {
            userInfo:this.blogger
          }
        })
      }
    }
  }
</script>

<style scoped>

  .me-article-header {
    /*padding: 10px 18px;*/
    padding-bottom: 10px;
  }

  .me-article-title {
    font-size: 20px;
  }

  .me-article-icon {
    padding: 3px 8px;
  }

  .me-article-count {
    color: #a6a6a6;
    padding-left: 14px;
    font-size: 13px;
  }

  .me-pull-right {
    float: right;
  }

  .me-artile-description {
    font-size: 13px;
    line-height: 24px;
    margin-bottom: 10px;
  }

  .me-article-author {
    color: #a6a6a6;
    padding-right: 18px;
    font-size: 13px;
  }

  .el-tag {
    margin-left: 6px;
  }

</style>
