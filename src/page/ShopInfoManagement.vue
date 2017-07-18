<template>
    <div class="app">
        <HeadBar></HeadBar>
        <div class="contain">
            <NavMenu></NavMenu>
            <div class="main-content">
                <el-breadcrumb class="breadcrumb">
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商品信息管理</el-breadcrumb-item>
                </el-breadcrumb>
    
                <el-form :inline="true" class="top-form">
                    <el-form-item>
                        <el-button type="primary" @click="dialogAddShopInfo">添加新商品</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="inputShopTitle" placeholder="请输入商品标题"></el-input>
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
                        <el-button type="primary" @click="onClickSearch">查询</el-button>
                    </el-form-item>
    
                </el-form>
    
                <el-table :data="shopInfoList" class="my-table" height="100">
                    <el-table-column label="操作" width="150">
                        <template scope="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
    
                    <el-table-column prop="shopID" label="商品ID" width="200"> </el-table-column>
    
                    <el-table-column prop="shopTitle" label="商品标题"> </el-table-column>
    
                    <el-table-column prop="shopPrice" label="商品价格" width="100"></el-table-column>
    
                    <el-table-column prop="shopView" label="商品浏览量" width="100"></el-table-column>
    
                    <el-table-column prop="isIndexBanner" label="首页轮播" width="80"></el-table-column>
    
                    <el-table-column prop="isNew" label="最新" width="80"></el-table-column>
    
                    <el-table-column prop="isHot" label="最热" width="80"></el-table-column>
    
                </el-table>
    
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total,prev,pager,next,jumper" :total="totalCount" class="pagination">
                </el-pagination>
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
    name: 'ShopInfoManagement',
    data() {
        return {
            currentPage: 1,
            pageIndex: 0,
            pageSize: 10,
            totalCount: 2,
            inputShopTitle: '',//搜索商品标题输入框
            selectNewValue: 'ALL',//选择是否最新
            selectHotValue: 'ALL',//选择是否最热
            selectIndexBannerValue: 'ALL',//选择是否首页轮播
            options: [
                {
                    label: '全部',
                    value: 'ALL'

                },
                {
                    label: '是',
                    value: 'S0A'

                },
                {
                    label: '否',
                    value: 'S0C'
                }],
            shopInfoList: [
                {
                    shopID: '0b65e5666a1d11e7ac077429af078194',
                    shopTitle: '生生世世重中之重',
                    shopPrice: 12.5,
                    shopView: 100,
                    isIndexBanner: '是',
                    isNew: '是',
                    isHot: '是',

                }
            ],


        }
    },

    components: {
        HeadBar,
        NavMenu

    },

    mounted: function () {
        userNo = JSON.parse(sessionStorage.getItem('userInfo')).userNo;
    },
    methods: {
        //点击查询
        onClickSearch() {
            this.getShopInfoList();
        },
        //页数更改
        handleCurrentChange(val) {
            this.pageIndex = (this.currentPage - 1) * this.pageSize;
            this.getShopInfoList();
        },

        //详情
        handleEdit(index, row) {

        },
        //删除
        handleDelete(index, row) {
            let self = this;
            console.log(index, row);
            this.$confirm('确认删除商品【' + row.shopTitle + '】?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                let url = extend.rootPath + '/delShopInfo';
                let data = {
                    UserNo: userNo,
                    ShopID: row.shopID,
                };
                self.$http.get(url, { params: data }).then(function (successRes) {
                    if (successRes.data.Code == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功',

                        });
                        self.getShopInfoList();
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

        //获取商品信息列表
        getShopInfoList() {
            let self = this;
            let url = extend.rootPath + '/getShopInfoList';
            let data = {
                UserNo: userNo,
                ShopTitle: self.shopTitle,
                IsHot: self.selectNewValue,
                IsNew: self.selectNewValue,
                IsIndexBanner: self.selectIndexBannerValue,
                PageIndex: this.pageIndex,
                PageSize: this.pageSize
            };
            self.$http.get(url, { params: data }).then(function (successRes) {
                if (successRes.data.Code == 1) {
                    self.totalCount = successRes.data.TotalCount;
                    self.shopInfoList = successRes.data.ShopInfoList;
                }
            }, function (failRes) {

            });
        },
    },

}
</script>
<style scoped>
.el-form-item {
    margin: 10px !important;
}

.search-select {
    width: 80px;
}


.my-table {
    margin-top: 10px;
    flex: 1;
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
}
</style>


