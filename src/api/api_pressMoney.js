import { $ } from "./axios";

export default {
  // 催款管理-逾期待催款客户
  //逾期待催款客户-获取逾期催款客户列表
  getOverduePeoples: params => $.get("/loanOrder/overduePendingLending", params, { lock: true }),

  //催款统计-获取统计数据
  jieqingOrder: params => $.get("/user/repayOrder", params, { lock: true }),

  //催款统计-获取统计数据
  xuqiOrder: params => $.get("/user/xuqiOrder", params, { lock: true }),

  //催款统计-回退操作
  goBackAction: params => $.put("/loanOrder/reback/all", params, { lock: true }),

  //催款统计-分配
  fenpeiAction: params => $.get("/loanOrder/setUpPressMoneyMan", params, { lock: true }),

  //催款统计-分
  getFenpeiPeople: params => $.get("loanOrder/selectAllPressMoneyMan", params, { lock: true }),


  //正常待催款客户-正常待催款客户列表
  getNormalPeoples: params => $.get("/loanOrder/normalPendingLending", params, { lock: true }),

  //正常待催款客户-正常待催款客户列表
  getCollectList: params => $.get("/collection/statistics/list", params, { lock: true }),


  //正常待催款客户-正常待催款客户列表
  payOnCard: params => $.get("/fuyou/payOnCard", params, { lock: true }),

  // 修改还款金额
  changeMoney: params => $.get("/loanOrder/update/needMoney", params, { lock: true }),






};
