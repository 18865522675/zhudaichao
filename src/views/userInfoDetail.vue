<template>
    <div class="userDetailInfo">
        <el-tabs :tab-position="tabPosition" class="rightTab detailTabs" @tab-click="tabClick">
            <el-tab-pane label="用户基本信息">
                <el-card class="box-card affilateWrap baseInfoWrap">
                    <label class="detailLabel">基本信息</label>
                    <div class="baseInfo">
                        <el-row class="normalRow">
                        	<el-col :span="9">
                        		姓名 : {{baseInfo.user.userName}}
                        	</el-col>
                        	<el-col :span="9">
                        		认证时间： {{baseInfo.gmtDatetime}}
                        	</el-col>
                        </el-row>
                        <el-row class="normalRow">
                        	<el-col :span="9">
                        		银行卡信息 : {{bankcardInfo.bankcardno}}
                        	</el-col>
                        	<el-col :span="9">
                        		身份证号：  {{bankcardInfo.idcardno}}
                        	</el-col>
                        </el-row>
                        <el-row class="normalRow">
                        	<el-col :span="9">
                        		本人手机 : {{baseInfo.user.phone}}
                        	</el-col>
                        </el-row>
                    </div>
                    <!--基本信息-淘宝信用信息-->
                    <div class="detailLabel marT20">淘宝信用信息</div>
                    <div class="taobaoInfo">
                    	<el-row class="normalRow">
                        	<el-col :span="9">
                        		芝麻信用分 : <span v-if="taobaoRes.data">{{taobaoRes.data.data.task_data.account_info.zhima_point}}</span>
                        	</el-col>
                        	<el-col :span="9">
                        		花呗额度： <span  v-if="taobaoRes.data">{{taobaoRes.data.data.task_data.account_info.credit_quota/100}}</span>
                        	</el-col>
                        </el-row>
                        <el-row class="normalRow">
                        	<el-col :span="9">
                        		借呗额度 : <span  v-if="taobaoRes.data">{{taobaoRes.data.data.task_data.account_info.jiebei_quota/100}}</span>
                        	</el-col>
                        	<el-col :span="9">
                        		花呗消费额度： <span  v-if="taobaoRes.data">{{taobaoRes.data.data.task_data.account_info.consume_quota/100}}</span>
                        	</el-col>
                        </el-row>
                    </div>

                     <!--基本信息-有盾-->
                     <div class="detailLabel marT20">有盾数据</div>
                     <div class="youdun borderB">
						 <div  class="flex-r"  style="align-items: center;" v-if="youdunInfo&&Object.keys(youdunInfo).length">
							 <span style="font-size: 12px;font-weight: bold;">有盾贷前模型分 ： </span>
							 <div class="ydCircle" id="ydCircle">
								 <img src="../assets/img/circle.png" alt="有盾数据" />
								 <span id="riskType" v-if="youdunInfo.body">{{youdunInfo.body.score_detail.risk_evaluation}}</span>
								 <span id="youdunScore"  v-if="youdunInfo.body">{{youdunInfo.body.score_detail.score}}</span>
							 </div>
							 <tipbtn content="数据分析显示：有盾分值大于等于75分，则潜在逾期风险较高"></tipbtn>
						 </div>
						 <div  class="noData" v-else>
								暂无运营商数据
						 </div>

                     </div>

                     <div class="detailLabel marT20">关键风控数据</div>
                     <div class="mainFengkong borderB">
                     	<el-row class="elRowNormal">
                     		<el-col :span="12" class="flex-r-c">
                     			<span>小额借款平台申请数 : </span><span>{{transNull(riskInfo.no_show_score_and_quota)}} </span>
                     			<tipbtn content="数据分析显示：小额现金贷申请借款平台数大于等于160，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>入网时长 : </span><span>{{transNull(riskInfo.mobile_net_age)!='无'?transNull(riskInfo.mobile_net_age)+'个月':'无'}}</span>
                     			<tipbtn content="数据分析显示：用户入网时长小于12个月，则潜在逾期风险较"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>近一周与三个月通话次数占比  : </span><span>{{transNull(riskInfo.one_week_divide_three_months_percent)}} </span>
                     			<tipbtn content="数据分析显示：最近一周通话次数与最近三个月通话次数的比值大于等于0.20，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>近一周联系人个数 : </span><span>{{transNull(riskInfo.call_count_one_week)}} </span>
                     			<tipbtn content="数据分析显示：最近一周通话联系人个数大于等于86，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>近一周通话次数 : </span><span>{{transNull(riskInfo.call_count_one_week_times)}} </span>
                     			<tipbtn content="数据分析显示：近一周通话次数大于0、小于10，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>近一周与近一个月联系人个数占比 : </span><span>{{transNull(riskInfo.call_count_one_week_divide_one_month_percent)}} </span>
                     			<tipbtn content="数据分析显示：近一周与近一个月联系人个数占比小于等于0.10或者大于等于0.55，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>当前逾期的贷款机构数 : </span><span>{{transNull(riskInfo.overdue_tenant_count12)}}  </span>
                     			<tipbtn content="数据分析显示：当前逾期的贷款机构数大于等于1个，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>最大逾期天数 : </span><span>{{transNull(riskInfo.max_overdue_days12)}}  </span>
                     			<tipbtn content="数据分析显示：最大逾期天数大于等于1天，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>最后一次逾期距今月数 : </span><span>{{transNull(riskInfo.months_from_last_overduev)}} </span>
                     			<tipbtn content="数据分析显示：最后一次逾期距今月数大于等于1个月，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>当前逾期的贷款笔数 : </span><span>{{transNull(riskInfo.overdue_loan_count12)}} </span>
                     			<tipbtn content="数据分析显示：当前逾期的贷款笔数大于等1笔，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>逾期2周期以上的机构数 : </span><span>{{transNull(riskInfo.overdue_for2_term_tenant_count12)}}  </span>
                     			<tipbtn content="数据分析显示：逾期2周期以上的机构数大于等1个，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>当前逾期金额 : </span><span>{{transNull(riskInfo.remaining_overdue_amount)}}  </span>
                     			<tipbtn content="数据分析显示：当前逾期金额大于0元，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>平均换新机构间隔时长 : </span><span>{{transNull(riskInfo.average_tenant_gap_days12)}} </span>
                     			<tipbtn content="数据分析显示：平均换新机构间隔时长小于等于2天，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>其他关联设备数 : </span><span>{{transNull(riskInfo.other_link_device_count)}} </span>
                     			<tipbtn content="数据分析显示：其他关联设备数大于等于1，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>可疑设备数 : </span><span>{{transNull(riskInfo.other_frand_device_count)}} </span>
                     			<tipbtn content="数据分析显示：可疑设备数大于等1，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>关联银行卡数 : </span><span>{{transNull(riskInfo.bankcard_count)}}  </span>
                     			<tipbtn content="数据分析显示：关联银行卡数大于等6，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>使用设备数 : </span><span>{{transNull(riskInfo.link_device_count)}}  </span>
                     			<tipbtn content="数据分析显示：使用设备数大于等于4，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>关联用户数 : </span><span>{{transNull(riskInfo.link_user_count)}}  </span>
                     			<tipbtn content="数据分析显示：关联用户数大于等于11，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>法院失信 : </span><span>{{transNull(riskInfo.court_dishonest_count)}}  </span>
                     			<tipbtn content="数据分析显示：法院失信大于等1，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>网贷失信 : </span><span>{{transNull(riskInfo.online_dishonest_count)}} </span>
                     			<tipbtn content="数据分析显示：网贷失信大于等于1，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     		<el-col :span="12" class="flex-r-c">
                     			<span>活体攻击行为 : </span><span>{{transNull(riskInfo.living_attack_count)}}</span>
                     			<tipbtn content="数据分析显示：活体攻击行为大于等于11，则潜在逾期风险较高"></tipbtn>
                     		</el-col>
                     	</el-row>
                     </div>


                     <div class="detailLabel marT20">平台共享数据 <span class="smallTip">注 : 本次申请也计算在内</span></div>
                     <div class="publicData borderB">
                     	<el-row class="elRowNormal">
                     		<el-col :span="12">累计放款订单数 : {{shareInfo.totalLoanOrderNum}}</el-col>
                     		<el-col :span="12">累计申请订单数 : {{shareInfo.totalApplyOrderNum}}</el-col>
                     		<el-col :span="12">已还款订单数  : {{shareInfo.alreadyRepaymentOrderNum}}</el-col>
                     		<el-col :span="12">待还款订单数 : {{shareInfo.pendRepaymentOrderNum}}</el-col>
                     		<el-col :span="12">逾期未还订单数 : {{shareInfo.overdueNoRepaymentOrderNum}}</el-col>
                     		<el-col :span="12">累计逾期次数 : {{shareInfo.totalOverdueOrderTimes}}</el-col>
                     		<el-col :span="12">最长逾期天数 : {{shareInfo.maximumOverdueDays}}</el-col>
                     	</el-row>
                     </div>

                     <div class="detailLabel marT20">紧急联系人</div>
                     <div class="jinjiPeople borderB">
						 <div>
							 <div>
								 <span>{{baseInfo.linkPersonRelationOne}} </span> | <span>{{baseInfo.linkPersonNameOne}} </span> | <span>{{baseInfo.linkPersonPhoneOne}}</span>
							 </div>
							 <div v-if="jinjiList.jinji1.length">
								 <el-table class="marT10 aplus-center-table" border :row-class-name="tableRowClassName"   center style="width: 100%" :data="jinjiList.jinji1">
									 <el-table-column
											 prop="contact_number"  width="400" :show-overflow-tooltip="true"
											 label="联系密度分析（近1周/近1月/近3月）">
										 <template slot-scope="scope">
											 {{scope.row.call_count_1week}} | {{scope.row.call_count_1month}} | {{scope.row.call_count_3month}}
										 </template>
									 </el-table-column>
									 <el-table-column
											 prop="call_count_3month" :show-overflow-tooltip="true"
											 label="联系次数">
									 </el-table-column>
									 <el-table-column
											 prop="call_count_active_3month"  :show-overflow-tooltip="true"
											 label="主叫次数">
									 </el-table-column>
									 <el-table-column
											 prop="call_count_passive_3month" :show-overflow-tooltip="true"
											 label="被叫次数">
									 </el-table-column>
									 <el-table-column
											 prop="first_time_call_6month" :show-overflow-tooltip="true"
											 label="通讯录名称">
									 </el-table-column>
								 </el-table>
							 </div>
							 <div class="noData" v-else>
								 无运营商数据
							 </div>


							 <div class="marT30">
								 <span>{{baseInfo.linkPersonRelationTwo}} </span> | <span>{{baseInfo.linkPersonNameTwo}} </span> | <span>{{baseInfo.linkPersonPhoneTwo}}</span>
							 </div>
							 <div v-if="jinjiList.jinji1.length">
								 <el-table class="marT10 aplus-center-table" border :row-class-name="tableRowClassName"   center style="width: 100%" :data="jinjiList.jinji2">
									 <el-table-column
											 prop="contact_number"  width="400" :show-overflow-tooltip="true"
											 label="联系密度分析（近1周/近1月/近3月）">
										 <template slot-scope="scope">
											 {{scope.row.call_count_1week}} | {{scope.row.call_count_1month}} | {{scope.row.call_count_3month}}
										 </template>
									 </el-table-column>
									 <el-table-column
											 prop="call_count_3month" :show-overflow-tooltip="true"
											 label="联系次数">
									 </el-table-column>
									 <el-table-column
											 prop="call_count_active_3month"  :show-overflow-tooltip="true"
											 label="主叫次数">
									 </el-table-column>
									 <el-table-column
											 prop="call_count_passive_3month" :show-overflow-tooltip="true"
											 label="被叫次数">
									 </el-table-column>
									 <el-table-column
											 prop="first_time_call_6month" :show-overflow-tooltip="true"
											 label="通讯录名称">
									 </el-table-column>
								 </el-table>
							 </div>
							 <div class="noData" v-else>
								 无运营商数据
							 </div>

						 </div>
                     </div>

                     <div class="detailLabel marT20">身份证认证图片</div>
					 <div class="borderB idcardWrap flex-r">
						<!--<div class="imgWrap" @click="showImg(transUrl(idCardInfo.image),1)">-->
							<!--<img :src="transUrl(idCardInfo.image)" alt="">-->
						<!--</div>-->
						 <!--<div class="imgWrap" @click="showImg(transUrl(idCardInfo.frontcard),2)">-->
							 <!--<img :src="transUrl(idCardInfo.frontcard)" alt="">-->
						 <!--</div>-->
						 <!--<div class="imgWrap" @click="showImg(transUrl(idCardInfo.backcard),3)">-->
							 <!--<img :src="transUrl(idCardInfo.backcard)" alt="">-->
						 <!--</div>-->
						 <viewer  :images="images" class="marT20">
							 <img v-for="src in images" :src="src" :key="src" width="300" height="200" style="margin-left: 20px">
						 </viewer>
					 </div>

					<div class="detailLabel marT20">历史借款记录</div>
					<div class="borderB">
						<div class="historyList" v-if="historyList.length" style="align-items: center">
							<div class="historyItem flex-r" v-for="(item,index) in historyList" :key="index">
								<div class="historyList-inner flex-r" style="justify-content:space-between!important;">
									<div>
										<span class="fontW">借款申请时间 : </span>
										<span>{{item.gmtDatetime}}</span>
									</div>
									<div>
										<span class="fontW">借款金额 : </span>
										<span>{{item.borrowMoney}}元</span>
									</div>
									<div>
										<span class="fontW">订单状态 : </span>
										<span>{{transPayStatus(item.orderStatus)}}</span>
									</div>
								</div>
								<el-button type="primary"  class="reloadBtn marL10" @click="showOrderDetail(item)">订单过程记录</el-button>
							</div>
						</div>
						<div class="noData" v-else>
							暂无历史借款记录
						</div>
					</div>

                </el-card>
            </el-tab-pane>



			<!--通讯录与运营商匹配-->

            <el-tab-pane label="运营商与通讯录数据">
				<el-card class="box-card affilateWrap yysWrap">
					<div class="circleWrap">
						<label class="detailLabel">近1周前5联系人通话详情</label>
						<el-table class="marT20 aplus-center-table" border :row-class-name="tableRowClassName"   center style="width: 100%" :data="yysTable.topFiveTable">
							<el-table-column
									prop="contact_number" width="150" :show-overflow-tooltip="true"
									label="号码">
							</el-table-column>
							<el-table-column
									prop="contact_name" :show-overflow-tooltip="true"
									label="号码标签" :formatter="$toolkit.transNull">
							</el-table-column>
							<el-table-column
									prop="contact_area"  :formatter="$toolkit.transNull"  width="150" :show-overflow-tooltip="true"
									label="号码归属地">
							</el-table-column>
							<el-table-column
									prop="last_time_call_6month" :show-overflow-tooltip="true"
									label="最近联系时间">
							</el-table-column>
							<el-table-column
									prop="first_time_call_6month" :show-overflow-tooltip="true"
									label="首次联系时间">
							</el-table-column>
							<el-table-column
									prop="call_count_1week"  width="100" :show-overflow-tooltip="true"
									label="通话次数">
							</el-table-column>
							<el-table-column
									prop="call_time_1week" :show-overflow-tooltip="true"
									label="通话时长（秒）">
							</el-table-column>
							<el-table-column
									prop="date" :show-overflow-tooltip="true"
									label="主叫/被叫通话次数">
								<template slot-scope="scope">
									{{scope.row.call_count_active_1week+ '/' +scope.row.call_count_passive_1week}}
								</template>
							</el-table-column>
							<el-table-column
									prop="date" width="200" :show-overflow-tooltip="true"
									label="主叫/被叫通话时长(秒)">
								<template slot-scope="scope">
									{{scope.row.call_time_active_1week+ '/' +scope.row.call_time_passive_1week}}
								</template>
							</el-table-column>
							<el-table-column
									prop="date"
									label="通讯录">
								<template slot-scope="scope">
									<span v-if="scope.row.name">{{scope.row.name}}</span>
									<span v-else  style="color:red;font-weight: bold;">无记录</span>
									<!--{{scope.row.name?scope.row.name:'无记录'}}-->
								</template>
							</el-table-column>
						</el-table>
					</div>


					<div class="circleWrap marT60">
						<label class="detailLabel">近1周前10联系人通话详情</label>
						<el-table class="marT20 aplus-center-table" border :row-class-name="tableRowClassName"   center style="width: 100%" :data="yysTable.topTenTable">
							<el-table-column
									prop="contact_number" width="150" :show-overflow-tooltip="true"
									label="号码">
							</el-table-column>
							<el-table-column
									prop="contact_name" :show-overflow-tooltip="true"
									label="号码标签" :formatter="$toolkit.transNull">
							</el-table-column>
							<el-table-column
									prop="contact_area"  :formatter="$toolkit.transNull"  width="150" :show-overflow-tooltip="true"
									label="号码归属地">
							</el-table-column>
							<el-table-column
									prop="last_time_call_6month" :show-overflow-tooltip="true"
									label="最近联系时间">
							</el-table-column>
							<el-table-column
									prop="first_time_call_6month" :show-overflow-tooltip="true"
									label="首次联系时间">
							</el-table-column>
							<el-table-column
									prop="call_count_1week"  width="100" :show-overflow-tooltip="true"
									label="通话次数">
							</el-table-column>
							<el-table-column
									prop="call_time_1week" :show-overflow-tooltip="true"
									label="通话时长（秒）">
							</el-table-column>
							<el-table-column
									prop="date" :show-overflow-tooltip="true"
									label="主叫/被叫通话次数">
								<template slot-scope="scope">
									{{scope.row.call_count_active_1week+ '/' +scope.row.call_count_passive_1week}}
								</template>
							</el-table-column>
							<el-table-column
									prop="date" width="200" :show-overflow-tooltip="true"
									label="主叫/被叫通话时长(秒)">
								<template slot-scope="scope">
									{{scope.row.call_time_active_1week+ '/' +scope.row.call_time_passive_1week}}
								</template>
							</el-table-column>
							<el-table-column
									prop="date"
									label="通讯录">
								<template slot-scope="scope">
									<span v-if="scope.row.name">{{scope.row.name}}</span>
									<span v-else  style="color:red;font-weight: bold;">无记录</span>
									<!--{{scope.row.name?scope.row.name:'无记录'}}-->
								</template>
							</el-table-column>
						</el-table>
					</div>



					<div class="circleWrap marT60">
						<label class="detailLabel">全部联系人明细</label>
						<div style="height: 600px;overflow-y: auto" class="marT20 ">
							<el-table class="aplus-center-table" border :row-class-name="tableRowClassName"   center style="width: 100%" :data="yysTable.topAll">
								<el-table-column
										prop="contact_number" width="150" :show-overflow-tooltip="true"
										label="号码">
								</el-table-column>
								<el-table-column
										prop="contact_area" :show-overflow-tooltip="true"
										label="归属地" :formatter="$toolkit.transNull">
								</el-table-column>
								<el-table-column
										prop="last_time_call_6month" :show-overflow-tooltip="true"
										label="联系密度分析(周|月|3月)">
									<template slot-scope="scope">
										{{scope.row.call_count_1week+ '次|' +scope.row.call_count_1month+ '次|' + scope.row.call_count_3month +'次'}}
									</template>
								</el-table-column>
								<el-table-column
										prop="call_count_3month" :show-overflow-tooltip="true"
										label="联系次数">
								</el-table-column>
								<el-table-column
										prop="call_time_3month"  width="100" :show-overflow-tooltip="true"
										label="联系时间(分)">
								</el-table-column>
								<el-table-column
										prop="call_count_active_3month" :show-overflow-tooltip="true"
										label="主叫次数">
								</el-table-column>
								<el-table-column
										prop="call_count_passive_3month" :show-overflow-tooltip="true"
										label="被叫次数">
								</el-table-column>
								<el-table-column
										prop="date"
										label="通讯录">
									<template slot-scope="scope">
										<span v-if="scope.row.name">{{scope.row.name}}</span>
										<span v-else  style="color:red;font-weight: bold;">无记录</span>
										<!--{{scope.row.name?scope.row.name:'无记录'}}-->
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>

				</el-card>
			</el-tab-pane>


			<!--本地通讯录-->
            <el-tab-pane label="本地通讯录">
				<el-card class="box-card affilateWrap nativeWrap">
					<div class="circleWrap">
						<label class="detailLabel">全部联系人明细</label>
						<el-table class="aplus-center-table marT20" border :row-class-name="tableRowClassName"   center style="width: 100%" :data="nativeTables.contactTable">
							<el-table-column
									prop="name1"  :show-overflow-tooltip="true"
									label="联系人姓名">
							</el-table-column>
							<el-table-column
									prop="phone1" :show-overflow-tooltip="true"
									label="联系人号码">
							</el-table-column>
							<el-table-column
									prop="name2"  :show-overflow-tooltip="true"
									label="联系人姓名">
							</el-table-column>
							<el-table-column
									prop="phone2" :show-overflow-tooltip="true"
									label="联系人号码">
							</el-table-column>
						</el-table>
					</div>

					<div class="circleWrap marT60">
						<label class="detailLabel">本机通讯录</label>
						<div class="marT10">
							 <span>内容 : </span>
							 <el-input placeholder="请输入内容" v-model="nativeTables.keyword" class="nativeInp"></el-input>
							<el-button type="primary" icon="el-icon-search " class="reloadBtn" @click="searchBenji">查询</el-button>
						</div>
						<el-table class="aplus-center-table marT20" border    center style="width: 100%" :data="nativeTables.benjiTable">
							<el-table-column
									prop="senderPhone"  :show-overflow-tooltip="true"
									label="发件人手机号">
							</el-table-column>
							<el-table-column
									prop="receiverPhone" :show-overflow-tooltip="true"
									label="收件人手机号">
							</el-table-column>
							<el-table-column
									prop="content"  :show-overflow-tooltip="true"
									label="短信内容" width="600">
							</el-table-column>
							<el-table-column
									prop="sendTime"
									label="发送时间">
							</el-table-column>
						</el-table>

						<div class="block pagiWrap" style="margin-top: 20px">
							<el-pagination
									@size-change="handleSizeChangeNativeTables"
									@current-change="handleCurrentChangeNativeTables"
									:current-page="nativeTables.current"
									:page-sizes="[10, 20, 30, 50]"
									:page-size="nativeTables.size"
									layout="total, sizes, prev, pager, next, jumper"
									:total="nativeTables.total">
							</el-pagination>
						</div>
					</div>
				</el-card>

			</el-tab-pane>

			<!--运营商报告-->
            <el-tab-pane label="运营商报告" lazy>
				<iframe :src="taobaoSrc" scrolling="auto" :style="{'height':taobaoHeight}" style="margin-bottom:-15px; width: 100%; border: 0;"></iframe>
			</el-tab-pane>


            <el-tab-pane label="淘宝详情数据">
				<singleTaobaoInfo :res="taobaoRes"></singleTaobaoInfo>
			</el-tab-pane>
            <el-tab-pane label="机构贷前数据共享报告(推荐)" lazy>
				<singleLoanPre></singleLoanPre>
			</el-tab-pane>
            <el-tab-pane label="机构贷后数据共享报告(推荐)" lazy>
				<singleLoanAfter></singleLoanAfter>
			</el-tab-pane>
            <el-tab-pane label="天创信用共享报告（推荐）" lazy>
				<singleTianChuang></singleTianChuang>
				<!--<singleDuotouInfo></singleDuotouInfo>-->
			</el-tab-pane>
            <el-tab-pane label="多头详细信息（参考）" lazy>
				<singleDuotouInfo></singleDuotouInfo>
				<!--<singleBlack></singleBlack>-->
			</el-tab-pane>

			<!--<el-button type="primary" disabled class="marT20" icon="el-icon-back">返回上一页</el-button>-->
        </el-tabs>


		<!--<el-dialog-->
				<!--title="订单记录"-->
				<!--:visible.sync="dialogVisible"-->
				<!--width="800px"-->
				<!--@close="handleClose">-->
			<!--<el-tabs v-model="activeName"  type="card">-->
				<!--<el-tab-pane label="审核记录" name="allotList">-->
					<!--<baseRecordList :recordList="allotList"></baseRecordList>-->
				<!--</el-tab-pane>-->
				<!--<el-tab-pane label="放款记录" name="loanList">-->
					<!--<baseRecordList :recordList="loanList"></baseRecordList>-->
				<!--</el-tab-pane>-->
				<!--<el-tab-pane label="催记记录" name="deptList">-->
					<!--<baseRecordList :recordList="deptList"></baseRecordList>-->
				<!--</el-tab-pane>-->
			<!--</el-tabs>-->
			<!--<span slot="footer" class="dialog-footer">-->
				<!--<el-button @click="dialogVisible = false">关 闭</el-button>-->
			  <!--</span>-->
		<!--</el-dialog>-->



		<!--会员详情弹窗-->
		<el-dialog
				title="订单过程记录"
				:visible.sync="dialogVisible"
				width="70%"
				ref="memberDialog"
				style="height: 100%;"
				class="memberDialog onePerMemberDialog">
			<div>
				<div class="marT30 detailInfoBody flex-r">
					<div class="detailBody-left">
						<div class="Detailtitle" style="padding-left: 10px">
							订单操作
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
						<div v-show="detailTab==2" class="detailBody-right-item">
							<recordComponent title="审核记录" :data="shenheList" :showAdd="false" :orderId="actionRow.id" @regetdata="regetdata"></recordComponent>
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
    </div>
</template>

<script>
  import tipbtn from "@/components/tipBtn.vue";
  import singleTaobaoInfo from "@/components/singleTaobaoInfo.vue"
  import singleDuotouInfo from "@/components/singleDuotouInfo.vue"
  import singleBlack from "@/components/singleBlack.vue"
  import baseRecordList from "@/components/baseRecordList.vue"
  import singleLoanPre from "@/components/singleLoanPre.vue"
  import singleLoanAfter from "@/components/singleLoanAfter.vue"
  import singleTianChuang from "@/components/singleTianChuang.vue"
  import recordComponent from "@/components/recordComponent"
  import globalInfo from "../../public/globalConfig"


  export default {
    name: 'userInfoDetail',
    data () {
      return {
        tabPosition:"top",
        taobaoSrc:"",
		taobaoHeight:0,

		yysTable:{
          topFiveTable:[],
          topTenTable:[],
		  topAll:[]
		},

		nativeTables:{
			contactTable:[],
		    benjiTable:[],
		    current:1,
		    size:10,
		    total:10,
		    keyword:""
		},

		// 基本信息
        baseInfo:{
          user:{}
		},
		// 银行卡信息
        bankcardInfo:{},
        taobaoRes:{},
        youdunInfo:{},
        riskInfo:{},
        shareInfo:{},
        historyList:[],
        dialogVisible:false,


        allotList:[],
        loanList:[],
        deptList:[],
        activeName:"allotList",
		jinjiList:{
          jinji1:[],
		  jinji2:[]
		},
        idCardInfo:{},
        otherData:[],
        overdueData:[],
        waitPayData:[],
        payedData:[],
        detailTab:2,

        shenheList:[],
        fangkuanList:[],
        cuijiList:[],
        actionRow:{},
        images:[]
      }
    },
    computed:{
      "id":function () {
        return this.$route.params.userId
      },
      "orderId":function () {
        return this.$route.params.orderId
      },
      "userName":function () {
        return this.$route.params.userName
      },
      "phone":function () {
        return this.$route.params.phone
      }
    },
    components:{
    	tipbtn,
      singleTaobaoInfo,
      singleDuotouInfo,
      singleBlack,
      baseRecordList,
      singleLoanPre,
      singleLoanAfter,
      singleTianChuang,
      recordComponent
    },
    created () {
    },
    destoryed () {
    },
    mounted () {
      this.getYoudunInfo()
      // 获取基本信息
      this.getBaseInfo();
	  // 获取运营商与通讯录匹配
      this.getYysInfo();

      // 本地通讯录
      this.nativePhones();
      // 本机
      this.getBenjiList();

	  this.getBankCardInfo();

      //淘宝
	  this.getTaskId();

	  this.getTaobaoDetail();

	  // 获取关键风控数据
	  this.getRiskData();

	  // 获取共享数据
	  this.getShareData();

	  // 获取历史订单信息
	  this.getHistoryData();

	  this.getIdCardInfo()
    },
    methods: {
      showImg(url,type){

	  },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex %3==1) {
          return 'warning-row';
        }else if(rowIndex %2==1){
          return 'success-row';
		}
        return '';
      },
      getIdCardInfo(){
        this.$api.detail.getIdCardInfo({
          userId:this.id
        }).then((res)=>{
		  // this.idCardInfo=res.data;
          if(res.data){
            this.images.push(this.transUrl(res.data.image),this.transUrl(res.data.frontcard),this.transUrl(res.data.backcard))
		  }
		})
	  },
      getYysInfo(){
        this.$api.detail.getYysInfo({
		  userId:this.id
		}).then((data)=>{
			this.$api.detail.getContactPeople({
              userId:this.id
            }).then((res)=>{
			  //前五匹配
			  this.yysTable.topFiveTable=data.data.top5_contact_detail_week;
              this.yysTable.topFiveTable.map((item)=>{
                  res.data.map((cItem) => {
                    if (item.contact_number == cItem.phone) {
                      item.name = cItem.name
                    }
                  })
			  })

              //前十匹配
              this.yysTable.topTenTable=data.data.top10_contact_detail_month;
              this.yysTable.topTenTable.map((item)=>{
                res.data.map((cItem) => {
                  if (item.contact_number == cItem.phone) {
                    item.name = cItem.name
                  }
                })
              })

              //全部联系人
              this.yysTable.topAll=data.data.all_contact_detail;
              this.yysTable.topAll.map((item)=>{
                res.data.map((cItem) => {
                  if (item.contact_number == cItem.phone) {
                    item.name = cItem.name
                  }
                })
              })
			})

			  this.$api.detail.getBaseInfo({
				id:this.id
			  }).then((oData)=>{
				if(oData.data){
				  data.data.all_contact_detail.map((item)=>{
				    if(item.contact_number==oData.data.linkPersonPhoneOne){
				      this.jinjiList.benji1.push(item)
					}

                    if(item.contact_number==oData.data.linkPersonPhoneTwo){
                      this.jinjiList.benji2.push(item)
                    }


				  })
				}
			  })
		})
	  },
      nativePhones(){
        this.$api.detail.nativePhones({
		  userId:this.id
		}).then((res)=>{
			// this.nativeTables.contactTable=res.data;
		    let i=1;
		    let obj={}
			res.data.map((item,index)=>{
				if(i==1){
                  obj.name1=item.name;
                  obj.phone1=item.phone;
                  i++
				}else{
                  obj.name2=item.name;
                  obj.phone2=item.phone;
                  this.nativeTables.contactTable.push(obj)
                  i--;
                  obj={}
				}
			})
		})
	  },
      getBenjiList(){
        this.$api.detail.getBenjiList({
		  userId:this.id,
		  current:this.nativeTables.current,
          size:this.nativeTables.size,
		  keyword:this.nativeTables.keyword,
		}).then((res)=>{
          	this.nativeTables.benjiTable=res.data.list;
          	this.nativeTables.total=res.data.total;
		})
	  },
      getTaskId(){
        this.$api.detail.getTaskId({
		  userId:this.id
		}).then((data)=>{
		       let taskId="";
			 if(data.data){
               taskId = data.data.taskId;
               this.$api.detail.getTongdunToken().then((res)=>{
                 let token = res.data;
                 this.taobaoSrc="https://report.shujumohe.com/report/" + taskId + "/" + token;
                 this.taobaoHeight=window.innerHeight  + "px"
			   })
			 }else{
			   this.taobaoSrc="https://api.wawazz.cn/404"
			 }
        })
	  },
	  searchBenji(){
        this.nativeTables.current=1;
        this.nativeTables.size=10;
        this.getBenjiList();
	  },
	  // 本机通讯录翻页
      handleCurrentChangeNativeTables(val){
        this.nativeTables.current=val;
        this.getBenjiList()
	  },
      handleSizeChangeNativeTables(val){
        this.nativeTables.size=val;
        this.getBenjiList()
	  },
	  // 获取基本信息
      getBaseInfo(){
        this.$api.detail.getBaseInfo({
          id:this.id
		}).then((res)=>{
		    if(res.data){
		      	this.baseInfo=res.data
			}
		})
	  },
      getBankCardInfo(){
        this.$api.detail.getBankCardInfo({
          id:this.id
        }).then((res)=>{
          if(res.data){
            this.bankcardInfo=res.data
          }
        })
      },
      getTaobaoDetail(){
        this.$api.detail.getTaobaoDetail({
          userId:this.$route.params.userId
        }).then((res)=>{
		    this.taobaoRes=res;
        })
      },
      getYoudunInfo(){
        this.$api.detail.getYoudunInfo({
		  userId:this.id
		}).then((res)=>{
          this.youdunInfo=res.data;
		}).catch(()=>{

		})
	  },
      getRiskData(){
        this.$api.detail.getRiskData({
		  userId:this.id
		}).then((res)=>{
          this.riskInfo=res.data;
        })
	  },
      getShareData(){
        this.$api.detail.getShareData({
          userId:this.id
        }).then((res)=>{
          this.shareInfo=res.data;
        }).catch((res)=>{
          this.shareInfo=res.data;
		})
	  },
      getHistoryData(){
        this.$api.detail.getHistoryData({
          userId:this.id,
          pageNo:1,
          pageSize:1000,
          phone:this.phone
        }).then((res)=>{
          this.historyList=res.data.list;
        })
	  },
      showOrderDetail(item){
		this.dialogVisible=true;
		this.actionRow={...item};
		this.getThreeJiluList(item.id)
	  },
      getRecordList(url,data){
        this.$api.audit[url]({
          orderId:this.actionRow.id
        }).then((res)=>{
          this[data]=res.data
        })
      },
      getThreeJiluList(orderId){
        // // 审核记录
        // this.$api.detail.getOrderAllotList({
        //   orderId
        // }).then((res)=>{
        //   this.allotList=res.data;
        // })
        // // 放款记录
        // this.$api.detail.getOrderLoanList({
        //   orderId
        // }).then((res)=>{
        //   this.loanList=res.data;
        // })
        // // 催记记录
        // this.$api.detail.getOrderDeptList({
        //   orderId
        // }).then((res)=>{
        //   this.deptList=res.data;
        // })

        this.getRecordList('getOrderShenheList','shenheList');
        this.getRecordList('getOrderFangkuanList','fangkuanList');
        this.getRecordList('getOrderCuijiList','cuijiList');
	  },
      regetdata(val){
        switch (val) {
          case '审核记录':this.getRecordList('getOrderShenheList','shenheList');break;
          case '放款记录':this.getRecordList('getOrderFangkuanList','fangkuanList');break;
          case '催记记录':this.getRecordList('getOrderCuijiList','cuijiList');break;
        }
      },
	  transNull(val){
        if(val==null||val==undefined){
          return "无"
        }
        return val
	  },
      handleClose(){
        this.activeName="allotList"
	  },
      transPayStatus(val){
        switch(val){
          case 0:return "未提交申请";break;
          case 1:return "审核中";break;
          case 2:return "待打款";break;
          case 3:return "待还款";break;
          case 4:return "逾期中";break;
          case 5:return "逾期中";break;
          case 6:return "已还款";break;
          case 7:return "审核失败";break;
        }
	  },
      transUrl(url){
        if (url.indexOf("http") > -1) {
          return url;
        }
        return globalInfo.HOST_IMG + url;
	  },
      tabClick(val){
			console.log(val)
	  }



	}
  }
</script>

<style src="../assets/css/memberDialog.less" lang="less"></style>
<style  lang="less">
	/*@import url('../assets/css/memberDialog.less');*/
	/*@import url('../assets/css/memberDialog.less');*/
	.onePerMemberDialog{
		.el-dialog{
			height: 100%!important;
			margin-top: 0px!important;
		}

	}
.userDetailInfo{
    .rightTab{
        height: 100%;
    }
    .el-tabs__nav{
        background: white!important;
    }
    .detailLabel{
    	font-weight: bold;
    }
    .normalRow{
    	font-size: 14px;
    	border-bottom: 1px solid #e7eaec;
    	line-height: 38px;
    }
    .ydCircle{
    	position: relative;
    	img{
    		width:200px;
    		height: 200px;
    	}
    	span{
    		position: absolute;
			top:50%;
			left: 50%;
			font-size: 40px;
			font-weight: bold;
			transform: translateX(-50%) translateY(-50%);
    	}
    	#riskType{
				position: absolute;
				left: 50%;
				top:25%;
				font-size: 12px;
				transform: translateX(-50%);
			}
    }

    .noFound{
		color: red;
		box-sizing: border-box;
		padding: 40px;
		font-size: 20px;
		/*padding-left: 100px;*/
	}
	.tipBtn{
		box-sizing: border-box;
		background: dodgerblue;
		color: white!important;
		font-size: 12px;
		display: inline-block;
		padding: 3px 5px;
		border-radius: 3px;
	}
	.el-tabs--right{
		overflow: auto;
		/*overflow-y: auto;*/
	}
	.smallTip{
		font-size: 12px;
		color: red;
	}

	.mainFengkong{
		span{
			font-size: 13px;
		}
		.el-col{
			margin-top: 10px;
		}
	}
	.borderB{
		border-bottom: 1px solid #e7eaec;
		padding-bottom: 10px;
	}
	.elRowNormal{
		.el-col{
			margin-top: 10px!important;
			font-size: 12px;
		}

	}
}

	.yysWrap{
		.circleWrap{
			background: white;
			border-radius: 20px;
			padding: 20px;
		}
	}
	.aplus-center-table{
		.el-table__header{
			th{
				background: rgba(64,158,255,0.6);
				color:white
			}
			.cell{
				text-align: center;
				font-size: 13px;
			}
		}
		.el-table__body{
			.cell{
				text-align: center;
				font-size: 13px;
			}
		}
	}
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}
	.nativeWrap{
		.nativeInp{
			width:300px;
			.el-input__inner{
				height: 32px;

			}
			padding-right: 10px;
		}
	}
	.noData{
		color:red;
		font-weight: bold;
		line-height: 50px;
	}
	.historyList{
		.historyItem{
			margin-top: 10px;
		}
		.historyList-inner{
			width: 700px;
			color:gray;
			padding: 10px 0px;
			background: white;
			align-items: center;
			border-radius: 20px;
			width: 700px;
			padding: 0 20px;
			font-size: 13px;
			&>div{
				&>span:first-child{
				}
			}
		}
	}
	.detailTabs{
		.el-tabs__header{
			background: white;
			padding-left: 20px;
		}
	}
	.idcardWrap{
		.imgWrap{
			cursor: pointer;
			padding: 5px;
			/*background: rgba(0,0,0,0.1);*/
			img{
				width: 300px;
				height: 200px;
				/*border: 1px solid black;*/
				/*margin-left: 20px;*/
			}
		}
	}

</style>
