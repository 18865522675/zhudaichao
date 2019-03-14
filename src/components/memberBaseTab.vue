<template>
    <div class="memberBaseTab">
        <el-card class="box-card headBoxCard">
            <div v-if="data.length">
                <div class="headBoxCard-item" v-for="(item,index) in data" :key="index" @click="getOrderRankTip(item)">
                    <div class="flex-r" style="justify-content: space-between">
                        <div style="width: 50%"  class="flex-r">
                            <div style="width: 50%">
                                订单编号 : {{item.lianPayNum}}
                            </div>
                            <div  style="width: 50%">
                                贷款期限 : {{item.limitDays}}
                            </div>
                        </div>
                        <div style="float: right;font-weight: bold;" class="25per" :style="{color:transColor(item.orderStatus)}">
                            {{formats(item.orderStatus)}}
                        </div>
                    </div>
                    <div class="flex-r" style="flex-wrap: wrap">
                        <div  class="twofiveper">
                            借款金额 : {{item.borrowMoney}}
                        </div>
                        <div class="twofiveper">
                            应还金额 : {{item.needPayMoney}}
                        </div>
                        <div class="twofiveper">
                            打款金额 : {{item.realMoney}}
                        </div>
                        <div class="twofiveper">
                            实际打款金额 : {{item.realPayMoney}}
                        </div>
                        <div class="threeper">
                            打款时间 : {{item.giveTime}}
                        </div>
                        <div class="threeper">
                            应还款时间 : {{item.limitPayTime}}
                        </div>
                        <div class="threeper">
                            实际还款时间 : {{item.realPayTime}}
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="noOrderTip">暂无订单</div>

        </el-card>
        <el-card class="box-card bottomBoxCard marT30" v-if="data.length">
            <div class="flex-r bottomBoxCardTable-head ">
                <div>
                    订单操作
                </div>
                <div>
                    订单结果
                </div>
                <div>
                    操作时间
                </div>
                <div>
                      操作账号
                </div>
            </div>
            <div class="flex-r marT20" style="justify-content: space-around">
               <div style="width: 25%;padding-top: 5px">
                   <el-steps direction="vertical" :active="bottomData.length" style="width: 60%;margin: 0 auto;transform: translateX(20%)">
                       <el-step  v-for="(item,index) in bottomData" :key="index"  :title="item.name"></el-step>
                   </el-steps>
               </div>
                <div style="width: 75%">
                    <div  class="flex-r"  v-for="(item,index) in followData" :key="index">
                        <div class="overText followDataItem">
                            <el-tooltip class="item" effect="dark" :content="item.context" placement="top">
                                <span>{{item.context}}</span>
                            </el-tooltip>
                        </div>
                        <div class="overText followDataItem">
                            {{$toolkit.formatTime(item.createTime)}}
                        </div>
                        <div class="overText followDataItem">
                            <el-tooltip class="item" effect="dark" :content="item.context" placement="top">
                                <span>{{item.userName?item.userName:'无'}}</span>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: 'memberBaseTab',
    data () {
      return {
        headData:[{

        }],
        bottomData:[],
        followData:[]
      }
    },
    props: {
      data: {  // 必须提供字段
        required: true,
        default:[]
      },
    },
    mounted () {
      this.$nextTick(()=>{
        if(this.data.length){
          getOrderRankTip(data[0])
        }
      })
    },
    methods: {
      formats(status){
        switch(status){
          case 0:return "未提交申请";break;
          case 1:return "审核中";break;
          case 2:return "待打款";break;
          case 3:return "待还款";break;
          case 4:return "逾期中";break;
          case 5:return "逾期中";break;
          case 6:return "已还款";break;
          case 7:return "审核失败";break;
        }
      },
      transColor(status){
        switch(status){
          case 0:return "gray";break;
          case 1:return "orange";break;
          case 2:return "gray";break;
          case 3:return "orange";break;
          case 4:return "red";break;
          case 5:return "red";break;
          case 6:return "green";break;
          case 7:return "gray";break;
        }
      },
      getOrderRankTip(row){
        this.bottomData=[];
        this.$api.member.getOrderRankTip({
          orderId:row.id
        }).then((res)=>{
          this.followData=[...res.data];
          res.data.map((item)=>{
            console.log(item.type)
            this.bottomData.push({
              name:this.transTip(item.type)
            })
          })
        }).catch((res)=>{
          this.followData=[...res.data];
          res.data.map((item)=>{
            console.log(item.type)
            this.bottomData.push({
              name:this.transTip(item.type)
            })
          })
          console.log(this.followData)
        })
      },
      transTip(val){
        switch(val){
          case 4:return "风控审核";break;
          case 6:return "分配审核";break;
          case 8:return "人工审核";break;
          case 10:return "关闭";break;
          case 12:return "退回";break;
          case 14:return "分配放款";break;
          case 16:return "放款员审核(打款)";break;
          case 18:return "还款,结清";break;
          case 20:return "续期";break;
          case 22:return "分配催款";break;
          case 24:return "催款";break;
          case 40:return "审核备注";break;
          case 42:return "放款备注";break;
          case 44:return "催款备注";break;
        }
      }
    },
    created () {
    },
    destoryed () {
    }
  }
</script>

<style lang="less">
.memberBaseTab{
    .headBoxCard{
        min-height: 60px;
        max-height: 300px;
        overflow-y: auto;
    }
    .bottomBoxCard{

    }
    .bottomBoxCardTable-head{
        justify-content: space-around;
        div{
            background: #738ef7;
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
        }

    }
    .headBoxCard-item{
        padding: 20px;
        cursor: pointer;
        background: white;
        border-radius: 10px;
        &:not(:first-child){
            margin-top: 15px;
        }
        &:hover{
            background: #f6f8ff;
            box-sizing: border-box;
            border:2px solid rgba(30,144,255,0.3)
        }
         .twofiveper{
             width: 25%;
         }
        .threeper{
            width: 33%;
        }
        div{
            line-height: 40px;
        }
    }
    .noOrderTip{
        font-weight: bold;
        color: gray;
        font-size: 21px;
        text-align: center;
    }
    .overText{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .followDataItem{
        width: 33.3%;
        text-align: center;
        line-height: 40px;
    }
}
</style>
