<template>
    <div class="app">
        <HeadBar></HeadBar>
        <div class="contain">
            <NavMenu></NavMenu>
            <div class="main-content">
                <!--顶部面包屑导航-->
                <el-breadcrumb separator="/" class="breadcrumb">
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>类型管理</el-breadcrumb-item>
                </el-breadcrumb>
    
                <!--顶部搜索-->
                <el-form :inline="true" class="top-form">
                    <el-form-item>
                        <el-button type="primary" @click="addNewType">添加新类型</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="inputTypeName" placeholder="请输入类型名"></el-input>
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
                    <el-table-column prop="typeID" label="类型ID">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型名称">
                    </el-table-column>
                    <el-table-column label="类型图标">
                        <template scope="scope">
                           <img class="type-icon-img" :src= "scope.row.typeIcon"/>
                           
                        </template>
                    </el-table-column>
                </el-table>
                <!--底部分页-->
                <div class="pagination">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>
                </div>
    
                <!--添加类型弹窗-->
                <el-dialog title='添加类型' :visible.sync="dialogAddType">
                    <el-form>
                        <el-form-item label="类型名称">
                            <el-input v-model="addTypeName" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="类型图标：">
                            <div class="shop-detail-index-banner">
                                <el-upload  class="avatar-uploader" action="https://afsc.jianyuejizhang.cn/pc/uploadBanner" :show-file-list="false" :on-success="uploadIconImage">
                                    <img v-if="typeIconImg" :src="typeIconImg" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
    
                                <el-button v-if="typeIconImg != ''" @click="delIconPic" type="danger" class="shop-detail-btn-del-index-banner">删除</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogAddType = false">取 消</el-button>
                        <el-button type="primary" @click="addTypeConfirm">确 定</el-button>
                    </div>
                </el-dialog>
    
                <!--修改品牌弹窗-->
                <el-dialog title='修改类型' :visible.sync="isUpdateType">
                    <el-form>
                        <el-form-item label="类型ID">
                            <div>{{updateTypeID}}</div>
                        </el-form-item>
                        <el-form-item label="类型名称">
                            <el-input v-model="updateTypeName" auto-complete="off"></el-input>
                        </el-form-item>
                         <el-form-item label="类型图标：">
                            <div class="shop-detail-index-banner">
                                <el-upload  class="avatar-uploader" action="https://afsc.jianyuejizhang.cn/pc/uploadBanner" :show-file-list="false" :on-success="uploadIconImage">
                                    <img v-if="typeIconImg" :src="typeIconImg" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
    
                                <el-button v-if="typeIconImg != ''" @click="delIconPic" type="danger" class="shop-detail-btn-del-index-banner">删除</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="isUpdateType = false">取 消</el-button>
                        <el-button type="primary" @click="updateTypeConfirm">确 定</el-button>
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
    name: 'TypeManagement',
    components: {
        HeadBar,
        NavMenu
    },
    data() {
        return {
            currentPage: 1,
            pageIndex: 0,
            pageSize: 10,
            addTypeName: "",//弹窗输入的类型名
            inputTypeName: "",//搜索输入的类型名
            dialogAddType: false,//是否显示类型弹窗
            isUpdateType: false,//是否是修改状态弹窗
            updateTypeID: "",
            updateTypeName: "",
            totalCount: 0,
            typeIconImg: "",//商品图标
            typeList: []
        }
    },
    mounted: function () {
        userNo = JSON.parse(sessionStorage.getItem('userInfo')).UserNo;
        this.getTypeList();
    },
    methods: {
        //点击查询
        onClickSearch() {
            this.getTypeList();
        },
        handleCurrentChange() {
            this.pageIndex = (this.currentPage - 1) * this.pageSize;
            this.getTypeList();
        },
        addNewType(){
            this.addTypeName = "";
            this.typeIconImg = "";
            this.dialogAddType = true;

        },


        //点击编辑
        handleEdit(index, row) {

            this.isUpdateType = true;
            this.updateTypeID = row.typeID;
            this.updateTypeName = row.typeName;
            this.typeIconImg = row.typeIcon;

        },
        //点击删除
        handleDelete(index, row) {
            let self = this;
            console.log(index, row);
            this.$confirm('确认删除类型【' + row.typeName + '】以及它的所有子类型?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                let url = extend.rootPath + '/delType';
                let data = {
                    UserNo: userNo,
                    TypeID: row.typeID,
                };
                self.$http.get(url, { params: data }).then(function (successRes) {
                    if (successRes.data.Code == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功',

                        });
                        self.getTypeList();
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
        addTypeConfirm() {
            let self = this;
            let url = extend.rootPath + '/addType';
            let data = {
                UserNo: userNo,
                TypeID: '',
                TypeName: self.addTypeName,
                TypeIcon: self.typeIconImg

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    this.$message({
                        type: 'success',
                        message: '添加成功',

                    });
                    this.dialogAddType = false;
                    self.getTypeList();
                }

            }, function (failRes) {

            });

        },
        //修改品牌弹窗确认按钮
        updateTypeConfirm() {
            let self = this;
            let url = extend.rootPath + '/addType';
            let data = {
                UserNo: userNo,
                TypeID: self.updateTypeID,
                TypeName: self.updateTypeName,
                TypeIcon: self.typeIconImg

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    this.$message({
                        type: 'success',
                        message: '修改成功',

                    });
                    this.isUpdateType = false;
                    self.getTypeList();
                }

            }, function (failRes) {

            });

        },

        //获取类型列表
        getTypeList() {
            let self = this;
            let url = extend.rootPath + '/getTypeList';
            let data = {
                UserNo: userNo,
                TypeName: this.inputTypeName,
                PageIndex: this.pageIndex,
                PageSize: this.pageSize

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    self.totalCount = successRes.data.TotalCount;
                    self.typeList = successRes.data.TypeList;
                }

            }, function (failRes) {

            });
        },

        //上传类型图标成功时
        uploadIconImage(res, file) {
            console.log(res);
            this.typeIconImg = extend.imgPath + res.ImgUrl;
        },

        // 删除类型图标
        delIconPic() {
            this.typeIconImg = "";
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

.avatar-uploader {
    min-width: 178px;
    border: 1px dashed #c3c3c3;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploade:hover {
    border-color: red;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 178px;
    min-height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    min-width: 178px;
    min-height: 178px;
    display: block;
}

.shop-detail-index-banner {
    display: flex;
    align-items: center;
}

.shop-detail-btn-del-index-banner {
    margin: 20px;
    width: 100px;
    height: 50px;
}
.type-icon-img{
    width: 40px;
    height: 40px;
}
</style>
