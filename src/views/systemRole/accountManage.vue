<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix cardTitle">
                <span>账号管理</span>
            </div>
            <div class="cardBody">
                <div class="cardBodyHeader">
                    <div class="topTableForm">
                        <div class="topTableForm-item">
                            <span>账&nbsp;&nbsp;&nbsp;&nbsp;号 : </span>
                            <el-input placeholder="请输入账号名称" v-model="tableForm.userName"></el-input>
                        </div>
                        <div class="topTableForm-item">
                            <span>手机号 : </span>
                            <el-input placeholder="请输入手机号" v-model="tableForm.phone"></el-input>
                        </div>
                        <div class="topTableForm-item">
                            <span>角色 : </span>
                            <el-select  v-model="tableForm.roleId"   class="aplus-sel"    placeholder="请选择角色" style="width: 100%">
                                <el-option label="全部" value=""></el-option>
                                <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </div>
                        <!--<div class="topTableForm-item">-->
                        <!--<span>邮&nbsp;&nbsp;&nbsp;&nbsp;箱 :</span>-->
                        <!--<el-input placeholder="请输入邮箱"></el-input>-->
                        <!--</div>-->
                        <div class="topTableForm-item-actions">
                            <el-button type="primary" icon="el-icon-search" class="reloadBtn" @click="readyAjax">查询</el-button>
                            <el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                        </div>
                    </div>
                </div>

                <div class="cardTableWrap">

                    <div class="tabCardInner">
                        <div class="cardTable-actions" style="padding: 10px">
                            <el-button type="primary" icon="el-icon-plus" class="reloadBtn" @click="showDialog(true)"   v-if="btnStr.indexOf('新增')>-1">新增</el-button>
                        </div>
                        <el-table
                                :data="tableData"
                                border
                                v-loading="loading"
                                element-loading-text="拼命加载中"
                                element-loading-spinner="el-icon-loading"
                                class="cardTable"
                                style="width: 100%">
                            <el-table-column
                                    prop="userName"
                                    width="220"
                                    :show-overflow-tooltip="true"
                                    label="账号名称">
                            </el-table-column>
                            <el-table-column
                                    prop="phone"
                                    :show-overflow-tooltip="true"
                                    label="手机号">
                            </el-table-column>
                            <!--<el-table-column-->
                            <!--prop="h5RegisterNum"-->
                            <!--label="邮箱"-->
                            <!--:show-overflow-tooltip="true">-->
                            <!--</el-table-column>-->
                            <el-table-column
                                    prop="roleName"
                                    :show-overflow-tooltip="true"
                                    label="角色" >
                            </el-table-column>
                            <el-table-column
                                    :show-overflow-tooltip="true"
                                    prop="status"
                                    label="状态">
                                <template slot-scope="scope">
                                    {{scope.row.status==1?'正常':'冻结'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    :show-overflow-tooltip="true"
                                    prop="gmtDatetime"
                                    label="创建时间" >
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作" width="300">
                                <template slot-scope="scope">
                                    <el-button size="mini" plain class="aplus-pribtn" @click="$router.push(`/system/adminMenuConfig/${scope.row.roleId}/${scope.row.id}`)"   :disabled="scope.row.roleId==1" v-if="btnStr.indexOf('配置用户权限')>-1">配置用户权限</el-button>
                                    <el-button size="mini" plain class="aplus-pribtn" @click="showDialog(false,scope.row)"   v-if="btnStr.indexOf('编辑')>-1">编辑</el-button>
                                    <!--<el-button size="mini" plain class="aplus-pribtn" @click="showConfig(scope.row)">配置</el-button>-->
                                    <!--<el-button size="mini" plain class="aplus-errorBtn" @click="action(scope.row,'删除')">删除</el-button>-->
                                    <el-button size="mini" plain class="aplus-errorBtn" v-if="scope.row.status==1&&btnStr.indexOf('编辑')>-1" @click="action(scope.row,'停用')">停用</el-button>
                                    <el-button size="mini" plain class="aplus-recoverBtn" v-else-if="btnStr.indexOf('启用')>-1&&scope.row.status==2" @click="action(scope.row,'解冻')">解冻</el-button>
                                    <!--<el-button size="mini" plain class="aplus-pribtn" @click="action(scope.row,'启用')">启用</el-button>-->
                                    <!--<el-button size="mini" plain class="aplus-errorBtn" @click="action(scope.row,'重置密码')">重置密码</el-button>-->
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>


                    <div class="block pagiWrap" style="margin-top: 20px">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="pageNum"
                                :page-sizes="[10, 20, 30, 50]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>

            <el-dialog
                    :title="actionType?'新增':'编辑'"
                    :visible.sync="addDialogVisible"
                    width="30%"
                    @close="handleClose">
                <div>
                    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="账号" prop="userName">
                            <el-input v-model="addForm.userName" placeholder="请输入账号"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="addForm.phone" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="角色" prop="roleId" v-if="actionType">
                            <el-select style="width: 100%" v-model="addForm.roleId" placeholder="请选择角色">
                                <el-option v-for="(item,index) in roleList" :key="index"  :label="item.name"  :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="addForm.password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="surePassword">
                            <el-input v-model="addForm.surePassword" placeholder="请输入确认密码"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sureAddAccount('addForm')">确 定</el-button>
                  </span>
            </el-dialog>





        </el-card>

    </div>
</template>

<script>
  import {checkTel} from "@/common/validators.js";
  import { mapState } from 'vuex'
  export default {
    name: "enterPriseAccount",
    data() {
      var validateSurePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码密码'));
        } else {
          if (this.addForm.password !=value) {
            return  callback(new Error('密码不一致'));
          }
          return callback();
        }
      };
      return {
        tableForm:{
          userName:"",
          phone:"",
          roleId:""
        },
        tableData: [],
        // 渠道商列表分页
        pageNum:1,
        pageSize:10,
        total:0,
        actionType:true,
        addDialogVisible:false,
        addForm:{},
        loading:false,
        rules: {
          phone: [
            { required: true, validator: checkTel , trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入账号名称', trigger: 'blur' }
          ],
          roleId: [
            { required: true, message: '请输入选择角色', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          surePassword: [
            { required: true,validator: validateSurePass , trigger: 'blur' }
          ],
        },
        configDialog:false,
        actionRow:{},
        roleList:[]
      };
    },
    mounted() {
      // this.channelList_getList()
      this.getList();
      this.getRoleList()
    },
    components:{
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    watch:{
      "tableForm.partnerName":function (n) {
        if(!n){
          this.readyAjax()
        }
      },
      "tableForm.phone":function (n) {
        if(!n){
          this.readyAjax()
        }
      },
      "tableForm.col5":function (n) {
        if(!n){
          this.readyAjax()
        }
      }
    },
    methods: {
      sureAddAccount(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.$api.system.addAccount(this.addForm).then((res)=>{
            //   this.$message.success("用户新增成功!");
            //   this.addDialogVisible=false;
            //   this.readyAjax()
            // })
            this.addAjax()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addAjax(){
        if(this.actionType){
          this.$api.system.addAccount(this.addForm).then((res)=>{
            this.$message.success("用户新增成功!");
            this.addDialogVisible=false;
            this.readyAjax()
          })
        }else{
          this.$api.system.editAccount({
            ...this.addForm,
            id:this.addForm.id
          }).then((res)=>{
            this.$message.success("用户编辑成功!");
            this.addDialogVisible=false;
            this.readyAjax()
          })
        }
      },
      reset(){
        for(let i in this.tableForm){
          this.tableForm[i]=""
        }
        this.readyAjax()
      },
      handleClose(type){
         this.addForm={};
      },
      readyAjax(){
        this.pageNum=1;
        this.pageSize=10;
        this.getList()
      },
      action(row,title){
        this.$toolkit.showConfrim(`您确定要进行此账号的${title}操作吗？`,title).then(()=>{
           let url=title=='停用'?'freezeAccount':'unfreezeAccount';
           this.$api.system[url]({
             adminId:row.id
           }).then((res)=>{
             this.readyAjax();
             this.$message.success("操作成功!")
           }).catch(()=>{
             this.$message.error("操作失败!")
           })
        })
      },
      showDialog(actionType,row){
        this.actionType=actionType;
        if(!this.actionType){
          this.addForm={...row};
          this.addForm.password=""
        };
        this.addDialogVisible=true
      },
      showConfig(row){
        this.actionRow={...row};
        this.configForm.partnerConfigParamPO.partnerId=row.partnerId;
        this.configDialog=true;
      },
      getList(){
        this.loading=true;
        this.$api.system.getAccoutList({
            pageNum:this.pageNum,
            pageSize:this.pageSize,
            ...this.tableForm
          }
        ).then((res)=>{
          this.tableData=res.data.list;
          this.total=res.data.total;
          this.loading=false;
        })
      },
      getRoleList(){
        this.$api.system.getAdminRoleList().then((res)=>{
          this.roleList=res.data;
        })
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getList()
      },
      handleCurrentChange(val){
        this.pageNum=val;
        this.getList()
      }
    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    @import url("../../assets/css/common.less");
    @import url('../../assets/css/memberDialog.less');
    .configForm{
        .bigTitle{
            font-size: 16px;
            font-weight: bold;
            line-height: 50px;
            display: block;
            border-bottom: 2px solid #606266;
        }
        .configDiv{
            width: 50%;
            margin-top: 20px;
            .el-input__inner{
                height: 30px!important;
                font-size:12px;
            }
            .el-form-item{
                margin-bottom: 0;
            }
        }
        .el-form-item__label{
            font-size: 12px;
        }
    }
    .configDialog{
        .el-dialog__title{
            font-size: 22px;
            font-weight: bold;
            color:#606266
        }
    }
    .cell{
        .is-disabled{
            background: rgba(0,0,0,0.2)!important;
            border: none!important;
            span{
                color:white!important;
            }
        }
    }
</style>
