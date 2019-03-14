<template>
    <div>
        <el-card class="box-card merchantCharge affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>商户充值</span>
            </div>
            <div class="cardBody">
                <div class="flex-r staticList">
                    <div class="staticItem">
                        <div>
                            短信通知短信次数
                        </div>
                        <span>{{topData.notifyNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            短信验证码调用次数
                        </div>
                        <span>{{topData.verificationNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            运营商调用次数
                        </div>
                        <span>{{topData.yysNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            淘宝调用次数
                        </div>
                        <span>{{topData.tbNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            活体认证调用次数
                        </div>
                        <span>{{topData.faceNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            银行卡认证调用次数
                        </div>
                        <span>{{topData.bankNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            新颜调用次数
                        </div>
                        <span>{{topData.xyNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            天贝调用次数
                        </div>
                        <span>{{topData.tianbeiNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            神月调用次数
                        </div>
                        <span>{{topData.shenyueNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            逾期短信使用次数
                        </div>
                        <span>{{topData.overdueSmsNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            昊日调用次数
                        </div>
                        <span>{{topData.haoriNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            信用探针次数
                        </div>
                        <span>{{topData.tcCreditProbeNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            小信分次数
                        </div>
                        <span>{{topData.tcBeautScoreNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            无间探针次数
                        </div>
                        <span>{{topData.tcBlacklistNumber||0}}</span>
                    </div>
                    <div class="staticItem">
                        <div>
                            同盾调用次数
                        </div>
                        <span>{{topData.tongdunNumber||0}}</span>
                    </div>
                </div>

                <div class="listContent marT60">
                    <div class="nowMoney">
                        当前余额 : {{topData.nowMoney||0}}
                    </div>
                    <el-tabs v-model="activeName" type="card" class="tabCard"  @tab-click="readyAjax">
                        <el-tab-pane label="充值记录" name="chargeRecord">
                            <el-table
                                    border
                                    class="cardTable marT20"
                                    ref="multipleTable"
                                    :data="chargeData"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        prop="createTime"
                                        show-overflow-tooltip
                                        label="时间">
                                </el-table-column>
                                <el-table-column
                                        prop="partnerName"
                                        show-overflow-tooltip
                                        label="金主">
                                </el-table-column>
                                <el-table-column
                                        prop="payMoney"
                                        label="充值金额"
                                        show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                            <!--<div class="block pagiWrap" style="margin-top: 20px">-->
                                <!--<el-pagination-->
                                        <!--@size-change="handleSizeChange"-->
                                        <!--@current-change="handleCurrentChange"-->
                                        <!--:current-page="currentPage"-->
                                        <!--:page-sizes="[10, 20, 30, 50]"-->
                                        <!--:page-size="pageSize"-->
                                        <!--layout="total, sizes, prev, pager, next, jumper"-->
                                        <!--:total="total">-->
                                <!--</el-pagination>-->
                            <!--</div>-->

                        </el-tab-pane>
                        <el-tab-pane label="扣款明细" name="chargeDeduction">
                            <el-form :model="tableForm" status-icon  ref="tableForm"  class="flex-r tableMiddleForm" label-width="60px" id="tableForm">
                                <el-form-item label="日期 : ">
                                    <el-date-picker
                                            style="height: 32px;width: 100%!important;"
                                            v-model="tableForm.time"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                                <!--<el-form-item label="项目名称 : " class="fourWordTitle">-->
                                    <!--<el-select  v-model="tableForm.channelId" class="aplus-sel" @change="readyAjax"  filterable placeholder="请选择渠道商" style="width: 100%">-->
                                        <!--<el-option label="全部" value=""></el-option>-->
                                        <!--<el-option-->
                                                <!--v-for="(item,index) in channelList"-->
                                                <!--:key="index"-->
                                                <!--:label="item.name"-->
                                                <!--:value="item.id">-->
                                        <!--</el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                                <div>
                                    <el-button type="primary" icon="el-icon-search" class="reloadBtn marL10" @click="readyAjax">查询</el-button>
                                    <el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                                </div>
                            </el-form>
                            <el-table
                                    border
                                    class="cardTable marT20"
                                    ref="multipleTable"
                                    :data="recordDailyList"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                <el-table-column
                                        prop="dateTime" width="150"
                                        label="日期" :formatter="$toolkit.formatTimeTable">
                                </el-table-column>
                                <el-table-column
                                        prop="bankNumber"
                                        label="银行卡认证调用次数">
                                </el-table-column>
                                <el-table-column
                                        prop="bankUnitMoney"
                                        label="银行卡认证单价"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="faceNumber"
                                        label="人脸试别调用次数">
                                </el-table-column>
                                <el-table-column
                                        prop="faceUnitMoney"
                                        label="人脸试别单价"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="haoriNumber"
                                        label="昊日调用次数">
                                </el-table-column>
                                <el-table-column
                                        prop="haoriUnitMoney"
                                        label="昊日单价"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="notifyNumber"
                                        label="通知短信调用次数">
                                </el-table-column>
                                <el-table-column
                                        prop="haoriUnitMoney"
                                        label="通知短信单价"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="overdueSmsNumber"
                                        label="逾期短信调用次数">
                                </el-table-column>
                                <el-table-column
                                        prop="overdueSmsUnitMoney"
                                        label="逾期短信单价"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="shenyueNumber"
                                        label="神月调用次数">
                                </el-table-column>
                                <el-table-column
                                        prop="shenyueUnitMoney"
                                        label="神月单价"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="tbNumber"
                                        label="淘宝认证调用次数">
                                </el-table-column>
                                <el-table-column
                                        prop="tbUnitMoney"
                                        label="淘宝认证单价"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="tianbeiNumber"
                                        label="天贝风控调用次数">
                                </el-table-column>
                                <el-table-column
                                        prop="tianbeiUnitMoney"
                                        label="天贝认证单价"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="verificationNumber"
                                        label="验证码调用次数">
                                </el-table-column>
                                <el-table-column
                                        prop="verificationUnitMoney"
                                        label="验证码单价"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="xyNumber"
                                        label="新颜调用次数">
                                </el-table-column>
                                <el-table-column
                                        prop="xyUnitMoney"
                                        label="新颜认证单价"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="yysNumber"
                                        label="运营商调用次数">
                                </el-table-column>
                                <el-table-column
                                        prop="yysUnitMoney"
                                        label="运营商单价"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="totalInfo"
                                        label="总金额"
                                        show-overflow-tooltip >
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
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>


        </el-card>

    </div>
</template>

<script>
  import animate from "animate.css";
  export default {
    name: "channelList",
    data() {
      return {
        chargeData: [],
        activeName:"chargeRecord",
        topData:{},
        tableForm:{
          time:"",
          startTime:"",
          endTime:""
        },
        currentPage:1,
        pageSize:10,
        total:0,
        recordDailyList:[]
      };
    },
    mounted() {
      this.getChangrRecord();
      this.getThirdUseRecord()
    },
    components:{
    },
    watch:{
    },
    methods: {
      getChangrRecord(){
        this.$api.charge.getChangrRecord().then((res)=>{
          this.chargeData=res.data.list;
          this.total=res.data.total;
        })
      },
      getThirdUseRecord(){
        this.$api.charge.getThirdUseRecord().then((res)=>{
          this.topData=res.data[0];
        })
      },
      getThirdUseRecordDaily(){
        if(this.tableForm.time){
          this.tableForm.startTime=this.$toolkit.formatTime(this.tableForm.time[0].time)
          this.tableForm.endTime=this.$toolkit.formatTime(this.tableForm.time[1].time)
        }
        this.$api.charge.getThirdUseRecordDaily({
          ...this.tableForm,
          current:this.currentPage,
          size:this.pageSize
        }).then((res)=>{
          this.recordDailyList=res.data.list;
          this.total=res.data.total;
          this.recordDailyList.map((item)=>{
            item.totalInfo=item.bankNumber*item.bankUnitMoney+item.faceNumber*item.faceUnitMoney+item.haoriNumber*item.haoriUnitMoney+item.notifyNumber*item.notifyUnitMoney+item.overdueSmsNumber*item.overdueSmsUnitMoney+item.shenyueNumber*item.shenyueUnitMoney+item.tbNumber*item.tbUnitMoney+item.tianbeiNumber*item.tianbeiUnitMoney+item.verificationNumber*item.verificationUnitMoney+item.xyNumber*item.xyUnitMoney+item.yysNumber*item.yysUnitMoney
          })
        })
      },
      readyAjax(){
        if(this.activeName=="chargeRecord"){
          this.getChangrRecord()
        }else{
          this.getThirdUseRecordDaily()
        }
      },
      reset(){
        for(let i in this.tableForm){
          this.tableForm[i]=""
        }
        this.readyAjax()
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.readyAjax()
      },
      handleCurrentChange(val){
        this.currentPage=val;
        this.readyAjax()
      }
    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    .merchantCharge{
        .nowMoney{
            float: right;
            background: #f2dede;
            color: #a94442;
            font-size: 15px;
            font-weight: bold;
            border: 1px solid #ebccd1;
            padding: 5px 15px;
            border-radius: 12px;
        }
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        .staticList{
            flex-wrap:wrap;
            justify-content: flex-start;
            .staticItem{
                width: 33.3%;
                font-size: 14px;
                margin-top: 20px;
                text-align: center;
                &>div{
                    font-weight: bold;
                    color:#1f2d3d
                }
                &>span{
                    display: inline-block;
                    margin-top: 10px;
                    color:gray;
                }
            }
        }
    }
</style>
