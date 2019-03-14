<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>渠道商列表</span>
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
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span  class="smallSpan">账 &nbsp;&nbsp;号</span>
                            <el-input placeholder="请输入号码名称"  v-model.trim="loginName" class="aplus-norInp"></el-input>
                        </div>
                    </el-col>
                    <el-button type="primary" icon="el-icon-search" class="reloadBtn" @click="readyAjax">查询</el-button>
                    <el-button type="default" icon="el-icon-refresh" class="reloadBtn" @click="reset">重置</el-button>
                    <el-button  icon="el-icon-plus" class="plusBtn" @click="dialogVisible=true">新增</el-button>
                    <!--19BE6B-->
                </el-row>


                <div class="listContent marT60">
                    <el-table
                            border
                            class="cardTable marT20"
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="ID">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="渠道商名称">
                        </el-table-column>
                        <el-table-column
                                prop="loginName"
                                label="账号	"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="linkUrl"
                                label="	推广链接"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="payMoney"
                                label="操作"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button size="mini" plain class="aplus-errorBtn" @click="delChannel(scope.row)"   v-if="btnStr.indexOf('删除')>-1">删除</el-button>
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
                    <el-form-item label="账号" prop="loginName">
                        <el-input v-model.trim="ruleForm.loginName"    auto-complete="new-password"  placeholder="请输入账号(由数字和字母组成)"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                    	<el-input v-model.trim="ruleForm.password"   auto-complete="new-password"  type="password" placeholder="请输入密码"></el-input>
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
        this.getChannelList()
      },
      delChannel(row){
        this.$toolkit.showConfrim('确定要删除此渠道吗？','提示').then(()=>{
          this.$api.channel.delChannel(row.id).then(()=>{
            this.$message.success("渠道删除成功！");
            this.readyAjax()
          })
        })
      },
      getChannelList(){
        this.$api.channel.getChannelList({
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
</style>
