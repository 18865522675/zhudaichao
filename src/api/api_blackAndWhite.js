import { $ } from "./axios";

export default {
  getPhoneVip_list: params => $.get("/user/roster/phoneVip/list", params, { lock: true }),

  getCardVip_list: params => $.get("/user/roster/cardVip/list", params, { lock: true }),

  getCardBlack_list: params => $.get("/user/roster/black/list", params, { lock: true }),

  getPartnerList: params => $.get("/user/roster/partners", params, { lock: true }),

  // 上传手机白名单
  uploadPhoneVip: params => $.post("/user/roster/phoneVip/import", params, { lock: true }),

  // 上传身份证白名单
  uploadCardVip: params => $.post("/user/roster/cardVip/import", params, { lock: true }),

  // 上传身份证黑名单
  uploadCardBlack: params => $.post("/user/roster/black/import", params, { lock: true }),
};
