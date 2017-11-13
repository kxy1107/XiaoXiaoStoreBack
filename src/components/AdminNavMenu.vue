<template>
        <el-row class="menu">
            <el-col >
                <el-menu  :default-active="$route.path"  unique-opened  router class="el-menu-vertical-demo">
                    <el-submenu index="1">
                        <template slot="title">商家管理</template>
                            <el-menu-item index="/AdminShoperManage">商家列表</el-menu-item>
                    </el-submenu>
                                       
                </el-menu>
            </el-col>
        </el-row>
</template>
<script>
export default {
  name:'AdminNavMenu',
 
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


