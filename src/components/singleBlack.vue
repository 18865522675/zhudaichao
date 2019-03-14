<template>
    <div>
        <el-card class="box-card affilateWrap taobaoInfoWrap">
            <div class="circleWrap">
                <label class="detailLabel">查询分布 <span class="introDuce" @click="dialogVisible=true">名词解释</span></label>
                <div>
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="marT20">
                        <el-tab-pane label="网贷黑名单查询" name="black">
                            <span class="titleBox">
                                网贷黑名单
                            </span>
                            <div class="blackTip">
                                {{isBlack}}
                            </div>
                        </el-tab-pane>


                        <el-tab-pane label="借条负债查询" name="jietiao">
                            <span class="titleBox">
                                借贷宝平台
                            </span>
                            <el-table
                                    :data="blackTable"
                                    border
                                    v-loading="loading"
                                    element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading"
                                    class="aplus-center-table"
                                    style="width:100%">
                                <el-table-column
                                        prop="isHighRiskUser"
                                        label="是否是高风险用户" >
                                </el-table-column>
                                <el-table-column
                                        prop="lastVisitDt"
                                        :show-overflow-tooltip="true"
                                        label="最近一次访问日期"  :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="overdueCntOver30d"
                                        label="30天以上逾期次数"  :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="hisOverdueAmt"
                                        label="历史逾期金额" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="lastOverdueDt"
                                        label="最近一次逾期时间" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="lastOverdueAmt"
                                        label="最近一次逾期金额" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="currOverdueAmt"
                                        label="当前逾期金额" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="currOverdueDays"
                                        label="当前逾期最大天数" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="firstOverdueDt"
                                        label="首次逾期时间" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="firstOverdueAmt"
                                        label="首次逾期金额" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="lastRepayTm"
                                        label="最近一次还款时间" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="repayTimes"
                                        label="总还款次数" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="currDebtProductCnt"
                                        label="正在进行的贷款笔数" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="totalInOrderCnt"
                                        label="历史贷款笔数	" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="totalInOrderAmt"
                                        label="历史总借款金额" :formatter="$toolkit.transNull">
                                </el-table-column>
                            </el-table>


                            <span class="titleBox marT60">
                                无忧借条平台
                            </span>
                            <el-table
                                    :data="wuyouTable"
                                    border
                                    v-loading="loading"
                                    element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading"
                                    class="aplus-center-table"
                                    style="width:100%">
                                <el-table-column
                                        prop="creditRecord" :show-overflow-tooltip="true" width="600"
                                        label="信用记录" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        :show-overflow-tooltip="true"
                                        label="姓名"  :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="idNumber"
                                        label="身份证"  :formatter="$toolkit.transNull">
                                </el-table-column>
                            </el-table>


                            <span class="titleBox marT60">
                                今借到平台
                            </span>
                            <el-table
                                    :data="jinjiedaoTable"
                                    border
                                    v-loading="loading"
                                    element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading"
                                    class="aplus-center-table"
                                    style="width:100%">
                                <el-table-column
                                        prop="nCurrentOverdueAmt"
                                        label="当前逾期金额" :formatter="$toolkit.transNullTable">
                                </el-table-column>
                                <el-table-column
                                        prop="nToOverdueMaxAmt"
                                        :show-overflow-tooltip="true"
                                        label="最大逾期金额"  :formatter="$toolkit.transNullTable">
                                </el-table-column>
                                <el-table-column
                                        prop="nOverdue7daysAmt"
                                        label="7天逾期金额"  :formatter="$toolkit.transNullTable">
                                </el-table-column>
                                <el-table-column
                                        prop="nOverdue7daysCnt"
                                        label="7天逾期次数" :formatter="$toolkit.transNullTable">
                                </el-table-column>
                                <el-table-column
                                        prop="nOverdue30daysAmt"
                                        label="30天逾期金额" :formatter="$toolkit.transNullTable">
                                </el-table-column>
                                <el-table-column
                                        prop="nOverdue30daysCnt"
                                        label="30天逾期次数" :formatter="$toolkit.transNullTable">
                                </el-table-column>
                                <el-table-column
                                        prop="nBorrowPeopleNum"
                                        label="累计借入人数" :formatter="$toolkit.transNullTable">
                                </el-table-column>
                                <el-table-column
                                        prop="nLendCnt"
                                        label="累计借入笔数" :formatter="$toolkit.transNullTable">
                                </el-table-column>
                            </el-table>


                        </el-tab-pane>

                        <el-tab-pane label="米房逾期查询" name="mifang">
                            <div v-if="mifangInfo.list">
                                <div v-if="!mifangInfo.total" class="noMifang">
                                    {{mifangInfo.hit}}
                                </div>
                                <el-table
                                        v-else
                                        :data="mifangInfo.list"
                                        border
                                        v-loading="loading"
                                        element-loading-text="拼命加载中"
                                        element-loading-spinner="el-icon-loading"
                                        class="aplus-center-table"
                                        style="width:100%">
                                    <el-table-column
                                            prop="stateStr"
                                            label="信用记录" :formatter="$toolkit.transNull">
                                    </el-table-column>
                                    <el-table-column
                                            prop="detail"
                                            :show-overflow-tooltip="true"
                                            label="信用记录详情"  :formatter="$toolkit.transNull">
                                    </el-table-column>
                                    <el-table-column
                                            prop="returnDate"
                                            label="应还日期"  :formatter="$toolkit.transNull">
                                    </el-table-column>
                                    <el-table-column
                                            prop="money"
                                            label="逾期金额（元）" :formatter="$toolkit.transNull">
                                    </el-table-column>
                                    <el-table-column
                                            prop="days"
                                            label="逾期天数" :formatter="$toolkit.transNull">
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div v-else class="noMifang">
                                用户不存在
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>


            <el-dialog
                    title="名词解释"
                    :visible.sync="dialogVisible"
                    width="800px">
                <div>
                    <img src="../assets/img/xingwei.jpg" alt="" style="width: 100%">
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">关 闭</el-button>
                  </span>
            </el-dialog>


        </el-card>
    </div>
</template>

<script>
  export default {
    name: 'singleBlack',
    data () {
      return {
        dialogVisible:false,
        activeName:"black",
        isBlack:"未知",
        blackTable:[],
        wuyouTable:[],
        jinjiedaoTable:[],
        mifangInfo:{

        }
      }
    },
    mounted () {
      this.getJieTiaoInfo();
      this.getMifangInfo()
    },
    methods: {
      getJieTiaoInfo(){
        this.$api.detail.getJieTiaoInfo({
          userId:this.$route.params.userId
        }).then((res)=>{
            this.isBlack=res.data.isNetLoanBlack;
            this.blackTable.push({
              isHighRiskUser:res.data.isHighRiskUser,
              lastVisitDt:res.data.lastVisitDt,
              overdueCntOver30d:res.data.overdueCntOver30d,
              hisOverdueAmt:res.data.hisOverdueAmt,
              lastOverdueDt:res.data.lastOverdueDt,
              lastOverdueAmt:res.data.lastOverdueAmt,
              currOverdueAmt:res.data.currOverdueAmt,
              currOverdueDays:res.data.currOverdueDays,
              firstOverdueDt:res.data.firstOverdueDt,
              firstOverdueAmt:res.data.firstOverdueAmt,
              lastRepayTm:res.data.lastRepayTm,
              repayTimes:res.data.repayTimes,
              currDebtProductCnt:res.data.currDebtProductCnt,
              totalInOrderCnt:res.data.totalInOrderCnt,
              totalInOrderAmt:res.data.totalInOrderAmt,
            })

          this.wuyouTable.push({
            creditRecord:res.data.creditRecord,
            name:res.data.name,
            idNumber:res.data.idNumber,
          })

          this.jinjiedaoTable.push({
            nCurrentOverdueAmt:res.data.nCurrentOverdueAmt,
            nToOverdueMaxAmt:res.data.nToOverdueMaxAmt,
            nOverdue7daysAmt:res.data.nOverdue7daysAmt,
            nOverdue7daysCnt:res.data.nOverdue7daysCnt,
            nOverdue30daysAmt:res.data.nOverdue30daysAmt,
            nOverdue30daysCnt:res.data.nOverdue30daysCnt,
            nBorrowPeopleNum:res.data.nBorrowPeopleNum,
            nLendCnt:res.data.nLendCnt,
          })
        })
      },
      getMifangInfo(){
        this.$api.detail.getMifangInfo().then((res)=>{
          this.mifangInfo=res.data;
        })
      }
    },
    created () {
    },
    destoryed () {
    }
  }
</script>

<style lang="less">
    .circleWrap{
        background: white;
        border-radius: 20px;
        padding: 20px;
    }
    .detailLabel{
        font-weight: bold;
    }
    .introDuce{
        color:red;
        font-weight:normal;
        font-size: 12px;
        cursor: pointer;
    }
    .aplus-center-table{
        .el-table__header{
            th{
                background: rgba(64,158,255,0.6);
                color:white;
            }
            .cell{
                text-align: center;
                font-size: 12px;
            }
        }
        .el-table__body{
            .cell{
                text-align: center;
                font-size: 13px;
            }
        }
    }
    .titleBox{
        padding: 5px 10px;
        background:rgba(0,0,0,0.4) ;
        color: white;
        font-size: 12px ;
        display: inline-block;
        border-radius: 10px;
    }
    .blackTip{
        padding-left: 20px;
        line-height: 40px;
        font-weight: bold;
    }
    .noMifang{
        font-size: 20px;
        text-align: center;
        font-weight: bold;
        line-height: 40px;
    }
</style>
