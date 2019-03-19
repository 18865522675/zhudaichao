import { $ } from "./axios";

export default {
  //获取渠道商列表
   affliateChannel_getList: params => $.get("/channel/list", params, { lock: true }),
  //渠道商-新会员列表
  channelList_newMemberList: params => $.get("/member/user/list", params, { lock: true }),
  //渠道商-老会员列表
  channelList_oldMemberList: params => $.get("/member/old/user/list", params, { lock: true }),
  //渠道商-获取分配审核员
  channelList_shenheList: params => $.get("/admin/select/allot", params, { lock: true }),
  //渠道商-获取记录
  channelList_trackList: params => $.get("/member/operation/record/list", params, { lock: true }),
  //渠道商-新会员分配
  channelList_distribute: params => $.post("/member/operation/record/allot", params, { lock: true }),
  //渠道商-新会员分配
  channelList_addRecord: params => $.post("/member/operation/record", params, { lock: true }),

  //获取企业会员
  getEnderPriseList: params => $.get("/user/page", params, { lock: true }),

  //获取企业会员渠道商
  getVipChannelList: params => $.get("/channel/list", params, { lock: true }),
  //获取企业会员渠道商
  resetPas: params => $.get("/user/resetPassword", params, { lock: true }),
  //企业会员拉黑
  memberSetBlack: params => $.put("/user/blacklist?userId="+params, {}, { lock: true }),
  
  removeBlack: params => $.put("/user/removeBlacklist?userId="+params, {}, { lock: true }),


  //企业会员移除黑名单
  memberRemoveBlack: params => $.get("/user/moveOutBlackList", params, { lock: true }),
  //企业会员修改银行卡
  memberChangeBankCard: params => $.post("/userBank/newUpdate", params, { lock: true }),

  //企业会员详情
  getMemberDetail: params => $.get("/user/member/detail", params, { lock: true }),

  //企业会员历史订单
  getMemberHistoryOrders: params => $.get("/loanOrder/selectOrderLists", params, { lock: true }),

  //企业会员订单流程图
  getOrderRankTip: params => $.get("loanOrderRecord/list", params, { lock: true }),

  resetBankCard: params => $.get("/userBank/removeCard", params, { lock: true }),

};
