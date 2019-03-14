<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix cardTitle">
                <span>日志列表</span>
            </div>
            <div class="cardBody">
                <div class="cardBodyHeader flex-r" style="justify-content:flex-start">
                    <div class="peopleCount global-childItem">
                        <span class="smallSpan" style="width: 50px!important;">时间 : </span>
                        <el-date-picker
                                v-model="date"
                                style="height: 32px;line-height: 26px;!important;"
                                @change="getList"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                        </el-date-picker>
                    </div>
                    <div class="flex-r" style="margin-left: 40px">
                        <div class="cardHeader-searchInp"  v-if="activeName=='loginRecord'">
                            <el-input placeholder="请输入用户名称" v-model="tableForm.userName" class="searchInpBody">
                                <el-button slot="append" icon="el-icon-search" @click="readyAjax"></el-button>
                            </el-input>
                        </div>
                        <div class="cardHeader-searchInp" v-else >
                            <el-select v-model="tableForm.adminId" class="aplus-sel" filterable @change="getList" placeholder="请选择用户">
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
                    </div>
                </div>

                <div class="cardTableWrap">
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="登陆日志" name="loginRecord">
                            <el-table
                                    :data="loginRecordData"
                                    border
                                    v-loading="loading"
                                    element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading"
                                    class="cardTable"
                                    style="width:100%">
                                <el-table-column

                                        prop="id"
                                        label="ID"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="userName"
                                        :show-overflow-tooltip="true"
                                        label="用户名">
                                </el-table-column>
                                <el-table-column
                                        prop="ip"
                                        label="IP地址">
                                </el-table-column>
                                <el-table-column
                                        prop="loginTime"
                                        label="登录时间" :formatter="$toolkit.formatTimeTable">
                                </el-table-column>
                                <el-table-column
                                        prop="remark"
                                        label="登录详情">
                                    <template slot-scope="scope">
                                        {{scope.row.remark?scope.row.remark:""}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="操作日志" name="operateRecord">
                            <el-table
                                    :data="operateRecordData"
                                    border
                                    v-loading="loading"
                                    element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading"
                                    class="cardTable"
                                    style="width:100%">
                                <el-table-column
                                        prop="menuName"
                                        label="菜单名称" :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="clickMenu"
                                        :show-overflow-tooltip="true"
                                        label="点击菜单"  :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="adminName"
                                        label="操作者姓名"  :formatter="$toolkit.transNull">
                                </el-table-column>
                                <el-table-column
                                        prop="createTime"
                                        label="新增时间" :formatter="$toolkit.formatTimeTable">
                                </el-table-column>
                                <el-table-column
                                        prop="remark"
                                        label="操作记录" :show-overflow-tooltip="true">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>

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
          loginName:"",
          adminId:"",
          startTime:"",
          endTime:""
        },
        loading:false,
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

        //列表数据
        operateRecordData:[],
        loginRecordData:[],

        //当前使用的tab
        activeName:"loginRecord",
        adminList:[],
        date:"",
        // currentPage1:1,
        // pageSize1:10
      };
    },
    mounted() {
      this.getList();
      this.getLoginRecord_adminList()
    },
    components:{
    },
    watch:{
      "tableForm.userName":function (n) {
        if(!n){
          this.readyAjax()
        }
      }
    },
    methods: {
      getLoginRecord_adminList(){
        this.$api.system.getLoginRecord_adminList().then((res)=>{
          this.adminList=res.data
        }).catch((e)=>{
          this.$message.error("获取管理员列表失败")
        })
      },
      showDialog(row){
        this.actionRow={...row};
        this.dialogVisible=true;
        this.getMenberList()
      },
      handleClick(val){
        this.currentPage=1;
        this.pageSize=10;
        this.date="";
        this.getList()
      },
      getList(){
        if(this.date){
          this.tableForm={
            ...this.tableForm,
            startTime:this.$toolkit.formatTime(this.date[0]),
            endTime:this.$toolkit.formatTime(this.date[1])
          }
        }else{
          this.tableForm.startTime="";
          this.tableForm.endTime=""
        }
        if(this.activeName=='loginRecord'){
          delete this.tableForm.adminId
          this.$api.system.getLoginRecord({
              pageNo:this.currentPage,
              pageSize:this.pageSize,
              ...this.tableForm
            }
          ).then((res)=>{
            this.loginRecordData=res.data.list;
            this.total=res.data.total;
          })
        }else{
          // alert(123)
          if(!this.tableForm.adminId){
            delete this.tableForm.loginName
          }
          this.$api.system.getOperateRecord({
              page:this.currentPage,
              pageSize:this.pageSize,
              ...this.tableForm
            }
          ).then((res)=>{
            this.operateRecordData=res.data.records;
            console.log(this.operateRecordData)
            this.peopleCountNum=res.data.total;
            this.total=res.data.total;
          }).catch((res)=>{
            this.operateRecordData=res.data.records;
            this.total=res.data.total;
          })
        }
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
    },
    created() {},
    destoryed() {}
  };
</script>

<style  lang="less">
</style>
