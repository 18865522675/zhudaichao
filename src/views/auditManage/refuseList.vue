<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>拒绝名单</span>
            </div>
            <div class="cardBody">
                <!--<el-row type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">时&nbsp;&nbsp;&nbsp;&nbsp间</span>

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
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span  class="smallSpan">手&nbsp; 机&nbsp; 号</span>
                            <el-input placeholder="请输入电话号码"  v-model="tableForm.phone" class="aplus-norInp"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span  class="smallSpan">姓 &nbsp;&nbsp;&nbsp;&nbsp;名</span>
                            <el-input placeholder="请输入姓名" v-model="tableForm.name"  class="aplus-norInp">
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
                            <span>时 间: </span>
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
                        <div class="topTableForm-item">
                            <span>手机号 : </span>
                            <el-input placeholder="请输入电话号码"  v-model="tableForm.phone" class="aplus-norInp"></el-input>
                        </div>
                        <div class="topTableForm-item">
                            <span>姓 名 :</span>
                            <el-input placeholder="请输入姓名" v-model="tableForm.name"  class="aplus-norInp">
                            </el-input>
                        </div>
                        <div class="topTableForm-item-actions">
                            <el-button type="primary" icon="el-icon-search" class="reloadBtn" @click="readyAjax">查询</el-button>
                            <el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                        </div>
                    </div>
                </div>



                <div class="listContent marT60">
                    <el-tabs v-model="activeName" type="card" class="tabCard" @tab-click="handleClick">
                        <el-tab-pane label="风控拒绝" name="wind">
                            <div class="tabCardInner">
                                <el-table
                                        border
                                        class="cardTable marT20"
                                        ref="multipleTable"
                                        :data="windList"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="handleSelectionChange">
                                    <!--<el-table-column-->
                                    <!--type="selection"-->
                                    <!--width="55">-->
                                    <!--</el-table-column>-->
                                    <el-table-column
                                            prop="user.channelName"
                                            label="渠道">
                                    </el-table-column>
                                    <el-table-column
                                            prop="user.userName"
                                            label="姓名">
                                    </el-table-column>
                                    <el-table-column
                                            prop="user.phone"
                                            label="电话号码"
                                            show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                            prop="limitDays"
                                            label="贷款期限"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <el-table-column
                                            prop="borrowMoney"
                                            label="借款金额"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <el-table-column
                                            prop="realMoney"
                                            label="应打款金额"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <el-table-column
                                            prop="needPayMoney"
                                            label="应还金额"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <el-table-column
                                            prop="gmtDatetime"
                                            label="申请时间"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <el-table-column
                                            prop="noAgree"
                                            label="失败原因"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <!--<el-table-column-->
                                            <!--label="是否风控"-->
                                            <!--show-overflow-tooltip >-->
                                        <!--<template slot-scope="scope">-->
                                            <!--{{scope.row.isFengkong==1?'是':'否'}}-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                    <el-table-column
                                            fixed="right"
                                            label="操作" width="300">
                                        <template slot-scope="scope">
                                            <el-button size="mini" plain class="aplus-pribtn"  @click="$router.push(`/userInfoDetail/${scope.row.userId}/${scope.row.id}/${scope.row.user.userName}/${scope.row.user.phone}`)">查看认证信息</el-button>
                                            <el-button size="mini" plain class="aplus-infoBtn" @click="$router.push(`/auditManage/auditInfoDetail/${scope.row.id}`)">详情</el-button>
                                            <el-button size="mini" plain class="aplus-recoverBtn" @click="recoverAction(scope.row.id)">恢复</el-button>
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

                        </el-tab-pane>
                        <el-tab-pane label="人工拒绝" name="artificial">
                            <div class="tabCardInner">
                                <el-table
                                        border
                                        class="cardTable marT20"
                                        ref="multipleTable"
                                        :data="artificialList"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="handleSelectionChange">
                                    <el-table-column
                                            prop="user.channelName"
                                            label="渠道	">
                                    </el-table-column>
                                    <el-table-column
                                            prop="user.userName"
                                            label="姓名">
                                    </el-table-column>
                                    <el-table-column
                                            prop="user.phone"
                                            label="电话号码"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <el-table-column
                                            prop="limitDays"
                                            label="贷款期限"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <el-table-column
                                            prop="borrowMoney"
                                            label="借款金额"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <el-table-column
                                            prop="realMoney"
                                            label="应打款金额"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <el-table-column
                                            prop="needPayMoney"
                                            label="应还金额"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <el-table-column
                                            prop="gmtDatetime"
                                            label="申请时间"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <el-table-column
                                            prop="noAgree"
                                            label="失败原因"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <!--<el-table-column-->
                                            <!--label="是否风控"-->
                                            <!--show-overflow-tooltip >-->
                                        <!--<template slot-scope="scope">-->
                                            <!--{{scope.row.isFengkong==1?'是':'否'}}-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                    <el-table-column
                                            prop="authour"
                                            label="审核员"
                                            show-overflow-tooltip >
                                    </el-table-column>
                                    <el-table-column
                                            fixed="right"
                                            label="操作" width="300">
                                        <template slot-scope="scope">
                                            <el-button size="mini" plain class="aplus-pribtn"   @click="$router.push(`/userInfoDetail/${scope.row.userId}/${scope.row.id}/${scope.row.user.userName}/${scope.row.user.phone}`)"   v-if="btnStr.indexOf('查看认证信息')>-1">查看认证信息</el-button>
                                            <el-button size="mini" plain class="aplus-infoBtn"  @click.native="$router.push(`/auditManage/auditInfoDetail/${scope.row.id}`)"   v-if="btnStr.indexOf('详情')>-1">详情</el-button>
                                            <el-button size="mini" plain class="aplus-recoverBtn" @click="recoverAction(scope.row.id)"   v-if="btnStr.indexOf('恢复')>-1">恢复</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="block pagiWrap" style="margin-top: 20px">
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="currentPage2"
                                            :page-sizes="[10, 20, 30, 50]"
                                            :page-size="pageSize2"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="total2">
                                    </el-pagination>
                                </div>
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
  import { mapState } from 'vuex';
  export default {
    name: "channelList",
    data() {
      return {
        tableForm:{
          time:"",
          name:"",
          phone:"",
          status:7,
          isRefuseReason:-1
        },
        windList:[],
        artificialList:[],
        activeName:"wind",

        currentPage:1,
        pageSize:10,
        total:0,


        currentPage2:1,
        pageSize2:10,
        total2:0
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
      handleClick(){
        this.reset()
      },
      readyAjax(){
        if(this.tableForm.time){
          this.tableForm.gmtDatetime=this.$toolkit.formatTime(this.tableForm.time[0],false)+'~'+this.$toolkit.formatTime(this.tableForm.time[1],false)
        }
        if(this.activeName=='wind'){
          this.currentPage=1;
          this.pageSize=10;
          this.getRefuseWindList()
        }else{
          this.currentPage2=1;
          this.pageSize2=10;
          this.getRefuseArtificialList()
        }
      },
      reset(){
        for(let i in this.tableForm){
          if(i!="status"&&i!="isRefuseReason"){
            this.tableForm[i]=""
          }
        }
        this.readyAjax()
      },
      handleCurrentChange(val){
        // this.currentPage=val;
        if(this.activeName=='wind'){
          this.currentPage=val;
          this.getRefuseWindList()
        }else{
          this.currentPage2=val;
          this.getRefuseArtificialList()
        }
      },
      handleSizeChange(val){
        if(this.activeName=='wind'){
          this.pageSize=val;
          this.getRefuseWindList()
        }else{
          this.pageSize2=val;
          this.getRefuseArtificialList()
        }
      },
      getRefuseWindList(){
            this.$api.audit.getRefuseWindList({
              ...this.tableForm,
              currentPage:this.currentPage,
              pageSize:this.pageSize,
              refuseType:0
            }).then((res)=>{
                this.windList=res.data.pageDto.list;
                this.total=res.data.pageDto.total;
            }).catch((e)=>{
                this.$message.error("获取风控拒绝列表失败")
            })
      },
      getRefuseArtificialList(){
        this.$api.audit.getRefuseArtificialList({
          ...this.tableForm,
          currentPage:this.currentPage2,
          pageSize:this.pageSize2,
          refuseType:1
        }).then((res)=>{
          this.artificialList=res.data.pageDto.list;
          this.total2=res.data.pageDto.total;
        }).catch((e)=>{
          this.$message.error("获取人工拒绝列表失败")
        })
      },
      recoverAction(id){
        this.$toolkit.showConfrim('您确定要恢复该用户到待审核界面么?','恢复').then(()=>{
          console.log(id)
            this.$api.audit.recoverAction({
              id
            }).then(()=>{
              this.$message.success("恢复成功");
              this.readyAjax()
            })
        })
      }
    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    @import url('../../assets/css/commonTable.less');
</style>
