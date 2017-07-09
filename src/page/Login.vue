<template>
    <el-form class="login-content">
        <h3 class="login-content-title">系统登录</h3>
        <el-form-item>
            <el-input v-model="userName" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
    
        <el-form-item>
            <el-input type='password' v-model="userPassword" placeholder="密码"></el-input>
        </el-form-item>
    
        <el-form-item>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form-item>
    
        <el-form-item>
            <el-button @click="toLogin" class="login-content-button" type="primary" :loading="logining">登陆</el-button>
        </el-form-item>
    
    </el-form>
</template>
<script>
import extend from '@/extend.js'
export default {
    name: 'Login',
    data() {
        return {
            userName:'',
            userPassword:'',
            checked: true,
            logining: false,
        }
    },
    methods: {
        //点击登陆
        toLogin() {
            let self = this;
       
            if(self.checkInfo()){
                 let url = extend.rootPath + '/login';
                    let data = {
                        Phone: self.userName,
                        Password:self.userPassword
                    };
                    this.$http.get(url, { params: data }).then(function (successRes) {
                        if(successRes.data.Code == 1){
                            self.isRemember();
                            let userInfo =  JSON.stringify(successRes.data.UserInfo);
                            sessionStorage.setItem("userInfo", userInfo);	
                            this.$router.push({ path: '/UserInfo' });
                        }
                       
                    }, function (failRes) {

                    });
            }


           
        },
        //校验账号密码
        checkInfo(){
          if(this.userName.replace(/(^s*)|(s*$)/g, "").length == 0){
              this.$message({
                message: '账号不能为空！',
                duration:1500,
                type: 'error'
                });
              return false;
          }else if(this.userPassword.replace(/(^s*)|(s*$)/g, "").length == 0) {
                this.$message({
                message: '密码不能为空！',
                 duration:1500,
                type: 'error'
                });
              return false;
          }
          return true;
        },

        //是否记住密码
        isRemember(){
            if(this.checked){
                extend.setCookie('UserName',this.userName,3);
                extend.setCookie('UserPassword',this.userPassword,3);
            }else{
                extend.delCookie('UserName');
                 extend.delCookie('UserPassword');
            }
        },
    },

    //页面加载完
    mounted(){
        let userName = extend.getCookie('UserName') ;
        let pwd = extend.getCookie('UserPassword') ;
        if(userName != null && pwd != null){
            this.userName = userName;
            this.userPassword = pwd;
        }
    }
}
</script>
<style>
.login-content {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    width: 350px;
    padding: 35px 35px 15px 35px;
}

.login-content-title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}

.login-content-button {
    width: 100%;
}
</style>



