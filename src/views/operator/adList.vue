<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>广告位管理</span>
            </div>
            <!--<span class="smallSpan">认证状态</span>-->
            <!--<el-select  v-model="tableForm.authStatus"  @change="readyAjax" class="aplus-sel"    placeholder="请选择沟通状态" style="width: 100%">-->
            <!--<el-option-->
            <!--v-for="item in authList"-->
            <!--:key="item.value"-->
            <!--:label="item.name"-->
            <!--:value="item.id">-->
            <!--</el-option>-->
            <!--</el-select>-->

            <div class="cardBody">
                <el-row type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                    <el-button  icon="el-icon-plus" style="margin-left: 25px;" class="plusBtn" @click="showAdd(true)">新增广告位</el-button>
                    <!--19BE6B-->
                </el-row>


                <div class="listContent marT20">
                    <el-table
                            border
                            class="cardTable marT20"
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%">
                        <el-table-column
                                prop="bannerName"
                                label="广告名称">
                        </el-table-column>
                        <el-table-column
                                prop="imageUrl"
                                label="广告图片">
                        </el-table-column>
                        <el-table-column
                                prop="loginName"
                                label="是否跳转"
                                show-overflow-tooltip >
                         <template slot-scope="scope">
                         	{{scope.row.linkUrl?'是':'否'}}
                         </template>
                        </el-table-column>
                        <!--<el-table-column
                                prop="linkUrl"
                                label="广告位置"
                                show-overflow-tooltip >
                        </el-table-column>-->
                        <!--<el-table-column
                                prop="remark"
                                label="备注"
                                show-overflow-tooltip >
                        </el-table-column>-->
                        <el-table-column
                                prop="payMoney"
                                label="操作"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button size="mini" plain class="aplus-pribtn" @click="showAdd(false,scope.row)" >编辑</el-button>
                                <el-button size="mini" plain class="aplus-errorBtn" @click="delAd(scope.row)" >删除</el-button>
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
                    width="30%"
                    @close="handleClose">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                	<el-form-item label="广告图片 :">
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
                    <!--<el-form-item label="是否跳转 :" prop="loginName">
                        <el-input v-model.trim="ruleForm.loginName"    auto-complete="new-password"  placeholder="请输入账号(由数字和字母组成)"></el-input>
                    </el-form-item>-->
                    <el-form-item label="广告名称 :" prop="bannerName">
                    <el-input v-model.trim="ruleForm.bannerName"   auto-complete="new-password"  placeholder="请输入广告名称"></el-input>
                    </el-form-item>
                    <el-form-item label="跳转链接 :" prop="linkUrl">
                    <el-input v-model.trim="ruleForm.linkUrl"   auto-complete="new-password"  placeholder="请输入跳转链接"></el-input>
                    </el-form-item>
                    <el-form-item label="广告类型 :" prop="type">
                    	        <el-input v-model.trim="ruleForm.type"   auto-complete="new-password" 	 placeholder="请输入广告类型"></el-input>
                    </el-form-item>
                    <el-form-item label="是否上架 :" prop="status">
                    	  <el-radio v-model="ruleForm.status" :label="1">是</el-radio>
  						  <el-radio v-model="ruleForm.status" :label="0">否</el-radio>
                    </el-form-item>
                    <el-form-item label="备注 :" prop="title">
                    <el-input v-model.trim="ruleForm.title"   auto-complete="new-password"  type="textarea" placeholder="请输入备注 "></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAd('ruleForm')">确 定</el-button>
              </span>
            </el-dialog>




        </el-card>

    </div>
</template>
<script>

  import OSS from "ali-oss"
  import { mapState } from 'vuex';
  export default {
    name: "channelList",
    data() {
      var validateLoginName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入渠道商名称'));
        } else {
          let reg=/[\W]/g
          if (reg.test(value)) {
            return callback(new Error('格式不正确，只能输入数字和字母'));
          }else{
            return callback();
          }
        }
      };
      return {
        tableForm:{
          time:"",
          imageUrl:"",
          title:"",
          type:"",
          status:1	,
          bannerName:""
        },
        dialogVisible:false,
        ruleForm:{
        	status:1
        },
        currentPage:1,
        pageSize:10,
        loginName:"",
        tableData:[],
        rules: {
          linkUrl: [{
            required: true,
            message:"请输入跳转链接",
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message:"请输入广告类型",
            trigger: 'blur'
          }],
          bannerName: [{
            required: true,
            message:"请输入广告名称",
            trigger: 'blur'
          }],
          
         
        },
        total:0,
        client:null,
        actionType:true
      }
    },
    mounted() {
    	 this.client = new OSS({
          region: "oss-cn-shanghai",
          accessKeyId: 'LTAI1aqBIXNSxkkM',//填入自己的id
          accessKeySecret: 'Bg6YQOpE0mEUdLXl5yQKuoyfarTlqi',//填入自己的id
          bucket: 'doudouqianqian'
      })
        this.getAdList()
    },
    components:{
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    watch:{
      "loginName":function(n){
        if(!n){
          this.readyAjax()
        }
      }
    },
    methods: {
    	showAdd(actionType,row){
    		this.actionType=actionType;
    		if(!actionType){
    			this.ruleForm={...row}
    		}
    		this.dialogVisible=true
    	},
    	fnUploadRequest(option){
    		console.log(option)
    		    this.client.put('banner', option.file).then((val) => {
		         	console.log(val)
		        }, err => {
		        })
			console.log(option.file)
    	},
      changeInp(val){
        console.log(val)
        // value=value.replace(/[\W]/g,'')
      },
      handleClose(){
        this.ruleForm={};
      },
      reset(){
        this.loginName="";
        this.readyAjax()
      },
      readyAjax(){
        this.currentPage=1;
        this.pageSize=10;
        this.getAdList()
      },
      getAdList(){
        this.$api.channel.getAdList({
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          loginName:this.loginName
        }).then((res)=>{
          this.tableData=res.data.list;
          this.total=res.data.total
        })
      },
      handleCurrentChange(val){
        this.currentPage=val;
        this.getAdList()
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getAdList()
      },
      delAd(row){
      	this.$toolkit.showConfrim('确定要删除此广告位吗？','提示').then(()=>{
          this.$api.channel.delAd(row.id).then(()=>{
            this.$message.success("广告位删除成功！");
            this.readyAjax()
          })
        })
      },
      addAd(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	let url=this.actionType?'addAd':'editAd';
            this.$api.channel[url](this.ruleForm).then(()=>{
              this.$message.success("广告位添加成功!");
              this.readyAjax();
              this.dialogVisible=false
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

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
</style>
