import { $ } from "./axios";

export default {
  //全局参数api
  // 获取利率配置
  getLiLvInfo: params => $.get("paramSetting/selectOne", params, { lock: true }),
  // 获取额度配置
  geteduInfo: params => $.get("partner/getPartner", params, { lock: true }),
  //淘宝额度设置
  saveTabaoMoney: (params) =>
    $.put("/partner/update/global/param", params, { lock: true }),
  //设置结清密码
  setJieqingPas: (params) =>
    $.get("/partner/updateOperationPassword", params, { lock: true }),
  //设置机身规则
  setJishenRule: (params) =>
    $.put("/partner/updateHitDirectRefuse/"+params, {}, { lock: true }),


  //操作日志api
  // 获取登陆日志列表
  getLoginRecord: params => $.get("loginRecord/selectAdminLoginRecords", params, { lock: true }),

  // 获取操作日志列表
  getOperateRecord: params => $.get("adminRecord/list", params, { lock: true }),

  // 获取登陆管理员列表
  getLoginRecord_adminList: params => $.get("/admin/group/list", params, { lock: true }),


  //自动审核
  // 获取机身规则
  getAutoTrailVal: params => $.get("paramSetting/selectOne", params, { lock: true }),
  // 设置机审规则
  setAutoTrailVal: params => $.put("partner/updateAutoAuditSettings/"+params, {}, { lock: true }),

  // 获取页面数据
  getPageInfo: params => $.get("seniorRiskconfig/getRiskConfigs", params, { lock: true }),

  // 获取地区
  GetRegionPlug: params => $.get("/riskconfig/getAllAreas", params, { lock: true }),



  //角色列表

  // 获取页面数据
  getRoleList: params => $.get("role/list", params, { lock: true }),
 //新增角色
  addRole: params => $.post("role", params, { lock: true }),
  //删除角色
  deleteRole: params => $.delete("role/"+params, {}, { lock: true }),
 //编辑角色
  editRole: params => $.put("role",params, { lock: true }),
  //获取资源数
  getRoleTreeInfo: params => $.get("role/permission/tree",params, { lock: true }),

  //获取用户资源
  getAdminTreeInfo: params => $.get("/admin/permission/tree",params, { lock: true }),

  //获取用户角色
  getAdminRoleList: params => $.get("admin/addRole/list",params, { lock: true }),
  //获取资源数
  setRoleActions: params => $.post("role/bind/permission",params, { lock: true }),
  //获取资源数
  getMenuTree: params => $.get("/permission/tree",params, { lock: true }),

//新增资源数d
  addMenu: params => $.post("/permission",params, { lock: true }),
  //删除资源数
  delMenuTree: params => $.delete("/permission/"+params,{}, { lock: true }),
//编辑资源数
  editMenu: params => $.put("/permission",params, { lock: true }),

  //配置用户权限-保存
  editAdminMenu: params => $.post("/admin/permission/weight",params, { lock: true }),


  //企业账号
  // 获取页面数据
  getEnterPriseAccoutList: params => $.get("partner/list", params, { lock: true }),

  addPartner: params => $.post("partner", params, { lock: true }),

  configPartner: params => $.post("partner/config/param", params, { lock: true }),


  //账号管理
  getAccoutList: params => $.get("admin/selectPage", params, { lock: true }),

  addAccount: params => $.post("admin/add", params, { lock: true }),

  editAccount: params => $.post("admin/update", params, { lock: true }),

  // 停用
  freezeAccount: params => $.get("admin/freeze", params, { lock: true }),

  unfreezeAccount: params => $.get("admin/unfreeze", params, { lock: true }),


  getThisLogin: params => $.get("admin/getThisLogin", params, { lock: true }),

  getAllAreas: params => $.get("riskconfig/getAllAreas", params, { lock: true }),

  getSystemRoles: params => $.get("role/listForSys", params, { lock: true }),

// /api/role/listForSys





};
