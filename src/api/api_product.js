import { $ } from "./axios";

export default {
  // 订单管理-已结清
  getLoanProduct_list: params => $.get("/product/list", params, { lock: true }),
  
  
   LoanUndercarriage: params => $.put("/product/undercarriage", params, { lock: true }),
   
   getPlateList: params => $.put("/product/plate/list", params, { lock: true }),
   
   addLoanProduct: params => $.post("/product", params, { lock: true }),
   
   getCreditCard_list: params => $.post("/credit/card/getAllCard", params, { lock: true }),
   
   delCredit: params => $.post("/credit/card/delete", params, { lock: true }),
   
   
   addCreditCard: params => $.post("/credit/card/submit", params, { lock: true }),
   
   editCreditCard: params => $.post("/credit/card/update", params, { lock: true }),
   
   getBankList: params => $.get("/bank/list", params, { lock: true }),
   
   addBank: params => $.post("/bank/submit", params, { lock: true }),
   

  // 订单管理-当日应还款订单
  getTodayShouldPayList: params => $.get("/loanOrder/loanOrderHisList", params, { lock: true }),
};
