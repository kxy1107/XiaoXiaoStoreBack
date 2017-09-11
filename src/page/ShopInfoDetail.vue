<template>
    <div class="app">
        <HeadBar></HeadBar>
        <div class="contain">
            <NavMenu></NavMenu>
            <div class="main-content">
                <el-breadcrumb class="breadcrumb">
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/ShopInfoManagement' }">商品信息管理</el-breadcrumb-item>
                    <el-breadcrumb-item>{{breadTitle}}</el-breadcrumb-item>
                </el-breadcrumb>

                <el-button type="primary" class="btn-return" @click="onClickReturn">返回</el-button>

                <el-form class="shop-detail-form" label-width="100px">
                    <el-form-item label="商品ID：">
                        <el-input :disabled="true" placeholder="添加商品" v-model="shopID" class="input-shopid"></el-input>
                    </el-form-item>

                    <el-form-item label="商品标题：" :rules="[{ required: true, message: '商品标题不能为空',trigger: 'blur' }]">
                        <el-input v-model="shopTitle" placeholder="请输入商品标题"></el-input>
                    </el-form-item>

                    <el-form-item label="商品价格：" :rules="[{ required: true, message: '年龄不能为空'}, { type: 'number', message: '年龄必须为数字值'}]">
                        <el-input class="shop-detail-price" value="number" v-model.number="shopPrice" placeholder="请输入商品价格"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="品牌：" :rules="[{ required: true, message: '品牌不能为空',trigger: 'blur' }]">
                        <el-select v-model="selectBrandID" placeholder="请选择品牌">
                            <el-option v-for="item in brandList" :key="item.brandID" :label="item.brandName" :value="item.brandID">
                            </el-option>
                        </el-select>
                    </el-form-item> -->

                    <el-form-item label="类型：" :rules="[{ required: true, message: '类型不能为空',trigger: 'blur' }]">
                        <el-cascader expand-tigger="hover" :options="typeList" v-model="selectType">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="属性：">
                        <el-checkbox-group v-model="selectAttrubuteArray" @change="changeSelectAttribute">
                            <el-checkbox v-for="item in attributeList" :label="item" :key="item.attributeID">{{item.attributeName}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="属性值：" v-if="selectAttrubuteArray.length > 0">
                        <el-checkbox-group v-model="selectAttrubuteValueArray">
                            <el-checkbox v-for="item in attributeValueList" :label="item" :key="item.attributeValueID">{{item.attributeValue}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="最新：">
                        <el-select v-model="selectNewValue" class="search-select">
                            <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="最热：">
                        <el-select v-model="selectHotValue" class="search-select">
                            <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="首页轮播：">
                        <el-select v-model="selectIndexBannerValue" class="search-select">
                            <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="selectIndexBannerValue == 'S0A'" label="首页轮播图：">

                        <div class="shop-detail-index-banner">
                            <el-upload :before-upload="beforeAvatarUpload" class="avatar-uploader" action="https://afsc.jianyuejizhang.cn/pc/uploadBanner" :show-file-list="false" :on-success="uploadIndexBanner">
                                <img v-if="indexImageUrl" :src="indexImageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>

                            <el-button v-if="indexImageUrl != ''" @click="delIndexBannerPic" type="danger" class="shop-detail-btn-del-index-banner">删除</el-button>
                        </div>
                    </el-form-item>

                    <el-form-item label="商品封面图：">

                        <div class="shop-detail-index-banner">
                            <el-upload :before-upload="beforeAvatarUpload" show-file-list="true" class="avatar-uploader" action="https://afsc.jianyuejizhang.cn/pc/uploadBanner" :show-file-list="false" :on-success="uploadCoverImage">
                                <img v-if="coverImgUrl" :src="coverImgUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>

                            <el-button v-if="coverImgUrl != ''" @click="delCoverPic" type="danger" class="shop-detail-btn-del-index-banner">删除</el-button>
                        </div>
                    </el-form-item>

                    <el-form-item label="商品轮播图：">
                        <el-upload action="https://afsc.jianyuejizhang.cn/pc/uploadBanner" multiple list-type="picture-card" :on-success="uploadShopBanner" :on-remove="delShopBanner">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="商品详情：">
                        <vue-html5-editor :content="shopDetail" :auto-height="true" ref="editor" @change="changeEditor"></vue-html5-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="shop-detail-commit" type="primary" @click="onSubmit">{{btnCommit}}</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>
<script>
import HeadBar from '@/components/HeadBar'
import NavMenu from '@/components/NavMenu'
import extend from '@/extend.js'
let userNo;
let allAttributeValue = [];//所有属性值
let shopBannerImgUrl = [];//商品轮播图列表
export default {
    data() {
        return {
            shopDetail: '',//商品介绍富文本框内容
            breadTitle: '添加商品信息',
            btnCommit: "添加",
            // selectBrandID: '',//当前选择的品牌ID
           // brandList: [],//品牌列表
            shopID: "",//商品ID
            shopTitle: "",//商品标题
            shopPrice: "",//商品价格
            options: [
                {
                    label: '是',
                    value: 'S0A'

                },
                {
                    label: '否',
                    value: 'S0C'
                }
            ],

            typeList: [],//类型列表
            attributeList: [],//属性列表
            selectAttrubuteArray: [],//选择的属性
            attributeValueList: [],//属性值列表
            selectAttrubuteValueArray: [],//选择的属性值

            selectType: [],//选择的类型和子类型
            selectNewValue: "S0C",
            selectHotValue: "S0C",
            selectIndexBannerValue: "S0C",
            indexImageUrl: "",//首页轮播图
            coverImgUrl: "",//商品封面图



        }
    },
    components: {
        HeadBar,
        NavMenu
    },
    mounted: function() {
        let sId = this.$route.query.ShopID;
        shopBannerImgUrl = [];
        allAttributeValue = [];
        userNo = JSON.parse(sessionStorage.getItem('userInfo')).UserNo;
        // this.getBrandList();
        this.getTypeSubTypeList();
        this.getAttributeList();
        this.getAttributeValueList();
        if (sId == "" || sId == null || typeof (sId) == "undefined") {
            this.shopID = "";
        } else {
            this.shopID = sId;
            this.getShopDetail();
        }
    },

    methods: {
        //点击返回
        onClickReturn() {
            this.$router.go(-1)
        },
        //获取商品详情
        getShopDetail() {
            let self = this;
            let url = extend.rootPath + '/getShopInfoDetail';
            let data = {
                UserNo: userNo,
                ShopID: self.shopID

            };
            self.$http.get(url, { params: data }).then(
                function(successRes) {
                    if (successRes.data.Code == 1) {
                        let shopInfo = successRes.data.ShopInfoList;
                        self.shopTitle = shopInfo.shopTitle;
                        self.shopPrice = shopInfo.shopPrice;
                        self.shopDetail = shopInfo.shopDescribe;
                        self.selectHotValue = shopInfo.isHot;
                        self.selectNewValue = shopInfo.isNew;
                       self.selectIndexBannerValue = shopInfo.isIndexBanner;
                        // self.selectBrandID = shopInfo.brandID;
                        self.selectType = [shopInfo.shopTypeID, shopInfo.shopSubTypeID];
                        self.indexImageUrl = shopInfo.shopIndexImgUrl;
                        self.coverImgUrl = shopInfo.shopCoverImgUrl;

                    }
                },
                function(failRes) {

                });
        },


        //获取品牌列表
        // getBrandList() {
        //     let self = this;
        //     let url = extend.rootPath + '/getBrandList';
        //     let data = {
        //         UserNo: userNo,
        //         BrandName: '',
        //         PageIndex: 0,
        //         PageSize: 999

        //     };
        //     self.$http.get(url, { params: data }).then(function(successRes) {
        //         if (successRes.data.Code == 1) {
        //             self.brandList = successRes.data.BrandList;
        //         }

        //     }, function(failRes) {

        //     });
        // },

        //获取类型列表
        getTypeSubTypeList() {
            let self = this;
            let url = extend.rootPath + '/getTypeSubType';
            let data = {
                UserNo: userNo,
            };
            self.$http.get(url, { params: data }).then(function(successRes) {
                if (successRes.data.Code == 1) {
                    self.typeList = successRes.data.TypeSubTypeList;
                }

            }, function(failRes) {

            });
        },

        //获取属性列表
        getAttributeList() {
            let self = this;
            let url = extend.rootPath + '/getAttributeList';
            let data = {
                UserNo: userNo,
                AttributeName: "",
                PageIndex: 0,
                PageSize: 10000,

            };
            self.$http.get(url, { params: data }).then(function(successRes) {
                if (successRes.data.Code == 1) {
                    self.attributeList = successRes.data.AttributeList;
                }

            }, function(failRes) {

            });
        },


        //获取属性值列表
        getAttributeValueList() {
            let self = this;
            let url = extend.rootPath + '/getAttributeValueList';
            let data = {
                UserNo: userNo,
                AttributeValue: "",
                PageIndex: 0,
                PageSize: 100000

            };
            self.$http.get(url, { params: data }).then(function(successRes) {
                if (successRes.data.Code == 1) {
                    allAttributeValue = successRes.data.AttributeValueList;
                }

            }, function(failRes) {

            });
        },

        //选择属性选择框改编
        changeSelectAttribute(selectArr) {
            let self = this;
            let selectValue = [];
            for (let key of selectArr) {
                console.log(key.attributeID)
                for (let item of allAttributeValue) {
                    if (item.attributeID == key.attributeID) {
                        selectValue.push(item);
                    }
                }
            }
            self.attributeValueList = selectValue;
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
        uploadIndexBanner(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw);
            this.indexImageUrl = extend.imgPath + res.ImgUrl;

        },


        // 删除首页轮播图
        delIndexBannerPic() {
            this.indexImageUrl = "";
        },

        //上传商品封面图成功时
        uploadCoverImage(res, file) {
            this.coverImgUrl = extend.imgPath + res.ImgUrl;
        },

        // 删除商品封面图
        delCoverPic() {
            this.coverImgUrl = "";
        },

        //上传商品轮播图成功时
        uploadShopBanner(res, file) {
            let imgUrl = extend.imgPath + res.ImgUrl;
            shopBannerImgUrl.push(imgUrl);
            console.log(res)
        },

        //删除商品轮播图
        delShopBanner(file, fileList) {
            let delUrl = extend.imgPath + file.response.ImgUrl;
            let index = shopBannerImgUrl.indexOf(delUrl);
            if (index > -1) {
                shopBannerImgUrl.splice(index, 1);
            }
        },

        changeEditor(data) {
            this.shopDetail = data;
        },

        //添加商品
        onSubmit() {
            let self = this;
            let url = extend.rootPath + '/addShopInfo';
            let data = {
                UserNo: userNo,
                ShopID: self.shopID,
                ShopTitle: self.shopTitle,
                ShopPrice: self.shopPrice,
                ShopBrandID: "",
                ShopDescribe: self.shopDetail,
                ShopTypeID: self.selectType[0],
                ShopSubTypeID: self.selectType[1],
                IsIndexBanner: self.selectIndexBannerValue,
                IsHot: self.selectHotValue,
                IsNew: self.selectNewValue,
                IndexImgUrl: self.indexImageUrl,
                ShopCoverImgUrl: self.coverImgUrl,
                ShopBannerImgUrl: shopBannerImgUrl,
                Attribute: self.selectAttrubuteArray,
                AttributeValue: self.selectAttrubuteValueArray,

            };
            self.$http.get(url, { params: data }).then(function(successRes) {
                if (successRes.data.Code == 1) {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.$router.push({ path: '/ShopInfoManagement' });
                }

            }, function(failRes) {

            });
        },
    }
}
</script>

<style scoped>
.shop-detail-form {
    background-color: #f2f2f2;
    padding: 10px;
    flex: 1;
    overflow-y: scroll;
}


.input-shopid {
    width: 300px;
}

.shop-detail-price {
    width: 200px;
}

.shop-detail-commit {
    width: 200px;
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

.shop-detail-index-banner {
    display: flex;
    align-items: center;
}

.shop-detail-btn-del-index-banner {
    margin: 20px;
    width: 100px;
    height: 50px;
}
</style>

