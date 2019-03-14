import { $ } from "./axios";

export default {

  // 运营商与通讯录匹配
  getYysInfo: params => $.get("userPhone/selectYys", params, { lock: true }),

  getContactPeople: params => $.get("/userPhoneList/findAllByUser", params, { lock: true }),

  // 本地通讯录
  nativePhones: params => $.get("/userPhoneList/findByUserPage", params, { lock: true }),

  // 本机
  getBenjiList: params => $.get("/userBasicMsg/findUserPhoneSms", params, { lock: true }),

  // 淘宝
  getTongdunToken: params => $.get("/user/getTongdunToken", params, { lock: true }),

  getTaskId: params => $.get("/user/selectYYSResult", params, { lock: true }),


  getTaobaoDetail: params => $.get("/userTaobao/select", params, { lock: true }),


  getDuotouInfo: params => $.get("/user/getXinYanInfo", params, { lock: true }),

  getJieTiaoInfo: params => $.get("/user/getJietiaoInfo", params, { lock: true }),

  getBaseInfo: params => $.get("/userBasicMsg/selectOneDetailsByUserId", params, { lock: true }),

  getBankCardInfo: params => $.get("/userBank/selectByUserId", params, { lock: true }),

  getYoudunInfo: params => $.get("/userTaobao/selectYouDun", params, { lock: true }),

  getMifangInfo: params => $.get("/user/getMifangInfo", params, { lock: true }),

  getRiskData: params => $.get("/userBasicMsg/selectRiskData", params, { lock: true }),

  getShareData: params => $.get("/loanOrder/sharedData", params, { lock: true }),

  getHistoryData: params => $.get("/loanOrder/selectOrderLists", params, { lock: true }),

  getOrderAllotList: params => $.get("/loanOrder/allot/remark", params, { lock: true }),

  getOrderLoanList: params => $.get("/loanOrder/loan/remark", params, { lock: true }),

  getOrderDeptList: params => $.get("/loanOrder/dept/remark", params, { lock: true }),

  getHaoriInfo: params => $.get("/user/getHaoriInfo", params, { lock: true }),

  getLoanAfter: params => $.get("/user/getShenYueInfo", params, { lock: true }),

  getTianChuangInfo: params => $.get("/user/getTianChuangInfo", params, { lock: true }),

  getIdCardInfo: params => $.get("/tongdun/face/query", params, { lock: true }),













};
