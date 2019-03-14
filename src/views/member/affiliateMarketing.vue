<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>会员营销</span>
            </div>
            <div class="cardBody">
                <el-row type="flex" class="row-bg" style="flex-wrap: wrap;margin-top: 20px;" :gutter="50">
                    <el-col :span="8">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">姓 &nbsp; &nbsp;名</span>
                            <el-input placeholder="请输入姓名" v-model="tableForm.userName" class="aplus-norInp"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="flex-r global-childItem">
                            <span  class="smallSpan">手&nbsp; 机&nbsp; 号</span>
                            <el-input placeholder="请输入手机号"  v-model="tableForm.phone" class="aplus-norInp"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="flex-r global-childItem">
                            <span  class="smallSpan">负&nbsp; 责 &nbsp;人</span>
                            <el-input placeholder="请输入负责人" v-model="tableForm.leaderName"  class="aplus-norInp"></el-input>
                        </div>
                    </el-col>
                </el-row>

                <el-row type="flex" class="row-bg marT20" style="flex-wrap: wrap" :gutter="50">
                    <el-col :span="8">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">渠道商</span>
                            <el-select  v-model="tableForm.channelId" class="aplus-sel" @change="readyAjax"  filterable placeholder="请选择渠道商" style="width: 100%">
                                <el-option label="全部" value=""></el-option>
                                <el-option
                                        v-for="(item,index) in channelList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">沟通状态</span>
                            <el-select  v-model="tableForm.communicationStatus"  @change="readyAjax"   class="aplus-sel" placeholder="请选择认证状态" style="width: 100%">
                                <el-option
                                        v-for="(item,index) in statusList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">认证状态</span>
                            <el-select  v-model="tableForm.authStatus"  @change="readyAjax" class="aplus-sel"    placeholder="请选择沟通状态" style="width: 100%">
                                <el-option
                                        v-for="item in authList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>

                <!--<div class="cardBodyHeader">
                    <div class="topTableForm">
                    	 <div class="topTableForm-item">
                            <span>姓&nbsp;&nbsp;&nbsp;&nbsp;名 : </span>
                            <el-input placeholder="请输入姓名" v-model="tableForm.userName" class="aplus-norInp"></el-input>
                        </div>
                        <div class="topTableForm-item">
                            <span>手&nbsp;&nbsp;机&nbsp;&nbsp;号 : </span>
                             <el-input placeholder="请输入手机号"  v-model="tableForm.phone" class="aplus-norInp"></el-input>
                        </div>
                        <div class="topTableForm-item">
                            <span>负&nbsp;&nbsp;责&nbsp;&nbsp;人 : </span>
                            <el-input placeholder="请输入负责人" v-model="tableForm.leaderName"  class="aplus-norInp"></el-input>
                        </div>
                        <div class="topTableForm-item">
                            <span>渠道商 :</span>
                            <el-select  v-model="tableForm.channelId" class="aplus-sel" @change="readyAjax"  filterable placeholder="请选择渠道商" style="width: 100%">
                                <el-option label="全部" value=""></el-option>
                                <el-option
                                        v-for="(item,index) in channelList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="topTableForm-item">
                            <span>沟通状态 :</span>
                            <el-select  v-model="tableForm.communicationStatus"  @change="readyAjax"   class="aplus-sel" placeholder="请选择认证状态" style="width: 100%">
                                <el-option
                                        v-for="(item,index) in statusList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="topTableForm-item">
                            <span>认证状态 :</span>
                             <el-select  v-model="tableForm.authStatus"  @change="readyAjax" class="aplus-sel"    placeholder="请选择沟通状态" style="width: 100%">
                                <el-option
                                        v-for="item in authList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>-->

                <div style="text-align: right;margin-top: 20px">
                    <el-button type="primary" icon="el-icon-search" class="reloadBtn" @click="readyAjax">查询</el-button>
                    <el-button type="default" icon="el-icon-refresh" class="reloadBtn" @click="reset">重置</el-button>
                </div>


                <div class="listContent marT60">
                    <el-tabs v-model="activeName" type="card" class="tabCard" @tab-click="handleClick">
                        <el-tab-pane label="新会员" name="newMember">
                            <el-button class="setBtn" type="primary" @click="distribute" >分配</el-button>
                            <el-table
                                    border
                                    class="cardTable marT20"
                                    ref="multipleTable"
                                    :data="newMemberList"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        label="会员信息">
                                    <template slot-scope="scope">
                                        {{scope.row.userName+'/'+scope.row.phone}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="authStatus"
                                        label="认证状态" :formatter="formats">
                                </el-table-column>
                                <el-table-column
                                        prop="communicationStatus"
                                        label="沟通状态"
                                        show-overflow-tooltip  :formatter="formats">
                                </el-table-column>
                                <el-table-column
                                        prop="leaderName"
                                        label="负责人"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        {{scope.row.leaderName?scope.row.leaderName:'未分配'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="channelName"
                                        label="渠道商"
                                        show-overflow-tooltip  :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="updateTime"
                                        label="更新时间"
                                        show-overflow-tooltip :formatter="$toolkit.formatTimeTable">
                                </el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作" width="200">
                                    <template slot-scope="scope">
                                        <el-button size="mini" plain class="aplus-pribtn" @click="showTrackRecord(scope.row)"   v-if="btnStr.indexOf('跟踪记录')>-1">跟踪记录</el-button>
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
                        <el-tab-pane label="老会员" name="oldMember">
                            <el-button class="setBtn" type="primary"  @click="distribute"  v-if="btnStr.indexOf('分配')>-1">分配</el-button>
                            <el-table
                                    border
                                    class="cardTable marT20"
                                    ref="multipleTable"
                                    :data="oldMemberList"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        label="会员信息">
                                    <template slot-scope="scope">
                                        {{scope.row.userName+'/'+scope.row.phone}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="communicationStatus"
                                        label="沟通状态"
                                        show-overflow-tooltip  :formatter="formats">
                                </el-table-column>
                                <el-table-column
                                        prop="leaderName"
                                        label="负责人"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        {{scope.row.leaderName?scope.row.leaderName:'未分配'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="finalOrderRepaymentTime"
                                        label="最后订单时间"
                                        show-overflow-tooltip  :formatter="$toolkit.formatTimeTable">
                                </el-table-column>
                                <el-table-column
                                        prop="updateTime"
                                        label="更新时间"
                                        show-overflow-tooltip :formatter="$toolkit.formatTimeTable">
                                </el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作" width="200">
                                    <template slot-scope="scope">
                                        <el-button size="mini" plain class="aplus-pribtn"  @click="showTrackRecord(scope.row)"   v-if="btnStr.indexOf('跟踪记录')>-1">跟踪记录</el-button>
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
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>

            <el-dialog
                    title="分配"
                    :visible.sync="dialogVisible"
                    width="30%">
                <div>
                    <div class="form-body">
                        <el-form :model="disForm" ref="disForm" :rules="rules"  label-width="100px" class="demo-ruleForm">
                            <el-form-item label="分配人员" prop="adminId">
                                <el-select style="width: 100%" v-model="disForm.adminId" filterable placeholder="请选择分配人员">
                                    <el-option-group
                                            v-for="(group,index) in shenheList"
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
                        </el-form>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureDis('disForm')">确 定</el-button>
              </span>
            </el-dialog>

            <!--跟踪记录-->
            <el-dialog
                    title="跟踪记录"
                    :visible.sync="trackDialog"
                    width="900px" @close="resetAddInfo">
                <div>
                    <div class="form-body">
                        <label class="dialogTitle">基本信息</label>
                        <div class="flex-r" style="flex-wrap: wrap">
                            <div class="flexChild">
                                姓名 : {{actionRow.userName||'未知'}}
                            </div>
                            <div class="flexChild">
                                线索来源 : {{actionRow.channelName||'未知'}}
                            </div>
                            <div class="flexChild">
                                <!--{{actionRow.createTime}}-->
                                注册时间: {{$toolkit.formatTime(actionRow.createTime)||'未知'}}
                            </div>
                            <div class="flexChild">
                                电话号码 : {{actionRow.phone||'未知'}}
                            </div>
                            <div class="flexChild">
                                性别 : {{actionRow.phone||'未知'}}
                            </div>
                            <div class="flexChild">
                                沟通状态 : {{actionRow.communicationStatus==1?'已沟通':'未沟通'}}
                            </div>
                            <div class="flexChild">
                                记录更新 : {{$toolkit.formatTime(actionRow.updateTime)||'未知'}}
                            </div>
                            <div class="flexChild">
                                地区 : {{$toolkit.formatTime(actionRow.updateTime)||'未知'}}
                            </div>
                            <div class="flexChild">
                                负责人 : {{actionRow.leaderName||'未分配'}}
                            </div>
                            <div class="flexChild" v-if="activeName=='oldMember'">
                                最后订单时间 : {{$toolkit.formatTime(actionRow.finalOrderRepaymentTime)||'未知'}}
                            </div>

                        </div>

                        <div class="flex-r" style="justify-content: space-between">
                            <label class="dialogTitle marT30">跟进记录</label>
                            <el-button type="primary" size="mini" style="height: 30px;margin-top:20px" @click="addRecord">新增记录</el-button>
                        </div>
                        <div class="recordList">
                            <div class="recordItem"  v-show="addFlag">
                                <div  class="recordItem-body marT10 flex-r" style="align-items: center">
                                    <span>备注 : </span>
                                    <el-input type="textarea" class="recordInp" placeholder="请填写备注。。。"  v-model.trim="addRecordForm.context"  :row="3"></el-input>
                                </div>
                                <div style="margin: 10px;padding-left: 46px">
                                    <el-button type="primary" size="mini" @click="SureAddRecord">保存</el-button>
                                    <el-button type="default" size="mini" @click="cancelSave">取消</el-button>
                                </div>
                            </div>
                            <div class="recordItem" v-for="(item,index) in recordList" :key="index">
                                <div class="recordItem-header  flex-r">
                                    <div>
                                        负责人 :   {{item.allotName}}
                                    </div>
                                    <div style="margin-left: 100px">
                                        创建时间 :   {{$toolkit.formatTime(item.createTime)}}
                                    </div>
                                </div>
                                <div  class="recordItem-body marT10 flex-r" style="align-items: center" >
                                    <span>备注 : </span>
                                    <el-input type="textarea" class="recordInp" :value="item.context"  :disabled="true" :row="3"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="trackDialog = false">关 闭</el-button>
              </span>
            </el-dialog>
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
        name: "",
        tableForm:{
          userName:"",
          phone:"",
          channelId:"",
          leaderName:"",
          authStatus:"",
          communicationStatus:""
        },
        activeName:"newMember",
        loading:false,
        tableData: [],
        addDialogVisible: false,
        isAdd: false,
        ruleForm: {},
        rules: {
          adminId: [
            { required: true, message: "请选择分配人员", trigger: "blur" }
          ],
        },

        tableDataMember:[],

        channelList:[],
        shenheList:[],
        statusList:[{
          name:'全部',
          id:""
        },{
          name:'已沟通',
          id:1
        },{
          name:'未沟通',
          id:0
        }],

        authList:[{
          name:'全部',
          id:""
        },{
          name:'已认证',
          id:1
        },{
          name:'未认证',
          id:0
        }],
        newMemberList:[],
        oldMemberList:[],
        // 新列表分页
        currentPage:1,
        pageSize:10,
        total:0,

        // 新列表分页
        currentPage2:1,
        pageSize2:10,
        total2:0,

        // 多选
        multipleSelection:[],

        // 分配
        dialogVisible:false,

        trackDialog:false,
        disForm:{},

        actionRow:{},
        recordList:[],
        addFlag:false,
        userId:"",
        addRecordForm:{

        }
      };
    },
    mounted() {
      // this.getList();
      this.affliateChannel_getList();
      this.channelList_shenheList();
      this.readyAjax()
    },
    components:{
    },
    watch:{
      "tableForm.userName":function (n) {
        if(!n){
          this.readyAjax()
        }
      },
      "tableForm.phone":function (n) {
        if(!n){
          this.readyAjax()
        }
      },"tableForm.leaderName":function (n) {
        if(!n){
          this.readyAjax()
        }
      }
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    methods: {
      addRecord(){
        if(this.addFlag){
          return this.$message.warning("请编辑完此记录再添加！")
        }
        this.addFlag=true;
      },
      cancelSave(){
        this.resetAddInfo()
        return this.$message.info("已取消保存");
      },
      resetAddInfo(){
        this.addRecordForm={};
        this.addFlag=false;
      },
      SureAddRecord(){
        if(!this.addRecordForm.context){
          return this.$message.warning("请填写备注！")
        }
        this.$api.member.channelList_addRecord({
          userId:this.userId,
          ...this.addRecordForm
        }).then((res)=>{
          this.$message.success("记录添加成功");
          this.getRecordList(this.userId);
          this.resetAddInfo()
        }).catch((e)=>{
          this.$message.warning(e.msg)
        })
      },
      showTrackRecord(row){
        this.trackDialog=true;
        this.userId=row.userId;
        this.actionRow=Object.assign({},row)
        this.getRecordList(row.userId)
      },
      handleClick(){
        this.reset()
      },
      getRecordList(userId){
        this.$api.member.channelList_trackList({
          userId
        }).then((res)=>{
            this.recordList=res.data;
        }).catch(()=>{
          this.$message.error("获取记录失败")
        })
      },
      readyAjax(){
        if(this.activeName=='newMember'){
          this.currentPage=1;
          this.pageSize=10;
          this.channelList_newMemberList()
        }else{
          this.currentPage2=1;
          this.pageSize2=10;
          this.channelList_oldMemberList()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      distribute(){
        if(!this.multipleSelection.length){
          return this.$message.warning("请至少选择一条会员信息！")
        }
        this.dialogVisible=true;
      },
      sureDis(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
             let orderIds=[];
             this.multipleSelection.map((item)=>{
               orderIds.push(item.userId)
             })
             this.$api.member.channelList_distribute({
               ...this.disForm,
               ids:orderIds
             }).then((res)=>{
               this.readyAjax();
               this.dialogVisible=false;
               this.$message.success("分配成功")
             })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      reset(){
        for(let i in this.tableForm){
          this.tableForm[i]=""
        }
        this.readyAjax()
      },
      handleCurrentChange(val){
        // this.currentPage=val;
        if(this.activeName=='newMember'){
          this.currentPage=val;
          this.channelList_newMemberList()
        }else{
          this.currentPage2=val;
          this.channelList_oldMemberList()
        }
      },
      handleSizeChange(val){
        if(this.activeName=='newMember'){
          this.pageSize=val;
          this.channelList_newMemberList()
        }else{
          this.pageSize2=val;
          this.channelList_oldMemberList()
        }
      },
      affliateChannel_getList(){
        this.$api.member.affliateChannel_getList().then((res)=>{
          this.channelList=res.data;
        }).catch((e)=>{
           this.$message.error("获取渠道商失败")
        })
      },
      channelList_newMemberList(){
        this.$api.member.channelList_newMemberList({
          ...this.tableForm,
          page:this.currentPage,
          pageSize:this.pageSize
        }).then((res)=>{
          this.newMemberList=res.data.records;
          this.total=res.data.total;
        })
      },
      channelList_oldMemberList(){
        this.$api.member.channelList_oldMemberList({
          ...this.tableForm,
          page:this.currentPage2,
          pageSize:this.pageSize2
        }).then((res)=>{
          this.oldMemberList=res.data.records;
          this.total2=res.data.total;
        })
      },
      channelList_shenheList(){
        this.$api.system.getLoginRecord_adminList().then((res)=>{
          this.shenheList=res.data;
        }).catch((e)=>{
          this.$message.error("获取审核员失败")
        })
      },
      formats(row,col){
        if(col.property=='authStatus'){
          switch (row.authStatus) {
            case 0:return '未认证';
            case 1:return '已认证可借款';
            default:return '未知道'
          }
        }

        if(col.property=='communicationStatus'){
          switch (row.communicationStatus) {
            case 0:return '未沟通';
            case 1:return '已沟通';
            default:return '未知道'
          }
        }
      },
      // selectChange(){
      //   if(this.activeName=='newMember'){
      //     this.currentPage=1;
      //     this.channelList_newMemberList()
      //   }else{
      //     this.currentPage2=1;
      //     this.channelList_oldMemberList()
      //   }
      // }
    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
    @import url('../../assets/css/commonTable.less');
</style>
