<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>当日应还款订单</span>
            </div>
            <div class="cardBody">
                <!--<el-row type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan bigSpan" >日期</span>
                            <el-date-picker
                                    style="height: 32px;width: 100%"
                                    v-model="tableForm.limit_pay_time"
                                    class="dateChoose"
                                    type="date"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan bigSpan" style="width:120px!important;">当日订单状态</span>
                            <el-select  v-model="tableForm.status"   class="aplus-sel"    placeholder="请选择当日订单状态" style="width: 100%">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="结清" :value="0"></el-option>
                                <el-option label="逾期" :value="1"></el-option>
                                <el-option label="续期" :value="2"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="7" style="padding-right: 35px">
                        <div class="flex-r global-childItem">
                            <span  class="smallSpan bigSpan" style="width: 90px!important;">关&nbsp;&nbsp;键&nbsp;&nbsp;字 </span>
                            <el-input placeholder="请输入姓名/号码/渠道" v-model="tableForm.parameter"  class="aplus-norInp" style="margin-left: 3px">
                                <el-button slot="append" icon="el-icon-search" @click="readyAjax"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="default" icon="el-icon-refresh" class="reloadBtn" @click="reset">重置</el-button>
                    </el-col>
                </el-row>-->


				<div class="cardBodyHeader">
                    <div class="topTableForm">
                        <div class="topTableForm-item topTableForm-item-big">
                            <span>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期 : </span>
                             <el-date-picker
                                    style="height: 32px;width: 100%"
                                    class="dateChoose times fuckTime"
                                    type="date"
                                    placeholder="请选择日期"
                                    v-model="tableForm.limit_pay_time"
                                    range-separator="至"
                                   	>
                            </el-date-picker>

                        </div>
                        <div class="topTableForm-item" style="width:380px!important">
                            <span>当日订单状态 : </span>
                             <el-select  v-model="tableForm.status"   class="aplus-sel"    placeholder="请选择当日订单状态" style="width: 100%">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="结清" :value="0"></el-option>
                                <el-option label="逾期" :value="1"></el-option>
                                <el-option label="续期" :value="2"></el-option>
                            </el-select>
                        </div>
                        <div class="topTableForm-item">
                            <span>字段查询 :</span>
                            <el-input placeholder="请输入姓名/号码/渠道" v-model="tableForm.parameter"  >
                            </el-input>
                        </div>
                        <div class="topTableForm-item-actions">
                            <el-button type="primary" icon="el-icon-search" class="reloadBtn" @click="readyAjax">查询</el-button>
                            <el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                        </div>
                    </div>
                </div>


                <div class="listContent marT60">
                    <div class="flex-r" style="justify-content: flex-end">
                        <div class="flex-r" style="align-items: center">
                            <div>
                                <span class="totalInfo">总结清数量</span> : <span style="color:red">{{condition.jieqinnum}}</span>
                            </div>
                            <div style="margin-left: 30px">
                                <span class="totalInfo">总逾期数量</span> : <span style="color:red">{{condition.yuqinum}}</span>
                            </div>
                            <div style="margin-left: 30px">
                                <span class="totalInfo">总续期数量</span> : <span style="color:red">{{condition.xuqinum}}</span>
                            </div>
                        </div>
                    </div>
                    <el-table
                            border
                            class="cardTable marT20"
                            ref="multipleTable"
                            :data="shouldPayOrderList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                prop="loanPayData"
                                label="	日期"
                                width="150"
                                show-overflow-tooltip >
                            <template slot-scope="scope">
                                {{$toolkit.formatTime(scope.row.loanPayData,false)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="lianPayNum"
                                label="会员信息	" width="180">
                            <template slot-scope="scope">
                                {{scope.row.userName + '/' + scope.row.userPhone }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="limitDays"
                                label="贷款期限">
                        </el-table-column>
                        <el-table-column
                                prop="borrowMoney"
                                label="借款金额"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                prop="realMoney"
                                label="打款金额	"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="needPayMoney"
                                label="	应还金额"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="isOld"
                                label="用户角色"
                                show-overflow-tooltip >
                            <template slot-scope="scope">
                                {{scope.row.isOld==0?'新用户':'老用户'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="orderStatus"
                                label="订单状态"
                                show-overflow-tooltip :formatter="formats" >
                        </el-table-column>
                        <el-table-column
                                prop="realPayMoney"
                                label="实际还款金额"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="	当日订单类型"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                {{scope.row.status==0?'结清':scope.row.status==1?'逾期':'续期'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="giveTime"
                                label="打款时间"
                                show-overflow-tooltip :formatter="$toolkit.formatTimeTable">
                        </el-table-column>
                        <el-table-column
                                prop="limitPayTime"
                                label="	订单应还款时间"
                                width="150"
                                show-overflow-tooltip  :formatter="$toolkit.formatTimeTable">
                        </el-table-column>
                        <el-table-column
                                prop="realPayTime"
                                label="	实际还款时间"
                                width="150"
                                show-overflow-tooltip  :formatter="$toolkit.formatTimeTable">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作" width="230">
                            <template slot-scope="scope">
                                <el-button size="mini" plain class="aplus-pribtn"   v-if="btnStr.indexOf('查看认证信息')>-1"   @click="$router.push(`/userInfoDetail/${scope.row.userId}/${scope.row.id}/${scope.row.userName}/${scope.row.userPhone}`)" >查看认证信息</el-button>
                                <el-button size="mini" plain class="aplus-infoBtn" @click="$router.push(`/auditManage/auditInfoDetail/${scope.row.orderId}`)"   v-if="btnStr.indexOf('详情')>-1">详情</el-button>
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
                </div>
            </div>

        </el-card>

    </div>
</template>

<script>
  import animate from "animate.css";
  import { mapState } from 'vuex';
  export default {
    name: "channelList",
    data() {
      return {
        tableForm:{
          parameter:"",
          limit_pay_time:"",
          status:""

        },
        type:"1",
        shouldPayOrderList:[],
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
      };
    },
    mounted() {
      this.readyAjax()
    },
    components:{
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    watch:{
      "tableForm.parameter":function(n){
        if(!n){
          this.readyAjax()
        }
      },
    },
    methods: {
      readyAjax(){
        this.currentPage=1;
        this.pageSize=10;

        this.getOkOrdersList()
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
        this.getOkOrdersList()
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getOkOrdersList()
      },
      getOkOrdersList(){
        if(this.tableForm.limit_pay_time){
          this.tableForm.limit_pay_time=this.$toolkit.formatTime(this.tableForm.limit_pay_time,false);
        }
        this.$api.order.getTodayShouldPayList({
          ...this.tableForm,
          pageNum:this.currentPage,
          pageSize:this.pageSize
        }).then((res)=>{
          this.shouldPayOrderList=res.data.records;
          this.condition=res.data.condition
          this.total=res.data.total
        })
      },
      formats(row,col){
        if(col.property=='pay_status'){
          switch (row.pay_status) {
            case 1:return '正常还款';
            case 2:return '逾期还款';
            default:return ""
          }
        }

        if(col.property=='is_old'){
          switch (row.is_old) {
            case 1:return '新用户';
            case 0:return '老用户';
            default:return ""
          }
        }
        if(col.property=='orderStatus'){
          switch (row.orderStatus) {
            // case 1:return '未申请';
            case 0:return '审核中';
            // case 2:return '待打款';
            case 3:return '待还款';
            case 4:return '容限期中';
            case 5:return '已超出容限期';
            case 6:return '已还款';
            // case 4:return '待还款';
            // case 5:return '待还款';

            default:return ""
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
    /*.headerTitle{*/
    /*font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/
    /*padding-bottom: 20px;*/
    /*font-weight: bold;*/
    /*font-size: 14px;*/
    /*}*/
    /*.otherConfig{*/
    /*.global-childItem{*/
    /*&>span:not(.smallSpan){*/
    /*text-align: center;*/
    /*}*/
    /*span+*{*/
    /*flex: 1!important;*/
    /*}*/
    /*}*/
    /*}*/
    /*.totalInfo{*/
    /*font-weight: bold;*/
    /*font-size: 14px;*/
    /*}*/
    .dateChoose{
        .el-input__inner{
            height: 32px;
        }
    }
    .times{
        .el-input__inner{
            text-indent: 4em!important;
        }
    }
    .fuckTime{
        .el-input__icon{
            line-height: 32px!important;
        }
    }
</style>
