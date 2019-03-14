<template>
    <div>
        <el-card class="box-card autoWrap">
            <!--<link rel="stylesheet" href="../../assets/css/RegionalChoice.css">-->
            <div slot="header" class="clearfix cardTitle">
                <span>自动审核</span>
            </div>
            <div class="autoTrailSet flex-r" style="align-items: center">
                <span class="headerTitle" style="padding-bottom:0px!important"> 自动审核设置 : </span>
                <span class="marL20 setWord">{{jishenForm.value==1?'开启':'关闭'}}</span>
                <el-button type="primary" icon="el-icon-setting" class="reloadBtn marL10" @click="jishenDialogVisible=true"   v-if="btnStr.indexOf('设置')>-1">设置</el-button>
                <el-tooltip class="item" effect="dark" content="开启自动审核后，机审通过的用户将直接进入待放款管理；关闭情况下，机审通过的用户进入贷款申请管理，进行人工审核" placement="top">
                    <span class="intro-title marL20" >注释</span>
                </el-tooltip>
            </div>
            <el-tabs v-model="activeName" type="card" class="tabCard marT30" @tab-click="handleClick">
                <el-tab-pane label="机审设置" name="jishenSet">
                    <div class="jishenWrap">

                        <div class="jishenItem">
                            <div class="jishenItem-headWrap divider">
                                <div class="flex-r jishenItem-head">
                                    <div class="headerTitle">
                                        身份认证
                                    </div>
                                    <span class="intro-title marL10" @click="showCommonIntro(2)">注释</span>
                                </div>
                            </div>
                            <div class="jishenItem-body">
                                <el-row>
                                    <el-col :span="8"><span @click="dialogVisible1=true">年龄</span></el-col>
                                    <el-col :span="8"><span @click="showArea">地区拒绝</span></el-col>
                                </el-row>
                            </div>
                        </div>

                        <div class="jishenItem" style="margin-top: 50px">
                            <div class="jishenItem-headWrap divider">
                                <div class="flex-r jishenItem-head">
                                    <div class="headerTitle">
                                        手机认证
                                    </div>
                                    <span class="intro-title marL10" @click="showCommonIntro(3)">注释</span>
                                </div>
                            </div>
                            <div class="jishenItem-body">
                                <el-row>
                                    <el-col :span="8"><span  @click="dialogVisible3=true">入网时间</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible4=true">无通话静默天数</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible5=true">连续无通话静默天数</span></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><span @click="dialogVisible6=true">连续无通话静默大于3天次数</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible7=true">通讯有效名单数</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible8=true">身份/运营信息匹配结果</span></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><span @click="dialogVisible9=true">疑似催收电话数</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible10=true">前十手机联系人通讯录匹配</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible11=true">前十手机人均申请平台数</span></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><span @click="dialogVisible12=true">近一周与三个月通话次数占比</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible13=true">近一周联系人个数</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible14=true">近一周与近一个月联系人个数占比</span></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><span @click="dialogVisible15=true">近一周通话次数</span></el-col>
                                </el-row>
                            </div>
                        </div>

                        <div class="jishenItem" style="margin-top: 50px">
                            <div class="jishenItem-headWrap divider">
                                <div class="flex-r jishenItem-head">
                                    <div class="headerTitle">
                                        淘宝认证
                                    </div>
                                    <span class="intro-title marL10" @click="showCommonIntro(4)">注释</span>
                                </div>
                            </div>
                            <div class="jishenItem-body">
                                <el-row>
                                    <el-col :span="8"><span @click="dialogVisible35=true">芝麻信用分</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible36=true">花呗额度</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible37=true">未显示分数和额度</span></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><span @click="dialogVisible38=true">近12个月成功交易订单平均金额</span></el-col>
                                </el-row>
                            </div>
                        </div>


                        <div class="jishenItem" style="margin-top: 50px">
                            <div class="jishenItem-headWrap divider">
                                <div class="flex-r jishenItem-head">
                                    <div class="headerTitle">
                                        有盾认证
                                    </div>
                                    <span class="intro-title marL10" @click="showCommonIntro(5)">注释</span>
                                </div>
                            </div>
                            <div class="jishenItem-body">
                                <el-row>
                                    <el-col :span="8"><span @click="dialogVisible16=true">有盾分</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible17=true">小额借款平台申请数</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible18=true">其他关联设备数</span></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><span @click="dialogVisible19=true">可疑设备</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible20=true">关联银行卡数</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible21=true">使用设备数</span></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><span @click="dialogVisible22=true">关联用户数</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible23=true">法院失信数</span></el-col>
                                    <el-col :span="8"><span @click="dialogVisible24=true">网贷失信数</span></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8"><span @click="dialogVisible25=true">活体攻击行为数</span></el-col>
                                </el-row>
                            </div>
                        </div>


                        <div class="jishenItem" style="margin-top: 50px">
                            <div class="jishenItem-headWrap divider">
                                <div class="flex-r jishenItem-head">
                                    <div class="headerTitle">
                                        反欺诈认证
                                    </div>
                                    <span class="intro-title marL10" @click="showCommonIntro(6)">注释</span>
                                </div>
                            </div>
                            <div class="jishenItem-body">
                                <el-row>
                                    <el-col :span="8"  @click.native="dialogVisible26=true">黑名单匹配</el-col>
                                </el-row>
                            </div>
                        </div>


                        <div class="jishenItem" style="margin-top: 50px">
                            <div class="jishenItem-headWrap divider">
                                <div class="flex-r jishenItem-head">
                                    <div class="headerTitle">
                                        机构贷后报告认证
                                    </div>
                                    <span class="intro-title marL10" @click="showCommonIntro(7)">注释</span>
                                </div>
                            </div>
                            <div class="jishenItem-body">
                                <el-row>
                                    <el-col :span="8"  @click.native="dialogVisible27=true">当前逾期的贷款机构数</el-col>
                                    <el-col :span="8" @click.native="dialogVisible28=true">最大逾期天数</el-col>
                                    <el-col :span="8" @click.native="dialogVisible29=true">最后一次逾期距今月数</el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8" @click.native="dialogVisible30=true">当前逾期的贷款笔数</el-col>
                                    <el-col :span="8" @click.native="dialogVisible31=true">逾期2周期以上的机构数</el-col>
                                    <el-col :span="8" @click.native="dialogVisible32=true">当前逾期金额</el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8" @click.native="dialogVisible33=true">平均换新机构间隔时长</el-col>
                                </el-row>
                            </div>
                        </div>

                        <div class="jishenItem" style="margin-top: 50px">
                            <div class="jishenItem-headWrap divider">
                                <div class="flex-r jishenItem-head">
                                    <div class="headerTitle">
                                        同盾认证
                                    </div>
                                    <span class="intro-title marL10" @click="showCommonIntro(8)">注释</span>
                                </div>
                            </div>
                            <div class="jishenItem-body">
                                <el-row>
                                    <el-col :span="8"  @click.native="dialogVisible39=true">同盾贷前反欺诈风险分</el-col>
                                </el-row>
                            </div>
                        </div>



                        <div class="jishenItem" style="margin-top: 50px">
                            <div class="jishenItem-headWrap divider">
                                <div class="flex-r jishenItem-head">
                                    <div class="headerTitle">
                                        天创信用认证认证
                                    </div>
                                    <span class="intro-title marL10" @click="showCommonIntro(9)">注释</span>
                                </div>
                            </div>
                            <div class="jishenItem-body">
                                <el-row>
                                    <el-col :span="8"  @click.native="dialogVisible40=true">有还款机构数占比</el-col>
                                    <el-col :span="8"  @click.native="dialogVisible41=true">有还款贷款笔数占比</el-col>
                                    <el-col :span="8"  @click.native="dialogVisible42=true">贷款需求指数</el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="8"  @click.native="dialogVisible43=true">履约金额比例</el-col>
                                    <el-col :span="8"  @click.native="dialogVisible44=true">最近6个月扣款失败次数</el-col>
                                    <el-col :span="8"  @click.native="dialogVisible45=true">个人履约指数</el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="8"  @click.native="dialogVisible46=true">黑名单</el-col>
                                    <el-col :span="8"  @click.native="dialogVisible47=true">无逾期贷款笔数占比</el-col>
                                </el-row>
                            </div>
                        </div>

                    </div>


                </el-tab-pane>
            </el-tabs>

            <!--两行五裂-->
            <el-dialog
                    title="年龄配置"
                    :visible.sync="dialogVisible1"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="4">性别</el-col>
                        <el-col :span="5">条件</el-col>
                        <el-col :span="5">参数</el-col>
                        <el-col :span="5">条件</el-col>
                        <el-col :span="5">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="4">男 : </el-col>
                        <el-col :span="5">大于等于</el-col>
                        <el-col :span="5"><el-input :disabled="true"  :value="pageInfo.maleMinAge"></el-input></el-col>
                        <el-col :span="5">小于等于</el-col>
                        <el-col :span="5"><el-input :disabled="true"  :value="pageInfo.maleMaxAge"></el-input></el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="4">女 : </el-col>
                        <el-col :span="5">大于等于</el-col>
                        <el-col :span="5"><el-input :disabled="true"   :value="pageInfo.femaleMinAge"></el-input></el-col>
                        <el-col :span="5">小于等于</el-col>
                        <el-col :span="5"><el-input :disabled="true"    :value="pageInfo.femaleMaxAge"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
              </span>
            </el-dialog>

            <!--一行两列-->
            <el-dialog
                    title="入网时间配置"
                    :visible.sync="dialogVisible3"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">大于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.netinDateVO"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
              </span>
            </el-dialog>

            <!--一行三列-->
            <el-dialog
                    title="无通话静默天数配置"
                    :visible.sync="dialogVisible4"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="8">时间</el-col>
                        <el-col :span="8">条件</el-col>
                        <el-col :span="8">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="8">3个月 : </el-col>
                        <el-col :span="8">小于等于 </el-col>
                        <el-col :span="8"><el-input :disabled="true" :value="pageInfo.month3SilentDaysOfNoCallsVO"></el-input></el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="8">6个月 : </el-col>
                        <el-col :span="8">小于等于</el-col>
                        <el-col :span="8"><el-input :disabled="true" :value="pageInfo.month6SilentDaysOfNoCallsVO"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="连续无通话静默天数配置"
                    :visible.sync="dialogVisible5"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="8">时间</el-col>
                        <el-col :span="8">条件</el-col>
                        <el-col :span="8">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="8">3个月 : </el-col>
                        <el-col :span="8">小于等于 </el-col>
                        <el-col :span="8"><el-input :disabled="true" :value="pageInfo.month3ContinueSilentDaysOfNoCallsVO"></el-input></el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="8">6个月 : </el-col>
                        <el-col :span="8">小于等于</el-col>
                        <el-col :span="8"><el-input :disabled="true" :value="pageInfo.month6ContinueSilentDaysOfNoCallsVO"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible5 = false">取 消</el-button>
              </span>
            </el-dialog>



            <el-dialog
                    title="连续无通话静默大于3天次数配置"
                    :visible.sync="dialogVisible6"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="8">时间</el-col>
                        <el-col :span="8">条件</el-col>
                        <el-col :span="8">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="8">3个月 : </el-col>
                        <el-col :span="8">小于等于 </el-col>
                        <el-col :span="8"><el-input :disabled="true" :value="pageInfo.month3ContinueSilentDaysOver3dayOfNoCallsVO"></el-input></el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="8">6个月 : </el-col>
                        <el-col :span="8">小于等于</el-col>
                        <el-col :span="8"><el-input :disabled="true" :value="pageInfo.month6ContinueSilentDaysOver3dayOfNoCallsVO"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible6 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="通讯有效名单配置"
                    :visible.sync="dialogVisible7"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">大于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.validListVO"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible7 = false">取 消</el-button>
              </span>
            </el-dialog>

            <el-dialog
                    title="疑似催收电话数配置"
                    :visible.sync="dialogVisible9"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.suspectedCollectionNumbersVO"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible9 = false">取 消</el-button>
              </span>
            </el-dialog>

            <el-dialog
                    title="前十手机联系人通讯录匹配配置"
                    :visible.sync="dialogVisible10"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">大于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.callTop10AndLocalMatchNumberVO"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible10 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="前十手机人均申请平台数配置"
                    :visible.sync="dialogVisible11"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.top10AverageApplyPlatformNumberVO"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible11 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="近一周与三个月通话次数占比配置"
                    :visible.sync="dialogVisible12"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.oneWeekDivideThreeMonthsPercentVO"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible12 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="近一周联系人个数配置"
                    :visible.sync="dialogVisible13"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.callCountOneWeekType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible13 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="近一周与近一个月联系人个数占比配置"
                    :visible.sync="dialogVisible14"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="6">条件</el-col>
                        <el-col :span="6">参数</el-col>
                        <el-col :span="6">条件</el-col>
                        <el-col :span="6">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="6">大于</el-col>
                        <el-col :span="6"><el-input :disabled="true" :value="pageInfo.callCountOneWeekDivideOneMonthPercentType?pageInfo.callCountOneWeekDivideOneMonthPercentType.split('-')[0]:''"></el-input></el-col>
                        <el-col :span="6">小于</el-col>
                        <el-col :span="6"><el-input :disabled="true" :value="pageInfo.callCountOneWeekDivideOneMonthPercentType?pageInfo.callCountOneWeekDivideOneMonthPercentType.split('-')[1]:''"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible14 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="近一周通话次数配置"
                    :visible.sync="dialogVisible15"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="6">条件</el-col>
                        <el-col :span="6">参数</el-col>
                        <el-col :span="6">条件</el-col>
                        <el-col :span="6">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="6">大于</el-col>
                        <el-col :span="6"><el-input :disabled="true" :value="pageInfo.callCountOneWeekTimesType?pageInfo.callCountOneWeekTimesType.split('-')[0]:''"></el-input></el-col>
                        <el-col :span="6">小于</el-col>
                        <el-col :span="6"><el-input :disabled="true" :value="pageInfo.callCountOneWeekTimesType?pageInfo.callCountOneWeekTimesType.split('-')[1]:''"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible15 = false">取 消</el-button>
              </span>
            </el-dialog>







            <!--淘宝-->
            <el-dialog
                    title="芝麻信用分配置"
                    :visible.sync="dialogVisible35"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">大于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.zhimafenVO"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible35 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="花呗额度配置"
                    :visible.sync="dialogVisible36"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">大于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.huabeiMoneyVO"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible36 = false">取 消</el-button>
              </span>
            </el-dialog>





            <el-dialog
                    title="近12个月成功交易订单平均金额配置"
                    :visible.sync="dialogVisible38"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">大于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.moneyDivideOneYearType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible38 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="有盾分配置"
                    :visible.sync="dialogVisible16"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.youdunScoreVO"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible16 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="小额借款平台申请数配置"
                    :visible.sync="dialogVisible17"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.xiaoeLoanPlatformCountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible17 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="其他关联设备数配置"
                    :visible.sync="dialogVisible18"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.otherLinkDeviceCountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible18 = false">取 消</el-button>
              </span>
            </el-dialog>

            <el-dialog
                    title="可疑设备配置"
                    :visible.sync="dialogVisible19"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.otherFrandDeviceCountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible19 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="关联银行卡数配置"
                    :visible.sync="dialogVisible20"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.bankcardCountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible20 = false">取 消</el-button>
              </span>
            </el-dialog>

            <el-dialog
                    title="使用设备数配置"
                    :visible.sync="dialogVisible21"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.linkDeviceCountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible21 = false">取 消</el-button>
              </span>
            </el-dialog>

            <el-dialog
                    title="关联用户数配置"
                    :visible.sync="dialogVisible22"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.linkUserCountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible22 = false">取 消</el-button>
              </span>
            </el-dialog>

            <el-dialog
                    title="法院失信数配置"
                    :visible.sync="dialogVisible23"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.courtDishonestCountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible23 = false">取 消</el-button>
              </span>
            </el-dialog>

            <el-dialog
                    title="网贷失信数配置"
                    :visible.sync="dialogVisible24"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.onlineDishonestCountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible24 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="活体攻击行为数配置"
                    :visible.sync="dialogVisible25"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.livingAttackCountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible25 = false">取 消</el-button>
              </span>
            </el-dialog>

            <el-dialog
                    title="黑名单匹配配置"
                    :visible.sync="dialogVisible26"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">命中</el-col>
                        <el-col :span="12"><el-input :disabled="true" value="拒绝"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible26 = false">取 消</el-button>
              </span>
            </el-dialog>



             <el-dialog
                    title="同盾贷前反欺诈风险分"
                    :visible.sync="dialogVisible39"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.tongdunFinalScoreType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible39 = false">取 消</el-button>
              </span>
            </el-dialog>




            <el-dialog
                    title="当前逾期的贷款机构数配置"
                    :visible.sync="dialogVisible27"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.overdueTenantCountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible27 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="最大逾期天数配置"
                    :visible.sync="dialogVisible28"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.maxOverdueDaysType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible28 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="最后一次逾期距今月数配置"
                    :visible.sync="dialogVisible29"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.monthsFromLastOverdueType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible29 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="当前逾期的贷款笔数配置"
                    :visible.sync="dialogVisible30"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.overdueLoanCountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible30 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="逾期2周期以上的机构数配置"
                    :visible.sync="dialogVisible31"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.overdueFor2TermTenantCountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible31 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="当前逾期金额配置"
                    :visible.sync="dialogVisible32"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.remainingOverdueAmountType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible32 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="平均换新机构间隔时长配置"
                    :visible.sync="dialogVisible33"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">大于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.averageTenantGapDaysType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible33 = false">取 消</el-button>
              </span>
            </el-dialog>



            <el-dialog
                    title="未显示分数和额度"
                    :visible.sync="dialogVisible37"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow" style="text-align: center">
                        <template>
                            <el-radio  label="通过机审"  :disabled="true" v-model="pageInfo.noShowScoreAndQuotaType">通过机审</el-radio>
                            <el-radio  label="不通过机审"  :disabled="true" v-model="pageInfo.noShowScoreAndQuotaType">不通过机审</el-radio>
                        </template>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible37 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="身份/运营信息匹配结果"
                    :visible.sync="dialogVisible8"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow" style="text-align: center">
                        <template>
                            <el-radio  label="完全匹配"  :disabled="true" v-model="pageInfo.identityMatchType">完全匹配</el-radio>
                            <el-radio  label="模糊匹配"  :disabled="true" v-model="pageInfo.identityMatchType">模糊匹配</el-radio>
                            <el-radio  label="不匹配"  :disabled="true" v-model="pageInfo.identityMatchType">不匹配</el-radio>
                            <el-radio  label="无数据"  :disabled="true" v-model="pageInfo.identityMatchType">无数据</el-radio>
                        </template>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible8 = false">取 消</el-button>
              </span>
            </el-dialog>



            <!--机审设置弹窗-->
            <el-dialog
                    title="机审设置配置"
                    :visible.sync="jishenDialogVisible"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-form :model="jishenForm" ref="jishenForm"  :rules="jishenRules" label-width="100px" style="margin-top: 30px" lass="demo-ruleForm">
                        <el-form-item label="机审规则" prop="value">
                            <el-select style="width: 100%" v-model="jishenForm.value" placeholder="请选择机审规则">
                                <el-option label="开启" :value="1"></el-option>
                                <el-option label="关闭" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                     <el-button type="primary"  class="setBtn" @click="setJishenRule('jishenForm')">确 定</el-button>
                <el-button @click="jishenDialogVisible = false" class="cancelBtn">取 消</el-button>

              </span>
            </el-dialog>



            <!--地区设置弹窗-->
            <el-dialog
                    title="地区配置"
                    :visible.sync="dialogVisible2"
                    width="900px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <!--<el-form :model="jishenForm" ref="jishenForm"  :rules="jishenRules" label-width="100px" style="margin-top: 30px" lass="demo-ruleForm">-->
                        <!--<el-form-item label="机审规则" prop="value">-->
                            <!--<el-select style="width: 100%" v-model="jishenForm.value" placeholder="请选择机审规则">-->
                                <!--<el-option label="开启" :value="1"></el-option>-->
                                <!--<el-option label="关闭" :value="0"></el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                    <!--</el-form>-->
                    <div class="test-div clear" >
                    </div>
                </div>
                <span slot="footer" class="dialog-footer marT30">
                     <!--<el-button type="primary"  class="setBtn" @click="setJishenRule('jishenForm')">确 定</el-button>-->
                <el-button @click="dialogVisible2 = false" class="cancelBtn">取 消</el-button>

              </span>
            </el-dialog>




            <el-dialog
                    title="有还款机构数占比"
                    :visible.sync="dialogVisible40"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">大于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.repaymentInstitutionsProportionType"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible40 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="有还款贷款笔数占比"
                    :visible.sync="dialogVisible41"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">大于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.repaymentLoanNumberProportion"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible41 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="贷款需求指数"
                    :visible.sync="dialogVisible42"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.loanDemandIndex"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible42 = false">取 消</el-button>
              </span>
            </el-dialog>



            <el-dialog
                    title="履约金额比例"
                    :visible.sync="dialogVisible43"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">大于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.performanceMoneyProportion"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible43 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="最近6个月扣款失败次数"
                    :visible.sync="dialogVisible44"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">小于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.recentlySixMonthDeductionsnFailNumber"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible44 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="个人履约指数"
                    :visible.sync="dialogVisible45"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">大于等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.individualPerformanceIndex"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible45 = false">取 消</el-button>
              </span>
            </el-dialog>

            <el-dialog
                    title="黑名单"
                    :visible.sync="dialogVisible46"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">等于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.tcBlackList"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible46 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="无逾期贷款笔数占比"
                    :visible.sync="dialogVisible47"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body">
                    <el-row class="flexRow titleRow">
                        <el-col :span="12">条件</el-col>
                        <el-col :span="12">参数</el-col>
                    </el-row>
                    <el-row class="flexRow">
                        <el-col :span="12">大于</el-col>
                        <el-col :span="12"><el-input :disabled="true" :value="pageInfo.nonOverdueLoanNumberProportion"></el-input></el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible47 = false">取 消</el-button>
              </span>
            </el-dialog>


            <el-dialog
                    title="注释"
                    :visible.sync="commonDialogVisible"
                    width="600px"
                    class="autoTrailDialog">
                <div class="diaolog-body" style="text-align: left;line-height: 30px;font-size: 12px">
                    <div v-show="commonType==2">
                        年龄：表示用户身份年龄符合通过；<br />
                        地区拒绝：表示用户身份籍贯满足此条件拒绝 。
                    </div>
                    <div v-show="commonType==3">
                        入网时间：表示用户入网时间符合条件通过；<br />
                        无通话静默天数：表示用户符合在一定时间内无通话的天数通过；<br />
                        连续无通话静默天数：表示用户符合在一定时间内连续无通话的天数通过；<br />
                        连续无通话静默大于3天次数：表示用户符合在一定时间内连续无通话大于3天的次数；<br />
                        通讯有效名单数：表示用户本地通讯录号码有效的个数通过；<br />
                        身份/运营信息匹配结果：表示用户身份与运营信息匹配结果满足通过；<br />
                        疑似催收电话数：表示用户通话记录中疑似催收电话个数通过；<br />
                        前十手机联系人通讯录匹配：表示用户前十手机联系人与通讯录匹配的个数通过；<br />
                        前十手机人均申请平台数：表示用户前十本地通讯录申请平台的个数通过;<br />
                        近一周通话次数：用户近一周的通话次数合计，建议大于0、小于10，命中拒绝，请输入整数。
                    </div>
                    <div  v-show="commonType==4">
                        芝麻信用分：表示用户满足芝麻信用分通过; <br />
                        花呗额度：表示用户满足花呗额度通过; <br />
                        未显示分数和额度：表示用户当未显示芝麻信用分和花呗额度是是否通过;
                        近12月成功交易订单平均金额：表示用户在最近12个月内的淘宝消费订单的平均金额
                    </div>
                    <div  v-show="commonType==5">
                        有盾分：表示用户在有盾模型下的综合评分，模型包含用户在有盾的各种数据、借贷、申请等等数据；<br />
                        小额借贷平台申请数：表示用户在有盾平台记录的借贷平台的申请数量;<br />
                        其他关联设备数：用户历史曾经间接关联过的设备数，如用户的通讯录朋友也曾经申请过，那么朋友的设备即为用户的其他关联设备，建议小于1;<br />
                        可疑设备数：用户曾经使用过的可疑手机（指多开、过时型号，黑名单设备等等原因造成等异常）的数量，建议小于1，请输入整数;<br />
                        关联银行卡数：用户在曾经绑定过的银行卡数量，建议小于6，请输入整数；<br />
                        使用设备数：用户使用过的设备数量，建议小于4，请输入整数;<br />
                        关联用户数：用户使用的这台设备曾经关联过的用户数量，建议小于11，请输入整数 ;<br />
                        法院失信数：表示用户在在法院记录中的失信记录，建议小于1，请输入整数;<br />
                        网贷失信数：表示用户在网贷平台的失信记录，建议小于1，请输入整数;<br />
                        活体攻击行为数：表示用户活体认证时使用非真人认证方式的次数，如照片，面具模拟等,建议小于1，请输入整数。
                    </div>
                    <div  v-show="commonType==6">
                        黑名单匹配：命中黑名单则拒绝，该规则无法修改参数，仅可选择勾选生效或者不勾选
                    </div>
                    <div  v-show="commonType==7">
                        当前逾期的贷款机构数：表示用户当前逾期的贷款机构数;<br />

                        最大逾期天数：表示用户逾期过的最大天数；<br />

                        最后一次逾期距今月数：表示用户最后一次逾期距离到现在的月数；<br />

                        当前逾期的贷款笔数：表示用户当前逾期的贷款笔数；<br />

                        逾期2周期以上的机构数：表示用户的历史逾期记录里曾经逾期超过2个周期的对应的贷款机构的数量；<br />

                        当前逾期金额：表示用户的当前逾期金额；<br />

                        平均换新机构间隔时长：表示用户平均每次换新机构申请贷款的间隔时长，单位为天。
                    </div>
                    <div  v-show="commonType==8">
                                           同盾贷前反欺诈风险分	：表示用户在同盾的综合评分
                    </div>

                    <div  v-show="commonType==9">
                        贷款需求指数：0-1000分，分数越高表示用户贷款需求越高；<br />
                        个人履约指数：分值大于等于0，越大越好；<br />
                        有还款机构数占比：有过实际还款的机构数在总机构数中的占比；<br />
                        有还款贷款笔数占比：有过实还的贷款数在总贷款数中的占比；<br />
                        履约金额比例：借款人历史还款金额在历史应还金额的中的占比；<br />
                        逾期贷款笔数：历史发生过逾期的贷款笔数；<br />
                        逾期贷款机构数：历史发生逾期行为的贷款机构数量；<br />
                        最近6个月扣款失败次数：表示借款人最近6个月扣款失败次数；<br />
                        <div>
                            黑名单：A极黑账户 : 网贷平台有过严重逾期行为(M3+)、 命中法院失信、被执行人;<br />
                            <div style="padding-left: 55px;">
                                B高危账户 : 网贷平台出现逾期但是未到M3+、 高危贴吧(戒赌吧，撸羊毛吧..)活跃;<br />
                            </div>
                            <div style="padding-left: 55px;">
                                C关注账户 : 高危借贷平台注册、申请次数过多；<br />
                            </div>
                            <div style="padding-left: 55px;">
                                D灰度账户 : 网贷平台借贷过多但未出现逾期行为。
                            </div>
                        </div>
                        无逾期贷款笔数占比：从未逾期的贷款数在总贷款数中的占比；<br />
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="commonDialogVisible = false">关 闭</el-button>
              </span>
            </el-dialog>

        </el-card>

    </div>
</template>

<script>
  import { mapState } from 'vuex';
  import $ from 'jquery';
  import  "../../assets/js/RegionalChoice.js";
  // import  "../../assets/css/RegionalChoice.css";
  export default {
    name: "channelList",
    data() {
      var validateConfirmPass = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入确认密码'));
        } else {
          if(this.ruleForm.newPassword!=value){
            return callback(new Error('新密码与确认密码不一致，请仔细核对！'));
          }
          callback();
        }
      };
      return {
        lilvInfo:{},
        eduInfo:{},
        setMoneyDialogVisible:false,
        ruleForm:{},
        passwordSetDialogVisible:false,
        jishenSetDialogVisible:false,
        rules: {
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
          ],
          confirmPassword: [
            { required: true, validator: validateConfirmPass, trigger: 'blur' },
          ],
        },
        jishenForm:{
          value:"0"
        },
        activeName:'jishenSet',
        dialogVisible1:false,
        dialogVisible2:false,
        dialogVisible3:false,
        dialogVisible4:false,
        dialogVisible5:false,
        dialogVisible6:false,
        dialogVisible7:false,
        dialogVisible8:false,
        dialogVisible9:false,
        dialogVisible10:false,
        dialogVisible11:false,
        dialogVisible12:false,
        dialogVisible13:false,
        dialogVisible14:false,
        dialogVisible15:false,
        dialogVisible16:false,
        dialogVisible17:false,
        dialogVisible18:false,
        dialogVisible19:false,
        dialogVisible20:false,
        dialogVisible21:false,
        dialogVisible22:false,
        dialogVisible23:false,
        dialogVisible24:false,
        dialogVisible25:false,
        dialogVisible26:false,
        dialogVisible27:false,
        dialogVisible28:false,
        dialogVisible29:false,
        dialogVisible30:false,
        dialogVisible31:false,
        dialogVisible32:false,
        dialogVisible33:false,
        dialogVisible34:false,
        dialogVisible35:false,
        dialogVisible36:false,
        dialogVisible37:false,
        dialogVisible38:false,
		dialogVisible39:false,

        dialogVisible40:false,
        dialogVisible41:false,
        dialogVisible42:false,
        dialogVisible43:false,
        dialogVisible44:false,
        dialogVisible45:false,
        dialogVisible46:false,
        dialogVisible47:false,
        jishenDialogVisible:false,
        jishenForm:{
          value:1
        },
        jishenRules: {
          value: [
            { required: true, message: '请选择机审规则', trigger: 'blur' },
          ],
        },
        pageInfo:{},


        commonType:1,
        commonDialogVisible:false






        // dialogVisible3:false
      };
    },
    created(){
    },
    mounted() {
     this.getAutoTrailVal();
     this.getPageInfo();

    },
    computed: mapState([
      // map this.count to store.state.count
      'btnStr'
    ]),
    components:{
    },
    watch:{
      "tableForm.loginName":function (n) {
        if(!n){
          this.readyAjax()
        }
      }
    },
    methods: {
      getAutoTrailVal(){
        this.$api.system.getAutoTrailVal().then((res)=>{
            if(res.data&&Object.keys(res.data).length){
              this.jishenForm.value=res.data.autoAuditSettings
            }
        })
      },
      setJishenRule(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.system.setAutoTrailVal(this.jishenForm.value).then(()=>{
              this.$message.success("自动审核设置成功!");
              this.jishenDialogVisible=false
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async getPageInfo(){
        // this.$api.system.getPageInfo().then((data)=>{
        //     this.pageInfo=data.data;
        //
        //     this.$nextTick(()=>{
        //        require("../../assets/js/RegionalChoice.js");
        //     })
        // })
        let res=await this.$api.system.getPageInfo();
        // this.$nextTick(()=>{
        //            require("../../assets/js/RegionalChoice.js");
        //         })
        this.pageInfo=res.data;
        // this.GetRegionPlug()
      },
      GetRegionPlug(){
        let that=this;
        this.$api.system.getAllAreas().then((res)=>{
          // this.$nextTick(()=>{
            console.log($(".test-div").html())
            $(".test-div").html("");
            let datas=res.data;
            $(".test-div").append(
              $("<div/>", {
                "class": "place-div"
              }).append(
                $("<div/>", {}).append(
                  $("<div/>", {
                    "class": "checkbtn"
                  }).append(
                    $("<a/>", {
                      "class": "allcheck",
                      "text": "全选",
                      "click": function () {
                        $(".place").find("input").prop("checked", true);
                        that.ShowTipNum();
                      }
                    })
                  ).append(
                    $("<a/>", {
                      "class": "clearCheck",
                      "text": "清空",
                      "click": function () {
                        $(".place").find("input").prop("checked", false);
                        $(".ratio").html("");
                      }
                    })
                  )
                ).append(
                  $("<div/>", {
                    "class": "placegroup"
                  }).append(
                    that.GetPlace(datas)
                  )
                )
              )
            )
          // })
        }).catch((e)=>{
          console.log(e)
        })
      },
      GetPlace(datas){
        // this.$nextTick(()=>{
          let that=this;
          return  datas.map(function (item) {
            // console.log(item);
            return $("<div/>", {
              "class": "place clearfloat"
            }).append(
              $("<div/>", {
                "class": "bigplace"
              }).append(
                $("<div/>", {}).append(
                  $("<label/>", {
                    "text": item.province
                  }).append(
                    $("<input/>", {
                      // "id":item.id,
                      "type": "checkbox",
                      "class": "bigarea",
                      "data-name": item.province,
                      "click": function () {
                        var bool = $(this).prop("checked");
                        var single = $(this).parents(".bigplace").next().find("input");
                        var ee = $(this).parents(".bigplace").next().find(".place-tooltips");
                        single.prop("checked", bool);
                        if (single.prop("checked")) {
                          ee.each(function (index, a) {
                            var num = $(this).find(".citys").find("input").length;
                            $(this).find(".ratio").html("(" + num + "/" + num + ")");
                          })
                        } else {
                          ee.each(function (index, a) {
                            var num = $(this).find(".citys").find("input").length;
                            $(this).find(".ratio").html("");
                          })
                        }
                      }
                    })
                  )
                )
              )
            ).append(
              function () {
                    $(".test-div").on('mouseover', '.place', function () {
                      // console.log($(this).children(".bigplace").find(".bigarea").attr("data-name"));
                      $(this).addClass("place-active");
                      // console.log($(this).children(".smallplace"))
                      $(this).children(".smallplace").show();
                    })
                    $(".test-div").on('mouseout', '.place', function () {
                      $(this).removeClass("place-active");
                      $(".smallplace").hide();
                    })
                if (item.cityList) {
                  // 自定义JS
                  return  that.GetSmallPlace(item.cityList)
                }
              }()
            )
          })

      },
      GetSmallPlace(datas){
        let that=this;
        return $("<div/>", {
          "class": "smallplace clearfloat"
        }).append(
          datas.map(function (item) {
            return $("<div/>", {
              "class": "place-tooltips"
            }).append(
              $("<label/>", {
                "text": item.city
              }).append(
                $("<input/>", {
                  // "id":item.id,
                  "type": "checkbox",
                  "class": "bigcity",
                  "data-name": item.cityId,
                  "id":item.cityId,
                  "click": function () {
                    var small = $(this).parent().next(".citys").find("input");
                    var smalllength = small.length;
                    var ee = $(this).parents(".smallplace").find(".ratio");
                    if ($(this).prop("checked")) {
                      small.prop("checked", true);
                      $(this).parents(".place-tooltips").find(".ratio").html("(" + smalllength + "/" + smalllength + ")");
                      $(this).parents(".smallplace").prev().find(".bigarea").prop("checked", true);
                    } else {
                      small.prop("checked", false);
                      $(this).parents(".place-tooltips").find(".ratio").html("");
                      ClearArea($(this).parents(".smallplace"), $(this).parents(".smallplace").prev().find(".bigarea"));
                    };
                  }
                })
              ).append(
                function () {
                  if (item.children) {
                    return $("<span/>", {
                      "class": "ratio"
                    })
                  }
                }
              )
            ).append(
              function () {
                if (item.children) {
                  return $("<div/>", {
                    "class": "citys"
                  }).append(
                    $("<i/>", {
                      "class": "jt"
                    }).append($("<i/>", {}))
                  ).append(

                    that.GetSmallCitys(item.children)
                  )
                }
              }
            )
          })
        )
      },
      GetSmallCitys(datas){
        return $("<div/>", {
          "class": "row-div clearfloat"
        }).append(
          datas.map(function (item) {
            return $("<p/>", {}).append(
              $("<label/>", {}).append(
                $("<input/>", {
                  // "id":item.id,
                  "type": "checkbox",
                  "class": "city",
                  "click": function () {
                    var tf = $(this).parents(".citys").find("input:checked").length;
                    var alltf = $(this).parents(".citys").find("input").length;
                    if (tf > 0) {
                      $(this).parents(".place-tooltips").find(".bigcity").prop("checked", true);
                      $(this).parents(".place-tooltips").find(".ratio").html("(" + tf + "/" + alltf + ")");
                      $(this).parents(".smallplace").prev().find(".bigarea").prop("checked", true);
                    } else if (tf == 0) {
                      $(this).parents(".place-tooltips").find(".bigcity").prop("checked", false);
                      $(this).parents(".place-tooltips").find(".ratio").html("");
                      ClearArea($(this).parents(".smallplace"), $(this).parents(".smallplace").prev().find(".bigarea"));
                    }
                  }
                })
              ).append(
                $("<span/>", {
                  "text": item.name
                })
              )
            )
          })
        )
      },
      ShowTipNum(){
        var n = $(".place-div").find(".place");
        n.each(function (index, a) {
          var m = $(this).find(".place-tooltips");
          m.each(function (index, a) {
            var u = $(this).find(".citys").find(".city").length;
            var uu = $(this).find(".citys").find(".city:checked").length;
            if (uu != 0) {
              $(this).find(".ratio").html("(" + uu + "/" + u + ")");
              $(this).find(".bigcity").prop("checked", true);
            } else {
              $(this).find(".ratio").html("");
            }

          })

        })
      },
      SetChecked(param) {
        $(".clearCheck").click()
        // this.$nextTick(()=>{
          $.each(param, function (index, value) {
            $("#" + value).prop("checked","checked");
            $("#" + value).parents(".smallplace").siblings(".bigplace").find(".bigarea").prop("checked","checked");
            //      console.log(($("#" + value).parents(".bigplace")).children().find(".bigarea").attr("checked"))
            //      $("#" + value).parents(".bigplace .bigarea").attr("checked","checked");
          })
        // })
      },
      showCommonIntro(type){
        this.commonDialogVisible=true;
        this.commonType=type
      },
      showArea(){
        this.dialogVisible2=true;
        this.GetRegionPlug();
        this.$nextTick(()=>{
          setTimeout(()=>{
            if(this.pageInfo.cityCode){
              this.SetChecked(this.pageInfo.cityCode.split(","));
            }else{
              this.SetChecked(new Array())
            }
          },1000)
        })
      }
    },
    destoryed() {}
  };
</script>

<style  lang="less">
    @import url('../../assets/css/RegionalChoice.css');
    .headerTitle{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-weight: bold;
        font-size: 14px;
    }
    .intro-title{
        font-size: 12px;
        color:gray;
        cursor: pointer;
    }
    .setWord{
        font-size: 14px;
        font-weight: bold;
    }
    .jishenWrap{
        /*background: rgba(255,255,255,.8);*/
        .jishenItem{
            border-radius: 20px;
            background: rgba(255,255,255,.65);
        }
    }
    .jishenItem-headWrap{
        padding: 0 30px;
        .jishenItem-head{
            line-height: 50px;
        }
    }
    .autoWrap{
        /*.el-tabs__content{*/
            /*border-radius: 20px;*/
            /*background: rgba(255,255,255,.65);*/
        /*}*/
        .jishenItem-body{
            padding: 0 30px;
            .el-col{
                /*cursor: pointer;*/
                font-size: 13px;
                font-weight: bold;
                line-height: 50px;
                color:#72ACE3;
                span{
                    cursor: pointer;
                }
            }
        }
    }
    .divider{
        border-bottom: 1px solid gainsboro;
    }
    .autoTrailDialog{
        .el-dialog__body{
            padding: 0 20px!important;
        }
        .dialog-footer{
            margin-top: 10px;
            display: block;
        }
        .titleRow{
            font-weight: bold;
        }
        .diaolog-body{
            text-align: center;
            .el-input__inner{
                height: 30px;
                text-align: center;
            }
        }
        .flexRow{
            margin-top: 30px;
            display: flex;
            align-items: center;
        }
    }
</style>
