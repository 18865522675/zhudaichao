import { $ } from "./axios";

export default {
  // 审核管理-审核统计
  //审核统计-获取审核统计审核列表
  getAuditDataList: params => $.post("loanOrder/audit/reports/date", params, { lock: true }),

  //审核统计-获取统计数据
  getTopData: params => $.post("/loanOrder/audit/reports/total", params, { lock: true }),

  //审核统计-获取放款列表
  getAuditPersonList: params => $.get("/admin/select/loan/auditor", params, { lock: true }),

  //审核统计-获取放款列表
  getLoadDataList: params => $.post("/loanOrder/load/reports/date", params, { lock: true }),


  //审核管理-拒绝名单
  // 拒绝名单-风控拒绝
  getRefuseWindList: params => $.get("/loanOrder/riskRefuse", params, { lock: true }),

  // 拒绝名单-人工拒绝
  getRefuseArtificialList: params => $.get("/loanOrder/manualRefuse", params, { lock: true }),

  // 拒绝名单-获取申请贷款详情
  getAuditInfoDetail: params => $.get("/loanOrder/selectOneDetail", params, { lock: true }),

  // 拒绝名单-获取恢复
  recoverAction: params => $.get("/user/thisRecover", params, { lock: true }),



  //贷款申请管理 列表
  getLoanApplyList: params => $.get("/loanOrder/loanApply", params, { lock: true }),

  // 贷款申请管理 同意
  loanPassAction: params => $.get("/loanOrder/thisAgree", params, { lock: true }),

  //贷款申请管理 获取分配审核人员
  fenpeiPeople: params => $.get("/loanOrder/selectAllPassMan", params, { lock: true }),

  //贷款申请 确认分配
  sureFenPei: params => $.get("/loanOrder/setUpPassMan", params, { lock: true }),

  //贷款申请 一件分配
  giveoutAll: params => $.get("/loanOrder/giveoutAll", params, { lock: true }),
  //修改额度
  loanUpdateMoney: params => $.get("/user/updateMoney", params, { lock: true }),

  //贷款申请 关闭订单
  loanCloseOrder: params => $.put("/loanOrder/close", params, { lock: true }),

  //贷款申请 拒绝订单
  loanRefuseOrder: params => $.get("/loanOrder/auditRefuse", params, { lock: true }),




  //待放款管理

  //待放款管理 列表
  getWaitPayList: params => $.get("/loanOrder/loanMoney", params, { lock: true }),

  //待放款管理 线下打款
  getWaitPayunderLine: params => $.get("/lianpaymanul/tradepayapi/receiveNotify", params, { lock: true }),

  //放款申请 拒绝
  waitRefuseOrder: params => $.get("/loanOrder/loanRefuse", params, { lock: true }),

  //放款申请 获取最大放款金额
  getWaitMaxMoney: params => $.get("/paramSetting/selectOne", params, { lock: true }),

  //放款申请 获取验证码
  getPhoneCode: params => $.get("/admin/getAdminPhoneCode", params, { lock: true }),

  //放款申请 验证验证码
  checkPhoneCode: params => $.get("/admin/checkAdminPhoneCode", params, { lock: true }),

  //放款申请 富有打款
  payFuyou: params => $.get("/user/payFuyou", params, { lock: true }),

  //放款申请管理 获取放款人员
  waitPayLoanPeople: params => $.get("/loanOrder/selectAllLoanMan", params, { lock: true }),
  //放款申请管理  分配
  loanSureFenpei: params => $.post("/loanOrder/allot/loan", params, { lock: true }),


  //订单记录-审核记录
  getOrderShenheList: params => $.get("/loanOrder/allot/remark", params, { lock: true }),
  //订单记录-放款记录
  getOrderFangkuanList: params => $.get("/loanOrder/loan/remark", params, { lock: true }),
  //订单记录-催记记录
  getOrderCuijiList: params => $.get("/loanOrder/dept/remark", params, { lock: true }),


  //订单记录  审核添加
  addOrderShenhe: params => $.post("/loanOrder/allot/remark", params, { lock: true }),
  //订单记录  放款添加
  addOrderFangkuan: params => $.post("/loanOrder/loan/remark", params, { lock: true }),
  //订单记录  催记添加
  addOrderCuiji: params => $.post("/loanOrder/dept/remark", params, { lock: true }),
  //逾期待催款分配AI呼叫
  disAI: params => $.post("/call/record/call", params, { lock: true }),
  //逾期待催款获取AI呼叫信息
  getAiInfo: params => $.get("/call/record", params, { lock: true }),
 //逾期待催款获取AI通话列表
  getAiCallInfoList: params => $.get("dialog/detail", params, { lock: true }),



  };
