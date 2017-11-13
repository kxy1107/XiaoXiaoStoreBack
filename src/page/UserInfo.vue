<template>
  <div class="app">
    <HeadBar></HeadBar>
    <div class="contain">
      <NavMenu></NavMenu>
      <div class="main-content">
        <!--顶部面包屑导航-->
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--顶部搜索-->
        <el-form :inline="true" class="top-form">
          <el-form-item>
            <el-input v-model="txtUserName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onClickSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!--表格-->
        <el-table :data="userList" class="my-table" height="100">

          <el-table-column prop="UserName" label="姓名">
          </el-table-column>

          <el-table-column prop="UserGender" label="性别">
            <template scope="scope">
              {{scope.row.UserGender == 1 ? "男" : "女"}}
            </template>
          </el-table-column>

          <el-table-column label="头像">
            <template scope="scope">
              <img class="headImg" :src="scope.row.UserImg">
            </template>
          </el-table-column>

          <el-table-column prop="UserCity" label="城市">
          </el-table-column>

          <el-table-column prop="RegisterTime" label="注册时间">
          </el-table-column>

          <el-table-column prop="LastLoginTime" label="最后登录时间">
          </el-table-column>
        </el-table>
        <!--底部分页-->
        <div class="pagination">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import extend from '@/extend.js'
import HeadBar from '@/components/HeadBar'
import NavMenu from '@/components/NavMenu'
let userNo;
export default {
  name: 'UserInfo',
  components: {
    HeadBar,
    NavMenu
  },
  data() {
    return {
      txtUserName: "",
      currentPage: 1,
      pageIndex: 0,
      pageSize: 10,
      totalCount: 0,
      userList: [],

    }
  },
  mounted: function() {
    userNo = JSON.parse(sessionStorage.getItem('userInfo')).UserNo;
    this.getUserList()
  },
  methods: {
    //点击查询
    onClickSearch() {
      this.getUserList()
    },

    handleCurrentChange(val) {
      this.pageIndex = (this.currentPage - 1) * this.pageSize;
      this.getUserList()

    },

    //获取用户列表
    getUserList() {
      let self = this;
      let url = extend.rootPath + '/getUserList';
      let data = {
        UserNo: userNo,
        UserName: this.txtUserName,
        PageIndex: this.pageIndex,
        PageSize: this.pageSize

      };
      self.$http.get(url, { params: data }).then(function(successRes) {
        if (successRes.data.Code == 1) {
          self.totalCount = successRes.data.TotalCount;
          self.userList = successRes.data.UserList;
        }

      }, function(failRes) {

      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form-item {
  margin: 10px !important;
}

.my-table {
  margin-top: 10px;
  flex: 1;
}

.headImg {
  width: 100px;
  height: 100px;
}
</style>
