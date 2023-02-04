<template>
  <el-card class="me-area" :body-style="{ padding: '16px'}" style="width:90%;margin-left:5%;margin-right:5%;">
    <div class="me-article-header">

      <a @click="view(id)" class="me-article-title">{{title}}</a>
      <span class="me-pull-right me-article-count" style="font-size: 15px;">
	    	<i class="el-icon-view"></i>&nbsp;{{visits}}
        <i class="el-icon-star-off"></i>&nbsp;{{likes}}
	    </span>
    </div>

    <div class="me-artile-description">
      {{content}}
    </div>
    <div class="me-article-footer">
	  	<span class="me-article-author" style="font-size: 15px;">
	    	<i class="me-icon-author"></i>&nbsp;{{author.name}}
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
      content: String,
      author: {
          id: Number,
          name: String,
          avatarUrl: String,
          contact: String,
          email: String,
          graduate: String
      },
      tags: Array,
      avatar: String,
      comments: String,
      permission: {
          isPublic: Boolean ,
          needReviewComment:  Boolean
      },
      visits: Number,
      likes: Number,
      unreviewedCount: Number
    },
    data() {
      return {}
    },
    methods: {
      view(id) {
        this.$router.push({path: `/view/${id}`})
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
