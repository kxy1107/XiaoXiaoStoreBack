<template>
        <el-row class="menu">
            <el-col >
                <el-menu  :default-active="$route.path"  unique-opened  router class="el-menu-vertical-demo">
                    <el-submenu index="1">
                        <template slot="title">用户管理</template>
                            <el-menu-item index="/UserInfo">用户列表</el-menu-item>
                    </el-submenu>
                     <el-submenu index="2">
                        <template slot="title">商品管理</template>
                            <el-menu-item index="/BrandMenagement" >品牌管理</el-menu-item>
                            <el-menu-item index="/TypeMenagement" >类型管理</el-menu-item>
                            <el-menu-item index="/SubTypeMenagement">子类型管理</el-menu-item>
                            <el-menu-item index="/AttributeManagement">属性管理</el-menu-item>
                            <el-menu-item index="/AttributeValueManagement">属性值管理</el-menu-item>
                            <el-menu-item index="/ShopInfoManagement">商品列表管理</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">导航三</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
</template>
<script>
export default {
  name:'NavMenu',
 
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


