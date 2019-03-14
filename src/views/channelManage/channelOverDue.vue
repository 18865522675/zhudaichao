<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix cardTitle">
                <span>渠道逾期明细</span>
            </div>
            <div class="cardBody">
                <div class="aplus-staticWrap flex-r" style="flex-wrap: wrap">
                    <div class="aplus-staticWrap-item flex-c">
                        <div>
                            应收订单数
                        </div>
                        <span>{{topInfo.count}}</span>
                    </div>
                    <div class="aplus-staticWrap-item flex-c" >
                        <div>
                            首借单量
                        </div>
                        <span>{{topInfo.newOverdueNum}}</span>
                    </div>
                    <div class="aplus-staticWrap-item flex-c">
                        <div>
                            复借单量
                        </div>
                        <span>{{topInfo.oldOverdueNum}}</span>
                    </div>
                    <!--<div class="aplus-staticWrap-item flex-c">-->
                        <!--<div>-->
                            <!--逾期单量-->
                        <!--</div>-->
                        <!--<span>{{topInfo.overdueNum}}</span>-->
                    <!--</div>-->
                    <div class="aplus-staticWrap-item flex-c">
                        <div>
                            订单逾期率
                        </div>
                        <span>{{(topInfo.todayRate*100).toFixed(2)}}%</span>
                    </div>
                    <div class="aplus-staticWrap-item flex-c">
                        <div>
                            新用户逾期率
                        </div>
                        <span>{{(topInfo.newOverdueRate*100).toFixed(2)}}%</span>
                    </div>
                    <div class="aplus-staticWrap-item flex-c">
                        <div>
                            复借逾期率
                        </div>
                        <span>{{(topInfo.oldOverdueRate*100).toFixed(2)}}%</span>
                    </div>
                </div>
                <div class="cardBodyHeader flex-r marT60" style="justify-content:flex-start">
                    <div class="flex-r">
                        <!--<div class="cardHeader-searchInp">-->
                            <!--<el-input placeholder="请输入渠道商名称" v-model="tableForm.channem_name"></el-input>-->
                        <!--</div>-->
                        <div class="flex-r global-childItem">
                            <!--<span  class="smallSpan">手&nbsp; 机&nbsp; 号</span>-->
                            <el-input placeholder="请输入渠道商名称"  v-model.trim="tableForm.channem_name" class="aplus-norInp"></el-input>
                        </div>
                        <!--<div class="marL10">-->
                        <!--<el-button type="primary" size="small" style="background: rgb(50, 64, 87)" @click="addDialogShow(true)">添加</el-button>-->
                        <!--</div>-->
                    </div>
                    <div class="peopleCount marL30">
                        <el-date-picker
                                v-model="tableForm.time"
                                style="height: 32px;line-height: 26px;!important;"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                        </el-date-picker>
                    </div>
                    <el-col :span="7">
                        <el-button type="primary" icon="el-icon-search" class="reloadBtn marL10" @click="readyAjax">查询</el-button>
                        <el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                    </el-col>
                </div>

                <div class="cardTableWrap">
                    <div style="width: 100%;">
                        <el-table
                                :data="tableData"
                                border

                                v-loading="loading"
                                element-loading-text="拼命加载中"
                                element-loading-spinner="el-icon-loading"
                                class="cardTable"
                                style="width:100%">
                            <el-table-column

                                    prop="loanPayData"
                                    label="日期"
                                    >
                            </el-table-column>
                            <el-table-column
                                    prop="channelName"
                                    width="220"
                                    :show-overflow-tooltip="true"
                                    label="渠道名称">
                            </el-table-column>
                            <el-table-column
                                    prop="count"
                                    label="应收订单数">
                            </el-table-column>
                            <el-table-column
                                    prop="settleNum"
                                    label="到期已还订单数">
                            </el-table-column>
                            <el-table-column
                                    prop="renewalNum"
                                    label="到期续期订单数">
                            </el-table-column>
                            <!--<el-table-column-->
                                    <!--prop="overdueNum"-->
                                    <!--label="逾期订单数">-->
                            <!--</el-table-column>-->
                            <el-table-column
                                    prop="newOverdueNum"
                                    label="当日新用户逾期数">
                            </el-table-column>
                            <el-table-column
                                    prop="oldOverdueNum"
                                    label="当日复借逾期数">
                            </el-table-column>
                            <el-table-column
                                    prop="todayRate"
                                    label="首日订单逾期率" :formatter="$toolkit.tranVo">
                            </el-table-column>
                            <el-table-column
                                    prop="newOverdueRate"
                                    label="新用户逾期率" :formatter="$toolkit.tranVo">
                            </el-table-column>
                            <el-table-column
                                    prop="oldOverdueRate"
                                    label="复借逾期率" :formatter="$toolkit.tranVo">
                            </el-table-column>
                        </el-table>
                    </div>

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
  export default {
    name: "channelList",
    data() {
      return {
        name: "",
        tableForm:{
          time:"",
          channem_name:"",
          limit_pay_time_start:"",
          limit_pay_time_end:""
        },
        loading:false,
        tableData: [],
        addDialogVisible: false,
        isAdd: false,
        ruleForm: {},
        rules: {
          loginName: [
            { required: true, message: "请输入账号", trigger: "blur" }
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" }
          ],
        },

        // 渠道商列表分页
        currentPage:1,
        pageSize:10,
        peopleCountNum:0,
        total:0,


        // dialog控制
        dialogVisible:false,


        // 当前使用行数据
        actionRow:{},

        //渠道商会员分页
        pageSizeMember:10,
        currentPageMember:1,
        totalMember:0,

        tableDataMember:[],
        activeName:"registerCount",
        topInfo:{}
      };
    },
    mounted() {
      this.getList();
    },
    components:{
    },
    watch:{
      "tableForm.channem_name":function (n) {
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
      getList(){
        if(this.tableForm.time){
          this.tableForm.limit_pay_time_start=this.$toolkit.formatTime(this.tableForm.time[0],false);
          this.tableForm.limit_pay_time_end=this.$toolkit.formatTime(this.tableForm.time[1],false);
        }else{
          this.tableForm.limit_pay_time_start=this.tableForm.limit_pay_time_end=""
        }
        this.$api.channel.channelOverDueList_getList({
          pageNum:this.currentPage,
            pageSize:this.pageSize,
            ...this.tableForm
          }
        ).then((res)=>{
          this.tableData=res.data.records;
          this.topInfo=res.data.condition;
          this.total=res.data.total;
        })
      },
      readyAjax(){
        this.currentPage=1;
        this.pageSize=10;
        this.getList()
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
    .aplus-staticWrap{
        height: 120px;
        align-items: center;
        /*margin-top: -20px;*/
        .aplus-staticWrap-item{
            box-sizing: border-box;
            height: 60px;
            justify-content: center;
            flex:1;
            text-align: center;
            &:not(:first-child){
                border-left:1px solid gray;
            }
            &>div{
                font-size: 14px;
                color:gray
            }
            &>span{
                font-size: 14px;
                display: inline-block;
                margin-top: 3px;
            }
        }
    }
</style>
