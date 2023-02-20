<template>
  <el-card :body-style="{ padding: '8px 18px'}" :shadow="hover" class="card-me-color">
    <div slot="header" class="me-tag-header" style="font-size:25px;" >
      <span>{{title}}</span>
    </div>

    <ul class="me-tag-list">
      <li class="me-tag-item" v-for="t in tags" :key="t.id">
        <!--type="primary"-->
        <el-button @click="tag(t.name)" size="medium" type="danger" style="font-size:10px;margin-top:1px;margin-left:1px;" round plain>{{t.name}}</el-button>
      </li>
    </ul>
  </el-card>

</template>

<script>
  export default {
    name: 'CardTag',
    props: {
      tags: Array,
      title: String
    },
    data() {
      return {
      }
    },
    methods: {
      tag(name) {
        var tags = []
        tags.push(name)
        var content = ""
        //console.log(tags)
        this.$router.push({
          name:'searchpage',
          params:{
            searchtags:tags,
            searchcontent:content
          }
        })
      }
    }
  }
</script>

<style scoped>
  .card-me-color {
    background-colod:#F5DEB3;
  }
  .me-tag-header {
    font-weight: 600;
  }

  .me-tag-more {
    font-size: 14px;
    color: #78b6f7;
  }

  .me-tag-list {
    list-style-type: none;
  }

  .me-tag-item {
    display: inline-block;
    padding: 4px;
    font-size: 14px;
    color: #5FB878;
  }

  .me-tag-item a:hover {
    text-decoration: underline;
  }
</style>
