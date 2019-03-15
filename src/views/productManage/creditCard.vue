<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>信用卡产品</span>
            </div>

            <div class="cardBody">
                <!--<el-row type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan bigSpan" style="width: 80px!important;">应还款时间</span>
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
                            <el-input placeholder="请输入姓名" v-model="tableForm.name"  class="aplus-norInp flex-r addSelSelct" >
                                <el-select v-model="type" slot="prepend" placeholder="请选择">
                                    <el-option label="还款状态" value="1"></el-option>
                                    <el-option label="用户角色" value="2"></el-option>
                                </el-select>
                               <div  slot="append">
                                   <el-select placeholder="请选择还款状态" v-model="tableForm.loan_staus"  v-if="type==1">
                                       <el-option label="全部" value=""></el-option>
                                       <el-option label="正常还款" :value="1"></el-option>
                                       <el-option label="逾期还款" :value="2"></el-option>
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
                </el-row>
                <el-row style="margin-top: 30px">
                    <el-col :span="7" style="padding-right: 35px">
                        <div class="flex-r global-childItem">
                            <span  class="smallSpan bigSpan" style="width: 90px!important;">姓 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名  </span>
                            <el-input placeholder="请输入姓名/号码/渠道" v-model="tableForm.parameter"  class="aplus-norInp" style="margin-left: 3px">
                                <el-button slot="append" icon="el-icon-search" @click="readyAjax"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                    <el-button type="default" icon="el-icon-refresh" class="reloadBtn" @click="reset">重置</el-button>
                </el-row>-->




                 <!--<div class="cardBodyHeader">
                    <div class="topTableForm">
                    	<div class="topTableForm-item" style="width:380px!important">
                            <span>产品类别 : </span>
                             <el-select  v-model="tableForm.status"   class="aplus-sel"    placeholder="请选择产品类别" style="width: 100%">
                                <el-option label="全部" value=""></el-option>
                      			<el-option v-for="(item,index) in typeList" :key="index"  :label="item.name"   :value="item.id"></el-option>
                      			
                            </el-select>
                        </div>
                        <div class="topTableForm-item">
                        	<span>产品名称 :</span>
                            <el-input placeholder="请输入产品名称"  v-model.trim="tableForm.parameter" class="aplus-norInp"></el-input>
                        </div>
                        <div class="topTableForm-item-actions">
                            <el-button type="primary" icon="el-icon-search" class="reloadBtn marL10" @click="readyAjax">查询</el-button>
                      		<el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                        </div>
                    </div>
                </div>-->




                <div class="listContent">
                    <!--<div class="flex-r" style="justify-content: flex-end">
                        <div class="flex-r" style="align-items: center">
                            <div>
                                <span class="totalInfo">总借款金额</span> : <span style="color:red">{{condition.borrowMoneySum}}</span>
                            </div>
                            <div style="margin-left: 30px">
                                <span class="totalInfo">总实际还款金额</span> : <span style="color:red">{{condition.needPayMoneySum}}</span>
                            </div>
                            <div style="margin-left: 30px">
                                <span class="totalInfo">总订单数</span> : <span style="color:red">{{condition.count}}</span>
                            </div>
                        </div>
                    </div>-->
                    <el-row type="flex" class="row-bg" style="flex-wrap: wrap;justify-content: flex-end;margin-right: 0px;" :gutter="50">
                   		 <el-button  icon="el-icon-plus"  class="plusBtn" @click="showAdd(true)">新增产品</el-button>
                    <!--19BE6B-->
                    </el-row>
                    <el-table
                            border
                            class="cardTable marT20"
                            ref="multipleTable"
                            :data="okOrderList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                prop="productName"
                                label="产品名称">
                        </el-table-column>
                        <el-table-column
                                prop="logo"
                                label="信用卡图片">
                        </el-table-column>
                        <el-table-column
                                prop="weight"
                                label="权重"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                prop="plateName"
                                label="所属板块"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="productCategoryId"
                                label="产品类别"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="productInfo"
                                label="产品简介"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作" width="230">
                            <template slot-scope="scope">
                                <el-button size="mini" plain class="aplus-pribtn"  @click="showAdd(false,scope.row)" >编辑</el-button>
                                <el-button size="mini" plain class="aplus-errorBtn" @click="delCredit(scope.row)" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--<div class="block pagiWrap" style="margin-top: 20px">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 30, 50]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>-->
                </div>
            </div>


			<el-dialog
			  :title="actionType?'新增':'编辑'"
			  :visible.sync="dialogVisible"
			  width="950px"
			  :before-close="handleClose">
			  <div>
			  	 <h3>产品信息</h3>
			  	 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                	<el-form-item label="信用卡图片 :">
                       <el-upload
						  class="avatar-uploader"
						 :http-request="fnUploadRequest"
						  :show-file-list="false"
						  action=""
						  :with-credentials="true"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
                    </el-form-item>
                    <div class="formItemLine">
                    	<el-form-item label="信用卡名称 :" >
	                        <el-input v-model.trim="ruleForm.name"   auto-complete="new-password"  placeholder="请输入信用卡名称"></el-input>
	                    </el-form-item>
	                    <el-form-item label="申请人数 :">
	                        <el-input v-model.trim="ruleForm.applyNum"   auto-complete="new-password"  placeholder="请输入申请人数"></el-input>
	                    </el-form-item>
	                    <el-form-item label="权重 :" >
	                    	<el-input v-model.trim="ruleForm.weight"   auto-complete="new-password" 	 placeholder="请输入权重"></el-input>
	                    </el-form-item>
                    </div>
                    <div class="formItemLine">
                    	<el-form-item label="产品主题 :">
	                       <el-select style="width: 100%" v-model="ruleForm.theme" multiply placeholder="请选择产品主题">
                                    <el-option  label="新手上路" value="新手上路"></el-option>
                                    <el-option  label="核批率高" value="核批率高"></el-option>
                                    <el-option  label="高额提取" value="高额提取"></el-option>
                                    <el-option  label="速下卡" value="速下卡"></el-option>
                             </el-select>
	                    </el-form-item>
	                    <el-form-item label="产品链接 :">
	                        <el-input v-model.trim="ruleForm.productLink"   auto-complete="new-password"  placeholder="请输入产品链接"></el-input>
	                    </el-form-item>
	                    <el-form-item label="所属板块 :" prop="plateId">
	                    	 <el-select style="width: 100%" v-model="ruleForm.plateId" multiply placeholder="请选择产品主题">
                                    <el-option v-for="(item,index) in plateList" :key="index"  :label="item.plateName" :value="item.id"></el-option>
                             </el-select>
	                    </el-form-item>
                    </div>
                    
                    <div class="formItemLine">
                    	<el-form-item label="所属银行 :">
	                        <el-input v-model.trim="ruleForm.bank"   auto-complete="new-password"  placeholder="请输入所属银行"></el-input>
	                    </el-form-item>
	                    <el-form-item label="年费 :">
	                    	<el-select style="width: 100%" v-model="ruleForm.annualFee" multiply placeholder="请选择年费">
                                    <el-option  label="有限期免年费" value="有限期免年费"></el-option>
                                    <el-option  label="交易免年费" value="交易免年费"></el-option>
                                    <el-option  label="积分免年费" value="积分免年费"></el-option>
                                    <el-option  label="刚性年费" value="刚性年费"></el-option>
                             </el-select>
	                    </el-form-item>
	                    <el-form-item label="币种 :">
	                    	 <el-select style="width: 100%" v-model="ruleForm.currency" multiply placeholder="请选择币种">
                                    <el-option  label="人民币单币种" value="人民币单币种"></el-option>
                                    <el-option  label="外币单币种" value="外币单币种"></el-option>
                                    <el-option  label="双币种" value="双币种"></el-option>
                                    <el-option  label="全币种" value="全币种"></el-option>
                             </el-select>
	                    </el-form-item>
                    </div>
                    <el-form-item label="产品简介 :" prop="productInfo">
	                    <el-input v-model.trim="ruleForm.productInfo"   auto-complete="new-password" type="textarea" 	 placeholder="请输入产品简介"></el-input>
	                </el-form-item>
                   
                </el-form>
			  </div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="sureAdd">确 定</el-button>
			  </span>
			</el-dialog>


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
      	dialogVisible:false,
      	actionType:true,
        tableForm:{
          time:"",
          time1:"",
          loan_staus:"",
          limit_pay_time_start:"",
          limit_pay_time_end:"",
          give_time_start:"",
          give_time_end:"",
          parameter:"",
          is_old:""
        },
        type:"1",
        typeList:[],
        plateList:[],
        okOrderList:[],
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
        ruleForm:{
        	  "annualFee": "string",
			  "applyNum": 0,
			  "bank": "string",
			  "currency": "string",
			  "logo": "string",
			  "name": "string",
			  "plateId": 0,
			  "productInfo": "string",
			  "productLink": "string",
			  "theme": "string",
			  "weight": 0
        },
        rules: {
          productName: [{
            required: true,
            message:"请输入产品名称",
            trigger: 'blur'
          }],
          applyNum: [{
            required: true,
            message:"请输入申请人数",
            trigger: 'blur'
          }],
          weight: [{
            required: true,
            message:"请输入权重",
            trigger: 'blur'
          }],   
        },
      };
    },
    mounted() {
      this.getProductTypeList();
      this.getProductPlateList();
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
    methods:{
      sureAdd(){
      	if(this.actionType){
      		this.$api.product.addCreditCard({
      			...this.ruleForm
      		}).then((res)=>{
      			this.$message.success("新增成功!");
      			this.dialogVisible=false;
      			this.readyAjax()
      		})
      	}else{
      		this.$api.product.editCreditCard({
      			...this.ruleForm
      		}).then((res)=>{
      			this.$message.success("编辑成功!");
      			this.dialogVisible=false;
      			this.readyAjax()
      		})
      		
      	}
      },
      showAdd(actionType,row){
      	this.actionType=actionType;
      	if(!actionType){
      		this.ruleForm={...row}
      	}
      	this.dialogVisible=true
      },
      delCredit(row){
      	this.$toolkit.showConfrim('确定要删除此产品吗？','提示').then(()=>{
          this.$api.product.delCredit({
          	id:row.id
          }).then(()=>{
            this.$message.success("删除成功!");
            this.readyAjax()
          })
        })
      },
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
        this.$api.product.getCreditCard_list().then((res)=>{
          this.okOrderList=res.data;
//        this.condition=res.data.condition
//        this.total=res.data.total
        })
      },
      getProductTypeList(){
      	this.$api.channel.getProductTypeList().then((res)=>{
      		this.typeList=res.data;
      	})
      },
      getProductPlateList(){
      	this.$api.channel.getCreditPlateList().then((res)=>{
      		this.plateList=res.data;
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

 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .formItemLine{
  	display: flex;
  	.el-form-item{
  		width: 33%;
  	}
  }
</style>
