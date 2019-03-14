<template>
    <div class="singleLoanAfter">
        <el-card >
            <!--<span class="nameIntroduce" @click="dialogVisible=true">名词解释</span>-->
            <div class="loanTitle marT20">
                按身份证维度查询
            </div>
                <div class="childItem">
                    <div class="childTitle">
                        黑名单数据
                    </div>
                    <div class=" childItemContent">
                        <div class="flex-r childItemContent-title wordTitle">
                            <div>
                                黑名单类型
                            </div>
                            <div>
                                最近6 个月身份证跨机构数
                            </div>
                            <div>
                                最近6 个月身份证申请查询数
                            </div>
                            <div>
                                入库距离天数
                            </div>
                            <div>
                                最新确认状态(最新上报时点所对应的逾期状态)
                            </div>
                            <div>
                                最近12 个月身份证最严重逾期状态
                            </div>
                        </div>
                        <div class="flex-r childItemContent-title">
                            <div>
                                {{transBlackData(loanAfterInfo.balcklistPid.blackLevel)}}
                            </div>
                            <div>
                                {{transBlackData(loanAfterInfo.balcklistPid.last6MTenantCount)}}
                            </div>
                            <div>
                                {{transBlackData(loanAfterInfo.balcklistPid.last6MQueryCount)}}
                            </div>
                            <div>
                                {{transBlackData(loanAfterInfo.balcklistPid.lastConfirmAtDays)}}
                            </div>
                            <div>
                                {{transBlackData(loanAfterInfo.balcklistPid.lastConfirmStatus)}}
                            </div>
                            <div>
                                {{transBlackData(loanAfterInfo.balcklistPid.last12MMaxConfirmStatus)}}
                            </div>
                        </div>
                    </div>
                </div>



            <div class="childItem">
                <div class="childTitle">
                    贷款数据-当前数据
                </div>
                <div class=" childItemContent">
                    <div class="flex-r childItemContent-title wordTitle">
                        <div>
                            当前逾期的贷款机构数
                        </div>
                        <div>
                            当前逾期金额
                        </div>
                        <div>
                            当前逾期的贷款笔数
                        </div>
                        <div>
                            当前未结清贷款笔数
                        </div>
                    </div>
                    <div class="flex-r childItemContent-title">
                        <div>
                            {{transData(loanAfterInfo.duotouPidList.overdueTenantCountAll)}}
                        </div>
                        <div>
                            {{transData(loanAfterInfo.duotouPidList.remainingOverdueAmount)}}
                        </div>
                        <div>
                            {{transData(loanAfterInfo.duotouPidList.overdueLoanCountAll)}}
                        </div>
                        <div>
                            {{transData(loanAfterInfo.duotouPidList.openLoanCount)}}
                        </div>
                    </div>
                </div>
            </div>




            <div class="childItem">
                <div class="childTitle">
                    贷款数据-最近3个月
                </div>
                <div class="childItemContentMore flex-r" style="flex-wrap: wrap!important;">
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近3个月报告查询次数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.queryCount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3个月贷款笔数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.loanCount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月贷款机构数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.loanTenantCount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月平均申请间隔时长
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.averageLoanGapDays3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月平均换新机构间隔时长
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.averageTenantGapDays3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月最大贷款天数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.maxLoanPeriodDays12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月最大贷款金额
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.maxLoanAmount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月平均贷款额度
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.averageLoanAmount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月最大逾期天数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.maxOverdueDays3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月当前逾期的贷款笔数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.overdueLoanCount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月当前逾期的贷款机构数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.overdueTenantCount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月拖欠 2 周期以上机构数(除小额拖欠)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.overdueFor2TermTenantCount3)}}
                        </div>
                    </div>
                </div>
            </div>




            <div class="childItem">
                <div class="childTitle">
                    贷款数据-最近12个月
                </div>
                <div class="childItemContentMore flex-r" style="flex-wrap: wrap!important;">
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月报告查询次数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.queryCount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月贷款笔数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.loanCount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月贷款机构数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.loanTenantCount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月平均申请间隔时长
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.averageLoanGapDays12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月平均换新机构间隔时长
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.averageTenantGapDays12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月连续正常还款月数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.monthsForNormalRepay)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月最大贷款天数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.maxLoanPeriodDays12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月最大贷款金额
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.maxLoanAmount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月平均贷款额度
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.averageLoanAmount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最后一次贷款距今天数(最近 12 个月内)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.daysFromLastLoan)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最早的贷款距今月数(最近 12 个月内)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.monthsFromFirstLoan)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近一次逾期距今月数(最近 12 个月内)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.monthsFromLastOverdue)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            未还款总余额(最近 12 个月内)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.remainingAmount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月最大逾期天数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.maxOverdueDays12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月当前逾期的贷款机构数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.overdueTenantCount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月拖欠 2 周期以上机构数(除小额拖欠)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.overdueFor2TermTenantCount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月当前逾期的贷款笔数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouPidList.overdueLoanCount12)}}
                        </div>
                    </div>
                </div>
            </div>



            <div class="childItem">
                <div class="childTitle">
                    贷款数据-历史数据
                </div>
                <div class=" childItemContent">
                    <div class="flex-r childItemContent-title wordTitle">
                        <div>
                            当前逾期的贷款机构数
                        </div>
                        <div>
                            当前逾期金额
                        </div>
                        <div>
                            当前逾期的贷款笔数
                        </div>
                        <div>
                            当前未结清贷款笔数
                        </div>
                    </div>
                    <div class="flex-r childItemContent-title">
                        <div>
                            {{transData(loanAfterInfo.duotouPidList.loanCountAll)}}
                        </div>
                        <div>
                            {{transData(loanAfterInfo.duotouPidList.overdueCount)}}
                        </div>
                        <div>
                            {{transData(loanAfterInfo.duotouPidList.remainingAmountAll)}}
                        </div>
                        <div>
                            {{transData(loanAfterInfo.duotouPidList.maxOverdueDaysAll)}}
                        </div>
                    </div>
                </div>
            </div>












            <div class="loanTitle" style="margin-top: 140px">
                按手机号维度查询
            </div>
            <div class="childItem">
                <div class="childTitle">
                    黑名单数据
                </div>
                <div class=" childItemContent">
                    <div class="flex-r childItemContent-title wordTitle">
                        <div>
                            黑名单类型
                        </div>
                        <div>
                            最近6 个月身份证跨机构数
                        </div>
                        <div>
                            最近6 个月身份证申请查询数
                        </div>
                        <div>
                            入库距离天数
                        </div>
                        <div>
                            最新确认状态(最新上报时点所对应的逾期状态)
                        </div>
                        <div>
                            最近12 个月身份证最严重逾期状态
                        </div>
                    </div>
                    <div class="flex-r childItemContent-title">
                        <div>
                            {{transBlackData(loanAfterInfo.balcklistMobile.blackLevel)}}
                        </div>
                        <div>
                            {{transBlackData(loanAfterInfo.balcklistMobile.last6MTenantCount)}}
                        </div>
                        <div>
                            {{transBlackData(loanAfterInfo.balcklistMobile.last6MQueryCount)}}
                        </div>
                        <div>
                            {{transBlackData(loanAfterInfo.balcklistMobile.lastConfirmAtDays)}}
                        </div>
                        <div>
                            {{transBlackData(loanAfterInfo.balcklistMobile.lastConfirmStatus)}}
                        </div>
                        <div>
                            {{transBlackData(loanAfterInfo.balcklistMobile.last12MMaxConfirmStatus)}}
                        </div>
                    </div>
                </div>
            </div>



            <div class="childItem">
                <div class="childTitle">
                    贷款数据-当前数据
                </div>
                <div class=" childItemContent">
                    <div class="flex-r childItemContent-title wordTitle">
                        <div>
                            当前逾期的贷款机构数
                        </div>
                        <div>
                            当前逾期金额
                        </div>
                        <div>
                            当前逾期的贷款笔数
                        </div>
                        <div>
                            当前未结清贷款笔数
                        </div>
                    </div>
                    <div class="flex-r childItemContent-title">
                        <div>
                            {{transData(loanAfterInfo.duotouMobileList.overdueTenantCountAll)}}
                        </div>
                        <div>
                            {{transData(loanAfterInfo.duotouMobileList.remainingOverdueAmount)}}
                        </div>
                        <div>
                            {{transData(loanAfterInfo.duotouMobileList.overdueLoanCountAll)}}
                        </div>
                        <div>
                            {{transData(loanAfterInfo.duotouMobileList.openLoanCount)}}
                        </div>
                    </div>
                </div>
            </div>




            <div class="childItem">
                <div class="childTitle">
                    贷款数据-最近3个月
                </div>
                <div class="childItemContentMore flex-r" style="flex-wrap: wrap!important;">
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近3个月报告查询次数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.queryCount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3个月贷款笔数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.loanCount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月贷款机构数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.loanTenantCount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月平均申请间隔时长
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.averageLoanGapDays3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月平均换新机构间隔时长
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.averageTenantGapDays3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月最大贷款天数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.maxLoanPeriodDays12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月最大贷款金额
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.maxLoanAmount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月平均贷款额度
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.averageLoanAmount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月最大逾期天数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.maxOverdueDays3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月当前逾期的贷款笔数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.overdueLoanCount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月当前逾期的贷款机构数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.overdueTenantCount3)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 3 个月拖欠 2 周期以上机构数(除小额拖欠)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.overdueTenantCount3)}}
                        </div>
                    </div>
                </div>
            </div>




            <div class="childItem">
                <div class="childTitle">
                    贷款数据-最近12个月
                </div>
                <div class="childItemContentMore flex-r" style="flex-wrap: wrap!important;">
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月报告查询次数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.queryCount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月贷款笔数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.loanCount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月贷款机构数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.loanTenantCount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月平均申请间隔时长
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.averageLoanGapDays12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月平均换新机构间隔时长
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.averageTenantGapDays12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月连续正常还款月数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.monthsForNormalRepay)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月最大贷款天数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.maxLoanPeriodDays12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月最大贷款金额
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.maxLoanAmount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月平均贷款额度
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.averageLoanAmount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最后一次贷款距今天数(最近 12 个月内)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.daysFromLastLoan)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最早的贷款距今月数(最近 12 个月内)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.monthsFromFirstLoan)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近一次逾期距今月数(最近 12 个月内)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.monthsFromLastOverdue)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            未还款总余额(最近 12 个月内)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.remainingAmount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月最大逾期天数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.maxOverdueDays12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月当前逾期的贷款机构数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.overdueTenantCount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月拖欠 2 周期以上机构数(除小额拖欠)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.overdueFor2TermTenantCount12)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近 12 个月当前逾期的贷款笔数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transData(loanAfterInfo.duotouMobileList.overdueLoanCount12)}}
                        </div>
                    </div>
                </div>
            </div>



            <div class="childItem">
                <div class="childTitle">
                    贷款数据-历史数据
                </div>
                <div class=" childItemContent">
                    <div class="flex-r childItemContent-title wordTitle">
                        <div>
                            当前逾期的贷款机构数
                        </div>
                        <div>
                            当前逾期金额
                        </div>
                        <div>
                            当前逾期的贷款笔数
                        </div>
                        <div>
                            当前未结清贷款笔数
                        </div>
                    </div>
                    <div class="flex-r childItemContent-title">
                        <div>
                            {{transData(loanAfterInfo.duotouMobileList.loanCountAll)}}
                        </div>
                        <div>
                            {{transData(loanAfterInfo.duotouMobileList.overdueCount)}}
                        </div>
                        <div>
                            {{transData(loanAfterInfo.duotouMobileList.remainingAmountAll)}}
                        </div>
                        <div>
                            {{transData(loanAfterInfo.duotouMobileList.maxOverdueDaysAll)}}
                        </div>
                    </div>
                </div>
            </div>


            <div class="loanTitle" style="margin-top: 120px">
                按IP地址维度查询
            </div>
            <div class="childItem">
                <div class="childTitle">
                    黑名单数据
                </div>
                <div class="childItemContentMore flex-r" style="flex-wrap: wrap!important;">
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            黑名单类型
                        </div>
                        <div class="childItemContent-box-con">
                            {{transBlackData(loanAfterInfo.balcklistIpAddress.blackLevel)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近6 个月身份证跨机构数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transBlackData(loanAfterInfo.balcklistIpAddress.last6MTenantCount)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近6 个月身份证申请查询数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transBlackData(loanAfterInfo.balcklistIpAddress.last6MQueryCount)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            入库距离天数
                        </div>
                        <div class="childItemContent-box-con">
                            {{transBlackData(loanAfterInfo.balcklistIpAddress.lastConfirmAtDays)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最新确认状态(最新上报时点所对应的逾期状态)
                        </div>
                        <div class="childItemContent-box-con">
                            {{transBlackData(loanAfterInfo.balcklistIpAddress.lastConfirmStatus)}}
                        </div>
                    </div>
                    <div class="childItemContent-box">
                        <div class="childItemContent-box-title">
                            最近12 个月身份证最严重逾期状态
                        </div>
                        <div class="childItemContent-box-con">
                            {{transBlackData(loanAfterInfo.balcklistIpAddress.last12MMaxConfirmStatus)}}
                        </div>
                    </div>
                </div>
            </div>


        </el-card>

        <el-dialog
                title="名词解释(贷前)"
                :visible.sync="dialogVisible"
                width="800px"
                :before-close="handleClose">
            <div class="content">
                总申请次数：表示该用户以身份证或者手机号申请的总次数，同一个机构的多次申请会重复计算;<br>
                总申请机构数：表示该用户以身份证或者手机号申请的总机构数，同一个机构的多次申请只计算一次;<br>
                涉及手机号码数：表示该用户使用该身份证申请过程出现过的手机号码数量，格式为Mx，x代表数量，如M1 代表有1个手机号码;<br>
                涉及身份证号码数：表示该用户使用该手机号申请过程出现过的身份证号码数量，格式为Px，x代表数量，如P1 代表有1个身份证号码;<br>
                涉及贷款类型：表示该用户申请过的贷款的类型，不重复显示;<br>
                涉及机构行业：表示该用户申请过的机构的类型，不重复显示。
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭 </el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'singleLoanPre',
    data () {
      return {
        dialogVisible:false,
        loanAfterInfo:{
          balcklistIpAddress:{},
          balcklistMobile:{},
          balcklistPid:{},
          duotouMobileList:{},
          duotouPidList:{}
        }
      }
    },
    mounted () {
      this.getLoanAfter()
    },
    methods: {
      getLoanAfter(){
        this.$api.detail.getLoanAfter({
          userId:this.$route.params.userId
        }).then((res)=>{
            if(res.data){
                this.loanAfterInfo=res.data
            }
        })
      },
      transStr(val){
        if(val===""){
          return "无记录"
        }
        return val
      },
      transBlackData(val){
        if(val==undefined||val==null||val==-1){
          return '未记录'
        }
        return val
      },
      transData(val){
        if(val==-1||val==null){
          return "未记录 "
        }
        return val
      }
    },
    created () {
    },
    destoryed () {
    }
  }
</script>

<style  lang="less">
    .singleLoanAfter{
        .el-card__body{
            padding: 20px 5px!important;
        }
        .loanTitle{
            background: rgba(22, 155, 213, 1);
            line-height: 40px;
            text-align: center;
            font-size: 16px!important;
            color: white!important;
            border-radius: 5px;
        }
        .childTitle{
            font-size: 13px;
            background: rgba(0,0,0,0.4);
            line-height: 36px;
            font-weight: bold;
            color:white;
            text-align: center;
            border-radius: 4px;
        }
        .childItem{
            width: 100%;
            margin-top: 40px;
        }
        .childItemContent{
            &>div{
                flex:1
            }
        }
        .childItemContentMore{
            .childItemContent-box{
                width: 20%!important;
                .childItemContent-box-title{
                    background: rgba(0, 0, 0, 0.2);
                    color: white;
                    font-size: 13px;
                    /*height: 30px;*/
                    line-height: 30px;
                    text-align: center;
                }
                .childItemContent-box-con{
                    text-align: center;
                    /*height: 30px;*/
                    line-height: 30px;
                    background: #f5f5f6;
                    font-size: 13px;
                }
            }
        }
        .childItemContent-title{
            &>div{
                flex: 1;
                text-align: center;
                line-height: 30px;
                font-size: 12px;
                background: rgb(245, 245, 246);
                color:gray;
            }
        }
        .nameIntroduce{
            color:red;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
        }
        .content{
            line-height: 30px;
            font-size: 14px;
            color:gray;
        }
        .wordTitle{
            div{
                background: rgba(0,0,0,0.2);
                color:white
            }
        }
    }
</style>
