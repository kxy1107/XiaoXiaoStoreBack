<template>
  <div class="app">
    <HeadBar></HeadBar>
    <div class="contain">
      <AdminNavMenu></AdminNavMenu>
      <div class="main-content">
        <!--顶部面包屑导航-->
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>商家管理</el-breadcrumb-item>
          <el-breadcrumb-item>商家列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--顶部搜索-->
        <el-form :inline="true" class="top-form">
          <el-form-item>
            <el-input v-model="txtUserPhone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onClickSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!--表格-->
        <el-table :data="shoperList" class="my-table" height="100">
          <el-table-column label="操作" width="200">
            <template scope="scope">
                <span v-if='scope.row.CheckState == "C0A"'>已通过</span>
                <span v-if='scope.row.CheckState == "C0J"'>已拒绝</span>
                <el-button v-if='scope.row.CheckState == "C0C"' size="small" @click="clickAccess(scope.$index, scope.row)">通过</el-button>
                <el-button v-if='scope.row.CheckState == "C0C"' size="small" type="danger" @click="clickReject(scope.$index, scope.row)">拒绝</el-button>
            </template>
         </el-table-column>

          <el-table-column prop="UserNo" label="用户ID">
          </el-table-column>

          <el-table-column prop="UserName" label="姓名">
          </el-table-column>
          <el-table-column prop="UserPhone" label="手机号">
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
import extend from "@/extend.js";
import HeadBar from "@/components/HeadBar";
import AdminNavMenu from "@/components/AdminNavMenu";
let userNo;
export default {
  name: "UserInfo",
  components: {
    HeadBar,
    AdminNavMenu
  },
  data() {
    return {
      txtUserPhone: "",
      currentPage: 1,
      pageIndex: 0,
      pageSize: 10,
      totalCount: 0,
      shoperList: []
    };
  },
  mounted: function() {
    userNo = JSON.parse(sessionStorage.getItem("userInfo")).UserNo;
    this.getShoperList();
  },
  methods: {
    //点击查询
    onClickSearch() {
      this.getShoperList();
    },

    //点击通过
    clickAccess(index, row) {
      let self = this;
      let url = extend.rootPath + "/checkShoper";
      let data = {
        UserNo: userNo,
        AdminID: row.AdminID,
        CheckResult: "ACCESS"
      };
      self.$http.get(url, { params: data }).then(
        function(successRes) {
          if (successRes.data.Code == 1) {
            self.getShoperList();
          }
        },
        function(failRes) {}
      );
    },
    //点击拒绝
    clickReject(index, row) {
      let self = this;
      let url = extend.rootPath + "/checkShoper";
      let data = {
        UserNo: userNo,
        AdminID: row.AdminID,
        CheckResult: "REJECT"
      };
      self.$http.get(url, { params: data }).then(
        function(successRes) {
          if (successRes.data.Code == 1) {
            self.getShoperList();
          }
        },
        function(failRes) {}
      );
    },

    handleCurrentChange(val) {
      this.pageIndex = (this.currentPage - 1) * this.pageSize;
      this.getShoperList();
    },

    //获取用户列表
    getShoperList() {
      let self = this;
      let url = extend.rootPath + "/getShoperList";
      let data = {
        UserNo: userNo,
        UserPhone: this.txtUserPhone,
        PageIndex: this.pageIndex,
        PageSize: this.pageSize
      };
      self.$http.get(url, { params: data }).then(
        function(successRes) {
          if (successRes.data.Code == 1) {
            self.totalCount = successRes.data.TotalCount;
            self.shoperList = successRes.data.ShoperList;
          }
        },
        function(failRes) {}
      );
    }
  }
};
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
