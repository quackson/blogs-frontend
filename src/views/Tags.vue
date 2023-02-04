<template>
  
    <el-container>
    <div style="margin-left:10%;width:80%;">
      <el-table
      :data="Tags">
      <el-table-column
        prop="name"
        label="标签名">
      </el-table-column>
      <el-table-column
        prop="description"
        label="标签描述">
      </el-table-column>
      <el-table-column
        prop="owner.name"
        label="创建者">
      </el-table-column>
    </el-table>
    <el-col  style="margin-top:15%;text-align: center;">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="perpage"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
    </div>
    </el-col>
    </div>
    </el-container>
  
</template>

<script>
  import CardTag from '@/components/card/CardTag'
  import {getTags} from '@/api/tag'

  export default {
    name: 'tags',
    created() {
      this.getTags()
    },
    data() {
      return {
        Tags: [],
        pageInt:1,
        perpage:20
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageInt = val;
        this.getTags();
        console.log(`当前页: ${val}`);
      },
      getTags() {
        let that = this
        /*
        getTags().then(data => {
          if (data.code == 0) {
            that.Tags = data.content;
          }else{
            that.$message({type: 'error', message: data.reason, showClose: true})
          }
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: "错误", showClose: true})
          }
        })
        */

        var tags = [{
            id: 0,
            name:"test1",
            owner:{
                      id: 0,
                      name:  "test",
                      avatarUrl:  "url",
                      contact: "123123123",
                      email: "123@pku.edu.cn",
                      graduate: "peking University"
                  },
            description:"xxxxxxxxxxxxxx"
          }]
        for(var i=0; i<3;i=i+1){
          tags=tags.concat(tags)
        }
        that.Tags=tags
      }
    },
    components: {
    }
  }
</script>

<style scoped>

  .el-container {
    width: 100%;
  }

  .el-aside {
    margin-right: 5%;
    width: 100%;
  }

  .el-main {
    padding: 0px;
    line-height: 16px;
  }

  .el-card {
    border-radius: 0;
  }

  .el-card:not(:first-child) {
    margin-top: 20px;
  }

  .me-tags {
    margin-top:10%;
  }
</style>
