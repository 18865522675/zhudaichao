<template>
    <div>
        <el-card class="box-card merchantCharge affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>超级管理员充值</span>
            </div>
                <div class="listContent marT10">
                            <el-table
                                    border
                                    class="cardTable marT20"
                                    ref="multipleTable"
                                    :data="tableData"
                                    tooltip-effect="dark"
                                    style="width: 100%">
                                <el-table-column
                                        prop="partnerName"
                                        show-overflow-tooltip
                                        label="用户">
                                </el-table-column>
                                <el-table-column
                                        prop="nowMoney"
                                        show-overflow-tooltip
                                        label="余额">
                                </el-table-column>
                                <el-table-column
                                        prop="payMoney"
                                        label="操作"
                                        show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button size="mini" plain class="aplus-pribtn" @click="showCharge(scope.row)"  v-if="btnStr.indexOf('充值')>-1">充值</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                </div>

            <el-dialog
                    title="充值"
                    :visible.sync="dialogVisible"
                    width="30%">
                <div>
                    <div class="form-body">
                        <el-form ref="form" :model="form"  :rules="rules" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="金额" prop="payMoney">
                                <el-input v-model.trim="form.payMoney" placeholder="请输入充值金额">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addThirdMoney('form')">确 定</el-button>
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
        tableData: [],
        dialogVisible:false,
        form:{},
        actionRow:{},
        rules: {
          payMoney: [
            { required: true, message: "请输入充值金额", trigger: "blur" },
          ],
        },
      };
    },
    mounted() {
      this.getPayList()
    },
    components:{
    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    watch:{
    },
    methods: {
      getPayList(){
        this.$api.charge.getPayList().then((res)=>{
            this.tableData=res.data
        }).catch((e)=>{
          this.$message.error("获取超级管理员列表失败")
        })
      },
      showCharge(row){
        this.dialogVisible=true;
        this.actionRow=Object.assign({},row);
      },
      addThirdMoney(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.charge.addThirdMoney({
              partnerId:this.actionRow.partnerId,
              ...this.form
            }).then(()=>{
                this.getPayList();
                this.$message.success("充值成功");
                this.dialogVisible=false;
            }).catch(()=>{
              this.$message.error("充值失败")
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

</style>
