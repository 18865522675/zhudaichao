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
                   		 <el-button  icon="el-icon-plus"  class="plusBtn" @click="dialogVisible=true">新增产品</el-button>
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
                                <el-button size="mini" plain class="aplus-pribtn" @click="delChannel(scope.row)" >编辑</el-button>
                                <el-button size="mini" plain class="aplus-errorBtn" @click="downProduct(scope.row)" >下架</el-button>
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
    methods: {
      downProduct(row){
      	this.$toolkit.showConfrim('确定要下架此产品吗？','提示').then(()=>{
          this.$api.product.LoanUndercarriage({
          	productId:row.id
          }).then(()=>{
            this.$message.success("产品下架成功!");
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
      }

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

</style>
