<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix cardTitle">
                <span>全局参数</span>
            </div>
            <div class="cardBody">
                <div class="headerTitle">
                    额度设置
                </div>
                <el-row type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                    <el-col :span="7">
                       <div class="flex-r global-childItem">
                           <span class="smallSpan">最高额度</span>
                           <el-input placeholder="请输入最高额度" class="aplus-norInp" v-model="lilvInfo.maxBorrowMoney"></el-input>
                       </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span  class="smallSpan">提额额度</span>
                            <el-input placeholder="请输入提额额度" class="aplus-norInp"  v-model="eduInfo.userEdu"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span>白名单初始额度</span>
                            <el-input placeholder="请输入白名单初始额度" class="aplus-norInp" v-model="eduInfo.vipEdu"></el-input>
                        </div>
                    </el-col>
                </el-row>

                <el-row type="flex" class="row-bg " style="flex-wrap: wrap;margin-top: 20px" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan" style="width: 73px!important;">授信额度</span>
                            <el-button type="primary" class="setBtn" @click="setMoneyDialogVisible=true" v-if="btnStr.indexOf('设置授信额度')>-1">设置</el-button>
                        </div>
                    </el-col>
                </el-row>

                <div style="text-align: right">
                    <el-button type="primary" class="setBtn" @click="saveTabaoMoney"  v-if="btnStr.indexOf('保存额度')>-1">保存</el-button>
                </div>
            </div>




            <div class="cardBody marT90">
                <div class="headerTitle">
                    利率配置
                </div>
                <el-row type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">贷款期限</span>
                            <el-input placeholder="请输入贷款期限" :value="lilvInfo.limitDays?lilvInfo.limitDays+'天':''" class="aplus-norInp" :disabled="true"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span  class="smallSpan">利息(千分)</span>
                            <el-input placeholder="请输入利息" class="aplus-norInp" :value="lilvInfo.interestPercent" :disabled="true"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span>平 台 服 务 费</span>
                            <el-input placeholder="请输入平台服务费" class="aplus-norInp" :value="lilvInfo.placeServePercent" :disabled="true"></el-input>
                        </div>
                    </el-col>
                </el-row>

                <el-row type="flex" class="row-bg " style="flex-wrap: wrap;margin-top: 20px" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">信用认证费</span>
                            <el-input placeholder="请输入信用认证费" class="aplus-norInp" :value="lilvInfo.msgAuthPercent" :disabled="true"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span  class="smallSpan">风控服务费</span>
                            <el-input placeholder="请输入风控服务费" class="aplus-norInp"  :value="lilvInfo.riskServePercent" :disabled="true"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span>风 险 准 备 金</span>
                            <el-input placeholder="请输入风险准备金" class="aplus-norInp" :value="lilvInfo.riskPlanPercent" :disabled="true"></el-input>
                        </div>
                    </el-col>
                </el-row>

                <el-row type="flex" class="row-bg " style="flex-wrap: wrap;margin-top: 20px" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">逾期日利率(%)</span>
                                <el-input placeholder="请输入逾期日利率" class="aplus-norInp" :value="lilvInfo.overduePercent" :disabled="true"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span  class="smallSpan">最大逾期日利率(%)</span>
                            <el-input placeholder="请输入最大逾期日利率" class="aplus-norInp" :value="lilvInfo.overduePercentMax" :disabled="true"></el-input>
                        </div>
                    </el-col>
                </el-row>
            </div>


            <div class="cardBody marT90 otherConfig">
                <div class="headerTitle">
                    其他设置
                </div>
                <el-row type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">订单操作密码 : </span>
                            <span style="color:red"> ********** </span>
                            <el-button class="setBtn"  type="primary" @click="passwordSetDialogVisible=true"  v-if="btnStr.indexOf('修改逾期结清密码')>-1">修改</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" style="flex-wrap: wrap;margin-top: 8px" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">机审规则设置 : </span>
                            <span > {{lilvInfo.isHitDirectRefuse==0?'命中风控直接拒绝':'命中风控不直接拒绝'}} </span>
                            <el-button class="setBtn"  type="primary" @click="jishenSetDialogVisible=true"   v-if="btnStr.indexOf('设置机审规则')>-1">修改</el-button>
                            <el-tooltip class="item" effect="dark" content="若选择“命中直接拒绝客户”，当客户命中机审时，则会直接拒绝客户；若选择“命中不直接拒绝客户”，当客户命中机审时，订单不做拒绝并进入贷款申请管理进行人工审核" placement="top">
                                <b class="question">?</b>
                            </el-tooltip>
                        </div>
                    </el-col>
                </el-row>
            </div>


            <!--额度设置弹窗-->
            <el-dialog
                    title="淘宝额度设置"
                    :visible.sync="setMoneyDialogVisible"
                    width="600px"
                    center @close="closeTaobao">
                <div class="taobaoSet">
                    <div class="taobaoSet-title flex-r">
                        <span>级别</span>
                        <span>条件</span>
                        <span>花呗额度</span>
                        <span>初始额度</span>
                    </div>
                    <div class="toabaoSet-body">
                        <div class="taobaoSet-item flex-r">
                            <span>一档</span>
                            <span>大于等于</span>
                            <span>0-800</span>
                            <span>
                                <el-input placeholder="请输入一档初始额度" v-model="eduInfo.firstBorrowMoney"></el-input>
                            </span>
                        </div>
                        <div class="taobaoSet-item flex-r">
                            <span>二档</span>
                            <span>大于等于</span>
                            <span>800-1500</span>
                            <span>
                                <el-input placeholder="请输入二档初始额度"  v-model="eduInfo.secondBorrowMoney"></el-input>
                            </span>
                        </div>
                        <div class="taobaoSet-item flex-r">
                            <span>三档</span>
                            <span>大于等于</span>
                            <span>1500-2500</span>
                            <span>
                                <el-input placeholder="请输入三档初始额度"  v-model="eduInfo.thirdBorrowMoney"></el-input>
                            </span>
                        </div>
                        <div class="taobaoSet-item flex-r">
                            <span>四档</span>
                            <span>大于等于</span>
                            <span> >2500 </span>
                            <span>
                                <el-input placeholder="请输入四档初始额度"  v-model="eduInfo.fourthBorrowMoney"></el-input>
                            </span>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="setMoneyDialogVisible = false">关 闭</el-button>
                <el-button type="primary" @click="saveTabaoMoney">确 定</el-button>
              </span>
            </el-dialog>


            <!--结清密码设置弹窗-->
            <el-dialog
                    title="订单操作密码设置"
                    :visible.sync="passwordSetDialogVisible"
                    width="600px"
                    center>
                <div>
                    <div class="form-body">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="旧密码" prop="oldPassword">
                                <el-input v-model.trim="ruleForm.oldPassword" type="password" placeholder="请输入旧密码"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newPassword">
                                <el-input v-model.trim="ruleForm.newPassword" type="password"  placeholder="请输入新密码"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="confirmPassword">
                                <el-input v-model.trim="ruleForm.confirmPassword" type="password"  placeholder="请输入确认密码"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="passwordSetDialogVisible = false" class="cancelBtn">关 闭</el-button>
                <el-button type="primary"  class="setBtn" @click="setJieqingPas('ruleForm')">确 定</el-button>
              </span>
            </el-dialog>


            <!--机身规则设置弹窗-->
            <el-dialog
                    title="机审规则设置"
                    :visible.sync="jishenSetDialogVisible"
                    width="600px"
                    center @close="closeSet">
                <div>
                    <div class="form-body">
                        <el-form :model="jishenForm" ref="jishenForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="规则选项">
                                <el-select style="width: 100%" v-model="jishenForm.value" placeholder="请选择规则设置">
                                    <el-option label="命中直接拒绝客户" :value="0"></el-option>
                                    <el-option label="命中不直接拒绝客户" :value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="jishenSetDialogVisible = false" class="cancelBtn">关 闭</el-button>
                <el-button type="primary"  class="setBtn" @click="setJishenRule('ruleForm')">确 定</el-button>
              </span>
            </el-dialog>


        </el-card>

    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "channelList",
    data() {
      var validateConfirmPass = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入确认密码'));
        } else {
          if(this.ruleForm.newPassword!=value){
            return callback(new Error('新密码与确认密码不一致，请仔细核对！'));
          }
          callback();
        }
      };
      return {
        lilvInfo:{},
        copyEduInfo:{},
        eduInfo:{},
        setMoneyDialogVisible:false,
        ruleForm:{},
        passwordSetDialogVisible:false,
        jishenSetDialogVisible:false,
        rules: {
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
          ],
          confirmPassword: [
            { required: true, validator: validateConfirmPass, trigger: 'blur' },
          ],
        },
        jishenForm:{
          value:"0"
        }
      };
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    mounted() {
      this.getLiLvInfo()
      this.geteduInfo()
    },
    components:{
    },
    watch:{
      "tableForm.loginName":function (n) {
        if(!n){
          this.readyAjax()
        }
      }
    },
    methods: {
      closeTaobao(){
        this.eduInfo=this.copyEduInfo;
      },
      closeSet(){
        this.jishenForm.value=+this.lilvInfo.isHitDirectRefuse
      },
      async getLiLvInfo(){
        try{
          let res=await this.$api.system.getLiLvInfo();
          if(res.code=="200"){
            if(res.data&&Object.keys(res.data)){
              this.lilvInfo=res.data;
              this.jishenForm.value=+this.lilvInfo.isHitDirectRefuse
            }
          }
        }catch(e){
          this.$message.error(e)
        }
      },
      async geteduInfo(){
        try{
          let res=await this.$api.system.geteduInfo();
          if(res.code=="200"){
            if(res.data&&Object.keys(res.data)){
              this.eduInfo=res.data;
              this.copyEduInfo={...res.data}
            }
          }
        }catch(e){
          this.$message.error(e)
        }
      },
      saveTabaoMoney(){
        this.$api.system.saveTabaoMoney({
            maxBorrowMoney:this.lilvInfo.maxBorrowMoney,
          ...this.eduInfo
        }).then((res)=>{
          this.$message.success("额度设置成功");
          this.setMoneyDialogVisible=false;
        }).catch((e)=>{
          this.$message.error("额度设置失败")
        })
      },
      setJieqingPas(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.system.setJieqingPas(this.ruleForm).then((res)=>{
              this.passwordSetDialogVisible=false;
              this.$message.success("订单操作密码设置成功")
            }).catch((e)=>{
              this.$message.error("订单操作密码设置失败")
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      setJishenRule(){
        this.$api.system.setJishenRule(this.jishenForm.value).then((res)=>{
          this.jishenSetDialogVisible=false;
          this.$message.success("机审规则设置成功");
          this.getLiLvInfo()
        }).catch((e)=>{
          this.$message.error("机审规则设置失败")
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
    .global-childItem{
        align-items: center;
        span{
            font-size: 13px;
            display: inline-block;
            width: 150px;
            color:gray;
        }
        .smallSpan{
            width: 90px!important;
            /*text-align: r;*/
        }
    }
    .otherConfig{
        .global-childItem{
            &>span:not(.smallSpan){
                text-align: center;
            }
        }
    }
    .taobaoSet-title,.taobaoSet-item{
        text-align: center;
        align-items: center;
        span{
            flex:1;
        }
    }
    .taobaoSet-item{
        margin-top: 20px;
        font-size:13px;
        color:gray;
        .el-input__inner::-webkit-input-placeholder{
            font-size: 12px;
        }
        .el-input__inner{
            padding: 0 14px;
        }
    }
    .question{
        font-size: 16px;
        display: inline-block;
        margin-left: 10px;
        font-weight: bold;
        color:red!important;
    }

</style>
