<template>
    <div class="app">
        <HeadBar></HeadBar>
        <div class="contain">
            <NavMenu></NavMenu>
            <div class="main-content">
                <!--顶部面包屑导航-->
                <el-breadcrumb separator="/" class="breadcrumb">
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>属性管理</el-breadcrumb-item>
                </el-breadcrumb>
    
                <!--顶部搜索-->
                <el-form :inline="true" class="top-form">
                    <el-form-item>
                        <el-button type="primary" @click="dialogAddAttribute = true">添加新属性</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="inputAttributeName" placeholder="请输入属性名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onClickSearch">查询</el-button>
                    </el-form-item>
                </el-form>
                <!--表格-->
                <el-table :data="typeList" class="my-table" height="100">
                    <el-table-column label="操作" width="200">
                        <template scope="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="attributeID" label="属性ID">
                    </el-table-column>
                    <el-table-column prop="attributeName" label="属性名称">
                    </el-table-column>
                </el-table>
                <!--底部分页-->
                <div class="pagination">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </div>
    
                <!--添加类型弹窗-->
                <el-dialog title='添加属性' :visible.sync="dialogAddAttribute">
                    <el-form>
                        <el-form-item label="属性名称">
                            <el-input v-model="addAttributeName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogAddAttribute = false">取 消</el-button>
                        <el-button type="primary" @click="addAttributeConfirm">确 定</el-button>
                    </div>
                </el-dialog>
    
                <!--修改品牌弹窗-->
                <el-dialog title='修改属性' :visible.sync="isUpdateAttribute">
                    <el-form>
                        <el-form-item label="属性ID">
                            <div>{{updateAttributeID}}</div>
                        </el-form-item>
                        <el-form-item label="属性名称">
                            <el-input v-model="updateAttributeName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="isUpdateAttribute = false">取 消</el-button>
                        <el-button type="primary" @click="updateAttributeConfirm">确 定</el-button>
                    </div>
                </el-dialog>
    
            </div>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import NavMenu from '@/components/NavMenu'
import extend from '@/extend.js'
let userNo;
export default {
    name: 'AttributeManagement',
    components: {
        HeadBar,
        NavMenu
    },
    data() {
        return {
            currentPage: 1,
            pageIndex: 0,
            pageSize: 10,
            addAttributeName: "",//弹窗输入的类型名
            inputAttributeName: "",//搜索输入的类型名
            dialogAddAttribute: false,//是否显示类型弹窗
            isUpdateAttribute: false,//是否是修改状态弹窗
            updateAttributeID: "",
            updateAttributeName: "",
            attributeList: []
        }
    },
    mounted: function () {
        userNo = JSON.parse(sessionStorage.getItem('userInfo')).UserNo;
        this.getAttributeList();
    },
    methods: {
        //点击查询
        onClickSearch() {
            this.getAttributeList();
        },
        handleCurrentChange() {
            this.pageIndex = (this.currentPage - 1) * this.pageSize;
        },
        //点击编辑
        handleEdit(index, row) {

            this.isUpdateAttribute = true;
            this.updateAttributeID = row.attributeID;
            this.updateAttributeName = row.attributeName;

        },
        //点击删除
        handleDelete(index, row) {
            let self = this;
            console.log(index, row);
            this.$confirm('确认删除类型【' + row.attributeName + '】以及它的所有子类型?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                let url = extend.rootPath + '/delAttribute';
                let data = {
                    UserNo: userNo,
                    AttributeID: row.attributeID,
                };
                self.$http.get(url, { params: data }).then(function (successRes) {
                    if (successRes.data.Code == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功',

                        });
                        self.getAttributeList();
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
        addAttributeConfirm() {
            let self = this;
            let url = extend.rootPath + '/addAttribute';
            let data = {

                ShopID: 'ALL',
                UserNo: userNo,
                AttributeID: '',
                AttributeName: this.addAttributeName

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    this.$message({
                        type: 'success',
                        message: '添加成功',

                    });
                    this.dialogAddAttribute = false;
                    self.getAttributeList();
                }

            }, function (failRes) {

            });

        },
        //修改品牌弹窗确认按钮
        updateAttributeConfirm() {
            let self = this;
            let url = extend.rootPath + '/addAttribute';
            let data = {
                 ShopID: 'ALL',
                UserNo: userNo,
                AttributeID: self.updateAttributeID,
                AttributeName: self.updateAttributeName

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    this.$message({
                        type: 'success',
                        message: '修改成功',

                    });
                    this.isUpdateAttribute = false;
                    self.getAttributeList();
                }

            }, function (failRes) {

            });

        },

        //获取类型列表
        getAttributeList() {
            let self = this;
            let url = extend.rootPath + '/getAttributeList';
            let data = {
                UserNo: userNo,
                AttributeName: this.inputAttributeName,
                PageIndex: this.pageIndex,
                PageSize: this.pageSize

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    self.attributeList = successRes.data.AttributeList;
                }

            }, function (failRes) {

            });
        },



    },

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
