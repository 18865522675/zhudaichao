<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>催收统计</span>
            </div>

            <div class="cardBody">
                <!--<el-row type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan bigSpan" style="width: 80px!important;">应还款时间  </span>
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
                        </div>
                    </el-col>
                    <el-button type="default" icon="el-icon-refresh" class="reloadBtn" @click="reset">重置</el-button>
                </el-row>-->

                <div class="cardBodyHeader">
                    <div class="topTableForm">
                        <div class="topTableForm-item topTableForm-item-big">
                            <span>应还款时间: </span>
                            <el-date-picker
                                    style="height: 32px;"
                                    v-model="tableForm.time"
                                    class="dateChoose"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div class="topTableForm-item-actions">
                            <el-button type="primary" icon="el-icon-search" class="reloadBtn" @click="readyAjax">查询</el-button>
                            <el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                        </div>
                    </div>
                </div>


                <div class="listContent marT60">
                    <el-table
                            border
                            class="cardTable marT20"
                            ref="multipleTable"
                            :data="collectList"
                            tooltip-effect="dark"
                            style="width: 100%">
                        <el-table-column
                                prop="lianPayNum"
                                label="时间	">
                        </el-table-column>
                        <el-table-column
                                prop="user.userName"
                                label="	分配人员">
                        </el-table-column>
                        <el-table-column
                                prop="limitDays"
                                label="退回订单	"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="borrowMoney"
                                label="	分配的单数"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="realMoney"
                                label="结清单数"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="needPayMoney"
                                label="	结清收到金额"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="giveTime"
                                label="	续期单数"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="limitPayTime"
                                label="	续期收到金额"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="gmtDatetime"
                                label="	未催回订单"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                prop="pressMoneyManName"
                                label="	催回率"
                                show-overflow-tooltip >
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--fixed="right"-->
                                <!--label="操作" width="100">-->
                            <!--<template slot-scope="scope">-->
                                <!--&lt;!&ndash;<el-button size="mini" plain class="aplus-pribtn">查看认证信息</el-button>&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-button size="mini" plain class="aplus-infoBtn" @click="$router.push(`/auditManage/auditInfoDetail/${scope.row.id}`)">详情</el-button>&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-button size="mini" plain class="aplus-pribtn" @click="showActionModal(scope.row,1)">结清</el-button>&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-button size="mini" plain class="aplus-pribtn" @click="showActionModal(scope.row.id,2)">续期</el-button>&ndash;&gt;-->
                            <!--</template>-->
                        <!--</el-table-column>-->
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
  export default {
    name: "channelList",
    data() {
      return {
        tableForm:{
          time:"",
        },
        collectList:[]
      };
    },
    mounted() {
      this.readyAjax()
    },
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
        if(this.tableForm.time){
          this.tableForm.gmtDatetime=this.$toolkit.formatTime(this.tableForm.time[0],false)+"~"+this.$toolkit.formatTime(this.tableForm.time[1],false)
        }else{
          this.tableForm.gmtDatetime="";
          delete  this.tableForm.time
        }
        this.getCollectList()
      },
      reset(){
        this.tableForm.time="";
        this.readyAjax()
      },
      getCollectList(){
        this.$api.pressMoney.getCollectList({
          ...this.tableForm,
        }).then((res)=>{
          this.getCollectList=res.data.pageDto.list;
        })
      },

    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    .headerTitle{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        padding-bottom: 20px;
        font-weight: bold;
        font-size: 14px;
    }
    .otherConfig{
        .global-childItem{
            &>span:not(.smallSpan){
                text-align: center;
            }
            span+*{
                flex: 1!important;
            }
        }
    }
    .affilateWrap{
        .dialogTitle{
            font-weight: bold;
            display: block;
            padding-bottom: 10px;
        }
        .flexChild{
            width: 25%;
            font-size: 13px;
            color:gray;
            line-height: 25px;
        }
        .recordList{
            max-height: 400px;
            overflow-y: auto;
            .recordItem{
                box-sizing: border-box;
                padding: 20px;
                border-radius: 5px;
                border: 1px solid gray;
                &:not(:first-child){
                    margin-top: 15px;
                }
            }
        }

        .recordInp{
            width: 90%;
            margin-left: 20px
        }
    }
    .totalInfo{
        font-weight: bold;
        font-size: 14px;
    }
</style>
