<template>
    <div class="app">
        <HeadBar></HeadBar>
        <div class="contain">
            <NavMenu></NavMenu>
            <div class="main-content">
                <!--顶部面包屑导航-->
                <el-breadcrumb separator="/" class="breadcrumb">
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>联系方式管理</el-breadcrumb-item>
                </el-breadcrumb>

                <el-form class="top-form" label-width="100px">
                    <el-button v-if="!canEdit" type="primary" @click="onClickEdit">编辑</el-button>

                    <el-form-item label="姓名">
                        <el-input v-model="txtName" :disabled="!canEdit" placeholder="请输入姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="手机号码">
                        <el-input v-model="txtPhone" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="QQ">
                        <el-input v-model="txtQQ" :disabled="!canEdit"></el-input>
                    </el-form-item>

                    <el-form-item label="微信号">
                        <el-input v-model="txtWechat" :disabled="!canEdit"></el-input>
                    </el-form-item>

                    <el-form-item label="微信二维码">
                        <div class="shop-detail-index-banner">
                            <el-upload :before-upload="beforeAvatarUpload" class="avatar-uploader" action="https://afsc.jianyuejizhang.cn/pc/uploadBanner" :show-file-list="false" :on-success="uploadQrCode" :disabled="!canEdit">
                                <img v-if="wechatQrCodeUrl" :src="wechatQrCodeUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>

                            <el-button v-if="wechatQrCodeUrl != '' && canEdit" @click="delQrCode" type="danger" class="shop-detail-btn-del-index-banner">删除</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="canEdit">
                        <el-button type="primary" @click="onClickSave">保存</el-button>
                    </el-form-item>
                </el-form>
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
    name: 'ConnectManagement',
    components: {
        HeadBar,
        NavMenu
    },
    data() {
        return {
            canEdit: false,
            txtName: "",
            txtPhone: "",
            txtQQ: "",
            txtWechat: "",
            wechatQrCodeUrl: "",

        }
    },
    mounted: function() {
        userNo = JSON.parse(sessionStorage.getItem('userInfo')).UserNo;
        this.getConnectInfo();
    },
    methods: {
        //点击保存
        onClickSave() {
            let self = this;
            let url = extend.rootPath + '/addMyInfo';
            let data = {
                UserNo: userNo,
                Name: self.txtName,
                QQ: self.txtQQ,
                Wechat: self.txtWechat,
                QrCode: self.wechatQrCodeUrl,

            };
            self.$http.get(url, { params: data }).then(function(successRes) {
                if (successRes.data.Code == 1) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    this.canEdit = false;
                }

            }, function(failRes) {

            });
        },
        //点击编辑
        onClickEdit() {
            this.canEdit = true;
        },



        //图片上传前检验格式
        beforeAvatarUpload(file) {

            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                return true;
            }
            this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            return true;
        },

        //上传首页轮播图成功时
        uploadQrCode(res, file) {
            this.wechatQrCodeUrl = extend.imgPath + res.ImgUrl;

        },

        // 删除首页轮播图
        delQrCode() {
            this.wechatQrCodeUrl = "";
        },

        getConnectInfo() {
            let self = this;
            let url = extend.rootPath + '/getMyInfo';
            let data = {
                UserNo: userNo,
            };
            self.$http.get(url, { params: data }).then(function(successRes) {
                if (successRes.data.Code == 1) {
                    self.txtName = successRes.data.MyInfo.Name;
                    self.txtPhone = successRes.data.MyInfo.Phone;
                    self.txtQQ = successRes.data.MyInfo.QQ;
                    self.txtWechat = successRes.data.MyInfo.Wechat;
                    self.wechatQrCodeUrl = successRes.data.MyInfo.QrCode;
                }

            }, function(failRes) {

            });
        },


    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-form {
    padding: 10px;
}

.el-form-item {
    margin: 10px !important;
}

.el-input {
    width: 200px;
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

.avatar-uploader {
    width: 178px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
