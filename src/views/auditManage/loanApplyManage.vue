<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>贷款申请管理</span>
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
                <!--<el-row type="flex" class="row-bg" style="flex-wrap: wrap" :gutter="50">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">机审结果</span>
                            <el-select  v-model="tableForm.isRefuseReason" class="aplus-sel"    placeholder="请选择机审结果" style="width: 100%">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="通过" value="1"></el-option>
                                <el-option label="不通过" value="0"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan">用户身份</span>
                            <el-select  v-model="tableForm.label"   class="aplus-sel"    placeholder="请选择用户身份" style="width: 100%">
                               <el-option label="全部" value=""></el-option>
                                <el-option label="普通用户" :value="1"></el-option>
                                <el-option label="优质用户" :value="2"></el-option>
                                <el-option label="逾期用户" :value="3"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <span class="smallSpan bigSpan" style="width: 80px!important;">下单时间  </span>
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
                    </el-col>
                </el-row>
                <el-row class="marT30">
                    <el-col :span="7">
                        <div class="flex-r global-childItem">
                            <el-input placeholder="请输入号码/姓名/渠道"  v-model.trim="tableForm.parameter" class="aplus-norInp"></el-input>
                        </div>
                    </el-col>
                    <el-col span="7">
                        <el-button type="primary" icon="el-icon-search" class="reloadBtn marL10" @click="readyAjax">查询</el-button>
                        <el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                    </el-col>
                </el-row>-->



                <div class="cardBodyHeader">
                    <div class="topTableForm">
                        <div class="topTableForm-item">
                            <span>机审结果 : </span>
                             <el-select  v-model="tableForm.isRefuseReason" class="aplus-sel"    placeholder="请选择机审结果" style="width: 100%">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="通过" value="1"></el-option>
                                <el-option label="不通过" value="0"></el-option>
                          	  </el-select>
                        </div>
                        <div class="topTableForm-item">
                            <span>用户身份 : </span>
                            <el-select  v-model="tableForm.label"   class="aplus-sel"    placeholder="请选择用户身份" style="width: 100%">
                               <el-option label="全部" value=""></el-option>
                                <el-option label="普通用户" :value="1"></el-option>
                                <el-option label="优质用户" :value="2"></el-option>
                                <el-option label="逾期用户" :value="3"></el-option>
                            </el-select>
                        </div>
                        <div class="topTableForm-item topTableForm-timeSel">
                            <span>下单时间 :</span>
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
                        	<span>字段查询	 :</span>
                            <el-input placeholder="请输入号码/姓名/渠道"  v-model.trim="tableForm.parameter" class="aplus-norInp"></el-input>
                        </div>
                        <div class="topTableForm-item-actions">
                            <el-button type="primary" icon="el-icon-search" class="reloadBtn marL10" @click="readyAjax">查询</el-button>
                            <el-button type="default" icon="el-icon-refresh" class="reloadBtn resetBtns" @click="reset">重置</el-button>
                        </div>
                    </div>
                </div>


                <div class="tabCardInner">
                    <div class="listContent marT60">
                        <div class="flex-r" style="justify-content: space-between;padding:10px">
                            <div>
                                <el-button size="mini" type="primary"  @click="showFenpei"   v-if="btnStr.indexOf('分配')>-1">分配</el-button>
                                <el-button size="mini" type="primary"  @click="giveoutAllDialogVisible=true"   v-if="btnStr.indexOf('一键分配')>-1">一键分配</el-button>
                                <!--<el-button size="mini" type="primary" @click="multiAction(1)">退回</el-button>-->
                            </div>
                            <div class="flex-r" style="align-items: center">
                                <div>
                                    <span class="totalInfo">总金额</span> : <span style="color:red">{{borrowMoney}}</span>
                                </div>
                                <div style="margin-left: 30px">
                                    <span class="totalInfo">总人数</span> : <span style="color:red">{{total}}</span>
                                </div>
                            </div>
                        </div>
                        <el-table
                                border
                                class="cardTable marT20"
                                :data="dataList"
                                tooltip-effect="dark"
                                style="width: 100%"  @selection-change="handleSelectionChange">
                            <el-table-column
                                    type="selection"
                                    width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="lianPayNum"
                                    label="会员信息	" width="150">
                                <template slot-scope="scope">
                                    {{scope.row.user.userName + ' / ' +scope.row.user.phone}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="limitDays"
                                    label="贷款期限">
                            </el-table-column>
                            <el-table-column
                                    prop="borrowMoney"
                                    label="贷款金额"
                                    show-overflow-tooltip>
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
                                    label="申请借款时间"
                                    show-overflow-tooltip >
                            </el-table-column>
                            <el-table-column
                                    prop="user.channelName"
                                    label="渠道"
                                    show-overflow-tooltip >
                            </el-table-column>
                            <el-table-column
                                    prop="authour"
                                    label="负责人" :formatter="$toolkit.transForNo"
                                    show-overflow-tooltip >
                            </el-table-column>
                            <el-table-column
                                    prop="label"
                                    label="用户身份"
                                    show-overflow-tooltip >
                                <template slot-scope="scope">
                                    <span style="display: inline-block;width: 80px;border-radius: 5px;color:white" :style="{'backgroundColor':['rgba(0,0,0,0.2)','green','red'][Number(scope.row.user.label-1)]}">{{scope.row.user.label==1?'普通用户':scope.row.user.label==2?'优质用户':'逾期用户'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="noAgree"
                                    label="机审结果"
                                    show-overflow-tooltip >
                                <template slot-scope="scope">
                                    <el-tooltip class="item" effect="dark" :content="scope.row.noAgree" placement="top" v-if="scope.row.noAgree">
                                        <span style="color:#23527c">查看</span>
                                    </el-tooltip>
                                    <span v-else>机审通过</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作" width="460">
                                <template slot-scope="scope">
                                    <!--<el-button size="mini" plain class="aplus-pribtn">查看认证信息</el-button>-->
                                    <el-button size="mini" plain class="aplus-pribtn" @click="$router.push(`/userInfoDetail/${scope.row.userId}/${scope.row.id}/${scope.row.user.userName}/${scope.row.user.phone}`)">查看认证详情</el-button>
                                    <el-button size="mini" plain class="aplus-pribtn" @click="showOrderDetail(scope.row)"   v-if="btnStr.indexOf('订单详情')>-1">订单详情</el-button>
                                    <el-button size="mini" plain class="aplus-pribtn" @click="passAction(scope.row)"   v-if="btnStr.indexOf('同意')>-1">同意</el-button>
                                    <el-button size="mini" plain class="aplus-errorBtn" @click="showRefuse(scope.row)"   v-if="btnStr.indexOf('拒绝')>-1">拒绝</el-button>
                                    <el-dropdown split-button type="primary"  split-button="true" :divided="true" class="moreActionSel" >
                                        <span>更多操作</span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item  @click.native="$router.push(`/auditManage/auditInfoDetail/${scope.row.id}`)"   v-if="btnStr.indexOf('详情')>-1">详情</el-dropdown-item>
                                            <el-dropdown-item @click.native="showloanUpdateMoney(scope.row)"   v-if="btnStr.indexOf('修改额度')>-1">修改额度</el-dropdown-item>
                                            <el-dropdown-item  @click.native="showCloseOrders(scope.row.id)"   v-if="btnStr.indexOf('关闭订单')>-1">关闭订单</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>

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
                </div>


            <el-dialog
                    title="结清"
                    :visible.sync="dialogVisible"
                    width="30%">
                <div>
                    <div class="form-body">
                        <el-form ref="jieqingForm" :model="jieqingForm"  :rules="rules" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="结清总金额" prop="money">
                                <el-input v-model.trim="jieqingForm.money" placeholder="请输入结清总金额">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="其中滞纳金" prop="overMoney">
                                <el-input v-model.trim="jieqingForm.overMoney" placeholder="请输入其中滞纳金">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model.trim="jieqingForm.password" placeholder="请输入结清密码">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="jieqingAction('jieqingForm')">确 定</el-button>
              </span>
            </el-dialog>
        </el-card>


        <el-dialog
                title="续期"
                :visible.sync="xuqiDialogVisible"
                width="30%">
            <div>
                <div class="form-body">
                    <el-form ref="xuqiForm" :model="xuqiForm"  :rules="xuqiRules" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="续期天数">
                            <el-input  :disabled="true" value="7">
                                <template slot="append">天</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="续期总费用" prop="money">
                            <el-input v-model.trim="xuqiForm.money" placeholder="请输入续期总费用">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <!--<el-form-item label="其中滞纳金" prop="overMoney">-->
                            <!--<el-input v-model.trim="xuqiForm.overMoney" placeholder="请输入其中滞纳金">-->
                                <!--<template slot="append">元</template>-->
                            <!--</el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item label="密码" prop="password">
                            <el-input v-model.trim="xuqiForm.password" placeholder="请输入续期密码">
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="xuqiDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="xuqiAction('xuqiForm')">确 定</el-button>
              </span>
        </el-dialog>



        <!--分配-->
        <el-dialog
                title="分配"
                :visible.sync="fenpeiDialogVisible"
                width="30%">
            <div>
                <div class="form-body">
                    <el-form ref="fenpeiForm" :model="fenpeiForm"  :rules="fenpeiRules"  label-width="100px" class="demo-ruleForm">
                        <el-form-item label="审核人员" prop="userId">
                            <!--<el-select style="width: 100%" filterable v-model="fenpeiForm.userId" placeholder="请选择审核人员">-->
                                <!--<el-option v-for="(item,index) in fenpeiPeople" :key="index" :value="item.id" :label="item.userName"></el-option>-->
                            <!--</el-select>-->

                            <el-select v-model="fenpeiForm.userId" class="aplus-sel"  style="width: 100%" filterable  placeholder="请选择审核人员">
                                <!--<el-option value="" label="全部"></el-option>-->
                                <el-option-group
                                        v-for="(group,index) in fenpeiPeople"
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
                <el-button @click="fenpeiDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="fenpeiAction('fenpeiForm')">确 定</el-button>
              </span>
        </el-dialog>


        <!--一件分配-->
        <el-dialog
                title="一键分配"
                :visible.sync="giveoutAllDialogVisible"
                width="30%">
            <div>
                <div class="form-body">
                    <el-form ref="giveoutAllForm" :model="giveoutAllForm" :rules="giveoutAllRules" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="审核人员" prop="userIdPre">
                            <!--<el-select style="width: 100%" filterable v-model="giveoutAllForm.userIdPre" placeholder="请选择审核人员" multiple>-->
                                <!--<el-option v-for="(item,index) in fenpeiPeople" :key="index" :value="item.id" :label="item.userName"></el-option>-->
                            <!--</el-select>-->
                            <el-select v-model="giveoutAllForm.userIdPre"  multiple  class="multi-sel" style="width: 100%" filterable  placeholder="请选择审核人员">
                                <!--<el-option value="" label="全部"></el-option>-->
                                <el-option-group
                                        v-for="(group,index) in fenpeiPeople"
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
                <el-button @click="giveoutAllDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="giveoutAll('giveoutAllForm')">确 定</el-button>
              </span>
        </el-dialog>


        <!--修改额度-->
        <el-dialog
                title="修改额度"
                :visible.sync="loanUpdateMoneyVisible"
                width="30%">
            <div>
                <div class="form-body">
                    <el-form ref="updateForm" :model="updateForm"  :rules="updateRules" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="额度" prop="money">
                            <el-input v-model.trim="updateForm.money" placeholder="请输入修改后的额度">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="loanUpdateMoneyVisible = false">取 消</el-button>
                <el-button type="primary" @click="loanUpdateMoney('updateForm')">确 定</el-button>
              </span>
        </el-dialog>


        <!--拒绝额度-->
        <el-dialog
                title="拒绝"
                :visible.sync="refuseVisible"
                width="700px">
            <div>
                <div class="form-body">
                    <div class="flex-r" style="justify-content: space-around">
                        <div v-for="(item,index) in refuseReasonList" :key="index" class="refuseItem" @click="refuseForm.refuse=item.name">
                            {{item.name}}
                        </div>
                    </div>
                    <el-form ref="refuseForm" :model="refuseForm"  :rules="refuseRules" label-width="0px" class="demo-ruleForm marT30">
                        <el-form-item  prop="refuse">
                            <el-input v-model="refuseForm.refuse" placeholder="请输入拒绝原因" type="textarea" :rows="8"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="refuseVisible = false">取 消</el-button>
                <el-button type="primary" @click="loanRefuseOrder('refuseForm')">确 定</el-button>
              </span>
        </el-dialog>


        <!--会员详情弹窗-->
        <el-dialog
                title="订单详情"
                :visible.sync="orderDetailVisible"
                width="70%"
                ref="memberDialog"
                style="height: 100%;"
                class="animated memberDialog" :close-on-press-escape="true">
            <div>
                <div class="memberDialog-body">
                    <div class="head-body-info">
                        <div class="Detailtitle">
                            主要信息
                        </div>
                        <el-row>
                            <el-col :span="6">
                                会员名称 : {{actionRow.user.userName}}
                            </el-col>
                            <el-col :span="6">
                                电话号码 : {{actionRow.user.phone}}
                            </el-col>
                            <el-col :span="6">
                                会员来源 : {{actionRow.channelName?actionRow.channelName:'无'}}
                            </el-col>
                            <el-col :span="6">
                                会员身份 : {{actionRow.label==1?'普通用户':actionRow.label==2?'优质用户':'逾期用户'}}
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div class="marT30 detailInfoBody flex-r">
                    <div class="detailBody-left">
                        <div class="Detailtitle" style="padding-left: 10px">
                            订单操作
                        </div>
                        <div class="detailBody-left-item" @click="detailTab=1" :class="{'detailBody-left-item-active':detailTab==1}">
                            <div>
                                呼叫记录
                            </div>

                        </div>
                        <div class="detailBody-left-item" @click="detailTab=2" :class="{'detailBody-left-item-active':detailTab==2}">
                            <div>
                                审核记录
                            </div>
                        </div>
                        <div class="detailBody-left-item" @click="detailTab=3" :class="{'detailBody-left-item-active':detailTab==3}">
                            <div>
                                放款记录
                            </div>
                        </div>
                        <div class="detailBody-left-item" @click="detailTab=4" :class="{'detailBody-left-item-active':detailTab==4}">
                            <div>
                                催记记录
                            </div>
                        </div>
                    </div>
                    <div class="detailBody-right">
                        <div v-show="detailTab==1" class="detailBody-right-item dailWrap">
                            <div class="dailWrapHeader">
                                <div  class="Detailtitle" style="padding-left: 20px">
                                    通话信息
                                </div>
                            </div>
                            <div class="dailWrapBody">
                                <div class="flex-r dailWrapBody-header">
                                    <div>
                                        会员名称 : <span>张三</span>
                                    </div>
                                    <div>
                                        身份证后四位 : <span>3365</span>
                                    </div>
                                    <div>
                                        借款意愿 : <span>愿意</span>
                                    </div>
                                    <div>
                                        呼叫状态 : <span>呼叫成功</span>
                                    </div>
                                    <div>
                                        呼叫时间 : <span>2018-01-10 13:00</span>
                                    </div>
                                </div>
                                <div class="dailWrapBody-playAudio">
                                    <audio src="ddd"></audio>
                                </div>
                                <div class="dialogPhoto flex-r marL10">
                                    <div class="flex-r" style="align-items: center">
                                        <div class="photo photoRobot"></div>
                                        <span>AI客服</span>
                                    </div>
                                    <div class="flex-r" style="align-items: center">
                                        <div  class="photo photoUser"> </div>
                                        <span>用户</span>
                                    </div>
                                </div>
                                <div class="dialogWord marT10">
                                    <div v-for="(item,index) in words" :key="index"  class="clear">
                                        <div class="marL10 dialogWord-item leftBorder" :class="{'isMine':item.label==2} " :style="{'float':item.label==1?'left':'right'}">
                                            {{item.word}}
                                        </div>
                                        <div class="leftBorder">

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div v-show="detailTab==2" class="detailBody-right-item">
                            <recordComponent title="审核记录" :data="shenheList" :showAdd="true" :orderId="actionRow.id" @regetdata="regetdata"></recordComponent>
                        </div>
                        <div v-show="detailTab==3" class="detailBody-right-item">
                            <recordComponent title="放款记录"  :data="fangkuanList" :showAdd="false" :orderId="actionRow.id"  @regetdata="regetdata"></recordComponent>
                        </div>
                        <div v-show="detailTab==4" class="detailBody-right-item">
                            <recordComponent title="催记记录"  :data="cuijiList" :showAdd="false"  :orderId="actionRow.id" @regetdata="regetdata"></recordComponent>
                        </div>
                    </div>

                </div>
            </div>
        </el-dialog>


        </el-card>

    </div>
</template>

<script>
  import recordComponent from "@/components/recordComponent"
  import animate from "animate.css";
  import { mapState } from 'vuex'
  export default {
    name: "channelList",
    data() {
      return {
        tableForm:{
          time:"",
          gmtDatetime:"",
          label:"",
          parameter:"",
          // status:1,
          isRefuseReason:""
        },
        rules: {
          money: [
            { required: true, message: '请输入结清总金额', trigger: 'blur' }
          ],
          overMoney: [
            { required: true, message: '请输入其中滞纳金', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入结清密码', trigger: 'blur' }
          ],
        },

        xuqiRules: {
          money: [
            { required: true, message: '请输入续期总金额', trigger: 'blur' }
          ],
          overMoney: [
            { required: true, message: '请输入续期滞纳金', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入续期密码', trigger: 'blur' }
          ],
        },


        fenpeiRules: {
          userId: [
            { required: true, message: '请输入分配人员', trigger: 'blur' }
          ],
        },

        refuseRules: {
          refuse: [
            { required: true, message: '请输入选择拒绝原因', trigger: 'blur' }
          ],
        },

        giveoutAllRules: {
          userIds: [
            { required: true, message: '请输入一键分配人员', trigger: 'blur' }
          ],
        },

        fenpeiForm:{},
        overdueList:[],
        total:0,
        totalPeople:0,
        borrowMoney:0,
        currentPage:1,
        pageSize:10,
        actionRow:{
          user:{}
        },
        jieqingForm:{},
        dialogVisible:false,
        xuqiDialogVisible:false,
        xuqiForm:{},
        dataList:[],
        fenpeiDialogVisible:false,
        multipleSelection: [],

        giveoutAllForm:{
          userIdPre:[]
        },
        giveoutAllDialogVisible:false,

        updateForm:{
          money:""
        },
        updateRules: {
          money: [
            { required: true, message: '请输入修改后的金额', trigger: 'blur' }
          ],
        },
        loanUpdateMoneyVisible:false,
        refuseVisible:false,
        refuseReasonList:[{
          name:'未接'
        },{
          name:'停机'
        },{
          name:'关机'
        },{
          name:'拒接'
        },{
          name:'联系人虚假'
        },{
          name:'通讯录异常'
        },{
          name:'联系人虚假'
        },],
        refuseForm:{
          refuse:""
        },


        orderDetailVisible:false,
        detailInfo:{},
        detailTab:1,
        words:[{
          word:'今天天气很好,号个P',
          label:1
        },
          {
            word:'这是一个人的提问',
            label:2
          },{
            word:'今天天气很好,号个P2',
            label:1
          },{
            word:'今天天气很好,号个P3',
            label:1
          }],
        shenheList:[],
        fangkuanList:[],
        cuijiList:[]
        // quickFenpei:
      };
    },
    computed: mapState([
	  // map this.count to store.state.count
	  'btnStr'
	]),
    mounted() {
      this.fenpeiPeople();
      this.readyAjax()
    },
    components:{
      recordComponent
    },
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
      regetdata(val){
        switch (val) {
          case '审核记录':this.getRecordList('getOrderShenheList','shenheList');break;
          case '放款记录':this.getRecordList('getOrderFangkuanList','fangkuanList');break;
          case '催记记录':this.getRecordList('getOrderCuijiList','cuijiList');break;
        }
      },
      showOrderDetail(row){
        this.actionRow={...row};
        this.orderDetailVisible=true;
        this.getRecordList('getOrderShenheList','shenheList');
        this.getRecordList('getOrderFangkuanList','fangkuanList');
        this.getRecordList('getOrderCuijiList','cuijiList');
      },
      getRecordList(url,data){
        this.$api.audit[url]({
          orderId:this.actionRow.id
        }).then((res)=>{
          this[data]=res.data
        })
      },
      showRefuse(row){
        this.actionRow={...row};
        this.refuseVisible=true
      },
      showCloseOrders(id){
        this.$toolkit.showConfrim('您确定要关闭此订单吗','关闭订单').then(()=>{
            this.$api.audit.loanCloseOrder({
              type:1,
              ids:[id]
            }).then(()=>{
                this.$message.success("订单关闭成功");
                this.readyAjax()
            })
        })
      },
      showloanUpdateMoney(row){
        this.actionRow={...row};
        this.loanUpdateMoneyVisible=true;
      },
      giveoutAll(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.giveoutAllForm)
            this.$api.audit.giveoutAll({
              userIds:this.giveoutAllForm.userIdPre.join(",")
            }).then(()=>{
              this.$message.success("一键分配成功");
              this.giveoutAllDialogVisible=false;
              this.readyAjax()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      loanRefuseOrder(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.audit.loanRefuseOrder({
              id:this.actionRow.id,
              ...this.refuseForm
            }).then(()=>{
              this.$message.success("拒绝成功");
              this.refuseVisible=false;
              this.readyAjax()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      loanUpdateMoney(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.audit.loanUpdateMoney({
              ...this.updateForm,
              id:this.actionRow.userId
            }).then(()=>{
              this.$message.success("额度修改成功!");
              this.loanUpdateMoneyVisible=false;
              this.readyAjax()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      fenpeiAction(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let orderIds=[];
            this.multipleSelection.map((item)=>{
              orderIds.push(item.id)
            })
            this.$api.audit.sureFenPei({
              orderIds:orderIds.join(","),
              ...this.fenpeiForm
            }).then(()=>{
              this.$message.success("分配成功");
              this.fenpeiDialogVisible=false;
              this.readyAjax()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      showFenpei(row){
        if(!this.multipleSelection.length){
          return this.$message.warning("分配前请先选择记录")
        }

        // this.actionRow={...row};
        this.fenpeiDialogVisible=true;
      },
      fenpeiPeople(){
        this.$api.system.getLoginRecord_adminList().then((res)=>{
          this.fenpeiPeople=res.data
        }).catch((e)=>{
          this.$message.error("获取管理员列表失败")
        })
      },
      handleClick(){
        this.reset()
      },
      readyAjax(){
        this.currentPage=1;
        this.pageSize=10;
        if(this.tableForm.time){
          this.tableForm.gmtDatetime=this.$toolkit.formatTime(this.tableForm.time[0],false)+'~'+this.$toolkit.formatTime(this.tableForm.time[1],false)
        }
        this.getLoanApplyList()
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
        this.getLoanApplyList()
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getLoanApplyList()
      },
      getLoanApplyList(){
        this.$api.audit.getLoanApplyList({
          ...this.tableForm,
          currentPage:this.currentPage,
          pageSize:this.pageSize
        }).then((res)=>{
          this.dataList=res.data.pageDto.list;
          this.total=res.data.pageDto.total;
          this.borrowMoney=res.data.borrowMoney
        })
      },
      formats(row){
        if(row.pressMoneyMan==null&&row.pressCharge==null){
          return "待分配"
        }else if(row.pressMoneyMan!=null){
          return "已分配"
        }
        return "可分配"
      },
      passAction(row){
        this.$toolkit.showConfrim('确定要同意申请吗?','同意').then((res)=>{
          this.$api.audit.loanPassAction({
            id:row.id
          }).then(()=>{
            this.$message.success("同意成功!");
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
    @import url('../../assets/css/memberDialog.less');
    .multi-sel{
        
    }
    /*@keyframes dialog-fade-in {*/
        /*0% {*/
            /*transform: translate3d(100%, 0, 0);*/
            /*opacity: 0;*/
        /*}*/
        /*100% {*/
            /*transform: translate3d(0%, 0, 0);*/
            /*opacity: 1;*/
        /*}*/
    /*}*/

    /*@keyframes  dialog-fade-out {*/
        /*0% {*/
            /*transform: translate3d(0%, 0, 0);*/
            /*opacity: 1;*/
        /*}*/
        /*100% {*/
            /*transform: translate3d(100%,0, 0);*/
            /*opacity: 0;*/
        /*}*/
    /*}*/

</style>
