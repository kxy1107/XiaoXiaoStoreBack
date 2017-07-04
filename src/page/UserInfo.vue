<template>
  <div class="main-content">
    <!--顶部面包屑导航-->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
  
    <!--顶部搜索-->
    <el-form :inline="true" :model="formUserInfo" class="top-form">
      <el-form-item>
        <el-input v-model="formUserInfo.userName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onClickSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="userInfoData" class="my-table" height="500">
      <el-table-column prop="userName" label="姓名">
      </el-table-column>
      <el-table-column prop="userSex" label="性别">
      </el-table-column>
      <el-table-column prop="userRegisterTime" label="注册时间">
      </el-table-column>
    </el-table>
    <!--底部分页-->
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page="1" :page-size="10" layout="total, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
  
  </div>
</template>

<script>

export default {
  name: 'UserInfo',
  data() {
    return {
      formUserInfo: {
        userName: "",
      },
      userInfoData: [
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          userRegisterTime: "2017-6-27",
        },
      ]
    }
  },
  methods: {
    //点击查询
    onClickSearch() {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.breadcrumb{
  padding: 0 10px 10px 0;
}

.top-form {
  background-color: #f2f2f2;
}
.el-form-item {
  margin: 11px !important;
}

.my-table{
  margin-top: 10px;
  }



.pagination {
  float: right;
  margin: 5px 20px 0 0;
}

.pagination input {
  width: 50px !important;
}

</style>
