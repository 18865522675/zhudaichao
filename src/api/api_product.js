import { $ } from "./axios";

export default {
  // 订单管理-已结清
  getLoanProduct_list: params => $.get("/product/list", params, { lock: true }),
  
  
   LoanUndercarriage: params => $.put("/product/undercarriage", params, { lock: true }),


  // 订单管理-当日应还款订单
  getTodayShouldPayList: params => $.get("/loanOrder/loanOrderHisList", params, { lock: true }),
};
