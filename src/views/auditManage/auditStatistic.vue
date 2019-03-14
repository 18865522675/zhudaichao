<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>审核统计</span>
            </div>
            <div class="cardBody">

                <div class="aplus-staticWrap flex-r" style="flex-wrap: wrap">
                    <div class="aplus-staticWrap-item flex-c">
                        <div>
                            审核通过总量
                        </div>
                        <span>{{$toolkit.transZero(topData.auditPassNum)}}</span>
                    </div>
                    <div class="aplus-staticWrap-item flex-c" >
                        <div>
                            总订单拒绝数
                        </div>
                        <span>{{$toolkit.transZero(topData.refuseNum)}}</span>
                    </div>
                    <div class="aplus-staticWrap-item flex-c">
                        <div>
                            总订单放款数
                        </div>
                        <span>{{$toolkit.transZero(topData.orderLoanNum)}}</span>
                    </div>
                    <div class="aplus-staticWrap-item flex-c">
                        <div>
                            总订单逾期率
                        </div>
                        <span>{{topData.overdueProb?t(opData.overdueProb*100).toFixed(2)+'%':'0.00%'}}</span>
                    </div>
                </div>
                <div class="listContent marT60">
                    <el-tabs v-model="activeName" type="card" class="tabCard" @tab-click="handleClick">
                        <el-tab-pane label="审核绩效" name="audit">
                           <div class="tabCardInner">
                               <el-form :model="tableForm" status-icon  ref="tableForm" class="flex-r tableMiddleForm" label-width="60px">
                                   <el-form-item label="日期 : ">
                                       <el-date-picker
                                               style="height: 32px;"
                                               v-model="tableForm.time"
                                               class="dateChoose"
                                               type="daterange"
                                               range-separator="至"
                                               @change="readyAjax"
                                               start-placeholder="开始日期"
                                               end-placeholder="结束日期">
                                       </el-date-picker>
                                   </el-form-item>
                                   <el-form-item label="审核员 : " class="fourWordTitle">
                                       <!--<el-select  v-model="tableForm.auditorId" class="aplus-sel"  @change="readyAjax"  filterable placeholder="请选择审核员" style="width: 100%">-->
                                           <!--<el-option label="全部" value=""></el-option>-->
                                           <!--<el-option-->
                                                   <!--v-for="(item,index) in auditPersonList"-->
                                                   <!--:key="index"-->
                                                   <!--:label="item.userName"-->
                                                   <!--:value="item.id">-->
                                           <!--</el-option>-->
                                       <!--</el-select>-->

                                       <el-select v-model="tableForm.auditorId" class="aplus-sel" style="width: 100%" filterable @change="readyAjax" placeholder="请选择审核员">
                                           <!--<el-option value="" label="全部"></el-option>-->
                                           <el-option-group
                                                   v-for="(group,index) in auditPersonList"
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
                                   </el-form-item>
                                   <div>
                                       <!--<el-button type="primary" icon="el-icon-search" class="reloadBtn marL10" @click="readyAjax">查询</el-button>-->
                                       <el-button type="default" icon="el-icon-refresh" class="reloadBtn" @click="reset">重置</el-button>
                                       <!--<el-button type="primary" icon="el-icon-d" class="reloadBtn marL10" @click="readyAjax">查询</el-button>-->
                                   </div>
                               </el-form>
                               <el-table
                                       border
                                       class="cardTable marT20"
                                       v-loading="loading"
                                       ref="multipleTable"
                                       :data="auditList"
                                       tooltip-effect="dark"
                                       style="width: 100%">
                                   <el-table-column
                                           prop="date"
                                           label="日期">
                                       <template slot-scope="scope">
                                           {{$toolkit.formatTime(scope.row.date,false)}}
                                       </template>
                                   </el-table-column>
                                   <el-table-column
                                           prop="name"
                                           label="审核员">
                                   </el-table-column>
                                   <el-table-column
                                           prop="orderNum"
                                           label="操作单数	"
                                           show-overflow-tooltip >
                                   </el-table-column>
                                   <el-table-column
                                           prop="leaderName"
                                           width="200"
                                           label="普通通过数 / 优质通过数"
                                           show-overflow-tooltip>
                                       <template slot-scope="scope">
                                           {{scope.row.auditPassNum+' /'}} <span style="color:red">{{$toolkit.transZero(scope.row.auditPassNumGrade)}}</span>
                                       </template>
                                   </el-table-column>
                                   <el-table-column
                                           prop="refuseNum"
                                           label="审核拒绝"
                                           show-overflow-tooltip>
                                   </el-table-column>
                                   <el-table-column
                                           prop="updateTime"
                                           width="200"
                                           label="普通放款数/优质放款数"
                                           show-overflow-tooltip>
                                       <template slot-scope="scope">
                                           {{scope.row.orderLoanNum+' /'}} <span style="color:red">{{$toolkit.transZero(scope.row.orderLoanNumGrade)}}</span>
                                       </template>
                                   </el-table-column>
                                   <el-table-column
                                           prop="orderOverdue"
                                           label="订单逾期数"
                                           show-overflow-tooltip>
                                   </el-table-column>
                                   <el-table-column
                                           prop="overdueProb"
                                           label="订单逾期率"
                                           show-overflow-tooltip>
                                   </el-table-column>
                                   <el-table-column
                                           prop="overReturnedMoneyNum"
                                           label="订单回款数"
                                           show-overflow-tooltip>
                                   </el-table-column>
                               </el-table>
                           </div>
                        </el-tab-pane>
                        <el-tab-pane label="放款绩效" name="load">
                            <div class="tabCardInner">
                                <el-form :model="tableForm" status-icon  ref="tableForm" class="flex-r tableMiddleForm" label-width="60px">
                                    <el-form-item label="日期 : ">
                                        <el-date-picker
                                                style="height: 32px;"
                                                v-model="tableForm.time"
                                                type="daterange"
                                                range-separator="至"
                                                @change="readyAjax"
                                                class="dateChoose"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="放款员 : " class="fourWordTitle">
                                        <!--<el-select  v-model="tableForm.loadId" class="aplus-sel"  @change="readyAjax"  filterable placeholder="请选择审核员" style="width: 100%">-->
                                            <!--<el-option label="全部" value=""></el-option>-->
                                            <!--<el-option-->
                                                    <!--v-for="(item,index) in auditPersonList"-->
                                                    <!--:key="index"-->
                                                    <!--:label="item.userName"-->
                                                    <!--:value="item.id">-->
                                            <!--</el-option>-->
                                        <!--</el-select>-->

                                        <el-select v-model="tableForm.loadId" class="aplus-sel" style="width: 100%" filterable @change="readyAjax" placeholder="请选择审核员">
                                            <!--<el-option value="" label="全部"></el-option>-->
                                            <el-option-group
                                                    v-for="(group,index) in auditPersonList"
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
                                    </el-form-item>
                                    <div>
                                        <!--<el-button type="primary" icon="el-icon-search" class="reloadBtn marL10" @click="readyAjax">查询</el-button>-->
                                        <el-button type="default" icon="el-icon-refresh" class="reloadBtn" @click="reset">重置</el-button>
                                        <!--<el-button type="primary" icon="el-icon-d" class="reloadBtn marL10" @click="readyAjax">查询</el-button>-->
                                    </div>
                                </el-form>


                                <el-table
                                        border
                                        class="cardTable marT20"
                                        ref="multipleTable"
                                        v-loading="loading"
                                        :data="loadList"
                                        tooltip-effect="dark"
                                        style="width: 100%">
                                    <el-table-column
                                            prop="date"
                                            label="日期">
                                        <template slot-scope="scope">
                                            {{$toolkit.formatTime(scope.row.date,false)}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="放款员"
                                            show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                            prop="orderNum"
                                            label="操作单数	"
                                            show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                            prop="finalOrderRepaymentTime"
                                            label="普通通过数/优质通过数"
                                            show-overflow-tooltip >
                                        <template slot-scope="scope">
                                            {{scope.row.auditPassNum+'/' }} <span style="color:red">{{$toolkit.transZero(scope.row.auditPassNumGrade)}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="refuseNum"
                                            label="放款拒绝"
                                            show-overflow-tooltip :formatter="$toolkit.transNullTable" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="orderLoanNum"
                                            label="订单逾期数"
                                            show-overflow-tooltip  :formatter="$toolkit.transNullTable" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="overdueProb"
                                            label="订单逾期率"
                                            show-overflow-tooltip  :formatter="$toolkit.transNullTable" >
                                    </el-table-column>
                                    <el-table-column
                                            prop="overReturnedMoneyNum"
                                            label="订单回款数"
                                            show-overflow-tooltip  :formatter="$toolkit.transNullTable" >
                                    </el-table-column>
                                </el-table>
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
        auditList:[],
        loadList:[],
        activeName:"audit",
        loading:false,
        tableForm:{
          auditorId:"",
          time:"",
          startTime:"",
          endTime:"",
          loadId:""
        },
        topData:{},
        auditPersonList:[],
      };
    },
    mounted() {
      this.getAuditPersonList()
      this.$nextTick(()=>{
        this.readyAjax()
      })
    },
    components:{
    },
    watch:{
    },
    methods: {
      getAuditDataList(){
        console.log(this.tableForm)
        this.$api.audit.getAuditDataList(this.tableForm).then((res)=>{
          this.auditList=res.data;
        }).catch(()=>{
          this.$message.error("获取审核列表失败")
        }).finally(()=>{
          this.loading=false
        })
      },
      getLoadDataList(){
        console.log(this.tableForm)
        this.$api.audit.getLoadDataList(this.tableForm).then((res)=>{
          this.loadList=res.data;
        }).catch(()=>{
          this.$message.error("获取审核列表失败")
        }).finally(()=>{
          this.loading=false
        })
      },
      getAuditPersonList(){
        // this.$api.audit.getAuditPersonList().then((res)=>{
        //     this.auditPersonList=res.data
        // }).catch((e)=>{
        //   this.auditPersonList=e.data
        // })
        this.$api.system.getLoginRecord_adminList().then((res)=>{
          this.auditPersonList=res.data
        }).catch((e)=>{
          this.$message.error("获取管理员列表失败")
        })
      },
      readyAjax(){
        this.loading=true;
        if(this.tableForm.time){
          this.tableForm.startTime=this.$toolkit.formatTime(this.tableForm.time[0],false);
          this.tableForm.endTime=this.$toolkit.formatTime(this.tableForm.time[1],false);
        }
        if(this.activeName=="audit"){
          this.getAuditDataList();
        }else{
          this.getLoadDataList();
        }
        this.getTopData()
      },
      reset(){
        for(let i in this.tableForm){
          this.tableForm[i]=""
        }
        this.readyAjax()
      },
      handleClick(){
        this.reset()
      },
      getTopData(){
        let params = {...this.tableForm}
        if(this.activeName=='audit'){
          delete params.loadId;
        }else{
          delete params.auditorId
        }
        this.$api.audit.getTopData({
          ...params,
          type:this.activeName=='audit'?1:2
        }).then((res)=>{
            if(res.data&&Object.keys(res.data).length){
              return  this.topData=res.data
            }
            this.topData={}

        })
      }

    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    @import url("../../assets/css/common.less");
</style>
