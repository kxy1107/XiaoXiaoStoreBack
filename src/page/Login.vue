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
export default {
    name: 'Login',
    data() {
        return {
            checked: true,
            logining: false,
        }
    },
    methods: {
        toLogin() {
            this.$router.push({ path: '/UserInfo' });
        },
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



