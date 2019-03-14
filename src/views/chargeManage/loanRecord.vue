<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>放款记录</span>
            </div>

            <div class="cardBody">
                <!--<el-row type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan bigSpan" style="width: 80px!important;">还款时间</span>
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
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan bigSpan" style="width: 80px!important;">打款时间 </span>
                            <el-date-picker
                                    style="height: 32px;"
                                    v-model="tableForm.time1"
                                    class="dateChoose"
                                    type="datetimerange"
                                    :picker-options="pickerOptions"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">放款员</span>
                            <el-select  v-model="tableForm.communicationStatus"  @change="readyAjax"   class="aplus-sel" placeholder="请选择放款员" style="width: 100%">
                                <el-option
                                        v-for="(item,index) in statusList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 30px">
                    <el-col :span="7" style="padding-right: 35px!important;">
                        <div class="flex-r global-childItem">
                            <el-input placeholder="请输入姓名" v-model="tableForm.name"  class="aplus-norInp flex-r addSelSelct" >
                                <el-select v-model="type" slot="prepend" placeholder="请选择">
                                    <el-option label="还款状态" value="1"></el-option>
                                    <el-option label="用户角色" value="2"></el-option>
                                </el-select>
                                <div  slot="append">
                                    <el-select placeholder="请选择订单状态" v-model="tableForm.loan_staus"  v-if="type==1">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="待还款" :value="1"></el-option>
                                        <el-option label="逾期中" :value="2"></el-option>
                                    </el-select>
                                    <el-select placeholder="请选择用户角色"  v-model="tableForm.is_old"    v-else>
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="新用户" :value="1"></el-option>
                                        <el-option label="老用户" :value="2"></el-option>
                                    </el-select>
                                </div>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="7" style="padding-right: 35px">
                        <div class="flex-r global-childItem">
                            <span  class="smallSpan bigSpan" style="width: 80px!important;padding-left: 12px">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名  </span>
                            <el-input placeholder="请输入姓名/号码/渠道" v-model="tableForm.parameter"  class="aplus-norInp" style="margin-left: 3px">
                                <el-button slot="append" icon="el-icon-search" @click="readyAjax"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                    <el-button type="default" icon="el-icon-refresh" class="reloadBtn" @click="reset">重置</el-button>
                </el-row>-->



                 <div class="cardBodyHeader">
                    <div class="topTableForm">
                        <div class="topTableForm-item topTableForm-item-big">
                            <span>还款时间 : </span>
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
                         <div class="topTableForm-item topTableForm-item-big">
                            <span>打款时间 : </span>
                             <el-date-picker
                                    style="height: 32px;"
                                    v-model="tableForm.time1"
                                    class="dateChoose"
                                    type="datetimerange"
                                    :picker-options="pickerOptions"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                         <div class="topTableForm-item">
                        	<span>放款员 :</span>
                            <!--<el-select  v-model="tableForm.communicationStatus"  @change="readyAjax"   class="aplus-sel" placeholder="请选择放款员" style="width: 100%">-->
                                <!--<el-option-->
                                        <!--v-for="(item,index) in statusList"-->
                                        <!--:key="index"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.id">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                             <el-select v-model="tableForm.admin_name" class="aplus-sel"  filterable  placeholder="请选择用户">
                                 <!--<el-option value="" label="全部"></el-option>-->
                                 <el-option-group
                                         v-for="(group,index) in adminList"
                                         :key="index"
                                         :label="group.roleName">
                                     <el-option
                                             v-for="(item,cIndex) in group.groupAdminVOS"
                                             :key="cIndex"
                                             :label="item.adminName"
                                             :value="item.adminId">
                                     </el-option>
                                 </el-option-group>
                             </el-select>
                        </div>
                        <div class="topTableForm-item topTableForm-item-big elInpNoMarL">
                             <el-input placeholder="请输入姓名" v-model="tableForm.name"  class="aplus-norInp flex-r addSelSelct" >
                                <el-select v-model="type" slot="prepend" placeholder="请选择">
                                    <!--<el-option label="还款状态" value="1"></el-option>-->
                                    <el-option label="用户角色" value="1"></el-option>
                                </el-select>
                                <div  slot="append">
                                    <!--<el-select placeholder="请选择订单状态" v-model="tableForm.loan_staus"  v-if="type==1">-->
                                        <!--<el-option label="全部" value=""></el-option>-->
                                        <!--<el-option label="待还款" :value="1"></el-option>-->
                                        <!--<el-option label="逾期中" :value="2"></el-option>-->
                                    <!--</el-select>-->
                                    <el-select placeholder="请选择用户角色"  v-model="tableForm.is_old" >
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="新用户" :value="1"></el-option>
                                        <el-option label="老用户" :value="2"></el-option>
                                    </el-select>
                                </div>
                            </el-input>
                        </div>
                        <div class="topTableForm-item">
                        	<span>字段查询 :</span>
                            <el-input placeholder="请输入姓名/号码" v-model="tableForm.parameter"  class="aplus-norInp">
                            </el-input>
                        </div>

                        <div class="topTableForm-item-actions">
                            <el-button type="primary" icon="el-icon-search" class="reloadBtn marL10" @click="readyAjax">查询</el-button>
                      		<el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                        </div>
                    </div>
                </div>






                <div class="listContent marT60">
                    <el-tabs v-model="activeName" type="card" class="tabCard" @tab-click="reset">
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
                        <el-tab-pane label="线上放款" name="onlineLoan">
                            <el-table
                                    border
                                    class="cardTable marT20"
                                    ref="multipleTable"
                                    :data="dataList"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                <el-table-column
                                        label="会员信息">
                                    <template slot-scope="scope">
                                        {{scope.row.userName+'/'+scope.row.userPhone}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="limitDays"
                                        label="贷款期限">
                                </el-table-column>
                                <el-table-column
                                        prop="borrowMoney"
                                        label="借款金额"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="realMoney"
                                        label="打款金额"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="needPayMoney"
                                        label="应还金额"
                                        show-overflow-tooltip>
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
                                        prop="lianPayNum"
                                        label="打款流水单"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="adminName"
                                        label="放款员"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="isOld"
                                        label="用户角色"
                                        show-overflow-tooltip >
                                    <template slot-scope="scope">
                                        {{scope.row.isOld==1?'老用户':'新用户'}}
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        fixed="right"
                                        label="操作" width="200">
                                    <template slot-scope="scope">
                                        <el-button size="mini" plain class="aplus-pribtn" @click="$router.push(`/auditManage/auditInfoDetail/${scope.row.id}`)"    v-if="btnStr.indexOf('详情')>-1">详情</el-button>
                                        <!--<el-button size="mini" plain class="aplus-pribtn" @click="showTrackRecord(scope.row)"    v-if="btnStr.indexOf('跟踪记录')>-1">跟踪记录</el-button>-->
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
                        <el-tab-pane label="线下放款" name="downLoan">
                            <el-table
                                    border
                                    class="cardTable marT20"
                                    ref="multipleTable"
                                    :data="dataList"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                <el-table-column
                                        label="会员信息">
                                    <template slot-scope="scope">
                                        {{scope.row.userName+'/'+scope.row.userPhone}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="limitDays"
                                        label="贷款期限">
                                </el-table-column>
                                <el-table-column
                                        prop="borrowMoney"
                                        label="借款金额"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="realMoney"
                                        label="打款金额"
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="needPayMoney"
                                        label="应还金额"
                                        show-overflow-tooltip>
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
                                        prop="adminName"
                                        label="放款员"
                                        show-overflow-tooltip >
                                </el-table-column>
                                <el-table-column
                                        prop="isOld"
                                        label="用户角色"
                                        show-overflow-tooltip >
                                    <template slot-scope="scope">
                                        {{scope.row.isOld==1?'老用户':'新用户'}}
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        fixed="right"
                                        label="操作" width="200">
                                    <template slot-scope="scope">
                                        <el-button size="mini" plain class="aplus-pribtn" @click="$router.push(`/auditManage/auditInfoDetail/${scope.row.id}`)"   v-if="btnStr.indexOf('详情')>-1">详情</el-button>
                                        <!--<el-button size="mini" plain class="aplus-pribtn" @click="showTrackRecord(scope.row)"   v-if="btnStr.indexOf('跟踪记录')>-1">跟踪记录</el-button>-->
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
          time1:"",
          // loan_staus:"",
          limit_pay_time_start:"",
          limit_pay_time_end:"",
          give_time_start:"",
          give_time_end:"",
          parameter:"",
          is_old:""

        },
        activeName:"onlineLoan",
        type:"1",
        okOrderList:[],
        dataList:[],
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
        needPayMoneySum:0,
        borrowMoneySum:0,
        orderTotal:0,
        total:0,
        pageSize:10,
        // pageSize2:10,
        // currentPage2:1,
        currentPage:1,
        adminList:[]
      };
    },
    mounted() {
      this.getLoginRecord_adminList();
      this.readyAjax()
    },
    components:{
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
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
          this.tableForm.limit_pay_time_start=this.$toolkit.formatTime(this.tableForm.time[0]);
          this.tableForm.limit_pay_time_end=this.$toolkit.formatTime(this.tableForm.time[1]);
        }
        if(this.tableForm.time1){
          this.tableForm.give_time_start=this.$toolkit.formatTime(this.tableForm.time1[0]);
          this.tableForm.give_time_end=this.$toolkit.formatTime(this.tableForm.time1[1]);
        }
       this.getOnlineLoanList()
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
        this.getOnlineLoanList()
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getOnlineLoanList()
      },
      getOnlineLoanList(){
        this.$api.charge.getOnlineLoanList({
          ...this.tableForm,
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          type:this.activeName=='onlineLoan'?1:0
        }).then((res)=>{
          this.dataList=res.data.records;
          this.condition=res.data.condition
          this.total=res.data.total;
          this.borrowMoneySum=res.data.condition.borrowMoneySum;
          this.needPayMoneySum=res.data.condition.needPayMoneySum;
          this.orderTotal=res.data.condition.count;
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
      },
      getLoginRecord_adminList(){
        this.$api.system.getLoginRecord_adminList().then((res)=>{
          this.adminList=res.data
        }).catch((e)=>{
          this.$message.error("获取放款员失败")
        })
      },

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

    /*.addSelSelct{*/
        /*.el-select__caret{*/
            /*line-height: 20px!important;*/
        /*}*/
        /*.el-input-group__append{*/
            /*width: 100%!important;*/
            /*padding: 0;*/
            /*background: white;*/
            /*.el-select{*/
                /*width: 100%;*/
            /*}*/
        /*}*/

        /*.el-input-group__prepend{*/
            /*.el-input__suffix{*/
                /*right: 10px!important;*/
                /*!*margin-top: 5px;*!*/
            /*}*/
            /*.el-select{*/
                /*width: 100px!important;*/
                /*font-size: 13px!important;*/
            /*}*/
        /*}*/

        /*&>.el-input__inner{*/
            /*width: 0!important;*/
            /*padding: 0;*/
            /*border:none*/
        /*}*/
        /*.el-input-group__append{*/
            /*.el-select{*/
                /*margin: 0!important;*/
            /*}*/
        /*}*/
    /*}*/
</style>
