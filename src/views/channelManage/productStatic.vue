<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix cardTitle">
                <span>产品数据</span>
            </div>
            <div class="cardBody">
                <div class="aplus-staticWrap flex-r" style="flex-wrap: wrap">
                    <div class="aplus-staticWrap-item flex-c">
                        <div>
                            UV
                        </div>
                        <span>{{topData.uv||0}}</span>
                    </div>
                    <div class="aplus-staticWrap-item flex-c" >
                        <div>
                            产品注册数
                        </div>
                        <span>{{topData.register||0}}</span>
                    </div>
                    <div class="aplus-staticWrap-item flex-c">
                        <div>
                            产品下款数
                        </div>
                        <span>{{topData.loan||0}}</span>
                    </div>
                    <div class="aplus-staticWrap-item flex-c">
                        <div>
                            产品下款率
                        </div>
                        <span>{{topData.register?((topData.loan/topData.register)*100).toFixed(2)+'%':'0.00%'}}</span>
                    </div>
                </div>
                <div class="cardBodyHeader marT20">
                    <el-row  type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                         <el-col :span="7">
                            <div class="flex-r global-childItem">
                                <span class="smallSpan">产品</span>
                                <el-input placeholder="请输入产品名称"  v-model.trim="tableForm.productName" class="aplus-norInp"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="flex-r global-childItem">
                                <span class="smallSpan bigSpan" style="width: 60px!important;">日 期 </span>
                                <el-date-picker
                                        style="height: 32px;width: 100%"
                                        v-model="tableForm.time"
                                        class="dateChoose"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <el-button type="primary" icon="el-icon-search" class="reloadBtn" @click="readyAjax">查询</el-button>
                            <el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div class="cardTableWrap">
                    <div class="listContent marT60">
                        <el-tabs v-model="activeName" type="card" class="tabCard"  @tab-click="readyAjax">
                            <el-tab-pane label="产品数据" name="time">
                                <el-table
                                        :data="tableData"
                                        border
                                        v-loading="loading"
                                        element-loading-text="拼命加载中"
                                        element-loading-spinner="el-icon-loading"
                                        class="cardTable"
                                        style="width: 100%">
                                    <el-table-column
                                            prop="dateTime"
                                            label="日期">
                                    </el-table-column>
                                    <el-table-column
                                            prop="productName"
                                            width="220``"
                                            :show-overflow-tooltip="true"
                                            label="产品名称">
                                    </el-table-column>
                                    <el-table-column
                                            prop="h5Click"
                                            :show-overflow-tooltip="true"
                                            label="H5访问量">
                                     <template slot-scope="scope">
                                     	{{scope.row.h5Click||0}}
                                     </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="pv"
                                            :show-overflow-tooltip="true"
                                            label="PV">
                                    </el-table-column>
                                    <el-table-column
                                            prop="uv"
                                            label="UV"
                                            :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column
                                            prop="register"
                                            :show-overflow-tooltip="true"
                                            label="产品注册数">
                                    </el-table-column>
                                    <el-table-column
                                            :show-overflow-tooltip="true"
                                            prop="loan"
                                            label="产品下款数">
                                    </el-table-column>
                                    <!--<el-table-column-->
                                            <!--:show-overflow-tooltip="true"-->
                                            <!--prop="authPassNum"-->
                                            <!--label="认证通过">-->
                                    <!--</el-table-column>-->
                                    <el-table-column
                                            :show-overflow-tooltip="true"
                                            prop="applyOrderNum"
                                            label="下款率">
                                     <template slot-scope="scope">
                                     	{{scope.row.register?((scope.row.loan/scope.row.register)*100).toFixed(2)+'%':'0.00%'}}
                                     </template>
                                    </el-table-column>
                                    <!--<el-table-column-->
                                            <!--:show-overflow-tooltip="true"-->
                                            <!--prop="memberCount"-->
                                            <!--label="下款率">-->
                                        <!--<template slot-scope="scope">-->
                                            <!--{{scope.row.h5RegisterNum? (scope.row.loanOrderNum/scope.row.h5RegisterNum).toFixed(2)*100+'%':'0%'}}-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->

                                </el-table>
                            </el-tab-pane>


                            <!--<el-tab-pane label="注册维度" name="register">
                                <el-table
                                        :data="tableData"
                                        border
                                        v-loading="loading"
                                        element-loading-text="拼命加载中"
                                        element-loading-spinner="el-icon-loading"
                                        class="cardTable"
                                        style="width: 100%">
                                    <el-table-column

                                            prop="reportDate"
                                            label="日期"
                                            :formatter="$toolkit.formatTimeTable">
                                        <template slot-scope="scope">
                                            {{$toolkit.formatTime(scope.row.reportDate,false)}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="channelName"
                                            width="220``"
                                            :show-overflow-tooltip="true"
                                            label="渠道名称">
                                    </el-table-column>
                                    <el-table-column
                                            prop="registerNum"
                                            label="H5注册"
                                            :show-overflow-tooltip="true">
                                    </el-table-column>
                                    <el-table-column
                                            :show-overflow-tooltip="true"
                                            prop="registerAuthPassNum"
                                            label="注册认证通过">
                                    </el-table-column>
                                    <el-table-column
                                            :show-overflow-tooltip="true"
                                            prop="registerApplyOrderNum"
                                            label="注册申请订单数">
                                    </el-table-column>
                                    <el-table-column
                                            :show-overflow-tooltip="true"
                                            prop="registerLoanOrderNum"
                                            label="注册放款数">
                                    </el-table-column>
                                    <el-table-column
                                            :show-overflow-tooltip="true"
                                            prop="registerLoanOrderNum"
                                            label="注册下款率">
                                        <template slot-scope="scope">
                                            {{scope.row.registerNum? (scope.row.registerLoanOrderNum/scope.row.registerNum).toFixed(2)*100+'%':'0%'}}                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>-->
                        </el-tabs>
                    </div>

                    <div class="block pagiWrap" style="margin-top: 20px">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 30, 50]"
                                :page-size="pageSize"
                                layout="total, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>





        </el-card>

    </div>
</template>

<script>
  import baseDelBtn from "@/components/baseDelBtn";
  // import animate from "animate.css";
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: "channelList",
    data() {
      return {
        tableForm:{
          time:"",
          startTime:"",
          endTime:"",
          
        },
        tableData: [],
        // 渠道商列表分页
        currentPage:1,
        pageSize:10,
        total:0,
        channelList:[],
        loading:false,

        activeName:"time",
        topData:{}
      };
    },
    mounted() {
//    this.channelList_getList()
      this.readyAjax();
    },
    components:{
      baseDelBtn
    },
    watch:{
      "tableForm.loginName":function (n) {
        if(!n){
          this.readyAjax()
        }
      }
    },
    methods: {
      reset(){
        for(let i in this.tableForm){
          this.tableForm[i]=""
        }
        this.readyAjax()
      },
//    channelList_getList(){
//      this.$api.channel.channelList_getList().then((res)=>{
//        for(let i in res.data){
//          let obj={
//            userName:res.data[i].name,
//            id:res.data[i].id
//          }
//          this.channelList.push(obj)
//        }
//      })
//    },
      getList(){
        this.loading=true;
        if(this.tableForm.time){
          this.tableForm.startTime=this.$toolkit.formatTime(this.tableForm.time[0],false);
          this.tableForm.endTime=this.$toolkit.formatTime(this.tableForm.time[1],false);
        }
        let url=this.activeName=='time'?'getProductDataList':'channelTrans_getRegisterList'
        // if(this.activeName=='time')
        this.$api.channel[url]({
           pageNum:this.currentPage,
            pageSize:this.pageSize,
            ...this.tableForm
          }
        ).then((res)=>{
          this.loading=false;
          this.tableData=res.data.list;
          this.total=res.data.total;
        })
      },
      getProductTopInfo(){
      	this.$api.channel.getProductTopInfo({
            startTime:this.tableForm.startTime,
            endTime:this.tableForm.endTime
          }
        ).then((res)=>{
          this.loading=false;
          this.topData=res.data;
        })	
      },
      readyAjax(){
        this.currentPage=1;
        this.pageSize=10;
        this.getList();
        this.getProductTopInfo()
      },
      handleCurrentChange(val){
        this.currentPage=val;
        this.getList();
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getList();
      },
      forStatus(row){
        switch(row.status){
          case 1:return "正常";break;
          case 2:return "黑名单";break;
          case 3:return "禁用";break;
          default:return "未知"
        }
      },
    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    @import url("../../assets/css/common.less");
</style>
