<template>
    <div class="recordWrap">
        <div class="recordWrap-header flex-r" style="justify-content: space-between">
            <div class="title">
                {{title}}
            </div>
            <div class="addBtn flex-r" v-if="showAdd" @click="addRecord">
                <div class="addIcon">
                    <i class="el-icon-plus"></i>
                </div>
                <span>新增</span>
            </div>
        </div>
        <div class="recordList">
            <div class="recordItem"  v-show="addFlag">
                <div  class="recordItem-body marT10 flex-r">
                    <span class="remarkTip">备注 : </span>
                    <el-input type="textarea" class="recordInp" placeholder="请填写备注。。。"   v-model.trim="addRecordForm.remark"  :rows="3"></el-input>
                </div>
                <div style="margin: 10px;padding-left: 46px">
                    <el-button type="primary" size="mini" @click="SureAddRecord" style="background: #738ef7">保存</el-button>
                    <el-button type="default" size="mini" @click="cancelSave">取消</el-button>
                </div>
            </div>
            <div class="recordItem" v-for="(item,index) in data" :key="index">
                <div class="flex-r recordItem-header">
                    <div>
                        <span>负责人</span> :  {{item.userName}}
                    </div>
                    <div>
                        <span>订单ID</span> :  {{item.orderId}}
                    </div>
                    <div>
                        <span>创建时间</span> :  {{$toolkit.formatTime(item.createTime,false)}}
                    </div>
                </div>
                <div  class="clear">
                    <span  class="remarkTip">备 注 : </span>
                    <div class="remark">
                        {{item.remark}}
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
  export default {
    name: 'recordComponent',
    data () {
      return {
        addFlag:false,
        addRecordForm:{}
      }
    },
    mounted () {
    },
    methods: {},
    props: {
      title: {  // 必须提供字段
        required: true,
        default:""
      },
      showAdd: {  // 必须提供字段
        required: true,
        default:false
      },
      data: {  // 必须提供字段
        required: true,
        default:[]
      },
      orderId: {  // 必须提供字段
        required: true,
        default:""
      },

    },
    created () {
    },
    methods:{
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
        let url="";
        if(!this.addRecordForm.remark){
          return this.$message.warning("添加时请填写备注!")
        }
        switch (this.title) {
          case '审核记录':url='addOrderShenhe';break;
          case '放款记录':url='addOrderFangkuan';break;
          case '催记记录':url='addOrderCuiji';break;
        }
        this.$api.audit[url]({
          ...this.addRecordForm,
          orderId:this.orderId
        }).then(()=>{
          this.$message.success("添加成功");
          this.resetAddInfo()
          this.$nextTick(()=>{
            this.$emit("regetdata",this.title)
          })
        }).catch(()=>{
          this.$message.error("添加失败")
        })

      }
    },
    destoryed () {
    }
  }
</script>

<style scoped lang="less">
.recordWrap{
    box-sizing: border-box;
    padding: 20px;
    .title{
        font-weight: bold;
        font-size: 18px;
        color:black;

    }
    .recordList{
        height: 600px;
        overflow-y: auto;
        .recordItem{
            box-sizing: border-box;
            padding: 20px 20px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            .recordItem-header{
                span{
                    font-weight: bold;
                }
                line-height: 50px;
                &>div:not(:first-child){
                    margin-left: 80px;
                }
            }
            margin-top: 20px;
        }
        .remark{
            padding-top: 2px;
            float: left;
            margin-left: 15px;
            width: calc( 100% - 60px);
        }
        .recordInp{
            float: left;
            margin-left: 15px;
            width: calc( 100% - 60px);
        }
        .remarkTip{
            font-weight: bold;
            color: #e22505;display: inline-block;float: left;
        }
    }
    .addBtn{
        align-items: center;
        span{
            font-weight: bold;
            font-size: 16px;
        }
        .addIcon{
            margin-right: 8px;
            width: 20px;
            height: 20px;
            font-size: 15px;
            text-align: center;
            line-height: 20px;
            color:white;
            font-weight: bold;
            border-radius: 50%;
            background: #718ef2;
        }
    }
}
</style>
