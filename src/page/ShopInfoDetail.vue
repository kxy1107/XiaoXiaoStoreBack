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
                    <el-form-item label="商品ID:">
                        <el-input :disabled="true" placeholder="添加商品" v-model="shopInfo.shopID" class="input-shopid"></el-input>
                    </el-form-item>
    
                    <el-form-item label="商品标题:">
                        <el-input v-model="shopInfo.shopTitle" placeholder="请输入商品标题"></el-input>
                    </el-form-item>
    
                    <el-form-item label="商品价格:">
                        <el-input class="shop-detail-price" value="number" v-model.number="shopInfo.shopPrice" placeholder="请输入商品价格"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌">
                        <el-select v-model="selectBrandID" placeholder="请选择品牌">
                            <el-option v-for="item in brandList" :key="item.brandID" :label="item.brandName" :value="item.brandID">
                            </el-option>
                        </el-select>
                    </el-form-item>
    
                    <el-form-item label="类型">
                        <el-cascader expand-tigger="hover" :options="typeList" v-model="selectType">
                        </el-cascader>
                    </el-form-item>
    
                    <el-form-item label="最新">
                        <el-select v-model="selectNewValue" class="search-select">
                            <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="最热">
                        <el-select v-model="selectHotValue" class="search-select">
                            <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="首页轮播">
                        <el-select v-model="selectIndexBannerValue" class="search-select">
                            <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
    
                    <el-form-item label="首页轮播图">
    
                        <div class="shop-detail-index-banner">
                            <el-upload :before-upload="beforeAvatarUpload" show-file-list="true" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
    
                            <el-button v-if="imageUrl != ''" @click="delIndexBannerPic" type="danger" class="shop-detail-btn-del-index-banner">删除</el-button>
                        </div>
                    </el-form-item>
    
                    <el-form-item>
                        <el-button class="shop-detail-commit" type="primary">{{btnCommit}}</el-button>
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
export default {
    data() {
        return {
            breadTitle: '添加商品信息',
            btnCommit: "添加",
            selectBrandID: '',//当前选择的品牌ID
            brandList: [],//品牌列表
            shopInfo: {
                shopID: '111'
            },
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

            typeList: [
                {
                    value: '1122',
                    label: "衣服",
                    children: [
                        {
                            value: '112211',
                            label: '连衣裙'
                        },
                        {
                            value: '112222',
                            label: '超短裙'
                        },
                        {
                            value: '112233',
                            label: '长裙'
                        }
                    ]
                },
                {
                    value: '1133',
                    label: "裤子",
                    children: [
                        {
                            value: '113311',
                            label: '短裤'
                        },
                        {
                            value: '113322',
                            label: '牛仔裤'
                        },
                        {
                            value: '113333',
                            label: '七分裤'
                        }
                    ]
                }
            ],

            selectType: ["1122", "112222"],
            selectNewValue: "",
            selectHotValue: "",
            selectIndexBannerValue: "",
            imageUrl: "",


        }
    },
    components: {
        HeadBar,
        NavMenu
    },
    mounted: function () {
        userNo = JSON.parse(sessionStorage.getItem('userInfo')).UserNo;
        this.getBrandList();
    },
    methods: {
        //点击返回
        onClickReturn() {
            this.$router.go(-1)
        },
        //获取品牌列表
        getBrandList() {
            let self = this;
            let url = extend.rootPath + '/getBrandList';
            let data = {
                UserNo: userNo,
                BrandName: '',
                PageIndex: 0,
                PageSize: 999

            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    self.brandList = successRes.data.BrandList;
                }

            }, function (failRes) {

            });
        },

        //图片上传前检验格式
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (file.type === 'image/jpeg' || file.type != 'image/jpeg') {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },

        //文件上传成功时
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },


        // 删除首页轮播图
        delIndexBannerPic() {
            this.imageUrl = "";
        },


    }
}
</script>

<style scoped>
.shop-detail-form {
    background-color: #f2f2f2;
    padding: 10px;
    flex: 1;
    overflow-y: auto;
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

