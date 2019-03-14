<template>
    <div>
        <el-card class="box-card affilateWrap taobaoInfoWrap">
            <div class="circleWrap">
                <label class="detailLabel">基本信息</label>
                <el-row>
                    <el-col :span="4">
                        用户名
                    </el-col>
                    <el-col :span="4">
                        {{baseInfo.user_name}}
                    </el-col>
                    <el-col :span="4">
                        用户级别
                    </el-col>
                    <el-col :span="4">
                        {{baseInfo.user_level}}
                    </el-col>
                    <el-col :span="4">
                        昵称
                    </el-col>
                    <el-col :span="4">
                        {{baseInfo.nick_name}}
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="4">
                        真实姓名
                    </el-col>
                    <el-col :span="4">
                        {{baseInfo.name}}
                    </el-col>
                    <el-col :span="4">
                        性别
                    </el-col>
                    <el-col :span="4">
                        {{baseInfo.gender}}
                    </el-col>
                    <el-col :span="4">
                        绑定手机号
                    </el-col>
                    <el-col :span="4">
                        {{baseInfo.mobile}}
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="4">
                        实名认证姓名
                    </el-col>
                    <el-col :span="4">
                        {{baseInfo.real_name}}
                    </el-col>
                    <el-col :span="4">
                        实名认证身份证
                    </el-col>
                    <el-col :span="4">
                        {{baseInfo.identity_code}}
                    </el-col>
                    <el-col :span="4">
                        邮箱
                    </el-col>
                    <el-col :span="4">
                        {{baseInfo.email}}
                    </el-col>
                </el-row>
            </div>


            <div class="circleWrap marT60">
                <label class="detailLabel">账户信息</label>
                <el-row>
                    <el-col :span="4">
                        账户余额(元)
                    </el-col>
                    <el-col :span="4">
                        {{accountInfo.account_balance?accountInfo.account_balance:'未知'}}
                    </el-col>
                    <el-col :span="4">
                        金融账户余额(元)
                    </el-col>
                    <el-col :span="4">
                        {{accountInfo.financial_account_balance?accountInfo.financial_account_balance:'未知'}}
                    </el-col>
                    <el-col :span="4">
                        芝麻信用分
                    </el-col>
                    <el-col :span="4">
                        {{accountInfo.zhima_point}}
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="4">
                        花呗额度(元)
                    </el-col>
                    <el-col :span="4">
                        {{accountInfo.credit_quota / 100}}
                    </el-col>
                    <el-col :span="4">
                        花呗消费额度(元)
                    </el-col>
                    <el-col :span="4">
                        {{accountInfo.consume_quota / 100}}
                    </el-col>
                    <el-col :span="4">
                        借呗额度(元)
                    </el-col>
                    <el-col :span="4">
                        {{accountInfo.jiebei_quota / 100}}
                    </el-col>
                </el-row>
            </div>

            <div class="circleWrap marT60">
                <label class="detailLabel">收货地址</label>
                <el-table class="aplus-center-table marT20" border    center style="width: 100%" :data="receiveTable">
                    <el-table-column
                            prop="name"  :show-overflow-tooltip="true"
                            label="收货人">
                    </el-table-column>
                    <el-table-column
                            prop="area" :show-overflow-tooltip="true"
                            label="地区">
                    </el-table-column>
                    <el-table-column
                            prop="address"  :show-overflow-tooltip="true"
                            label="短信内容" width="600">
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="手机号">
                    </el-table-column>
                </el-table>
            </div>


            <div class="circleWrap marT60">
                <label class="detailLabel">订单信息</label>
                <el-table class="aplus-center-table marT20" border resizable    center style="width: 100%" :data="orderTable">
                    <el-table-column
                            prop="order_id"  :show-overflow-tooltip="true"
                            label="订单号">
                    </el-table-column>
                    <el-table-column
                            prop="receiverPhone" :show-overflow-tooltip="true"
                            label="商品名称" width="400">
                        <template slot-scope="scope">
                            {{scope.row.productList.join("/")}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="content"  :show-overflow-tooltip="true"
                            label="商品单价" width="100">
                        <template slot-scope="scope">
                            {{scope.row.priceList.join("/")}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="sendTime" :show-overflow-tooltip="true"
                            label="商品数量" width="100">
                        <template slot-scope="scope">
                            {{scope.row.amountList.join("/")}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="sendTime" :show-overflow-tooltip="true"
                            label="订单金额">
                        <template slot-scope="scope">
                            {{scope.row.order_amount / 100}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="order_type" :show-overflow-tooltip="true"
                            label="订单类型 ">
                    </el-table-column>
                    <el-table-column
                            prop="order_status" :show-overflow-tooltip="true"
                            label="订单状态 ">
                    </el-table-column>
                    <el-table-column
                            prop="order_time"  :show-overflow-tooltip="true"
                            label="订单时间 ">
                    </el-table-column>
                </el-table>
            </div>




        </el-card>
    </div>
</template>

<script>
  export default {
    name: 'singleTaobaoInfo',
    data () {
      return {
        receiveTable:[],
        orderTable:[],
        baseInfo:{},
        accountInfo:{}
      }
    },
    props:["res"],
    mounted () {
      this.getTaobaoDetail()
    },
    watch:{
        "res":function(res){
          this.baseInfo=res.data.data.task_data.base_info;
          this.accountInfo=res.data.data.task_data.account_info;
          this.receiveTable=res.data.data.task_data.receiver_list;
          this.orderTable=res.data.data.task_data.order_list;
          this.orderTable.map((item)=>{
            item.productList=[];
            item.priceList=[];
            item.amountList=[];
            item.product_list.map((cItem)=>{
              item.productList.push(cItem.product_name);
              item.priceList.push(cItem.product_price/100);
              item.amountList.push(cItem.product_amount);
            })
          })
        }
    },
    methods: {
      getTaobaoDetail(){
        this.$api.detail.getTaobaoDetail({
          userId:this.$route.params.userId
        }).then((res)=>{
            this.baseInfo=res.data.data.task_data.base_info;
            this.accountInfo=res.data.data.task_data.account_info;
            this.receiveTable=res.data.data.task_data.receiver_list;
            this.orderTable=res.data.data.task_data.order_list;
            this.orderTable.map((item)=>{
              item.productList=[];
              item.priceList=[];
              item.amountList=[];
              item.product_list.map((cItem)=>{
                item.productList.push(cItem.product_name);
                item.priceList.push(cItem.product_price/100);
                item.amountList.push(cItem.product_amount);
              })
            })
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
