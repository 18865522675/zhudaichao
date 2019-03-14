<template>
    <div>
        <el-card class="box-card affilateWrap" style="overflow-y: auto">
            <div slot="header" class="clearfix cardTitle">
                <span>申请贷款详情</span>
            </div>
            <div class="cardBody">
                <div class="auditInfoDetail">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="姓名 : ">
                            <el-input v-model="form.user.userName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="电话 : ">
                            <el-input v-model="form.user.phone" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="贷款单号 : ">
                            <el-input v-model="form.lianPayNum" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="银行名称 : ">
                            <el-input v-model="form.bankName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="银行卡号 : ">
                            <el-input v-model="form.bankCardNum" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="贷款期限 : ">
                            <el-input v-model="form.limitDays" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="借款金额 : ">
                            <el-input v-model="form.borrowMoney" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="到账金额 : ">
                            <el-input v-model="form.realMoney" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="利息 : ">
                            <el-input v-model="form.interestMoney" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="平台服务费 : ">
                            <el-input v-model="form.placeServeMoney" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="信息认证费 : ">
                            <el-input v-model="form.msgAuthMoney" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="风控服务费 : ">
                            <el-input v-model="form.riskServeMoney" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="风险准备金 : ">
                            <el-input v-model="form.riskPlanMoney" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="综合费用 : ">
                            <el-input v-model="form.wateMoney" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="优惠券节省金额 : ">
                            <el-input v-model="form.saveMoney" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="应还款金额 : ">
                            <el-input v-model="form.needPayMoney" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="申请借款时间 : ">
                            <el-input v-model="form.gmtDatetime" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="容限期 : ">
                            <el-input v-model="form.allowDays" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="借款协议 : ">
                            <el-button size="mini" type="primary" :disabled="true">查看</el-button>
                        </el-form-item>
                        <el-form-item label="借款服务协议 : ">
                            <el-button size="mini" type="primary" :disabled="true">查看</el-button>
                        </el-form-item>
                        <el-form-item label="">
                            <el-button size="mini" type="primary" @click="$router.go(-1)">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

        </el-card>

    </div>
</template>

<script>
  export default {
    name: "auditInfoDetail",
    data() {
      return {
        form:{}
      };
    },
    mounted() {
      this.getAuditInfoDetail()
    },
    computed:{
      "id":function(){
        return this.$route.params.id
      }
    },
    components:{
    },
    watch:{
    },
    methods: {
      getAuditInfoDetail(){
        this.$api.audit.getAuditInfoDetail({
          id:this.id
        }).then((res)=>{
            this.form=res.data
        }).catch(()=>{
          this.$message.error("获取详情失败")
        })
      }
    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    .auditInfoDetail{
        width: 60%;
        margin: 0 auto;
        margin-top: 50px;
    }
</style>
