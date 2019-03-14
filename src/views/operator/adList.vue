<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>广告位管理</span>
            </div>
            <!--<span class="smallSpan">认证状态</span>-->
            <!--<el-select  v-model="tableForm.authStatus"  @change="readyAjax" class="aplus-sel"    placeholder="请选择沟通状态" style="width: 100%">-->
            <!--<el-option-->
            <!--v-for="item in authList"-->
            <!--:key="item.value"-->
            <!--:label="item.name"-->
            <!--:value="item.id">-->
            <!--</el-option>-->
            <!--</el-select>-->

            <div class="cardBody">
                <el-row type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                    <el-button  icon="el-icon-plus" style="margin-left: 25px;" class="plusBtn" @click="dialogVisible=true">新增广告位</el-button>
                    <!--19BE6B-->
                </el-row>


                <div class="listContent marT20">
                    <el-table
                            border
                            class="cardTable marT20"
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="广告名称">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="广告图片">
                        </el-table-column>
                        <el-table-column
                                prop="loginName"
                                label="是否跳转"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="linkUrl"
                                label="广告位置"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="linkUrl"
                                label="备注"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="payMoney"
                                label="操作"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button size="mini" plain class="aplus-pribtn" @click="delChannel(scope.row)" >编辑</el-button>
                                <el-button size="mini" plain class="aplus-errorBtn" @click="delAd(scope.row)" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block pagiWrap" style="margin-top: 20px">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 30, 50]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>



            <el-dialog
                    title="新增"
                    :visible.sync="dialogVisible"
                    width="30%"
                    @close="handleClose">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                	<el-form-item label="广告图片 :">
                       <el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
                    </el-form-item>
                    <el-form-item label="是否跳转 :" prop="loginName">
                        <el-input v-model.trim="ruleForm.loginName"    auto-complete="new-password"  placeholder="请输入账号(由数字和字母组成)"></el-input>
                    </el-form-item>
                    <el-form-item label="跳转链接 :" prop="password">
                    <el-input v-model.trim="ruleForm.password"   auto-complete="new-password"  type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="广告类型 :" prop="password">
                    	<el-select style="width: 100%" v-model="ruleForm.value" placeholder="请选择规则设置">
                            <el-option label="命中直接拒绝客户" :value="0"></el-option>
                            <el-option label="命中不直接拒绝客户" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否启用 :" prop="password">
                    	  <el-radio v-model="ruleForm.isOpen" label="1">是</el-radio>
  						  <el-radio v-model="ruleForm.isOpen" label="2">否</el-radio>
                    </el-form-item>
                    <el-form-item label="备注 :" prop="password">
                    <el-input v-model.trim="ruleForm.password"   auto-complete="new-password"  type="textarea" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="getChannel('ruleForm')">确 定</el-button>
              </span>
            </el-dialog>




        </el-card>

    </div>
</template>

<script>
  import animate from "animate.css";
  import { mapState } from 'vuex';
  export default {
    name: "channelList",
    data() {
      var validateLoginName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入渠道商名称'));
        } else {
          let reg=/[\W]/g
          if (reg.test(value)) {
            return callback(new Error('格式不正确，只能输入数字和字母'));
          }else{
            return callback();
          }
        }
      };
      return {
        tableForm:{
          time:"",
        },
        dialogVisible:false,
        ruleForm:{},
        currentPage:1,
        pageSize:10,
        loginName:"",
        tableData:[],
        rules: {
          loginName: [{
            required: true,
            validator: validateLoginName,
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message:"请输入密码",
            trigger: 'blur'
          }],
        },
        total:0
      }
    },
    mounted() {
        this.getChannelList()
    },
    components:{
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    watch:{
      "loginName":function(n){
        if(!n){
          this.readyAjax()
        }
      }
    },
    methods: {
      changeInp(val){
        console.log(val)
        // value=value.replace(/[\W]/g,'')
      },
      handleClose(){
        this.ruleForm={};
      },
      reset(){
        this.loginName="";
        this.readyAjax()
      },
      readyAjax(){
        this.currentPage=1;
        this.pageSize=10;
        this.getAdList()
      },
      getAdList(){
        this.$api.channel.getAdList({
          pageNo:this.currentPage,
          pageSize:this.pageSize,
          loginName:this.loginName
        }).then((res)=>{
          this.tableData=res.data.records;
          this.total=res.data.total
        })
      },
      handleCurrentChange(val){
        this.currentPage=val;
        this.getChannelList()
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getChannelList()
      },
      delAd(row){
      	this.$toolkit.showConfrim('确定要删除此广告位吗？','提示').then(()=>{
          this.$api.channel.delAd(row.id).then(()=>{
            this.$message.success("广告位删除成功！");
            this.readyAjax()
          })
        })
      },
      getChannel(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.channel.addChannel(this.ruleForm).then(()=>{
              this.$message.success("渠道添加成功!");
              this.readyAjax();
              this.dialogVisible=false
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    .headerTitle{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        padding-bottom: 20px;
        font-weight: bold;
        font-size: 14px;
    }
    .otherConfig{
        .global-childItem{
            &>span:not(.smallSpan){
                text-align: center;
            }
            span+*{
                flex: 1!important;
            }
        }
    }
    .affilateWrap{
        .dialogTitle{
            font-weight: bold;
            display: block;
            padding-bottom: 10px;
        }
        .flexChild{
            width: 25%;
            font-size: 13px;
            color:gray;
            line-height: 25px;
        }
        .recordList{
            max-height: 400px;
            overflow-y: auto;
            .recordItem{
                box-sizing: border-box;
                padding: 20px;
                border-radius: 5px;
                border: 1px solid gray;
                &:not(:first-child){
                    margin-top: 15px;
                }
            }
        }

        .recordInp{
            width: 90%;
            margin-left: 20px
        }
    }
    .totalInfo{
        font-weight: bold;
        font-size: 14px;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
