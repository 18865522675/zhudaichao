<template>
    <div>
        <el-card class="box-card affilateWrap">
            <div slot="header" class="clearfix cardTitle">
                <span>放款申请管理</span>
            </div>

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
                            <span class="smallSpan bigSpan" style="width: 150px!important;">审核通过日期  </span>
                            <el-date-picker
                                    style="height: 32px;width: 100%"
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
                        <div class="topTableForm-item topTableForm-itemSel">
                            <span style="display: inline-block;width: 120px!important;">审核通过日期 :</span>
                            <el-date-picker
                                    style="height: 32px;width:320px!important"
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
                                <el-button size="mini" type="primary"  @click="showFenpei">分配</el-button>
                                <el-button size="mini" type="primary"  @click="disAI" >分配AI呼叫</el-button>
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
                        <div class="marT20">
                            <div class="flex-r orderTypeList" style="align-items: center" >
                                <span style="font-size: 13px" class="marL10">打款状态 : </span>
                                <div v-for="(item,index) in orderTypeList" :style="{'color':item.color,'backgroundColor':item.backgroundColor}" class="orderTypeItem marL10" :key="index" >{{item.name}}</div>
                                <span style="font-size: 13px" class="marL30">淘宝反扒状态 : </span>
                                <div class="taobaoBtn marL10">查看认证详情</div>
                            </div>
                        </div>
                        <el-table
                                border
                                class="cardTable marT20"
                                :data="dataList"
                                tooltip-effect="dark"
                                style="width: 100%" @selection-change="handleSelectionChange">
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
                                    prop="lianPayNum"
                                    label="贷款单号" width="200">
                                <template slot-scope="scope">
                                    <div :style="{'color':orderTypeList[scope.row.giveStatus].color,'backgroundColor':orderTypeList[scope.row.giveStatus].backgroundColor}" style="padding: 0px 10px">{{scope.row.lianPayNum?scope.row.lianPayNum:'无'}}</div>
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
                                    show-overflow-tooltip width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="gmtDatetime"
                                    label="审核通过时间"
                                    show-overflow-tooltip width="160" >
                            </el-table-column>
                            <el-table-column
                                    prop="user.channelName"
                                    label="渠道" :formatter="$toolkit.transForNo"
                                    show-overflow-tooltip >
                            </el-table-column>
                            <el-table-column
                                    prop="authour"
                                    label="负责人"
                                    show-overflow-tooltip >
                                <tempate slot-scope="scope">
                                    {{scope.row.loaner?scope.row.loaner:'未分配'}}
                                </tempate>
                            </el-table-column>
                            <el-table-column
                                    prop="label"
                                    label="用户身份"
                                    show-overflow-tooltip  width="100">
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
                                    prop="authour"
                                    label="呼叫任务"
                                    show-overflow-tooltip   :formatter="formatsStatus">
                            </el-table-column>
                            <el-table-column
                                    prop="callStatus"
                                    label="呼叫结果"
                                    show-overflow-tooltip>
                                <tempate slot-scope="scope">
                                    {{scope.row.callResult||'未知'}}
                                </tempate>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作" width="500">
                                <template slot-scope="scope">
                                    <!--<el-button size="mini" plain class="aplus-pribtn">查看认证信息</el-button>-->
                                    <el-button size="mini" plain class="aplus-pribtn" @click="showloanUpdateMoney(scope.row)"    v-if="btnStr.indexOf('修改额度')>-1">修改额度</el-button>
                                    <el-button size="mini" plain class="aplus-pribtn" @click="showCode(scope.row)"    v-if="btnStr.indexOf('线上打款')>-1">线上打款</el-button>
                                    <el-button size="mini" plain class="aplus-pribtn"  @click="$router.push(`/userInfoDetail/${scope.row.userId}/${scope.row.id}/${scope.row.user.userName}/${scope.row.user.phone}`)"  >查看认证详情</el-button>
                                    <el-button size="mini" plain class="aplus-pribtn" @click="showOrderDetail(scope.row)"  v-if="btnStr.indexOf('订单详情')>-1">订单详情</el-button>
                                    <el-dropdown split-button type="primary"  split-button="true" :divided="true" class="moreActionSel" >
                                        <span>更多操作</span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item  @click.native="$router.push(`/auditManage/auditInfoDetail/${scope.row.id}`)"   v-if="btnStr.indexOf('详情')>-1">详情</el-dropdown-item>
                                            <el-dropdown-item  @click.native="showRefuse(scope.row)"   v-if="btnStr.indexOf('拒绝')>-1">拒绝</el-dropdown-item>
                                            <!--<el-button size="mini" plain class="aplus-errorBtn" @click="refuseAndPass(scope.row.id,2)">拒绝</el-button>-->
                                            <el-dropdown-item  @click.native="showCloseOrders(scope.row.id)"   v-if="btnStr.indexOf('关闭订单')>-1">关闭订单</el-dropdown-item>
                                            <el-dropdown-item  @click.native="getWaitPayunderLine(scope.row.id)"   v-if="btnStr.indexOf('线下放款')>-1">线下放款</el-dropdown-item>
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
                                <el-input v-model.trim="jieqingForm.password" type="password" placeholder="请输入结清密码">
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
                            <!--<el-input v-model.trim="xuqiForm.overMoney"  placeholder="请输入其中滞纳金">-->
                                <!--<template slot="append">元</template>-->
                            <!--</el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item label="密码" prop="password">
                            <el-input v-model.trim="xuqiForm.password"  type="password" placeholder="请输入续期密码">
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
                    <el-form ref="fenpeiForm" :model="fenpeiForm"  :rules="fenpeiRules" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="放款人员" prop="adminId">
                            <!--<el-select style="width: 100%" filterable v-model="fenpeiForm.adminId" placeholder="请选择放款人员">-->
                                <!--<el-option v-for="(item,index) in payloanPeople" :key="index" :value="item.id" :label="item.userName"></el-option>-->
                            <!--</el-select>-->
                            <el-select v-model="fenpeiForm.adminId" class="aplus-sel" style="width: 100%" filterable  placeholder="请选择用户">
                                <!--<el-option value="" label="全部"></el-option>-->
                                <el-option-group
                                        v-for="(group,index) in payloanPeople"
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
        <!--<el-dialog-->
                <!--title="一键分配"-->
                <!--:visible.sync="giveoutAllDialogVisible"-->
                <!--width="30%">-->
            <!--<div>-->
                <!--<div class="form-body">-->
                    <!--<el-form ref="giveoutAllForm" :model="giveoutAllForm"  :rules="giveoutAllRules" label-width="100px" class="demo-ruleForm">-->
                        <!--<el-form-item label="审核人员" prop="userIdPre">-->
                            <!--<el-select style="width: 100%" filterable v-model="giveoutAllForm.userIdPre" placeholder="请选择审核人员" multiple>-->
                                <!--<el-option v-for="(item,index) in fenpeiPeople" :key="index" :value="item.id" :label="item.userName"></el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                    <!--</el-form>-->
                <!--</div>-->
            <!--</div>-->
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="giveoutAllDialogVisible = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="giveoutAll('giveoutAllForm')">确 定</el-button>-->
              <!--</span>-->
        <!--</el-dialog>-->


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
                <el-button type="primary" @click="waitRefuseOrder('refuseForm')">确 定</el-button>
              </span>
        </el-dialog>



        <!--线上打款-获取验证码-->
        <el-dialog
                title="获取验证码"
                :visible.sync="getCodeVisible"
                width="30%">
            <div>
                <div class="form-body">
                    <el-form ref="codeForm" :model="codeForm"  label-width="100px" class="demo-ruleForm">
                        <el-form-item label="验证码">
                            <el-input v-model.trim="codeForm.code" placeholder="请输入验证码">
                                <span slot="append" icon="el-icon-search" v-if="canSend" style="cursor:pointer;" @click="getCode">发送</span>
                                <template slot="append"  style="cursor:pointer;" class="test" v-else>{{overTime+'秒'}}</template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="getCodeVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendCode('codeForm')">确 定</el-button>
              </span>
        </el-dialog>



        <!--会员详情弹窗-->
        <el-dialog
                title="订单详情"
                :visible.sync="orderDetailVisible"
                width="70%"
                ref="memberDialog"
                :before-close="handleClose"
                style="height: 100%;"
                class="memberDialog" @close="closeMemberDialog">
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
                                    会员身份 : {{actionRow.user.label==1?'普通用户':actionRow.user.label==2?'优质用户':'逾期用户'}}
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
                            <div v-if="aiallInfo.length">
                                <div class="dailWrapHeader flex-r" style="justify-content: space-between;align-items: center">
                                    <div  class="Detailtitle" style="padding-left: 20px">
                                        通话信息
                                    </div>
                                    <el-select v-model="timeSel" @change="selAiInfo" class="timeSel" placeholder="请选择通过开始时间">
                                        <el-option
                                                v-for="item in timeSelList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="dailWrapBody">
                                    <div class="flex-r dailWrapBody-header">
                                        <div>
                                            会员名称 : <span>{{aiUserInfo.realName}}</span>
                                        </div>
                                        <div>
                                            身份证后四位 : <span>{{aiUserInfo.idNoLastFour}}</span>
                                        </div>
                                        <div>
                                            借款意愿 : <span>{{aiUserInfo.nlpResult}}</span>
                                        </div>
                                        <div>
                                            呼叫状态 : <span>{{aiUserInfo.resultCode==200?'成功':'失败'}}</span>
                                        </div>
                                        <div>
                                            呼叫时间 : <span>{{$toolkit.formatTime(aiUserInfo.callStartTime)}}</span>
                                        </div>
                                    </div>
                                    <div class="dailWrapBody-playAudio">
                                        <audio :src="playUrl" autoplay></audio>
                                    </div>
                                    <div class="dialogPhoto flex-r marL10">
                                        <div class="flex-r" style="align-items: center">
                                            <div class="photo photoRobot"></div>
                                            <span>AI客服</span>
                                        </div>
                                        <div class="flex-r" style="align-items: center">
                                            <div  class="photo photoUser"> </div>
                                            <span>{{aiUserInfo.realName}}</span>
                                        </div>
                                    </div>
                                    <div class="dialogWord marT10">
                                        <div v-for="(item,index) in aiPhoneList" :key="index"  class="clear">
                                            <div class="marL10 dialogWord-item leftBorder" :class="{'isMine':item.role=='customer'} " :style="{'float':item.role=='robot'?'left':'right'}">
                                                {{item.text}}
                                            </div>
                                            <div class="leftBorder">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="noDataTip">
                                暂无通话信息
                            </div>
                        </div>
                        <div v-show="detailTab==2" class="detailBody-right-item">
                            <recordComponent title="审核记录" :data="shenheList" :showAdd="false" :orderId="actionRow.id" @regetdata="regetdata"></recordComponent>
                        </div>
                        <div v-show="detailTab==3" class="detailBody-right-item">
                            <recordComponent title="放款记录"  :data="fangkuanList" :showAdd="true" :orderId="actionRow.id"  @regetdata="regetdata"></recordComponent>
                        </div>
                        <div v-show="detailTab==4" class="detailBody-right-item">
                            <recordComponent title="催记记录"  :data="cuijiList" :showAdd="false"  :orderId="actionRow.id" @regetdata="regetdata"></recordComponent>
                        </div>
                    </div>

                </div>
            </div>
        </el-dialog>




        <!--<div class="detailBody-left-item">-->
        <!--<div>-->
        <!--呼叫记录-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="detailBody-left-item">-->
        <!--<div>-->
        <!--审核记录-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="detailBody-left-item">-->
        <!--<div>-->
        <!--放款记录-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="detailBody-left-item">-->
        <!--<div>-->
        <!--催记记录-->
        <!--</div>-->
        <!--</div>-->
        <!--</el-card>-->

    </div>
</template>

<script>
  import animate from "animate.css";
  import recordComponent from "@/components/recordComponent"
  import { mapState } from 'vuex'
  export default {
    name: "channelList",
    data() {
      var validateMoney = (rule, value, callback) => {
        if (value == '') {
              callback(new Error('请输入修改后的金额'));
        } else {
          if (this.updateForm.money > this.maxBorrowMoney) {
            callback(new Error('已超出最大放款金额'));
          }
          callback();
        }
      };
      return {
        tableForm:{
          time:"",
          gmtDatetime:"",
          label:"",
          parameter:"",
          // status:2,
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
          adminId: [
            { required: true, message: '请输入分配人员', trigger: 'blur' }
          ],
        },

        giveoutAllRules: {
          userIds: [
            { required: true, message: '请输入一键分配人员', trigger: 'blur' }
          ],
        },

        fenpeiForm:{},
        overdueList:[],
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
        dataList:[{user:{userName:1111,label:1}}],
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
            { required: true,validator: validateMoney,trigger: 'blur' }
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
        maxBorrowMoney:1000,


        getCodeVisible:false,
        codeForm:{
            code:""
        },
        canSend:true,
        overTime:120,
        timer:"",
        payloanPeople:[],
        orderTypeList:[{
          color:"#909399",
          backgroundColor:"#edf2fc",
          name:"未打款"
        },{
          color:"#e6a23c",
          backgroundColor:"#fdf6ec",
          name:"打款中"
        },{
          color:"#f56c6c",
          backgroundColor:"#fef0f0",
          name:"打款失败"
        },{
          color:"#67c23a",
          backgroundColor:"#f0f9eb",
          name:"打款成功"
        }],
        orderDetailVisible:false,
        detailInfo:{},
        detailTab:1,
        total:0,
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
        cuijiList:[],


        //所有AI数据
        aiallInfo:[],

        //AI打电话列表
        aiPhoneList:[],

        // api的用户信息
        aiUserInfo:{},

        timeSel:"",
        timeSelList:[],
        playUrl:"",
      };
    },
    mounted() {
      this.getWaitMaxMoney()
      this.waitPayLoanPeople();
      this.readyAjax()
    },
    components:{
      recordComponent
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
      handleClose(){
        this.timeSelList=[];
        this.timeSel="";
        this.aiPhoneList=[];
        this.orderDetailVisible=false
      },
      selAiInfo(val){
        this.aiallInfo.map((item)=>{
          if(item.callStartTime==val){
            this.aiUserInfo=item;
            this.getAiCallInfoList(item.id)
          }
        })
      },
      disAI(){
        if(!this.multipleSelection.length){
          return   this.$message.warning("一键分配AI呼叫之前请先选择记录");
        }
        let ids=[]
        this.multipleSelection.map((item)=>{
            ids.push(item.id)
        })
        this.$api.audit.disAI({
          ids
        }).then(()=>{
          this.readyAjax();
          this.$message.success("分配AI呼叫成功")
        })
      },
      regetdata(val){
          switch (val) {
            case '审核记录':this.getRecordList('getOrderShenheList','shenheList');break;
            case '放款记录':this.getRecordList('getOrderFangkuanList','fangkuanList');break;
            case '催记记录':this.getRecordList('getOrderCuijiList','cuijiList');break;
          }
      },
      showOrderDetail(row){
        this.actionRow={...row};
        console.log(this.actionRow)
        this.orderDetailVisible=true;
        this.getAiInfo(row.id)
        this.getRecordList('getOrderShenheList','shenheList');
        this.getRecordList('getOrderFangkuanList','fangkuanList');
        this.getRecordList('getOrderCuijiList','cuijiList');
      },
      getAiCallInfoList(callRecordId){
        this.$api.audit.getAiCallInfoList({
          callRecordId
        }).then((res)=>{
          this.aiPhoneList=res.data;
          this.aiPhoneList.map((item)=>{
            if(item.role=="whole"){
                this.playUrl=item.audioUrl
            }
          })
        }).catch((res)=>{
          // this.aiPhoneList=res.data
        })
      },
      async getAiInfo(orderId){
        try{
          let data= await  this.$api.audit.getAiInfo({
            orderId
          });
          // this.aiallInfo=data.data;
          //   this.getAiCallInfoList(data.data[0].id)
          if(data.data.length){
            this.aiUserInfo=data.data[0];
            this.aiallInfo=data.data;
            this.timeSel=data.data[0].callStartTime;
            data.data.map((item)=>{
              this.timeSelList.push({
                name:this.$toolkit.formatTime(item.callStartTime),
                id:item.callStartTime
              })
            })
            this.getAiCallInfoList(data.data[0].id)
          }
        }catch(e){
          // if(e.data.length){
          //   this.aiUserInfo=e.data[0];
          //   this.aiallInfo=e.data;
          //   this.timeSel=e.data[0].callStartTime;
          //   e.data.map((item)=>{
          //     this.timeSelList.push({
          //       name:this.$toolkit.formatTime(item.callStartTime),
          //       id:item.callStartTime
          //     })
          //   })
          //   this.getAiCallInfoList(e.data[0].id)
          // }
        }

      },
      getRecordList(url,data){
        this.$api.audit[url]({
          orderId:this.actionRow.id
        }).then((res)=>{
          this[data]=res.data
        })
      },
      showCode(row){
            let codeTime = window.localStorage.getItem("codeTime");
            if(!codeTime){
                this.getCodeVisible=true;
            }else{
              var date=new Date();  //开始时间
              var date3=date.getTime()- Number(codeTime); //时间差的毫秒数
              //计算出小时数
//      console.log(date3/1000/60)
              var leave1=date3%(24*3600*1000);   //计算天数后剩余的毫秒数
              var hours=Math.floor(leave1/(3600*1000));
              if(hours>2){
                this.getCode();
                this.getCodeVisible=true;
              }else{
                this.$toolkit.showConfrim("您确定要线上打款吗?",'打款').then((res)=>{
                   this.$api.audit.payFuyou({
                     id:row.id
                   }).then(()=>{
                        this.$message.success("线上打款成功");
                        this.readyAjax()
                   })
                })
              }
            }
      },
      sendCode(){
        if(!this.codeForm.code){
          return this.$message.warning("请先填入验证码")
        }
        this.$api.audit.checkPhoneCode({
          ...this.codeForm
        }).then((res)=>{
            localStorage.setItem("codeTime",res.data.time);
            this.$message.success("验证成功");
            this.getCodeVisible=false
        })
      },
      getCode(){
        this.$api.audit.getPhoneCode().then((res)=>{
          this.canSend=false;
              this.timer=setInterval(()=>{
                this.overTime-=1;
                if(this.overTime==0){
                  this.canSend=true;
                  clearInterval(this.timer)
                }
              },1000)
            this.$message.success("验证码发送成功");

        })
      },
      getWaitMaxMoney(){
        this.$api.audit.getWaitMaxMoney().then((res)=>{
          if(res.data&&Object.keys(res.data).length){
            this.maxBorrowMoney=res.data.maxBorrowMoney
          }
        })
      },
      showRefuse(row){
        this.actionRow={...row};
        this.refuseVisible=true
      },
      showCloseOrders(id){
        this.$toolkit.showConfrim('您确定要关闭此订单吗','关闭订单').then(()=>{
          this.$api.audit.loanCloseOrder({
            type:2,
            ids:[id]
          }).then(()=>{
            this.$message.success("订单关闭成功");
            this.readyAjax()
          })
        })
      },
      waitRefuseOrder(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.audit.waitRefuseOrder({
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
      closeMemberDialog(){
        this.aiUserInfo={};
        this.aiallInfo=[];
        this.timeSel="";
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
      },
      fenpeiAction(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let ids=[];
            this.multipleSelection.map((item)=>{
              ids.push(item.id)
            })
            this.$api.audit.loanSureFenpei({
              ids,
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
      waitPayLoanPeople(){
        // this.$api.audit.waitPayLoanPeople().then((res)=>{
        //   this.payloanPeople=res.data
        // })
        this.$api.system.getLoginRecord_adminList().then((res)=>{
          this.payloanPeople=res.data
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
        this.getWaitPayList()
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
        this.getWaitPayList()
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getWaitPayList()
      },
      getWaitPayList(){
        this.$api.audit.getWaitPayList({
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
      formatsStatus(row){
        switch (row.callStatus) {
          case -2:return '呼叫失败';
          case 0:return '未呼叫';
          case 2:return '呼叫中';
          case 4:return '呼叫成功';
        }
      },
      getWaitPayunderLine(orderId){
        this.$toolkit.showConfrim('您确定要线下打款吗','放下打款').then(()=>{
          this.$api.audit.getWaitPayunderLine({
            orderId
          }).then(()=>{
            this.$message.success("线下打款成功");
            this.readyAjax()
          })
        })
      }

    },
    created() {},
    beforeDestroy(){
      clearInterval(this.timer)
    },
    destoryed() {}
  };
</script>

<style  lang="less">
    @import url('../../assets/css/commonTable.less');
    @import url('../../assets/css/memberDialog.less');
    .orderTypeList{
        .orderTypeItem{
            padding: 5px 15px;
            border-radius: 4px;
            font-size: 12px;
        }
    }
    .taobaoBtn{
        padding: 5px 20px;
        font-size: 12px;
        color:white;
        background: red;
        border-radius: 5px;
    }

    /*.memberDialog{*/
        /*@keyframes dialog-fade-in {*/
            /*0% {*/
                /*transform: translate3d(100%, 0, 0)!important;*/
                /*opacity: 0;*/
            /*}*/
            /*100% {*/
                /*transform: translate3d(0%, 0, 0)!important;*/
                /*opacity: 1;*/
            /*}*/
        /*}*/

        /*@keyframes  dialog-fade-out {*/
            /*0% {*/
                /*transform: translate3d(0%, 0, 0)!important;*/
                /*opacity: 1;*/
            /*}*/
            /*100% {*/
                /*transform: translate3d(100%,0, 0)!important;*/
                /*opacity: 0;*/
            /*}*/
        /*}*/
        /*!*margin:0 25%;*!*/
        /*!*overflow: hidden;*!*/
        /*.el-dialog{*/
            /*float: right;*/
            /*height: calc( 100% - 71px);*/
            /*margin: 0!important;*/
            /*z-index:1000000;*/
            /*background: #edf1fc;*/
            /*margin-top: 70px!important;*/
            /*position: relative;*/
            /*border-radius: 20px;*/
        /*}*/
        /*.el-dialog__header{*/
            /*background: white;*/
            /*padding: 20px!important;*/
            /*border-top-left-radius: 20px;*/
            /*border-top-right-radius: 20px;*/
        /*}*/
        /*.el-dialog__body{*/
            /*padding: 20px;*/
            /*background: #edf1fc;*/
        /*}*/
        /*.closeIcon{*/
            /*position: absolute;*/
            /*top: 20px;*/
            /*font-size: 25px;*/
            /*left: 20px;*/
            /*color:#409EFF;*/
            /*cursor: pointer;*/
        /*}*/
        /*.memberDialog-body{*/
            /*background: white;*/
            /*padding: 10px;*/
            /*border-radius: 10px;*/
        /*}*/
        /*.head-body-info{*/
            /*border-radius: 5px;*/
            /*.el-row{*/
                /*line-height: 40px;*/
            /*}*/
        /*}*/
        /*.Detailtitle{*/
            /*font-weight: bold;*/
            /*font-size: 18px;*/
            /*line-height: 60px;*/
        /*}*/

        /*.el-tabs__item{*/
            /*border-radius: 15px;*/
            /*background: #eaeaea;*/
            /*color: #999999;*/
        /*}*/
        /*.el-tabs--card > .el-tabs__header .el-tabs__item.is-active{*/
            /*background: white!important;*/
            /*color:black!important;*/
            /*border-bottom-width: 0px!important;*/
        /*}*/
        /*.el-tabs__header{*/
            /*margin-bottom: 0px!important;*/
        /*}*/
        /*.el-tabs__content{*/
            /*background: white;*/
            /*padding: 20px;*/

        /*}*/
    /*}*/

    .detailInfoBody{
        .detailTab{
            height: 500px;
            width: 100%;
        }
        .detailBody-left{
            width: 200px;
            background: white;
            border-radius: 10px;
            .detailBody-left-item-active{
                background: rgba(115,142,247,1);
                font-size: 18px!important;
                border-radius: 5px;
                color:white!important;
            }
            .detailBody-left-item{
                height: 80px;
                line-height: 80px;
                color:#a9a9a9;
                font-size: 16px;
                box-sizing: border-box;
                padding: 0 10px;
                transition: all 0.5s;
                &>div{
                    border-bottom: 1px solid #ebebeb;
                }
                text-align: center;
                &:hover{
                    background: rgba(115,142,247,0.2);
                    color:white;
                    /*font-size: 18px;*/
                    border-radius: 5px;
                }
            }
        }
        .detailBody-right{
            flex:1;
            height: 700px;
            background: white;
            border-radius: 10px;
            margin-left: 20px;
            .detailBody-right-item{
                height: 100%;
            }
            .dailWrapBody-header{
                font-size: 14px;
                box-sizing: border-box;
                padding: 0 20px;
                div{
                    width: 33.3%;
                }
                flex-wrap: wrap;
                line-height: 40px;
            }
        }
        .dialogPhoto{
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 20px 0 10px;
            line-height: 30px;
            margin-top: 20px;
            align-items: center;
            .photo{
                width: 30px;
                height: 30px;
                background-position: center;
                background-size:100% 100%;
                background-color:white;
                box-shadow: 1px 1px 0 1px;
                border-radius: 50%;
                &+span{
                    display: inline-block;
                    margin-left: 10px;
                    color:gray;
                }
            }
            .photoRobot{
                background-image: url("../../assets/img/robot.png");
            }
            .photoUser{
                background-image: url("../../assets/img/user.jpg");
            }
        }
        .dialogWord{
            height: 470px;
            overflow-y: auto;
            /*max-height: 500px;*/
            background: #f3f6fd;
            border-radius: 5px;
            margin: 10px 20px 0 20px;
            box-sizing: border-box;
            padding: 20px 5px;
            .dialogWord-item{
                padding: 10px 15px;
                position: relative;
                max-width: 300px;
                word-break: break-word;
                border-radius:10px;
                color:white;
                margin-top: 10px;
                background: #738ef7;
                &:before{
                    .leftOrRight();
                    left: -24px;
                    border-left: 12px solid transparent;
                    border-right: 12px solid #738ef7;
                }
            }
            .isMine{
                background: #e9ecfb;
                color:#343331;
                margin-right: 16px;
                &:before{
                    border-left: 0px!important;
                    border-right: 0px!important;
                    border-top: 0px!important;
                    border-bottom: 0px!important;
                }
                &:after{
                    .leftOrRight();
                    right: -24px;
                    border-left: 12px solid #e9ecfb;
                    border-right: 12px solid transparent;
                }
            }
        }

        .leftOrRight{
            position: absolute;
            top: 10px;
            content: '';
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
        }
        .timeSel{
            margin-right: 20px;
            .el-input__inner{
                height: 30px;
            }
        }
        .dailWrapBody-playAudio{
            /*audio{*/

            /*}*/
        }
        .noDataTip{
            font-weight: bold;
            text-align: center;
            font-size: 18px;
            line-height: 180px;
            color:gray;
        }
    }
    .el-tooltip__popper {
        max-width: 400px;
        line-height: 180%;
    }
</style>
