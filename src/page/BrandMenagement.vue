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
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="brandList.length">
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
            currentPage: 1,
            pageIndex: 0,
            pageSize: 10,
            inputBrandName: "",//搜索输入的品牌名
            addBrandName: "",//弹窗输入的品牌名
            dialogAddBrand: false,//是否显示弹窗
            isUpdateBrand: false,//是否是修改状态
            updateBrandID: "",//修改品牌的ID
            updateBrandName: "",//修改品牌的名称
            brandList: [],//品牌列表
        }
    },
    mounted: function () {
        userNo = JSON.parse(sessionStorage.getItem('userInfo')).UserNo;
        this.getBrandList()
    },
    methods: {
        //点击查询
        onClickSearch() {
            this.getBrandList()
        },
        handleCurrentChange(val) {
            this.pageIndex = (this.currentPage - 1) * this.pageSize;
        },
        //点击编辑
        handleEdit(index, row) {
            this.isUpdateBrand = true;
            this.updateBrandID = row.brandID;
            this.updateBrandName = row.brandName;

        },
        //点击删除
        handleDelete(index, row) {
            let self = this;
            console.log(index, row);
            this.$confirm('确认删除品牌【' + row.brandName + '】?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                let url = extend.rootPath + '/delBrand';
                let data = {
                    UserNo: userNo,
                    BrandID: row.brandID,
                };
                self.$http.get(url, { params: data }).then(function (successRes) {
                    if (successRes.data.Code == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功',

                        });
                        self.getBrandList();
                    }
                }, function (failRes) {
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
            let self = this;
            let url = extend.rootPath + '/addBrand';
            let data = {
                UserNo: userNo,
                BrandID: '',
                BrandName: this.addBrandName

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    this.$message({
                        type: 'success',
                        message: '添加成功',

                    });
                    self.dialogAddBrand = false;
                    self.getBrandList();
                }

            }, function (failRes) {

            });
        },
        //修改品牌弹窗确认按钮
        updateBrandConfirm() {
            let self = this;
            let url = extend.rootPath + '/addBrand';
            let data = {
                UserNo: userNo,
                BrandID: self.updateBrandID,
                BrandName: self.updateBrandName

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    this.$message({
                        type: 'success',
                        message: '修改成功',

                    });
                    this.isUpdateBrand = false;
                    self.getBrandList();
                }

            }, function (failRes) {

            });
        },

        //获取品牌列表
        getBrandList() {
            let self = this;
            let url = extend.rootPath + '/getBrandList';
            let data = {
                UserNo: userNo,
                BrandName: this.inputBrandName,
                PageIndex: this.pageIndex,
                PageSize: this.pageSize

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    self.brandList = successRes.data.BrandList;
                }

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
