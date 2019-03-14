<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>黑白名单查询</span>
            </div>
            <div class="cardBody">
                <div class="listContent">
                    <el-tabs v-model="activeName" type="card" class="tabCard" @tab-click="reset()">
                        <div class="flex-r" style="justify-content: space-between">
                            <div class="flex-r">
                                <div>
                                    <el-input placeholder="请输入手机号"  v-model.trim="tableForm.phone" class="aplus-norInp" v-if="activeName=='phoneWhite'"></el-input>
                                    <el-input placeholder="请输入身份证号"  v-model.trim="tableForm.cardNum" class="aplus-norInp" v-else></el-input>
                                    <!--<el-input placeholder="请输入身份证号"  v-model.trim="tableForm.cardNum" class="aplus-norInp"></el-input>-->
                                </div>
                                <div class="marL10">
                                    <el-select v-model="tableForm.partnerId" class="aplus-sel" style="width: 100%" filterable  placeholder="请选择金主">
                                        <el-option value="" label="全部"></el-option>
                                        <el-option v-for="(item,index) in partnerList" :value="item.partnerId"  :key="index" :label="item.partnerName" ></el-option>
                                    </el-select>
                                </div>
                                <div>
                                    <el-button type="primary" icon="el-icon-search" class="reloadBtn marL10" @click="readyAjax">查询</el-button>
                                </div>
                                <div>
                                    <el-button  class="reloadBtn marL10" @click="dialogVisible=true">上传{{activeName=='phoneWhite'?'手机白名单':activeName=='cardWhite'?'身份证白名单':'身份证黑名单'}}</el-button>
                                </div>
                            </div>
                            <div  >
                                <div class="nowMoney">
                                    总数 : {{total}}
                                </div>
                            </div>
                        </div>
                        <el-tab-pane label="手机白名单" name="phoneWhite">
                            <el-table
                                    border
                                    class="cardTable marT20"
                                    :data="tableData"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                <el-table-column
                                        prop="id"
                                        label="ID">
                                </el-table-column>
                                <el-table-column
                                        prop="phone"
                                        label="手机">
                                </el-table-column>
                                <el-table-column
                                        prop="phone"
                                        label="时间">
                                    <template slot-scope="scope">
                                        {{$toolkit.formatTime(scope.row.gmtDatetime)}} ~  {{$toolkit.formatTime(scope.row.uptDatetime)}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>

                        <el-tab-pane label="身份证白名单" name="cardWhite">
                            <el-table
                                    border
                                    class="cardTable marT20"
                                    :data="tableData"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                <el-table-column
                                        prop="id"
                                        label="ID">
                                </el-table-column>
                                <el-table-column
                                        prop="cardNum"
                                        label="身份证">
                                </el-table-column>
                                <el-table-column
                                        prop="phone"
                                        label="时间">
                                    <template slot-scope="scope">
                                        {{$toolkit.formatTime(scope.row.gmtDatetime)}} ~  {{$toolkit.formatTime(scope.row.uptDatetime)}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>


                        <el-tab-pane label="身份证黑名单" name="cardBlack">
                            <el-table
                                    border
                                    class="cardTable marT20"
                                    :data="tableData"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                <el-table-column
                                        prop="id"
                                        label="ID">
                                </el-table-column>
                                <el-table-column
                                        prop="idCard"
                                        label="身份证">
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
                                layout="total, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>



            <!--跟踪记录-->
            <!--<el-dialog-->
                    <!--title="跟踪记录"-->
                    <!--:visible.sync="trackDialog"-->
                    <!--width="900px" @close="resetAddInfo">-->
                <!--<div>-->
                    <!--<div class="form-body">-->
                        <!--<label class="dialogTitle">基本信息</label>-->
                        <!--<div class="flex-r" style="flex-wrap: wrap">-->
                            <!--<div class="flexChild">-->
                                <!--姓名 : {{actionRow.userName||'未知'}}-->
                            <!--</div>-->
                            <!--<div class="flexChild">-->
                                <!--线索来源 : {{actionRow.channelName||'未知'}}-->
                            <!--</div>-->
                            <!--<div class="flexChild">-->
                                <!--&lt;!&ndash;{{actionRow.createTime}}&ndash;&gt;-->
                                <!--注册时间: {{$toolkit.formatTime(actionRow.createTime)||'未知'}}-->
                            <!--</div>-->
                            <!--<div class="flexChild">-->
                                <!--电话号码 : {{actionRow.phone||'未知'}}-->
                            <!--</div>-->
                            <!--<div class="flexChild">-->
                                <!--性别 : {{actionRow.phone||'未知'}}-->
                            <!--</div>-->
                            <!--<div class="flexChild">-->
                                <!--沟通状态 : {{actionRow.communicationStatus==1?'已沟通':'未沟通'}}-->
                            <!--</div>-->
                            <!--<div class="flexChild">-->
                                <!--记录更新 : {{$toolkit.formatTime(actionRow.updateTime)||'未知'}}-->
                            <!--</div>-->
                            <!--<div class="flexChild">-->
                                <!--地区 : {{$toolkit.formatTime(actionRow.updateTime)||'未知'}}-->
                            <!--</div>-->
                            <!--<div class="flexChild">-->
                                <!--负责人 : {{actionRow.leaderName||'未分配'}}-->
                            <!--</div>-->
                            <!--<div class="flexChild" v-if="activeName=='oldMember'">-->
                                <!--最后订单时间 : {{$toolkit.formatTime(actionRow.finalOrderRepaymentTime)||'未知'}}-->
                            <!--</div>-->

                        <!--</div>-->

                        <!--<div class="flex-r" style="justify-content: space-between">-->
                            <!--<label class="dialogTitle marT30">跟进记录</label>-->
                            <!--<el-button type="primary" size="mini" style="height: 30px;margin-top:20px" @click="addRecord">新增记录</el-button>-->
                        <!--</div>-->
                        <!--<div class="recordList">-->
                            <!--<div class="recordItem"  v-show="addFlag">-->
                                <!--<div  class="recordItem-body marT10 flex-r" style="align-items: center">-->
                                    <!--<span>备注 : </span>-->
                                    <!--<el-input type="textarea" class="recordInp" placeholder="请填写备注。。。"  v-model.trim="addRecordForm.context"  :row="3"></el-input>-->
                                <!--</div>-->
                                <!--<div style="margin: 10px;padding-left: 46px">-->
                                    <!--<el-button type="primary" size="mini" @click="SureAddRecord">保存</el-button>-->
                                    <!--<el-button type="default" size="mini" @click="cancelSave">取消</el-button>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="recordItem" v-for="(item,index) in recordList" :key="index">-->
                                <!--<div class="recordItem-header  flex-r">-->
                                    <!--<div>-->
                                        <!--负责人 :   {{item.allotName}}-->
                                    <!--</div>-->
                                    <!--<div style="margin-left: 100px">-->
                                        <!--创建时间 :   {{$toolkit.formatTime(item.createTime)}}-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div  class="recordItem-body marT10 flex-r" style="align-items: center" >-->
                                    <!--<span>备注 : </span>-->
                                    <!--<el-input type="textarea" class="recordInp" :value="item.context"  :disabled="true" :row="3"></el-input>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="trackDialog = false">关 闭</el-button>-->
              <!--</span>-->
            <!--</el-dialog>-->
        </el-card>



        <el-dialog
                title="上传"
                :visible.sync="dialogVisible"
                width="600px"
                @close="handleClose">
            <div class="flex-r">
                <div style="width: 200px">
                    <el-select v-model="partnerId" class="aplus-sel" style="width: 100%" filterable  placeholder="请选择金主" @change="changeSel">
                        <el-option v-for="(item,index) in partnerList" :value="item.partnerId"  :key="index" :label="item.partnerName" ></el-option>
                    </el-select>
                </div>
                <input type="file" @change="fileChange" class="marL10" style="margin-top: 3px">
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
                <el-button type="primary" @click="sureUpload">确 定</el-button>
              </span>
        </el-dialog>

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
            phone:"",
            partnerId:""
        },
        activeName:"phoneWhite",
        loading:false,
        tableData: [],
        addDialogVisible: false,
        isAdd: false,
        ruleForm: {},

        channelList:[],
        // 新列表分页
        currentPage:1,
        total:0,
        partnerList:[],
        dialogVisible:false,
        partnerId:"",
        formData:{}
      };
    },
    mounted() {
      // this.getList();
      // this.affliateChannel_getList();
      // this.channelList_shenheList();
      this.getPartnerList()
      this.readyAjax()
    },
    components:{
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    methods: {
      sureUpload(){
        if(!this.formData.get("partnerId")||!this.formData.get("file")){
          return this.$message.warning("请选择合作伙伴与文件")
        }
        let url="";
        switch (this.activeName) {
          case "phoneWhite":url="uploadPhoneVip";break;
          case "cardWhite":url="uploadCardVip";break;
          case "cardBlack":url="uploadCardBlack";break;
        }
        this.$api.blackAndWhite[url](this.formData).then((res)=>{
            this.$message.success(res.data);
            this.dialogVisible=false;
            this.readyAjax()
        })
      },
      fileChange(ev){
        this.formData.append("file",ev.target.files[0]);
        // console.log(ev.target.files[0])
      },
      handleClose(){
        this.formData=new FormData()
      },
      changeSel(val){
        this.formData.append("partnerId",val);
      },
      reset(){
        for(let i in this.tableForm){
          this.tableForm[i]=""
        }
        this.readyAjax()
      },
      readyAjax(){
        this.currentPage=1;
        this.getTableList()
      },
      handleCurrentChange(val){
        this.currentPage=val;
        this.getTableList()
      },
      getPartnerList(){
        this.$api.blackAndWhite.getPartnerList().then((res)=>{
          this.partnerList=res.data;
        }).catch((e)=>{
          this.$message.error("获取金主列表失败")
        })
      },
      getTableList(){
        let url=""
        switch (this.activeName) {
          case 'phoneWhite':url="getPhoneVip_list";break;
          case 'cardWhite':url="getCardVip_list";break;
          case 'cardBlack':url="getCardBlack_list";break;
        }
        this.$api.blackAndWhite[url]({
          ...this.tableForm,
          current:this.currentPage,
        }).then((res)=>{
          this.tableData=res.data.records;
          this.total=res.data.total;
        })
      },
    },
    created() {
      this.formData=new FormData();
    },
    destoryed() {}
  };
</script>

<style  lang="less">
    @import url('../../assets/css/commonTable.less');
    .nowMoney{
        background: #f2dede;
        color: #a94442;
        font-size: 15px;
        font-weight: bold;
        border: 1px solid #ebccd1;
        padding: 5px 15px;
        border-radius: 12px;
    }
</style>
