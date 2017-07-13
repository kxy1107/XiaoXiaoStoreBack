<template>
    <div class="app">
        <HeadBar></HeadBar>
        <div class="contain">
            <NavMenu></NavMenu>
            <div class="main-content">
                <!--顶部面包屑导航-->
                <el-breadcrumb separator="/" class="breadcrumb">
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>属性值管理</el-breadcrumb-item>
                </el-breadcrumb>
    
                <!--顶部搜索-->
                <el-form :inline="true" class="top-form">
                    <el-form-item>
                        <el-button type="primary" @click="dialogAddAttributeValue = true">添加新属性值</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="inputAttributeValueName" placeholder="请输入属性值名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onClickSearch">查询</el-button>
                    </el-form-item>
                </el-form>
                <!--表格-->
                <el-table :data="attributeValueList" class="my-table" height="100">
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
                    <el-table-column prop="attributeValueID" label="属性值ID">
                    </el-table-column>
                    <el-table-column prop="attributeValueName" label="属性值">
                    </el-table-column>
                </el-table>
                <!--底部分页-->
                <div class="pagination">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </div>
    
                <!--添加子类型弹窗-->
                <el-dialog title='添加属性值' :visible.sync="dialogAddAttributeValue">
                    <el-form>
                        <el-form-item label="请选择属性">
                            <el-select v-model="selectAttribute" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.attributeID" :label="item.attributeName" :value="item.attributeID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="属性值">
                            <el-input v-model="addAttributeValueName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogAddAttributeValue = false">取 消</el-button>
                        <el-button type="primary" @click="addAttributeValueConfirm">确 定</el-button>
                    </div>
                </el-dialog>
    
                <!--修改品牌弹窗-->
                <el-dialog title='修改属性值' :visible.sync="isUpdateAttributeValue">
                    <el-form>
                        <el-form-item label="请选择属性">
                            <el-select v-model="selectAttribute" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.attributeID" :label="item.attributeName" :value="item.attributeID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="属性值ID">
                            <div>{{updateAttributeValueID}}</div>
                        </el-form-item>
                        <el-form-item label="属性值">
                            <el-input v-model="updateAttributeValueName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="isUpdateAttributeValue = false">取 消</el-button>
                        <el-button type="primary" @click="updateAttributeValueConfirm">确 定</el-button>
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
    name: 'AttributeValueMenagement',
    components: {
        HeadBar,
        NavMenu
    },
    data() {
        return {
            currentPage: 1,
            pageIndex: 0,
            pageSize: 10,
            addAttributeValueName: "",//弹窗输入的子类型
            inputAttributeValueName: "",//搜索输入的子类型
            dialogAddAttributeValue: false,//是否显示子类型弹窗
            isUpdateAttributeValue: false,//是否是修改子类型状态
            updateAttributeValueID: "111222",
            updateAttributeValueName: "",
            selectAttribute: "",
            options: [{
                attributeID: '111',
                attributeName: '短袖'
            }, {
                attributeID: '222',
                attributeName: '裙子'
            }],
            attributeValueList: []
        }
    },
    mounted: function () {
        userNo = JSON.parse(sessionStorage.getItem('userInfo')).UserNo;
        this.getAttributeValueList();
        this.getAttributeList();
    },
    methods: {
        //点击查询
        onClickSearch() {
            this.getAttributeValueList();
        },
        handleCurrentChange() {
            this.pageIndex = (this.currentPage - 1) * this.pageSize;
        },
        //点击编辑
        handleEdit(index, row) {
            this.isUpdateAttributeValue = true;
            this.updateAttributeValueID = row.attributeValueID;
            this.updateAttributeValueName = row.attributeValueName;

        },
        //点击删除
        handleDelete(index, row) {
            let self = this;
            console.log(index, row);
            this.$confirm('确认删除属性值【' + row.attributeValueName + '】?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                let url = extend.rootPath + '/delAttributeValue';
                let data = {
                    UserNo: userNo,
                    AttributeValueID: row.attributeValueID,
                };
                self.$http.get(url, { params: data }).then(function (successRes) {
                    if (successRes.data.Code == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功',

                        });
                        self.getAttributeValueList();
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
        addAttributeValueConfirm() {
            let self = this;
            let url = extend.rootPath + '/addAttributeValue';
            let data = {
                UserNo: userNo,
                TypeID:this.selectType,
                AttributeValueID: '',
                AttributeValueName: this.addAttributeValueName

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    this.$message({
                        type: 'success',
                        message: '添加成功',

                    });
                    this.dialogAddAttributeValue = false;
                    self.getAttributeValueList();
                }

            }, function (failRes) {

            });

        },
        //修改品牌弹窗确认按钮
        updateAttributeValueConfirm() {
            let self = this;
            let url = extend.rootPath + '/addAttributeValue';
            let data = {
                UserNo: userNo,
                AttributeID:this.selectAttribute,
               AttributeValueID: self.updateAttributeValueID,
                AttributeValueName: self.updateAttributeValueName

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    this.$message({
                        type: 'success',
                        message: '修改成功',

                    });
                    this.isUpdateAttributeValue = false;
                    self.getAttributeValueList();
                }

            }, function (failRes) {

            });

        },


        //获取子类型列表
        getAttributeValueList() {
            let self = this;
            let url = extend.rootPath + '/getAttributeValueList';
            let data = {
                UserNo: userNo,
               AttributeValueName: this.inputAttributeValueName,
                PageIndex: this.pageIndex,
                PageSize: this.pageSize

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    self.attributeValueList = successRes.data.AttributeValueList;
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
                PageIndex: 0,
                PageSize: 10000,

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    self.options = successRes.data.AttributeList;
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
