import { $ } from "./axios";

export default {
    //获取转换率列表-时间纬度
    channelTrans_getList: params => $.post("channel/page", params, { lock: true }),

    //获取渠道商列表（所有）
    channelList_getList: params => $.get("/channel/selectAll", params, { lock: true }),


  //获取渠道商逾期明细列表
  channelOverDueList_getList: params => $.get("/verb/channelOverdueDetailedList", params, { lock: true }),

  //获取渠道商列表
  getChannelList: params => $.get("/channel/page", params, { lock: true }),

  //获取渠道商列表
  addChannel: params => $.post("channel", params, { lock: true }),
  
  editChannel: params => $.put("channel", params, { lock: true }),
  

  delChannel: params => $.delete("channel/"+params, {}, { lock: true  }),


  //渠道转化率-注册纬度
  channelTrans_getRegisterList: params => $.post("channel/register/page", params, { lock: true }),
  
  delAd: params => $.post("/banner/delete", params, { lock: true }),
  
  getAdList: params => $.post("/banner/getByType", params, { lock: true }),
  
  
  getProductTypeList: params => $.get("/product/category/list", params, { lock: true }),
  
  getProductPlateList: params => $.get("/product/plate/list", params, { lock: true }),
  
  
  
  
  


};
