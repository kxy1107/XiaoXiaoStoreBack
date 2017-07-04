<template>
        <el-row class="menu">
            <el-col >
                <el-menu default-active="1-1" unique-opened="true"  router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" >
                    <el-submenu index="1">
                        <template slot="title">用户管理</template>
                            <el-menu-item index="1-1" route="/UserInfo">用户列表</el-menu-item>
                    </el-submenu>
                     <el-submenu index="2">
                        <template slot="title">商品管理</template>
                            <el-menu-item index="2-1" route="/">顶部轮播图管理</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">导航三</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
</template>
<script>
export default {
  name:'NavMenu'
}
</script>
<style scoped>
.menu{
    width: 15%;
    height: 100%;
}
.menu div{
     height: 100%;
}
.menu div ul{
     height: 100%;
}
</style>


