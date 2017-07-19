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
    
                <el-form class="shop-detail-form" label-width="80px">
                    <el-form-item label="商品ID:">
                        <el-input :disabled="true" placeholder="添加商品" v-model="shopInfo.shopID" class="input-shopid"></el-input>
                    </el-form-item>
    
                    <el-form-item label="商品标题:">
                        <el-input v-model="shopInfo.shopTitle" placeholder="请输入商品标题"></el-input>
                    </el-form-item>
    
                    <el-form-item label="商品价格:">
                        <el-input value="number" v-model.number="shopInfo.shopPrice" placeholder="请输入商品价格"></el-input>
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
    
                    <el-form-item>
                        <el-button type="primary">{{btnCommit}}</el-button>
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
            typeList:[
                {
                    
                }
            ]
        }
    },
    components: {
        HeadBar,
        NavMenu
    },
    mounted: function () {

    },
    methods: {
        onClickReturn: function () {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.shop-detail-form {
    background-color: #f2f2f2;
    padding: 10px;
}

.input-shopid {
    width: 300px;
}
</style>

