<template>
    <div class="singleLoanPre">
        <el-card>
                <span class="nameIntroduce" @click="dialogVisible=true">名词解释</span>
                <div class="loanTitle marT20">
                    按身份证维度查询
                </div>
                <div class="flex-r" style="justify-content: space-between;flex-wrap: wrap">

                    <div class="childItem">
                        <div class="childTitle">
                            多头数据-最近1天
                        </div>
                        <div class=" childItemContent">
                            <div class="flex-r childItemContent-title wordTitle">
                                <div>
                                    总申请次数
                                </div>
                                <div>
                                    总申请机构数
                                </div>
                                <div>
                                    涉及手机号码数
                                </div>
                                <div>
                                    涉及贷款类型
                                </div>
                            </div>
                            <div class="flex-r childItemContent-title">
                                <div>
                                    {{transStr(idcardInfo["1"].totalAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["1"].crossTenantAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["1"].mobiles)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["1"].loanTypes)}}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="childItem">
                        <div class="childTitle">
                            多头数据-最近3天
                        </div>
                        <div class=" childItemContent">
                            <div class="flex-r childItemContent-title wordTitle">
                                <div>
                                    总申请次数
                                </div>
                                <div>
                                    总申请机构数
                                </div>
                                <div>
                                    涉及手机号码数
                                </div>
                                <div>
                                    涉及贷款类型
                                </div>
                            </div>
                            <div class="flex-r childItemContent-title">
                                <div>
                                    {{transStr(idcardInfo["3"].totalAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["3"].crossTenantAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["3"].mobiles)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["3"].loanTypes)}}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="childItem">
                        <div class="childTitle">
                            多头数据-最近5天
                        </div>
                        <div class=" childItemContent">
                            <div class="flex-r childItemContent-title wordTitle">
                                <div>
                                    总申请次数
                                </div>
                                <div>
                                    总申请机构数
                                </div>
                                <div>
                                    涉及手机号码数
                                </div>
                                <div>
                                    涉及贷款类型
                                </div>
                            </div>
                            <div class="flex-r childItemContent-title">
                                <div>
                                    {{transStr(idcardInfo["5"].totalAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["5"].crossTenantAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["5"].mobiles)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["5"].loanTypes)}}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="childItem">
                        <div class="childTitle">
                            多头数据-最近10天
                        </div>
                        <div class=" childItemContent">
                            <div class="flex-r childItemContent-title wordTitle">
                                <div>
                                    总申请次数
                                </div>
                                <div>
                                    总申请机构数
                                </div>
                                <div>
                                    涉及手机号码数
                                </div>
                                <div>
                                    涉及贷款类型
                                </div>
                            </div>
                            <div class="flex-r childItemContent-title">
                                <div>
                                    {{transStr(idcardInfo["10"].totalAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["10"].crossTenantAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["10"].mobiles)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["10"].loanTypes)}}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="childItem">
                        <div class="childTitle">
                            多头数据-最近30天
                        </div>
                        <div class=" childItemContent">
                            <div class="flex-r childItemContent-title wordTitle">
                                <div>
                                    总申请次数
                                </div>
                                <div>
                                    总申请机构数
                                </div>
                                <div>
                                    涉及手机号码数
                                </div>
                                <div>
                                    涉及贷款类型
                                </div>
                            </div>
                            <div class="flex-r childItemContent-title">
                                <div>
                                    {{transStr(idcardInfo["30"].totalAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["30"].crossTenantAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["30"].mobiles)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["30"].loanTypes)}}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="childItem">
                        <div class="childTitle">
                            多头数据-最近60天
                        </div>
                        <div class=" childItemContent">
                            <div class="flex-r childItemContent-title wordTitle">
                                <div>
                                    总申请次数
                                </div>
                                <div>
                                    总申请机构数
                                </div>
                                <div>
                                    涉及手机号码数
                                </div>
                                <div>
                                    涉及贷款类型
                                </div>
                            </div>
                            <div class="flex-r childItemContent-title">
                                <div>
                                    {{transStr(idcardInfo["60"].totalAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["60"].crossTenantAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["60"].mobiles)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["60"].loanTypes)}}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="childItem">
                        <div class="childTitle">
                            多头数据-最近90天
                        </div>
                        <div class=" childItemContent">
                            <div class="flex-r childItemContent-title wordTitle">
                                <div>
                                    总申请次数
                                </div>
                                <div>
                                    总申请机构数
                                </div>
                                <div>
                                    涉及手机号码数
                                </div>
                                <div>
                                    涉及贷款类型
                                </div>
                            </div>
                            <div class="flex-r childItemContent-title">
                                <div>
                                    {{transStr(idcardInfo["90"].totalAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["90"].crossTenantAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["90"].mobiles)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["90"].loanTypes)}}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="childItem">
                        <div class="childTitle">
                            多头数据-最近180天
                        </div>
                        <div class=" childItemContent">
                            <div class="flex-r childItemContent-title wordTitle">
                                <div>
                                    总申请次数
                                </div>
                                <div>
                                    总申请机构数
                                </div>
                                <div>
                                    涉及手机号码数
                                </div>
                                <div>
                                    涉及贷款类型
                                </div>
                                <div>
                                    涉及机构行业
                                </div>
                            </div>
                            <div class="flex-r childItemContent-title">
                                <div>
                                    {{transStr(idcardInfo["180"].totalAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["180"].crossTenantAppsNumber)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["180"].mobiles)}}
                                </div>
                                <div>
                                    {{transStr(idcardInfo["180"].loanTypes)}}
                                </div>
                                <div>
                                    {{transStr(pidTenantTypes)}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            <div class="loanTitle" style="margin-top: 120px">
                按手机号维度查询
            </div>
            <div class="flex-r" style="justify-content: space-between;flex-wrap: wrap">

                <div class="childItem">
                    <div class="childTitle">
                        多头数据-最近1天
                    </div>
                    <div class=" childItemContent">
                        <div class="flex-r childItemContent-title wordTitle">
                            <div>
                                总申请次数
                            </div>
                            <div>
                                总申请机构数
                            </div>
                            <div>
                                涉及身份证号码数
                            </div>
                            <div>
                                涉及贷款类型
                            </div>
                        </div>
                        <div class="flex-r childItemContent-title">
                            <div>
                                {{transStr(phoneInfo["1"].totalAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["1"].crossTenantAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["1"].pids)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["1"].loanTypes)}}
                            </div>
                        </div>
                    </div>
                </div>


                <div class="childItem">
                    <div class="childTitle">
                        多头数据-最近3天
                    </div>
                    <div class=" childItemContent">
                        <div class="flex-r childItemContent-title wordTitle">
                            <div>
                                总申请次数
                            </div>
                            <div>
                                总申请机构数
                            </div>
                            <div>
                                涉及身份证号码数
                            </div>
                            <div>
                                涉及贷款类型
                            </div>
                        </div>
                        <div class="flex-r childItemContent-title">
                            <div>
                                {{transStr(phoneInfo["3"].totalAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["3"].crossTenantAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["3"].pids)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["3"].loanTypes)}}
                            </div>
                        </div>
                    </div>
                </div>


                <div class="childItem">
                    <div class="childTitle">
                        多头数据-最近5天
                    </div>
                    <div class=" childItemContent">
                        <div class="flex-r childItemContent-title wordTitle">
                            <div>
                                总申请次数
                            </div>
                            <div>
                                总申请机构数
                            </div>
                            <div>
                                涉及身份证号码数
                            </div>
                            <div>
                                涉及贷款类型
                            </div>
                        </div>
                        <div class="flex-r childItemContent-title">
                            <div>
                                {{transStr(phoneInfo["5"].totalAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["5"].crossTenantAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["5"].pids)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["5"].loanTypes)}}
                            </div>
                        </div>
                    </div>
                </div>


                <div class="childItem">
                    <div class="childTitle">
                        多头数据-最近10天
                    </div>
                    <div class=" childItemContent">
                        <div class="flex-r childItemContent-title wordTitle">
                            <div>
                                总申请次数
                            </div>
                            <div>
                                总申请机构数
                            </div>
                            <div>
                                涉及身份证号码数
                            </div>
                            <div>
                                涉及贷款类型
                            </div>
                        </div>
                        <div class="flex-r childItemContent-title">
                            <div>
                                {{transStr(phoneInfo["10"].totalAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["10"].crossTenantAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["10"].pids)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["10"].loanTypes)}}
                            </div>
                        </div>
                    </div>
                </div>


                <div class="childItem">
                    <div class="childTitle">
                        多头数据-最近30天
                    </div>
                    <div class=" childItemContent">
                        <div class="flex-r childItemContent-title wordTitle">
                            <div>
                                总申请次数
                            </div>
                            <div>
                                总申请机构数
                            </div>
                            <div>
                                涉及身份证号码数
                            </div>
                            <div>
                                涉及贷款类型
                            </div>
                        </div>
                        <div class="flex-r childItemContent-title">
                            <div>
                                {{transStr(phoneInfo["30"].totalAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["30"].crossTenantAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["30"].pids)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["30"].loanTypes)}}
                            </div>
                        </div>
                    </div>
                </div>


                <div class="childItem">
                    <div class="childTitle">
                        多头数据-最近60天
                    </div>
                    <div class=" childItemContent">
                        <div class="flex-r childItemContent-title wordTitle">
                            <div>
                                总申请次数
                            </div>
                            <div>
                                总申请机构数
                            </div>
                            <div>
                                涉及身份证号码数
                            </div>
                            <div>
                                涉及贷款类型
                            </div>
                        </div>
                        <div class="flex-r childItemContent-title">
                            <div>
                                {{transStr(phoneInfo["60"].totalAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["60"].crossTenantAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["60"].pids)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["60"].loanTypes)}}
                            </div>
                        </div>
                    </div>
                </div>


                <div class="childItem">
                    <div class="childTitle">
                        多头数据-最近90天
                    </div>
                    <div class=" childItemContent">
                        <div class="flex-r childItemContent-title wordTitle">
                            <div>
                                总申请次数
                            </div>
                            <div>
                                总申请机构数
                            </div>
                            <div>
                                涉及身份证号码数
                            </div>
                            <div>
                                涉及贷款类型
                            </div>
                        </div>
                        <div class="flex-r childItemContent-title">
                            <div>
                                {{transStr(phoneInfo["90"].totalAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["90"].crossTenantAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["90"].pids)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["90"].loanTypes)}}
                            </div>
                        </div>
                    </div>
                </div>


                <div class="childItem">
                    <div class="childTitle">
                        多头数据-最近180天
                    </div>
                    <div class=" childItemContent">
                        <div class="flex-r childItemContent-title wordTitle">
                            <div>
                                总申请次数
                            </div>
                            <div>
                                总申请机构数
                            </div>
                            <div>
                                涉及身份证号码数
                            </div>
                            <div>
                                涉及贷款类型
                            </div>
                            <div>
                                涉及机构行业
                            </div>

                        </div>
                        <div class="flex-r childItemContent-title">
                            <div>
                                {{transStr(phoneInfo["180"].totalAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["180"].crossTenantAppsNumber)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["180"].pids)}}
                            </div>
                            <div>
                                {{transStr(phoneInfo["180"].loanTypes)}}
                            </div>
                            <div>
                                {{transStr(mobileTenantTypes)}}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </el-card>

        <el-dialog
                title="名词解释(贷前)"
                :visible.sync="dialogVisible"
                width="800px"
                :before-close="handleClose">
            <div class="content">
                总申请次数：表示该用户以身份证或者手机号申请的总次数，同一个机构的多次申请会重复计算;<br>
                总申请机构数：表示该用户以身份证或者手机号申请的总机构数，同一个机构的多次申请只计算一次;<br>
                涉及手机号码数：表示该用户使用该身份证申请过程出现过的手机号码数量，格式为Mx，x代表数量，如M1 代表有1个手机号码;<br>
                涉及身份证号码数：表示该用户使用该手机号申请过程出现过的身份证号码数量，格式为Px，x代表数量，如P1 代表有1个身份证号码;<br>
                涉及贷款类型：表示该用户申请过的贷款的类型，不重复显示;<br>
                涉及机构行业：表示该用户申请过的机构的类型，不重复显示。
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭 </el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'singleLoanPre',
    data () {
      return {
        dialogVisible:false,
        idcardInfo:{
          '1':{},
          '3':{},
          '5':{},
          '10':{},
          '30':{},
          '60':{},
          '90':{},
          '180':{},
        },
        phoneInfo:{
          '1':{},
          '3':{},
          '5':{},
          '10':{},
          '30':{},
          '60':{},
          '90':{},
          '180':{},
        },
        pidTenantTypes:"",
        mobileTenantTypes:""
      }
    },
    mounted () {
      this.getHaoriInfo()
    },
    methods: {
      getHaoriInfo(){
        this.$api.detail.getHaoriInfo({
          userId:this.$route.params.userId
        }).then((res)=>{
            this.idcardInfo=res.data.pidVOList;
            this.phoneInfo=res.data.mobileVOList;
            this.pidTenantTypes=res.data.pidTenantTypes;
            this.mobileTenantTypes=res.data.mobileTenantTypes
        })
      },
      transStr(val){
        if(val===""){
          return "无记录"
        }
        return val
      }
    },
    created () {
    },
    destoryed () {
    }
  }
</script>

<style scoped lang="less">
.singleLoanPre{
    .loanTitle{
        background: rgba(22, 155, 213, 1);
        line-height: 40px;
        text-align: center;
        font-size: 16px!important;
        color: white!important;
        border-radius: 5px;
    }
    .childTitle{
        font-size: 13px;
        background: rgba(0,0,0,0.4);
        line-height: 36px;
        font-weight: bold;
        color:#DDDDDD;
        text-align: center;
        color: white;
        border-radius: 4px;
    }
    .childItem{
        width: 48%;
        margin-top: 40px;
    }
    .childItemContent{
        &>div{
            flex:1
        }
    }
    .childItemContent-title{
        &>div{
            flex: 1;
            text-align: center;
            line-height: 30px;
            font-size: 12px;
            background: rgb(245, 245, 246);
            color:gray;
        }
    }
    .nameIntroduce{
        color:red;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
    }
    .content{
        line-height: 30px;
        font-size: 14px;
        color:gray;
    }
    .wordTitle{
        div{
            background: rgba(0,0,0,0.2);
            color:white
        }
    }
}
</style>
