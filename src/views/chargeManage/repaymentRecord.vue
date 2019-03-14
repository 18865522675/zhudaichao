<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>还款记录</span>
            </div>

            <div class="cardBody">
                <!--<el-row type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan bigSpan" style="width: 80px!important;">实际还款时间</span>
                            <el-date-picker
                                    style="height: 32px;"
                                    v-model="tableForm.time"
                                    :picker-options="pickerOptions"
                                    class="dateChoose"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </el-col>

                    <el-col :span="7" style="padding-right: 35px!important;">
                        <div class="flex-r global-childItem">
                            <el-input placeholder="请输入姓名"   class="aplus-norInp flex-r addSelSelct" >
                                <el-select v-model="type" slot="prepend" placeholder="请选择">
                                    <el-option label="订单状态" value="1"></el-option>
                                    <el-option label="还款类型" value="2"></el-option>
                                </el-select>
                                <div  slot="append">
                                    <el-select placeholder="请选择还款状态" v-model="tableForm.order_status"  v-if="type==1">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option  v-for="(item,index) in orderStatus" :key="index" :label="item.name" :value="item.id"></el-option>

                                    </el-select>
                                    <el-select placeholder="请选择还款类型"  v-model="tableForm.pay_type"    v-else>
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="结清" value="PAY"></el-option>
                                        <el-option label="续期" value="EXTENSION"></el-option>
                                    </el-select>
                                </div>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col span="7">
                        <el-button type="primary" icon="el-icon-search" class="reloadBtn marL10" @click="readyAjax">查询</el-button>
                        <el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                    </el-col>
                </el-row>-->


                <div class="cardBodyHeader">
                    <div class="topTableForm">
                        <div class="topTableForm-item topTableForm-item-big">
                            <span>实际还款时间 : </span>
                             <el-date-picker
                                    style="height: 32px;width:330px!important"
                                    v-model="tableForm.time"
                                    :picker-options="pickerOptions"
                                    class="dateChoose"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div class="topTableForm-item topTableForm-item-big elInpNoMarL">
                             <el-input placeholder="请输入姓名"   class="aplus-norInp flex-r addSelSelct" >
                                <el-select v-model="type" slot="prepend" placeholder="请选择">
                                    <!--<el-option label="订单状态" value="1"></el-option>-->
                                    <el-option label="还款类型" value="1"></el-option>
                                </el-select>
                                <div  slot="append">
                                    <!--<el-select placeholder="请选择还款状态" v-model="tableForm.order_status"  v-if="type==1">-->
                                        <!--<el-option label="全部" value=""></el-option>-->
                                        <!--<el-option  v-for="(item,index) in orderStatus" :key="index" :label="item.name" :value="item.id"></el-option>-->

                                    <!--</el-select>-->
                                    <el-select placeholder="请选择还款类型"  v-model="tableForm.pay_type"   >
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="结清" value="PAY"></el-option>
                                        <el-option label="续期" value="EXTENSION"></el-option>
                                    </el-select>
                                </div>
                            </el-input>
                        </div>

                        <div class="topTableForm-item-actions">
                            <el-button type="primary" icon="el-icon-search" class="reloadBtn marL10" @click="readyAjax">查询</el-button>
                      		<el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                        </div>
                    </div>
                </div>



                <div class="listContent marT60">
                    <el-tabs v-model="activeName" type="card" class="tabCard" @tab-click="readyAjax">
                        <div class="flex-r" style="align-items: center;justify-content: flex-end">
                            <div>
                                <span class="totalInfo">总借款金额</span> : <span style="color:red">{{needPayMoneySum}}</span>
                            </div>
                            <div class="marL10">
                                <span class="totalInfo">总借款本金</span> : <span style="color:red">{{borrowMoneySum}}</span>
                            </div>
                            <div class="marL10">
                                <span class="totalInfo">订单总数</span> : <span style="color:red">{{orderTotal}}</span>
                            </div>
                        </div>
                        <el-tab-pane label="线上还款" name="onlineLoan">
                            <el-table
                                    border
                                    class="cardTable marT20"
                                    ref="multipleTable"
                                    :data="onlineList"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                <el-table-column
                                        prop="orderId"
                                        label="订单ID">
                                </el-table-column>
                                <el-table-column
                                        label="会员信息">
                                    <template slot-scope="scope">
                                        {{scope.row.userName+'/'+scope.row.userPhone}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="needPayMoney"
                                        label="订单应还金额">
                                </el-table-column>
                                <el-table-column
                                        prop="amt"
                                        label="本次还款金额"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="mchntOrderId"
                                        label="还款流水号"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="orderStatus"
                                        label="订单状态"
                                        show-overflow-tooltip :formatter="formats">
                                </el-table-column>
                                <el-table-column
                                        prop="payType"
                                        label="还款类型"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        {{scope.row.payType=="PAY"?'结清':'续期'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="giveTime"
                                        label="打款时间"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="limitPayTime"
                                        label="应还款时间"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="realPayTime"
                                        label="实际还款时间"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="updateTime"
                                        label="用户角色"
                                        show-overflow-tooltip >
                                    <template slot-scope="scope">
                                        {{scope.row.isOld==1?'新用户':'老用户'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作" width="200">
                                    <template slot-scope="scope">
                                        <!--@click="showTrackRecord(scope.row)"-->
                                        <el-button size="mini" plain class="aplus-pribtn" @click="$router.push(`/auditManage/auditInfoDetail/${scope.row.orderId}`)"   v-if="btnStr.indexOf('详情')>-1">详情</el-button>
                                        <!--<el-button size="mini" plain class="aplus-pribtn"    @click="$router.push(`/userInfoDetail/${scope.row.userId}/${scope.row.id}/${scope.row.userName}/${scope.row.userPhone}`)"  v-if="btnStr.indexOf('查看认证信息')>-1">查看认证信息</el-button>-->
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

                        </el-tab-pane>
                        <el-tab-pane label="线下还款" name="downLoan">
                            <el-table
                                    border
                                    class="cardTable marT20"
                                    ref="multipleTable"
                                    :data="underlineList"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                <el-table-column
                                        prop="orderId"
                                        label="订单ID">
                                </el-table-column>
                                <el-table-column
                                        label="会员信息">
                                    <template slot-scope="scope">
                                        {{scope.row.userName+'/'+scope.row.userPhone}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="needPayMoney"
                                        label="订单应还金额">
                                </el-table-column>
                                <el-table-column
                                        prop="amt"
                                        label="本次还款金额"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <!--<el-table-column-->
                                        <!--prop="mchnt_order_id"-->
                                        <!--label="还款流水号"-->
                                        <!--show-overflow-tooltip>-->
                                <!--</el-table-column>-->
                                <el-table-column
                                        prop="payType"
                                        label="还款类型"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        {{scope.row.payType=="PAY"?'结清':'续期'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="orderStatus"
                                        label="订单状态"
                                        show-overflow-tooltip :formatter="formats">
                                </el-table-column>
                                <el-table-column
                                        prop="giveTime"
                                        label="打款时间"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="limitPayTime"
                                        label="应还款时间"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="realPayTime"
                                        label="还款时间"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="updateTime"
                                        label="用户角色"
                                        show-overflow-tooltip >
                                    <template slot-scope="scope">
                                        {{scope.row.isOld==1?'新用户':'老用户'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作" width="200">
                                    <template slot-scope="scope">
                                        <el-button size="mini" plain class="aplus-pribtn" @click="$router.push(`/auditManage/auditInfoDetail/${scope.row.orderId}`)"   v-if="btnStr.indexOf('详情')>-1">详情</el-button>
                                        <!--<el-button size="mini" plain class="aplus-pribtn"  @click="$router.push(`/userInfoDetail/${scope.row.userId}/${scope.row.id}/${scope.row.userName}/${scope.row.userPhone}`)"   v-if="btnStr.indexOf('查看认证信息')>-1" >查看认证信息</el-button>-->
                                        <!--@click="showTrackRecord(scope.row)"-->
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
                        </el-tab-pane>
                    </el-tabs>
                </div>


            </div>

        </el-card>

    </div>
</template>

<script>
  import animate from "animate.css";
  import { mapState } from 'vuex'
  export default {
    name: "channelList",
    data() {
      return {
        tableForm:{
          time:"",
          // time1:"",
          // limit_pay_time_start:"",
          // limit_pay_time_end:"",
          real_pay_time_start:"",
          real_pay_time_end:"",
          pay_type:"",
          order_status:""

        },
        activeName:"onlineLoan",
        type:"1",
        onlineList:[],
        underlineList:[],
        condition:{},
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        orderStatus:[{
          name:"待还款",
          id:3
        },{
          name:"容限期中",
          id:4
        },{
          name:"已超出容限期",
          id:5
        },{
          name:"已还款",
          id:6
        },{
          name:"坏账",
          id:8
        }],
        needPayMoneySum:0,
        borrowMoneySum:0,
        orderTotal:0,
      };
    },
    mounted() {
      this.readyAjax()
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    components:{
    },
    watch:{
      "tableForm.phone":function(n){
        if(!n){
          this.readyAjax()
        }
      },
      "tableForm.name":function(n){
        if(!n){
          this.readyAjax()
        }
      }
    },
    methods: {
      readyAjax(){
        this.currentPage=1;
        this.pageSize=10;
        if(this.tableForm.time){
          this.tableForm.real_pay_time_start=this.$toolkit.formatTime(this.tableForm.time[0]);
          this.tableForm.real_pay_time_end=this.$toolkit.formatTime(this.tableForm.time[1]);
        }
        this.getDataList()
      },
      reset(){
        for(let i in this.tableForm){
          if(i!="status"){
            this.tableForm[i]=""
          }
        }
        this.readyAjax()
      },
      handleCurrentChange(val){
        this.currentPage=val;
        this.getDataList()
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getDataList()
      },
      getDataList(){
        let params={
          ...this.tableForm,
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          type:this.activeName=="onlineLoan"?1:2
        }
        this.$api.charge.getOnlineReplaymentList(params).then((res)=>{
          if(this.activeName=="onlineLoan"){
            this.onlineList=res.data.records
          }else{
            this.underlineList=res.data.records
          }
          this.borrowMoneySum=res.data.condition.borrowMoneySum;
            this.needPayMoneySum=res.data.condition.needPayMoneySum;
            this.orderTotal=res.data.condition.count;
          // this.okOrderList=res.data.records;
          this.condition=res.data.condition
          this.total=res.data.total
        })
      },
      formats(row,col){
        if(col.property=='payStatus'){
          switch (row.payStatus) {
            case 1:return '正常还款';
            case 2:return '逾期还款';
            default:return ""
          }
        }

        if(col.property=='isOld'){
          switch (row.isOld) {
            case 1:return '新用户';
            case 0:return '老用户';
            default:return ""
          }
        }

        if(col.property=='orderStatus'){
          switch(row.orderStatus){
            case 3:return '待还款';
            case 4:return "容限期中";
            case 5:return '已超出容限期';
            case 6:return "已还款";
            case 8:return "坏账";
            default:return "未知"
          }
        }
      }

    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    @import url('../../assets/css/commonTable.less');
    @import url('../../assets/css/withAddSelSelect.less');
</style>
