<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>贷款类产品</span>
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




                 <div class="cardBodyHeader">
                    <div class="topTableForm">
                    	<div class="topTableForm-item" style="width:380px!important">
                            <span>产品类别 : </span>
                             <el-select  v-model="tableForm.productCategoryId"   class="aplus-sel"    placeholder="请选择产品类别" style="width: 100%">
                                <el-option label="全部" value=""></el-option>
                      			<el-option v-for="(item,index) in typeList" :key="index"  :label="item.categoryName"   :value="item.id"></el-option>
       			
                            </el-select>
                        </div>
                        <div class="topTableForm-item">
                        	<span>产品名称 :</span>
                            <el-input placeholder="请输入产品名称"  v-model.trim="tableForm.productName" class="aplus-norInp"></el-input>
                        </div>
                        <div class="topTableForm-item-actions">
                            <el-button type="primary" icon="el-icon-search" class="reloadBtn marL10" @click="readyAjax">查询</el-button>
                      		<el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                        </div>
                    </div>
                </div>




                <div class="listContent marT60">
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
                                label="产品图片">
                         <template slot-scope="scope">
                         	<tableCover :url="scope.row.logo"></tableCover>
                         </template>
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
                                show-overflow-tooltip  :formatter="formats">
                        </el-table-column>
                        <el-table-column
                                prop="productInfo"
                                label="产品简介"
                                show-overflow-tooltip >
                        </el-table-column>
                        <el-table-column
                                prop="productInfo"
                                label="状态"
                                show-overflow-tooltip >
                           <template slot-scope="scope">
                         	{{scope.row.status==1?'上架':'下架'}}
                           </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作" width="230">
                            <template slot-scope="scope">
                                <el-button size="mini" plain class="aplus-pribtn" @click="showAdd(false,scope.row)" >编辑</el-button>
                                <el-button size="mini" plain class="aplus-errorBtn" @click="downProduct(scope.row)" v-if="scope.row.status==1" >下架</el-button>
                                <el-button size="mini" plain class="aplus-recoverBtn" @click="upProduct(scope.row)" v-else >上架</el-button>
                                <el-button size="mini" plain class="aplus-errorBtn" @click="delLoan(scope.row)" >删除</el-button>
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
            </div>


			<el-dialog
			  :title="actionType?'新增':'编辑'"
			  :visible.sync="dialogVisible"
			  width="1180px"
			  @close="handleClose">
			  <div>
			  	 <h3>产品信息</h3>
			  	 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="95px" class="demo-ruleForm">
                	<el-form-item label="产品图片 :">
                       <el-upload
						  class="avatar-uploader"
						 :http-request="fnUploadRequest"
						  :show-file-list="false"
						  action=""
						  :with-credentials="true"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="ruleForm.product.logo" :src="ruleForm.product.logo" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
                    </el-form-item>
                    <div class="formItemLine">
                    	<el-form-item label="产品名称 :" prop="product.productName">
	                        <el-input v-model.trim="ruleForm.product.productName"   auto-complete="new-password"  placeholder="请输入产品名称"></el-input>
	                    </el-form-item>
	                    <el-form-item label="申请人数 :" prop="product.applyNum">
	                        <el-input v-model.trim="ruleForm.product.applyNum" onkeypress="return event.keyCode>=48&&event.keyCode<=57" type="number" min="0"  auto-complete="new-password"  placeholder="请输入申请人数"></el-input>
	                    </el-form-item>
	                    <el-form-item label="权重 :"  prop="product.weight">
	                    	<el-input v-model.trim="ruleForm.product.weight"  onkeypress="return event.keyCode>=48&&event.keyCode<=57" type="number"  min="0"  auto-complete="new-password" 	 placeholder="请输入权重"></el-input>
	                    </el-form-item>
                    </div>
                    <div class="formItemLine">
                    	<el-form-item label="还款方式 :" prop="product.paymentType">
	                        <el-input v-model.trim="ruleForm.product.paymentType"   auto-complete="new-password"  placeholder="请输入还款方式"></el-input>
	                    </el-form-item>
	                    <el-form-item label="产品链接 :" prop="product.productLink">
	                        <el-input v-model.trim="ruleForm.product.productLink"   auto-complete="new-password"  placeholder="请输入产品链接"></el-input>
	                    </el-form-item>
	                    <el-form-item label="申请条件 :" prop="product.applyRequire">
	                    	<el-input v-model.trim="ruleForm.product.applyRequire"   auto-complete="new-password" 	 placeholder="请输入申请条件"></el-input>
	                    </el-form-item>
                    </div>
                    
                    <div class="formItemLine">
                    	<el-form-item label="所需资料 :" prop="product.requireInfo">
	                        <el-input v-model.trim="ruleForm.product.requireInfo"   auto-complete="new-password"  placeholder="请输入所需资料"></el-input>
	                    </el-form-item>
	                    <el-form-item label="产品类别 :" prop="product.productCategoryId">
 							<el-select style="width: 100%" v-model="ruleForm.product.productCategoryId" multiply placeholder="请选择产品类别">
                                    <el-option v-for="(item,index) in typeList" :key="index" :label="item.categoryName" :value="item.id"></el-option>
                             </el-select>	                    
	                    </el-form-item>
	                    <el-form-item label="所属板块 :">
	                    	 <el-select style="width: 100%" v-model="ruleForm.product.plateId" multiple placeholder="请选择所属板块">
                                    <el-option v-for="(item,index) in plateList" :key="index" :label="item.plateName" :value="item.id"></el-option>
                             </el-select>
	                    </el-form-item>
                    </div>
                    <el-form-item label="产品简介 :" prop="product.productInfo">
	                    <el-input v-model.trim="ruleForm.product.productInfo"   auto-complete="new-password" type="textarea" 	 placeholder="请输入产品简介"></el-input>
	                </el-form-item>
	                <el-form-item label="产品描述 :" prop="product.productDescribe">
	                    <el-input v-model.trim="ruleForm.product.productDescribe"   auto-complete="new-password" type="textarea"  	 placeholder="请输入产品描述"></el-input>
	                </el-form-item>
                     <h3 class="marT30">借款信息</h3>
                      <div class="formItemLine">
                    	<el-form-item label="利率类型 :" prop="borrowInfo.interestType">
	                        <!--<el-input v-model.trim="ruleForm.borrowInfo.interestType"   auto-complete="new-password"  placeholder="请输入所需资料"></el-input>-->
	                        <el-select style="width: 100%" v-model="ruleForm.borrowInfo.interestType" multiply placeholder="请选择利率类型">
                                    <el-option v-for="(item,index) in interestTypeList" :key="index" :label="item" :value="item"></el-option>
                            </el-select>
	                    </el-form-item>
	                    <el-form-item label="利率值 :" prop="borrowInfo.interestValue">
	                        <el-input v-model.trim="ruleForm.borrowInfo.interestValue"  type="number"  min="0"  auto-complete="new-password"  placeholder="请输入百分比"></el-input>
	                    </el-form-item>
	                    <el-form-item label="放款速率"  prop="borrowInfo.quatoUnit">
	                    	<el-input v-model.trim="ruleForm.borrowInfo.loanQuotaMin"  type="number"  min="0"   auto-complete="new-password"  style="width: 92px;"	 ></el-input>
	                    	~
	                    	<el-input v-model.trim="ruleForm.borrowInfo.loanQuotaMax" type="number"  min="0"   auto-complete="new-password"  style="width: 92px;"	></el-input>
		                    <el-select  placeholder="请选择放款速率单位" v-model="ruleForm.borrowInfo.quatoUnit" style="width:80px">
							    <el-option label='分钟' :value="1"></el-option>
							    <el-option label='小时' :value="60"></el-option>
							 </el-select>
		                  </el-form-item>
                    </div>
                    <div class="formItemLine">
	                    <el-form-item label="贷款额度"   prop="borrowInfo.limitUnit">
	                    	<el-input v-model.trim="ruleForm.borrowInfo.limitMoneyMin"  type="number"  min="0"  auto-complete="new-password"  style="width: 92px;"	 ></el-input>
	                    	~
	                    	<el-input v-model.trim="ruleForm.borrowInfo.limitMoneyMax"    type="number"  min="0" auto-complete="new-password"  style="width: 92px;"	></el-input>
	                    	 <el-select  placeholder="请选择贷款额度单位"  v-model="ruleForm.borrowInfo.limitUnit"   style="width:80px">
							    <el-option label='元' :value="1"></el-option>
							    <el-option label='万元' :value="10000"></el-option>
							 </el-select>
	                    </el-form-item>
	                    <el-form-item label="贷款期限"   prop="borrowInfo.periodUnit">
	                    	<el-input v-model.trim="ruleForm.borrowInfo.loanPeriodMin"   type="number"  min="0"   auto-complete="new-password"  style="width: 92px;"	 ></el-input>
	                    	~
	                    	<el-input v-model.trim="ruleForm.borrowInfo.loanPeriodMax"   type="number"  min="0" auto-complete="new-password"  style="width: 92px;"	></el-input>
	                    	 <el-select v-model="ruleForm.borrowInfo.periodUnit" placeholder="请选择贷款期限单位"  style="width:80px">
							    <el-option label='日' :value="1"></el-option>
							    <el-option label='月' :value="30"></el-option>
							    <el-option label='年' :value="360"></el-option>
							 </el-select>
	                    </el-form-item>
                    </div>
                </el-form>
			  </div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="sureAdd('ruleForm')">确 定</el-button>
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
        	productCategoryId:'',
        	productName:""
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
        	product:{
        		"applyNum": "",
			    "applyRequire": "",
			    "categoryName": "",
			    "logo": "",
			    "paymentType": "",
			    "plateId": [],
			    "productCategoryId": "",
			    "productDescribe": "",
			    "productInfo": "",
			    "productLink": "",
			    "productName": "",
			    "requireInfo": "",
			    "status": "",
			    "type": "",
			    "weight": "",
        	},
        	borrowInfo:{
				    "interestType": "",
				    "interestValue": "",
				    "lendingRateMax": "",
				    "lendingRateMin": "",
				    "loanPeriodMax": "",
				    "loanPeriodMin": "",
				    "loanQuotaMax": "",
				    "loanQuotaMin": "",
				    "periodUnit":"",
				    "limitUnit":"",
				    "quatoUnit":""
        	}
        },
        rules: {
          "product.productName": [{
            required: true,
            message:"请输入产品名称",
            trigger: 'blur'
          }],
          "product.applyNum": [{
            required: true,
            message:"请输入申请人数",
            trigger: 'blur'
          }],
          "product.weight": [{
            required: true,
            message:"请输入权重",
            trigger: 'blur'
          }],  
          "product.paymentType": [{
            required: true,
            message:"请输入还款方式",
            trigger: 'blur'
          }],  
          "product.productLink": [{
            required: true,
            message:"请输入产品链接",
            trigger: 'blur'
          }],  
          "product.applyRequire": [{
            required: true,
            message:"请输入申请条件",
            trigger: 'blur'
          }],
          "product.requireInfo": [{
            required: true,
            message:"请输入所需条件",
            trigger: 'blur'
          }],
          "product.productCategoryId": [{
            required: true,
            message:"请选择产品类型",
            trigger: 'blur'
          }],
          "product.plateId": [{
            required: true,
            message:"请选择所属板块",
            trigger: 'blur'
          }],
          
          "borrowInfo.interestType": [{
            required: true,
            message:"请选择利率类型",
            trigger: 'blur'
          }],
          "borrowInfo.interestValue": [{
            required: true,
            message:"请输入利率值",
            trigger: 'blur'
          }],
          "borrowInfo.quatoUnit": [{
            required: true,
            message:"请选择放款速率单位",
            trigger: 'blur'
          }],
          "borrowInfo.periodUnit": [{
            required: true,
            message:"请选择贷款额度单位",
            trigger: 'blur'
          }],
          "borrowInfo.limitUnit": [{
            required: true,
            message:"请选择贷款期限单位",
            trigger: 'blur'
          }],
        },
       	interestTypeList:['日利率','月利率','年利率']
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
    	handleClose(){
    		this.ruleForm={
	        	product:{
	        		"applyNum": "",
				    "applyRequire": "",
				    "categoryName": "",
				    "logo": "",
				    "paymentType": "",
				    "plateId": [],
				    "productCategoryId": "",
				    "productDescribe": "",
				    "productInfo": "",
				    "productLink": "",
				    "productName": "",
				    "requireInfo": "",
				    "status": "",
				    "type": "",
				    "weight": "",
	        	},
	        	borrowInfo:{
					    "interestType": "",
					    "interestValue": "",
					    "lendingRateMax": "",
					    "lendingRateMin": "",
					    "loanPeriodMax": "",
					    "loanPeriodMin": "",
					    "loanQuotaMax": "",
					    "loanQuotaMin": "",
					    "limitMoneyMin":"",
					    "limitMoneyMax":""
	        	}
	        }
    	},
    	formats(row){
    		for(let i of this.typeList){
    			if(row.productCategoryId==i.id){
    				return i.categoryName
    			}
    		}
    	},
    	fnUploadRequest(option){
			var reader = new FileReader();
		    reader.readAsDataURL(option.file);
		    const that=this;
		    reader.onload = function (e) {
		    	that.$api.product.uploadImg({
		    		"base64":e.target.result.split("base64,")[1]
		    	}).then((res)=>{
		    		that.ruleForm.product.logo=res.data	
		    	})
		    }
		},
      sureAdd(formName){
      	 this.$refs[formName].validate((valid) => {
          if (valid) {
          	   	if(!this.ruleForm.product.logo){
          	   		return this.$message.warning("请先选择logo")
          	   	}
          	   	if(!this.ruleForm.borrowInfo.limitMoneyMax||!this.ruleForm.borrowInfo.limitMoneyMin|!this.ruleForm.borrowInfo.loanPeriodMin||!this.ruleForm.borrowInfo.loanPeriodMax||!this.ruleForm.borrowInfo.loanQuotaMin||!this.ruleForm.borrowInfo.loanQuotaMax){
          	   		return this.$message.warning("请输入完整的借款信息")
          	   	}
          	   	let arr=[];
	          	for(let i of this.plateList){
	          		for(let  k of this.ruleForm.product.plateId){
	          			if(i.id===k){
	          				arr.push(`${i.plateName}`)
	          			}
	          		}
	          	}
	          	this.ruleForm.product.plateName=arr.join(",");
	          	this.ruleForm.product.plateId=this.ruleForm.product.plateId[0];
          	  	if(this.actionType){
		      		this.$api.product.addLoanProduct(this.ruleForm).then((res)=>{
		      			this.$message.success("新增成功");
		      			this.readyAjax();
		      			this.dialogVisible=false;
		      		})
		      	}else{
		      		this.$api.product.editLoanProduct(this.ruleForm).then((res)=>{
		      			this.$message.success("编辑成功");
		      			this.readyAjax();
		      			this.dialogVisible=false;
		      		})
		      	}
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      showAdd(actionType,row){
      	this.actionType=actionType;
      	if(!actionType){
      		this.$api.product.getLoanProductDetail({
      			productId:row.id
      		}).then((res)=>{
      			this.ruleForm={...res.data};
      			let arr=this.ruleForm.product.plateName?this.ruleForm.product.plateName.split(","):[];
	      		this.ruleForm.product.plateId=[]
	      		for(let i of this.plateList){
	      			for(let j of arr){
	      				if(j==i.plateName){
	      					
	      					this.ruleForm.product.plateId.push(i.id)
	      				}
	      			}
	      		}	      		
      		}).catch((e)=>{
      			console.log(e)
      			this.$message.error(e.msg)
      		})
      	}
      	this.dialogVisible=true
      },
      downProduct(row){
      	this.$toolkit.showConfrim('确定要下架此产品吗？','提示').then(()=>{
          this.$api.product.LoanUndercarriage(row.id).then(()=>{
            this.$message.success("产品下架成功!");
            this.readyAjax()
          })
        })
      },
      upProduct(row){
      	this.$toolkit.showConfrim('确定要上架此产品吗？','提示').then(()=>{
          this.$api.product.LoanUpcarriage(row.id).then(()=>{
            this.$message.success("产品上架成功!");
            this.readyAjax()
          })
        })
      },
      delLoan(row){
      	this.$toolkit.showConfrim('确定要删除此贷款类产品吗？','提示').then(()=>{
          this.$api.product.delLaonProduct(row.id).then(()=>{
            this.$message.success("产品删除成功!");
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
        this.$api.product.getLoanProduct_list({
          ...this.tableForm,
          pageNum:this.currentPage,
          pageSize:this.pageSize
        }).then((res)=>{
          this.okOrderList=res.data.list;
          this.condition=res.data.condition
          this.total=res.data.total
        })
      },
      getProductTypeList(){
      	this.$api.channel.getProductTypeList().then((res)=>{
      		this.typeList=res.data;
      	})
      },
      getProductPlateList(){
      	this.$api.channel.getProductPlateList().then((res)=>{
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
