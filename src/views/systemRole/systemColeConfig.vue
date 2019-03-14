<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix cardTitle">
                <span>系统角色配置</span>
            </div>
            <div class="cardBody flex-r">
                <div class="roleConfig-left">
                    <!--<div class="roleConfig-left-title" style="font-weight: bold;">-->
                        <!--公司岗位-->
                    <!--</div>-->
                    <div style="padding:10px 0">
                        <div class="roleConfig-left-title roleItem" v-for="(item,index) in roleList" :class="{'roleIsActive':item.id==roleId}" :key="index" @click="loadAction(item)" style="cursor: pointer!important;">
                            <span>{{item.name}}</span>
                            <div class="roleItem-actions">
                                <i class="el-icon-edit" style="margin-right: 10px" @click="showAdd(false,item)"></i>
                                <i class="el-icon-delete" @click="deleteRole(item.id)"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <el-button type="primary" class="addBtn" @click="showAdd(true)">新增</el-button>
                    </div>

                </div>
                <div class="roleConfig-right" >
                    <el-tabs type="border-card" class="kf-sys-tabs">
                        <el-tab-pane :label="item.name" class="kf-sys-tabs-pane" v-for="(item, index) in manageList" :key="index">
                            <!--<div class="kf-sys-tabs-head">-->
                            <!--<el-checkbox-->
                            <!--class="ml10"-->
                            <!--size="small"-->
                            <!--:indeterminate="item.isIndeterminate"-->
                            <!--v-model="item.checkAll"-->
                            <!--@change="check_all($event, index)"-->
                            <!--border-->
                            <!--&gt;全选</el-checkbox>-->
                            <!--</div>-->
                            <div v-for="(sub_item, sub_index) in item.permissionVOS" :key="sub_index" class="kf-sys-tabs-group">
                                <div class="kf-sys-tabs-item">
                                    <div class="kf-sys-tabs-label">【{{sub_item.name}}】</div>
                                    <!--<el-checkbox-->
                                    <!--:indeterminate="sub_item.isIndeterminate"-->
                                    <!--v-model="sub_item.checkAll"-->
                                    <!--@change="check_all($event, index, sub_index)"-->
                                    <!--&gt;全选</el-checkbox>-->
                                </div>
                                <el-checkbox-group class="kf-sys-tabs-item" v-model="sub_item.check">
                                    <el-checkbox
                                            v-for="(operate_item, operate_index) in sub_item.permissionVOS"
                                            :key="operate_index"
                                            :label="operate_item.permissionId"
                                            @change="sel_change"
                                    >{{operate_item.name}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    <div class="marT10 flex-r" style="justify-content: flex-end">
                        <el-button type="primary"  class="reloadBtn marL10" @click="saveConfig">保存</el-button>
                        <el-button type="default"  class="reloadBtn resetBtns" @click="reset">取消</el-button>
                    </div>
                </div>
            </div>

            <el-dialog
                    :title="actionType?'新增':'编辑'"
                    :visible.sync="dialogVisible"
                    width="30%">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="角色名称：" prop="name">
                        <el-input v-model.trim="ruleForm.name" placeholder="请输入角色名称"></el-input>
                    </el-form-item>
                    <el-form-item label="角色类型" prop="manager">
                        <el-select style="width: 100%" v-model="ruleForm.manager" placeholder="请选择角色类型">
                            <el-option   label="主管"  :value="1"></el-option>
                            <el-option   label="专员"  :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRole('ruleForm')">确 定</el-button>
              </span>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "roleConfig",
    data() {
      return {
        dialogVisible:false,
        ruleForm:{},
        roleList:[],
        rules:{
          name:[{
            required:true,
            message:'请输入角色名称',
            trigger:'blur'
          }],
          manager:[{
            required:true,
            message:'请选择角色类型',
            trigger:'blur'
          }],
        },
        treeInfo:[],
        manageList:[],
        roleId:"",
        actionType:true,
      };
    },
    mounted() {
      this.getRoleList();
    },
    components:{
    },
    watch:{
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    methods: {
      loadAction(item){
        this.roleId=item.id;
        this.get_ajax(item.id);
        // console.log(item.id)
      },
      getRoleList(){
        this.$api.system.getSystemRoles().then((res)=>{
          this.roleList=res.data;
          if(res.data.length){
            this.roleId=res.data[0].id;
            this.get_ajax(this.roleId)
          }
        })
      },
      //获取数据
      get_ajax(roleId) {
        this.$api.system.getRoleTreeInfo({
          roleId
        })
          .then(res => {
            this.clean_up(res.data);
          });
      },
      //整理数据
      clean_up(res) {
        res.map(item => {
          let item_checkAll = false;
          let item_isIndeterminate = false;
          let item_number = 0;
          let item_sel_number = 0;
          item.permissionVOS.map(sub_item => {
            let check = [];
            let checkAll = false;
            let isIndeterminate = false;

            if (sub_item.check) {
              check = sub_item.check;
            } else {
              sub_item.permissionVOS.map(operate_item => {
                if (operate_item.checked==1) check.push(operate_item.permissionId);
              });
            }

            if (check.length === sub_item.permissionVOS.length) {
              checkAll = true;
            } else if (check.length) {
              isIndeterminate = true;
            }

            item_number += sub_item.permissionVOS.length;
            item_sel_number += check.length;

            sub_item.check = check;
            sub_item.checkAll = checkAll;
            sub_item.isIndeterminate = isIndeterminate;
          });

          if (item_sel_number === item_number) {
            item_checkAll = true;
          } else if (item_sel_number) {
            item_isIndeterminate = true;
          }

          item.checkAll = item_checkAll;
          item.isIndeterminate = item_isIndeterminate;
        });
        this.manageList = res;
      },
      //选择
      sel_change() {
        this.clean_up(this.manageList);
      },
      addRole(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.actionType){
              this.$api.system.addRole(this.ruleForm).then(()=>{
                this.$message.success("角色新增成功");
                this.dialogVisible=false;
                this.getRoleList()
              })
            }else{
              this.$api.system.editRole(this.ruleForm).then(()=>{
                this.$message.success("角色编辑成功");
                this.dialogVisible=false;
                this.getRoleList()
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      deleteRole(id){
        this.$toolkit.showConfrim('确定要删除此角色?','删除').then(()=>{
          this.$api.system.deleteRole(id).then(()=>{
            this.$message.success("删除成功！");
            this.getRoleList()
          }).catch((e)=>{
            this.$message.error(e.message)
          })
        })
      },
      showAdd(type,row){
        this.actionType=type;
        if(!type){
          this.ruleForm={...row};
        }
        this.dialogVisible=true;
      },
      saveConfig(){
        let manageList = this.manageList;
        let permissionIds = [];

        manageList.map(item => {
          item.permissionVOS.map(sub_item => {
            if (sub_item.check.length) permissionIds = permissionIds.concat(sub_item.check);
          });
        });
        console.log(permissionIds)
        this.$api.system.setRoleActions({
          roleId:this.roleId,
          permissionIds:permissionIds
        }).then(()=>{
          this.$message.success("权限编辑成功!");
          this.get_ajax(this.roleId)
        })
      },
      reset(){

      }
    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    .roleConfig-left{
        width: 200px;
        box-sizing: border-box;
        /*background: red;*/
        text-align: center;
        .addBtn{
            background: white;
            color: black;
            border: 1px dashed deepskyblue;
            width: 90%;
        }
        .roleConfig-left-title{
            height: 50px;
            line-height: 50px;
        }
    }
    .roleItem:hover{
        background-color: rgba(255,255,255,0.7);
        /*color:black;*/
        /*color:white;*/
        transition: all 0.5s;
        border-radius: 10px;
    }
    .roleItem{
        cursor: pointer;
        position: relative;
        &>.roleItem-actions{
            position: absolute;
            right: 10px;
            font-size: 13px;
            top: 0;
        }
        /*border-bottom: 1px dashed gray;*/
    }

    .roleConfig-right{
        flex:1;
        margin-left: 20px;
        .el-collapse-item__header{
            padding-left: 20px;
        }
        .el-collapse-item__wrap{
            padding-left: 20px;
        }
        .el-checkbox{
            margin-left: 0;
            padding: 0 10px!important;
            /*width: 100px;*/
        }
    }
    .kf-sys-tabs-pane {
        padding: 0 30px;
    }
    .kf-sys-tabs-label {
        color: rgb(30, 144, 255);
        margin-right: 20px;
    }
    .kf-sys-tabs-group {
        border-bottom: 1px solid #ddd;
        padding-top: 40px;
        padding-bottom: 20px;
        &:last-child {
            border-bottom: 0;
        }
    }
    .kf-sys-tabs-head {
        padding-top: 30px;
    }
    .kf-sys-tabs-item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 10px 0;
        &.el-checkbox-group {
            padding-left: 20px;
        }
    }
    .roleIsActive{
        background: rgba(64,158,255,0.6);
        color:white;
        border-radius:5px
    }
</style>
