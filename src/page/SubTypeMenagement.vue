<template>
    <div class="app">
        <HeadBar></HeadBar>
        <div class="contain">
            <NavMenu></NavMenu>
            <div class="main-content">
                <!--顶部面包屑导航-->
                <el-breadcrumb separator="/" class="breadcrumb">
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>子类型管理</el-breadcrumb-item>
                </el-breadcrumb>
    
                <!--顶部搜索-->
                <el-form :inline="true" class="top-form">
                    <el-form-item>
                        <el-button type="primary" @click="dialogAddSubType = true">添加新子类型</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="inputSubTypeName" placeholder="请输入子类型名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onClickSearch">查询</el-button>
                    </el-form-item>
                </el-form>
                <!--表格-->
                <el-table :data="subTypeList" class="my-table" height="100">
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
                    <el-table-column prop="subTypeID" label="子类型ID">
                    </el-table-column>
                    <el-table-column prop="subTypeName" label="子类型名称">
                    </el-table-column>
                     <el-table-column label="子类型图标">
                        <template scope="scope">
                           <img class="type-icon-img" :src= "scope.row.subTypeIcon"/>
                           
                        </template>
                    </el-table-column>
                </el-table>
                <!--底部分页-->
                <div class="pagination">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>
                </div>
    
                <!--添加子类型弹窗-->
                <el-dialog title='添加子类型' :visible.sync="dialogAddSubType">
                    <el-form>
                        <el-form-item label="请选择上级类型">
                            <el-select v-model="selectType" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.typeID" :label="item.typeName" :value="item.typeID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="子类型名称">
                            <el-input v-model="addSubTypeName" auto-complete="off"></el-input>
                        </el-form-item>
                         <el-form-item label="子类型图标：">
                            <div class="shop-detail-index-banner">
                                <el-upload  class="avatar-uploader" action="http://localhost:8028/pc/uploadBanner" :show-file-list="false" :on-success="uploadIconImage">
                                    <img v-if="subTypeIconImg" :src="subTypeIconImg" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
    
                                <el-button v-if="subTypeIconImg != ''" @click="delIconPic" type="danger" class="shop-detail-btn-del-index-banner">删除</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogAddSubType = false">取 消</el-button>
                        <el-button type="primary" @click="addSubTypeConfirm">确 定</el-button>
                    </div>
                </el-dialog>
    
                <!--修改品牌弹窗-->
                <el-dialog title='修改子类型' :visible.sync="isUpdateSubType">
                    <el-form>
                        <el-form-item label="请选择上级类型">
                            <el-select v-model="selectType" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.typeID" :label="item.typeName" :value="item.typeID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="子类型ID">
                            <div>{{updateSubTypeID}}</div>
                        </el-form-item>
                        <el-form-item label="子类型名称">
                            <el-input v-model="updateSubTypeName" auto-complete="off"></el-input>
                        </el-form-item>
                         <el-form-item label="子类型图标：">
                            <div class="shop-detail-index-banner">
                                <el-upload class="avatar-uploader" action="http://localhost:8028/pc/uploadBanner" :show-file-list="false" :on-success="uploadIconImage">
                                    <img v-if="subTypeIconImg" :src="subTypeIconImg" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
    
                                <el-button v-if="subTypeIconImg != ''" @click="delIconPic" type="danger" class="shop-detail-btn-del-index-banner">删除</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="isUpdateSubType = false">取 消</el-button>
                        <el-button type="primary" @click="updateSubTypeConfirm">确 定</el-button>
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
    name: 'SubTypeMenagement',
    components: {
        HeadBar,
        NavMenu
    },
    data() {
        return {
            currentPage: 1,
            pageIndex: 0,
            pageSize: 10,
            addSubTypeName: "",//弹窗输入的子类型
            inputSubTypeName: "",//搜索输入的子类型
            dialogAddSubType: false,//是否显示子类型弹窗
            isUpdateSubType: false,//是否是修改子类型状态
            updateSubTypeID: "111222",
            updateSubTypeName: "",
            selectType: "",
            options: [],
            subTypeIconImg: "",//类型子图标
            totalCount: 0,
            subTypeList: []
        }
    },
    mounted: function () {
        userNo = JSON.parse(sessionStorage.getItem('userInfo')).UserNo;
        this.getSubTypeList();
        this.getTypeList();
    },
    methods: {
        //点击查询
        onClickSearch() {
            this.getSubTypeList();
        },
        handleCurrentChange() {
            this.pageIndex = (this.currentPage - 1) * this.pageSize;
            this.getSubTypeList();
        },
        //点击编辑
        handleEdit(index, row) {
            this.isUpdateSubType = true;
            this.updateSubTypeID = row.subTypeID;
            this.updateSubTypeName = row.subTypeName;
            this.selectType = row.typeID;
            this.subTypeIconImg = row.subTypeIcon;

        },
        //点击删除
        handleDelete(index, row) {
            let self = this;
            console.log(index, row);
            this.$confirm('确认删除子类型【' + row.subTypeName + '】?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                let url = extend.rootPath + '/delSubType';
                let data = {
                    UserNo: userNo,
                    SubTypeID: row.subTypeID,
                };
                self.$http.get(url, { params: data }).then(function (successRes) {
                    if (successRes.data.Code == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功',

                        });
                        self.getSubTypeList();
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



        //添加子类型弹窗确认按钮
        addSubTypeConfirm() {
            let self = this;
            let url = extend.rootPath + '/addSubType';
            let data = {
                UserNo: userNo,
                TypeID: this.selectType,
                SubTypeID: '',
                SubTypeName: this.addSubTypeName,
                SubTypeIcon: this.subTypeIconImg

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    this.$message({
                        type: 'success',
                        message: '添加成功',

                    });
                    this.dialogAddSubType = false;
                    self.getSubTypeList();
                }

            }, function (failRes) {

            });

        },
        //修改品牌弹窗确认按钮
        updateSubTypeConfirm() {
            let self = this;
            let url = extend.rootPath + '/addSubType';
            let data = {
                UserNo: userNo,
                TypeID: this.selectType,
                SubTypeID: self.updateSubTypeID,
                SubTypeName: self.updateSubTypeName,
                SubTypeIcon: this.subTypeIconImg

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    this.$message({
                        type: 'success',
                        message: '修改成功',

                    });
                    this.isUpdateSubType = false;
                    self.getSubTypeList();
                }

            }, function (failRes) {

            });

        },


        //获取子类型列表
        getSubTypeList() {
            let self = this;
            let url = extend.rootPath + '/getSubTypeList';
            let data = {
                UserNo: userNo,
                SubTypeName: this.inputSubTypeName,
                PageIndex: this.pageIndex,
                PageSize: this.pageSize

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    self.totalCount = successRes.data.TotalCount;
                    self.subTypeList = successRes.data.SubTypeList;
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
                TypeName: '',
                PageIndex: 0,
                PageSize: 10000,

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    self.options = successRes.data.TypeList;
                }

            }, function (failRes) {

            });
        },
           //上传类型图标成功时
        uploadIconImage(res, file) {
            console.log(res);
            this.subTypeIconImg = extend.imgPath + res.ImgUrl;
        },

        // 删除类型图标
        delIconPic() {
            this.subTypeIconImg = "";
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
