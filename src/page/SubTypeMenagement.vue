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
        </el-table>
        <!--底部分页-->
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" :current-page="1" :page-size="10" layout="total, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </div>
    
        <!--添加子类型弹窗-->
        <el-dialog title='添加子类型' :visible.sync="dialogAddSubType">
            <el-form>
                <el-form-item label="请选择上级类型" >
                    <el-select v-model="selectType" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="子类型名称">
                    <el-input v-model="addSubTypeName" auto-complete="off"></el-input>
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
                 <el-form-item label="请选择上级类型" >
                    <el-select v-model="selectType" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="子类型ID">
                    <div>{{updateSubTypeID}}</div>
                </el-form-item>
                <el-form-item label="子类型名称">
                    <el-input v-model="updateSubTypeName" auto-complete="off"></el-input>
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
export default {
    name: 'UserInfo',
      components: {
    HeadBar,
    NavMenu
  },
    data() {
        return {

            addSubTypeName: "",//弹窗输入的子类型
            inputSubTypeName: "",//搜索输入的子类型
            dialogAddSubType: false,//是否显示子类型弹窗
            isUpdateSubType: false,//是否是修改子类型状态
            updateSubTypeID: "111222",
            updateSubTypeName: "",
            selectType: "",
            options: [{
                value: '111',
                label: '短袖'
            }, {
                value: '222',
                label: '裙子'
            }],
            subTypeList: [
                {
                    typeID: "111",
                    typeName: "衣服",
                    subTypeID: "111222",
                    subTypeName: "上衣",
                },
                {
                    typeID: "111",
                    typeName: "衣服",
                    subTypeID: "111222",
                    subTypeName: "上衣",
                },
            ]
        }
    },
    methods: {
        //点击查询
        onClickSearch() {

        },
        handleCurrentChange() {

        },
        //点击编辑
        handleEdit(index, row) {
            this.isUpdateSubType = true;
            this.updateSubTypeID = row.subTypeID,
                this.updateSubTypeName = row.subTypeName,
                console.log(index, row);
            console.log(row.userName);
        },
        //点击删除
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('确认删除子类型【' + row.subTypeName + '】?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },



        //添加品牌弹窗确认按钮
        addSubTypeConfirm() {
            this.dialogAddSubType = false;
        },
        //修改品牌弹窗确认按钮
        updateSubTypeConfirm() {
            this.isUpdateSubType = false;
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
