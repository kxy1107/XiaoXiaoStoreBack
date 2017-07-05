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
        <el-input v-model="formUserInfo.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onClickSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="userInfoData" class="my-table" height="100">

      <el-table-column prop="userName" label="姓名">
      </el-table-column>

      <el-table-column prop="userSex" label="性别">
      </el-table-column>

      <el-table-column label="头像">
        <template scope="scope">
          <img class="headImg" :src="scope.row.userImg">
        </template>
      </el-table-column>
  
      <el-table-column prop="UserCity" label="城市">
      </el-table-column>

      <el-table-column prop="userRegisterTime" label="注册时间">
      </el-table-column>

      <el-table-column prop="LastLoginTime" label="最后登录时间">
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
          userImg: "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep4qrJiaLrkTib8Kib5h3qZBEbvCP5JZURSic9I2AHKJl6eLPdcAZDCxs0z3mxS8nia4Waty9wiam5wnh9A/0",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep4qrJiaLrkTib8Kib5h3qZBEbvCP5JZURSic9I2AHKJl6eLPdcAZDCxs0z3mxS8nia4Waty9wiam5wnh9A/0",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep4qrJiaLrkTib8Kib5h3qZBEbvCP5JZURSic9I2AHKJl6eLPdcAZDCxs0z3mxS8nia4Waty9wiam5wnh9A/0",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
        {
          userName: "小王",
          userImg: "",
          userSex: "男",
          UserCity: "福州",
          userRegisterTime: "2017-6-27",
          LastLoginTime: "2017-7-5"
        },
      ]
    }
  },
  methods: {
    //点击查询
    onClickSearch() {

    },
    handleCurrentChange(val) {

    }
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
