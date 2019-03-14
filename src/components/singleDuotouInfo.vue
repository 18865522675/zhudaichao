<template>
    <div>
        <el-card class="box-card affilateWrap taobaoInfoWrap">
            <div class="circleWrap">
                <label class="detailLabel">行为雷达 <span class="introDuce" @click="dialogVisible=true">名词解释</span></label>
                <div class="flex-r" style="justify-content: space-between">
                    <div style="width: 48%;">
                        <el-table class="aplus-center-table marT20" border resizable    center style="width: 100%" :data="table1">
                            <el-table-column
                                    prop="name" :show-overflow-tooltip="true"
                                    label="评估项目">
                            </el-table-column>
                            <el-table-column
                                    prop="value"  :show-overflow-tooltip="true"
                                    label="评估结果">
                                <template slot-scope="scope">
                                    {{scope.row.value?scoep.row.value:'无记录'}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div  style="width: 48%;">
                        <el-table class="aplus-center-table marT20" border resizable    center style="width: 100%" :data="table2">
                            <el-table-column
                                    prop="name" :show-overflow-tooltip="true"
                                    label="评估项目">
                            </el-table-column>
                            <el-table-column
                                    prop="value"  :show-overflow-tooltip="true"
                                    label="评估结果" >
                                <template slot-scope="scope">
                                    {{scope.row.value?scoep.row.value:'无记录'}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

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
    name: 'singleDuotouInfo',
    data () {
      return {
        table1:[],
        table2:[],
        dialogVisible:false
      }
    },
    mounted () {
      this.getDuotouInfo()
    },
    methods: {
      getDuotouInfo(){
        this.$api.detail.getDuotouInfo({
          userId:this.$route.params.userId
        }).then((res)=>{
            // 左侧表格
            let arr1=["贷款行为分","贷款行为置信度","贷款放款总订单数","贷款已结清订单数","贷款逾期订单数（M0+）","贷款机构数","消费金融类机构数","网络贷款类机构数","近1个月贷款笔数"];
            let arr2=["loansScore","loansCredibility","loansCount","loansSettleCount","loansOverdueCount","loansOrgCount","consfinOrgCount","loansCashCount","latestOneMonth"];
            for(let i=0;i<9;i++){
                let obj={
                  name:arr1[i],
                  value:res.data[arr2[i]]
                };
                this.table1.push(obj)
            }

            // 右侧表格
          let arr3=["近3个月贷款笔数","近6个月贷款笔数","最近一次贷款时间","信用贷款时长","历史贷款机构成功扣款笔数","历史贷款机构失败扣款笔数","近1个月贷款机构成功扣款笔数","近1个月贷款机构失败扣款笔数"];
          let arr4=["latestThreeMonth","latestSixMonth","loansLatestTime","loansLongTime","historySucFee","historyFailFee","latestOneMonthSuc","latestOneMonthFail"];
          for(let i=0;i<8;i++){
            let obj={
              name:arr3[i],
              value:res.data[arr4[i]]
            };
            this.table2.push(obj)
          }

        })
      }
    },
    created () {
    },
    destoryed () {
    }
  }
</script>

<style scoped lang="less">
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
    .taobaoInfoWrap{
        .el-row{
            line-height: 40px;
            font-size: 13px;
            .el-col:nth-child(odd){
                font-weight: bold;
            }
            border-bottom: 1px solid #e7eaec
        }
    }
</style>
