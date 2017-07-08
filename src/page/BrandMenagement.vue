<template>
    <div class="app">
        <HeadBar></HeadBar>
        <div class="contain">
            <NavMenu></NavMenu>
            <div class="main-content">
                <!--顶部面包屑导航-->
                <el-breadcrumb separator="/" class="breadcrumb">
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
                </el-breadcrumb>
    
                <!--顶部搜索-->
                <el-form :inline="true" class="top-form">
                    <el-form-item>
                        <el-button type="primary" @click="dialogAddBrand = true">添加新品牌</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="inputBrandName" placeholder="请输入品牌名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onClickSearch">查询</el-button>
                    </el-form-item>
                </el-form>
                <!--表格-->
                <el-table :data="brandList" class="my-table" height="100">
                    <el-table-column label="操作" width="200">
                        <template scope="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="brandID" label="品牌ID">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌名称">
                    </el-table-column>
                </el-table>
                <!--底部分页-->
                <div class="pagination">
                    <el-pagination @current-change="handleCurrentChange" :current-page="1" :page-size="10" layout="total, prev, pager, next, jumper" :total="brandList.length">
                    </el-pagination>
                </div>
    
                <!--添加品牌弹窗-->
                <el-dialog title='添加品牌' :visible.sync="dialogAddBrand">
                    <el-form>
                        <el-form-item label="品牌名称">
                            <el-input v-model="addBrandName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogAddBrand = false">取 消</el-button>
                        <el-button type="primary" @click="addBrandConfirm">确 定</el-button>
                    </div>
                </el-dialog>
    
                <!--修改品牌弹窗-->
                <el-dialog title='修改品牌' :visible.sync="isUpdateBrand">
                    <el-form>
                        <el-form-item label="品牌ID">
                            <div>{{updateBrandID}}</div>
                        </el-form-item>
                        <el-form-item label="品牌名称">
                            <el-input v-model="updateBrandName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="isUpdateBrand = false">取 消</el-button>
                        <el-button type="primary" @click="updateBrandConfirm">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import serverAddress from '@/root.js'
import HeadBar from '@/components/HeadBar'
import NavMenu from '@/components/NavMenu'
export default {
    name: 'UserInfo',
    components: {
        HeadBar,
        NavMenu
    },
    data() {
        return {

            addBrandName: "",//弹窗输入的品牌名
            inputBrandName: "",//搜索输入的品牌名
            dialogAddBrand: false,//是否显示弹窗
            isUpdateBrand: false,//是否是修改状态
            updateBrandID: "",//修改品牌的ID
            updateBrandName: "",//修改品牌的名称
            brandList: [
                {
                    brandID: "111",
                    brandName: "耐克",
                },
                {
                    brandID: "112",
                    brandName: "特步",
                },
                {
                    brandID: "113",
                    brandName: "阿迪达斯",
                },
                {
                    brandID: "114",
                    brandName: "安踏",
                },
                {
                    brandID: "115",
                    brandName: "乔丹",
                },

            ]
        }
    },
    mounted: function () {
        this.getBrandList()
    },
    methods: {
        //点击查询
        onClickSearch() {

        },
        handleCurrentChange() {

        },
        //点击编辑
        handleEdit(index, row) {
            this.isUpdateBrand = true;
            this.updateBrandID = row.brandID,
                this.updateBrandName = row.brandName

        },
        //点击删除
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('确认删除品牌【' + row.brandName + '】?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },



        //添加品牌弹窗确认按钮
        addBrandConfirm() {
            this.dialogAddBrand = false;
        },
        //修改品牌弹窗确认按钮
        updateBrandConfirm() {
            this.isUpdateBrand = false;
        },

        getBrandList() {
            let url = serverAddress.rootPath + '/getBrandList';
            let data = {
                userNo: "111"
            };
            this.$http.get(url, { params: data }).then(function (successRes) {

            }, function (failRes) {

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
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
}
</style>
