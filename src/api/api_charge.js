import { $ } from "./axios";

export default {
  // 商户充值-获取充值记录
  getChangrRecord: params => $.get("/partner/getThirdPayRecord", params, { lock: true }),
  getThirdUseRecord: params => $.get("/partner/getThirdUseRecord", params, { lock: true }),

  getPayList: params => $.get("/partner/getPayList", params, { lock: true }),

  addThirdMoney: params => $.get("/partner/addThirdMoney", params, { lock: true }),


  //放款统计
  getOnlineLoanList: params => $.get("/loanOrder/notifyRecordingVerb", params, { lock: true }),

  // 还款统计
  getOnlineReplaymentList: params => $.get("/loanOrder/repaymentVerb", params, { lock: true }),

  getThirdUseRecordDaily: params => $.get("/partner/getThirdUseRecordDaily", params, { lock: true }),
};
