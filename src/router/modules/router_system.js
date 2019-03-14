const router_module = {
  path: "/moduleMain",
  meta: {
    title: "系统设置与角色管理",
    show: true, // 是否显示
    icon:'el-icon-setting'
  },
  component: resolve => require(["../../views/moduleMain.vue"], resolve),
  children: [
//{
//    path:"/system/loginRecord",
//    name:"system/loginRecord",
//    meta:{
//        title:"操作日志",
//        show:true
//    },
//    component: resolve =>
//        require(["@/views/systemRole/loginRecord.vue"], resolve)
//},
//  {
//    path:"/system/globalParams",
//    name:"system/globalParams",
//    meta:{
//      title:"全局参数",
//      show:true
//    },
//    component: resolve =>
//      require(["@/views/systemRole/globalParams.vue"], resolve)
//  },
//  {
//    path:"/system/enterPriseAccount",
//    name:"system/enterPriseAccount",
//    meta:{
//      title:"企业账号",
//      show:true
//    },
//    component: resolve =>
//      require(["@/views/systemRole/enterPriseAccount.vue"], resolve)
//  },
    {
      path:"/system/roleConfig",
      name:"system/roleConfig",
      meta:{
        title:"角色配置",
        show:true
      },
      component: resolve =>
        require(["@/views/systemRole/roleConfig.vue"], resolve)
    },
//  {
//    path:"/system/systemColeConfig",
//    name:"system/systemColeConfig",
//    meta:{
//      title:"系统角色配置",
//      show:true
//    },
//    component: resolve =>
//      require(["@/views/systemRole/systemColeConfig.vue"], resolve)
//  },
    {
      path:"/system/accountManage",
      name:"system/accountManage",
      meta:{
        title:"账号管理",
        show:true
      },
      component: resolve =>
        require(["@/views/systemRole/accountManage.vue"], resolve)
    },

//  {
//    path:"/system/menuConfig",
//    name:"system/menuConfig",
//    meta:{
//      title:"菜单管理",
//      show:true
//    },
//    component: resolve =>
//      require(["@/views/systemRole/menuConfig.vue"], resolve)
//  },
//  {
//    path:"/system/autoTrail",
//    name:"system/autoTrail",
//    meta:{
//      title:"自动审核",
//      show:true
//    },
//    component: resolve =>
//      require(["@/views/systemRole/autoTrail.vue"], resolve)
//  },
//  {
//    path:"/system/adminMenuConfig/:roleId/:adminId",
//    name:"system/adminMenuConfig",
//    meta:{
//      title:"设置用户权限",
//      show:false
//    },
//    component: resolve =>
//      require(["@/views/systemRole/adminMenuConfig.vue"], resolve)
//  }
  ]
};

export default router_module;
