<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix cardTitle">
                <span>企业账号</span>
            </div>
            <div class="cardBody">
                <div class="cardBodyHeader">
                    <div class="topTableForm">
                        <div class="topTableForm-item">
                            <span>账&nbsp;&nbsp;&nbsp;&nbsp;号 : </span>
                            <el-input placeholder="请输入姓名" v-model="tableForm.partnerName"></el-input>
                        </div>
                        <div class="topTableForm-item">
                            <span>手机号 : </span>
                            <el-input placeholder="请输入手机号" v-model="tableForm.phone"></el-input>
                        </div>
                        <!--<div class="topTableForm-item">-->
                            <!--<span>邮&nbsp;&nbsp;&nbsp;&nbsp;箱 :</span>-->
                            <!--<el-input placeholder="请输入邮箱"></el-input>-->
                        <!--</div>-->
                        <div class="topTableForm-item">
                            <span>公司名 : </span>
                            <el-input placeholder="请输入公司名" v-model="tableForm.col5"></el-input>
                        </div>
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
                                    prop="partnerName"
                                    width="220"
                                    :show-overflow-tooltip="true"
                                    label="账号">
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
                                    prop="col5"
                                    :show-overflow-tooltip="true"
                                    label="公司名" :formatter="$toolkit.transNull">
                            </el-table-column>
                            <el-table-column
                                    :show-overflow-tooltip="true"
                                    prop="status"
                                    label="状态">
                                <template slot-scope="scope">
                                    {{scope.row.status==1?'正常':'删除'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    :show-overflow-tooltip="true"
                                    prop="createTime"
                                    label="创建时间" :formatter="$toolkit.formatTimeTable">
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作" width="200"  class="btnWrap">
                                <template slot-scope="scope">
                                    <!--<el-button size="mini" plain class="aplus-pribtn" @click="showDialog(false,scope.row)">编辑</el-button>-->
                                    <el-button size="mini" plain class="aplus-pribtn configBtn" @click="showConfig(scope.row)" :disabled="scope.row.showConfig!=1"   v-if="btnStr.indexOf('配置')>-1">配置</el-button>
                                    <!--<el-button size="mini" plain class="aplus-errorBtn" @click="action(scope.row,'删除')">删除</el-button>-->
                                    <!--<el-button size="mini" plain class="aplus-errorBtn" @click="action(scope.row,'停用')">停用</el-button>-->
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
                    @close="handleClose(1)">
                  <div>
                      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
                          <el-form-item label="手机号" prop="phone">
                              <el-input v-model="addForm.phone" placeholder="请输入手机号"></el-input>
                          </el-form-item>
                          <el-form-item label="公司名" prop="col5">
                              <el-input v-model="addForm.col5" placeholder="请输入公司名"></el-input>
                          </el-form-item>
                          <el-form-item label="企业账号" prop="partnerName">
                              <el-input v-model="addForm.partnerName" placeholder="请输入企业账号"></el-input>
                          </el-form-item>
                          <el-form-item label="密码" prop="password">
                              <el-input v-model="addForm.password" placeholder="请输入密码"></el-input>
                          </el-form-item>
                          <el-form-item label="确认密码" prop="surePassword">
                              <el-input v-model="addForm.surePassword" placeholder="请输入确认密码"></el-input>
                          </el-form-item>
                          <el-form-item label="客服电话" prop="servePhone">
                              <el-input v-model="addForm.servePhone" placeholder="请输入客服电话"></el-input>
                          </el-form-item>
                          <el-form-item label="客服微信" prop="wexin">
                              <el-input v-model="addForm.wexin" placeholder="请输入客服微信"></el-input>
                          </el-form-item>
                      </el-form>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sureAddAccount('addForm')">确 定</el-button>
                  </span>
            </el-dialog>




            <el-dialog
                    title="配置"
                    :visible.sync="configDialog"
                    width="800px"
                    center
                    class="configDialog"
                    @close="handleClose(2)">
                <div>
                    <el-form :model="configForm" :rules="rules"   ref="configForm" label-width="130px" class="configForm">
                        <label class="bigTitle">利率配置</label>
                        <div class="flex-r" style="flex-wrap:wrap">
                            <div class="configDiv">
                                <el-form-item label="贷款期限:" prop="limitDays">
                                    <el-input :value="7" :disabled="true"  placeholder="请输入贷款期限"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="最大额度:" prop="maxBorrowMoney">
                                    <el-input v-model="configForm.paramSetting.maxBorrowMoney" placeholder="请输入最大额度"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="利息(千分):" prop="interestPercent">
                                    <el-input v-model="configForm.paramSetting.interestPercent" placeholder="请输入利息(千分)"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="平台服务费(%):" prop="placeServePercent">
                                    <el-input v-model="configForm.paramSetting.placeServePercent" placeholder="请输入平台服务费(%)"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="信用认证费:" prop="msgAuthPercent">
                                    <el-input v-model="configForm.paramSetting.msgAuthPercent" placeholder="请输入信用认证费"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="风控服务费(%):" prop="riskServePercent">
                                    <el-input v-model="configForm.paramSetting.riskServePercent" placeholder="请输入风控服务费(%)"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="风险准备金(%):" prop="riskPlanPercent">
                                    <el-input v-model="configForm.paramSetting.riskPlanPercent" placeholder="请输入风险准备金(%)"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="逾期日利率(%):" prop="overduePercent">
                                    <el-input v-model="configForm.paramSetting.overduePercent" placeholder="请输入逾期日利率(%)"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="最大逾期日利率(%):" prop="overduePercentMax">
                                    <el-input v-model="configForm.paramSetting.overduePercentMax" placeholder="请输入最大逾期日利率(%)"></el-input>
                                </el-form-item>
                            </div>
                        </div>


                        <label class="bigTitle marT60">第三方单价配置</label>
                        <div class="flex-r" style="flex-wrap:wrap">
                            <div class="configDiv">
                                <el-form-item label="云片通知短信:" prop="notifyUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.notifyUnitMoney" placeholder="请输入云片通知短信单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="云片验证码:" prop="verificationUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.verificationUnitMoney" placeholder="请输入云片验证码单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="同盾运营商:" prop="yysUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.yysUnitMoney" placeholder="请输入同盾运营商单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="网盾淘宝:" prop="tbUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.tbUnitMoney" placeholder="请输入网盾淘宝单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="有盾活体:" prop="faceUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.faceUnitMoney" placeholder="请输入有盾活体单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="有盾银行卡:" prop="bankUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.bankUnitMoney" placeholder="请输入有盾银行卡单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="新颜单价:" prop="xyUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.xyUnitMoney" placeholder="请输入新颜单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="天贝单价:" prop="tianbeiUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.tianbeiUnitMoney" placeholder="请输入天贝单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="神月单价:" prop="shenyueUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.shenyueUnitMoney" placeholder="请输入神月单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="逾期短信单价:" prop="overdueSmsMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.overdueSmsMoney" placeholder="请输入逾期短信单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="昊日单价:" prop="haoriUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.haoriUnitMoney" placeholder="请输入昊日单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="信用探针单价:" prop="tcCreditProbeUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.tcCreditProbeUnitMoney" placeholder="请输入信用探针单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="小信分单价:" prop="tcBeautScoreUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.tcBeautScoreUnitMoney" placeholder="请输入小信分单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="无间探针单价:" prop="tcBlacklistUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.tcBlacklistUnitMoney" placeholder="请输入无间探针单价"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="同盾单价:" prop="tongdunUnitMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.tongdunUnitMoney" placeholder="请输入同盾单价"></el-input>
                                </el-form-item>
                            </div>
                        </div>




                        <label class="bigTitle marT60">授信区间</label>
                        <div class="flex-r" style="flex-wrap:wrap">
                            <div class="configDiv">
                                <el-form-item label="最低档:" prop="firstBorrowMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.firstBorrowMoney" placeholder="请输入最低档"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="二档:" prop="secondBorrowMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.secondBorrowMoney" placeholder="请输入二档"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="三挡:" prop="thirdBorrowMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.thirdBorrowMoney" placeholder="请输入三挡"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="最高档:" prop="fourthBorrowMoney">
                                    <el-input v-model="configForm.partnerConfigParamPO.fourthBorrowMoney" placeholder="请输入最高档"></el-input>
                                </el-form-item>
                            </div>
                            <div class="configDiv">
                                <el-form-item label="提额:" prop="userEdu">
                                    <el-input v-model="configForm.partnerConfigParamPO.userEdu" placeholder="请输入提额"></el-input>
                                </el-form-item>
                            </div>
                        </div>


                        <label class="bigTitle marT60">白名单配置</label>
                        <div class="flex-r" style="flex-wrap:wrap">
                            <div class="configDiv">
                                <el-form-item label="用户初始额度:" prop="vipEdu">
                                    <el-input v-model="configForm.partnerConfigParamPO.vipEdu" placeholder="请输入用户初始额度"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="configDialog = false">取 消</el-button>
                    <el-button type="primary" @click="sureConfig('addForm')">确 定</el-button>
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
          callback(new Error('请输入确认密码'));
        } else {
          if (this.addForm.password !=value) {
          return  callback(new Error('密码不一致'));
          }
          return callback();
        }
      };
      return {
        tableForm:{
          partnerName:"",
          phone:"",
          col5:""
        },
        loading:false,
        tableData: [],
        // 渠道商列表分页
        pageNum:1,
        pageSize:10,
        total:0,
        actionType:true,
        addDialogVisible:false,
        addForm:{},
        rules: {
          phone: [
            { required: true, validator: checkTel , trigger: 'change' }
          ],
          partnerName: [
            { required: true, message: '请输入企业账号', trigger: 'change' }
          ],
          col5: [
            { required: true, message: '请输入公司名', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          surePassword: [
            { required: true,validator: validateSurePass , trigger: 'change' }
          ],
        },
        configForm:{
          partnerConfigParamPO:{
            notifyUnitMoney:0.05,
            verificationUnitMoney:0.05,
            yysUnitMoney:0.15,
            tbUnitMoney:0.3,
            faceUnitMoney:0.5,
            bankUnitMoney:0.3,
            xyUnitMoney:0.4,
            firstBorrowMoney:800,
            secondBorrowMoney:1000,
            thirdBorrowMoney:1200,
            fourthBorrowMoney:1500,
            userEdu:100,
            vipEdu:1500,
            tianbeiUnitMoney:0.8,
            shenyueUnitMoney:0.4,
            overdueSmsMoney:0.08,
            haoriUnitMoney:0.25,
            tcCreditProbeUnitMoney:0.4,
            tcBlacklistUnitMoney:0.7,
            tcBeautScoreUnitMoney:0.5,
            tongdunUnitMoney:1
          },
          paramSetting:{
            maxBorrowMoney:2500,
            interestPercent:20,
            placeServePercent:6,
            msgAuthPercent:6,
            riskServePercent:6,
            riskPlanPercent:5,
            overduePercent:0,
            overduePercentMax:"",
            limitDays:7
          },

        },
        configDialog:false,
        actionRow:{}
      };
    },
    mounted() {
      // this.channelList_getList()
      this.getList();
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    components:{
    },
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
            delete this.addForm.surePassword;
            this.$api.system.addPartner(this.addForm).then((res)=>{
              this.$message.success("企业账号新增成功!");
              this.addDialogVisible=false;
              this.readyAjax()
            }).catch(()=>{
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      reset(){
        for(let i in this.tableForm){
          this.tableForm[i]=""
        }
        this.readyAjax()
      },
      handleClose(type){
            if(type==1){
              this.addForm={};
            }else{
              this.configForm.paramSetting.overduePercentMax="";
            }
      },
      readyAjax(){
        this.pageNum=1;
        this.pageSize=10;
        this.getList()
      },
      action(row,title){
        this.$toolkit.showConfrim(`您确定要进行此账号德${title}操作吗？`,title).then(()=>{
          // this.$api.
        })
      },
      showDialog(actionType,row){
        this.actionType=actionType;
        if(!this.actionType){
          this.addForm={...row}
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
        this.$api.system.getEnterPriseAccoutList({
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
      sureConfig(){
        this.$api.system.configPartner({
          ...this.configForm,
        }).then((res)=>{
          this.$message.success("企业账号配置成功!");
          this.configDialog=false;
          this.readyAjax()
        })
      },
      handleCurrentChange(val){
        this.pageNum=val;
        this.getList()
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getList()
      }
    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    @import url("../../assets/css/common.less");
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
