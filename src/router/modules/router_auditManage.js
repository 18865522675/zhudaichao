const router_module = {
  path: "/moduleMain",
  meta: {
    title: "审核管理",
    show: true, // 是否显示
    icon:"el-icon-bell"
  },
  component: resolve => require(["../../views/moduleMain.vue"], resolve),
  children: [
    {
      name:"auditManage/loanApplyManage",
      path:"/auditManage/loanApplyManage",
      meta:{
        title:"贷款申请管理",
        show:true
      },
      component: resolve =>
        require(["@/views/auditManage/loanApplyManage.vue"], resolve)
    },
    {
      name:"auditManage/waitLoanManage",
      path:"/auditManage/waitLoanManage",
      meta:{
        title:"放款申请管理",
        show:true
      },
      component: resolve =>
        require(["@/views/auditManage/waitLoanManage.vue"], resolve)
    },
    {
      name:"auditManage/auditStatistic",
      path:"/auditManage/auditStatistic",
      meta:{
        title:"审核统计",
        show:true
      },
      component: resolve =>
        require(["@/views/auditManage/auditStatistic.vue"], resolve)
    },
    {
      name:"auditManage/refuseList",
      path:"/auditManage/refuseList",
      meta:{
        title:"拒绝名单",
        show:true
      },
      component: resolve =>
        require(["@/views/auditManage/refuseList.vue"], resolve)
    },
    {
      name:"auditManage/auditInfoDetail",
      path:"/auditManage/auditInfoDetail/:id",
      meta:{
        title:"申请贷款详情",
        show:false
      },
      component: resolve =>
        require(["@/views/auditManage/auditInfoDetail.vue"], resolve)
    },
    {
      name:"userInfoDetail",
      path:"/userInfoDetail/:userId/:orderId/:userName/:phone",
      meta:{
        title:"查看认证详情",
        show:false
      },
      component: resolve =>
        require(["@/views/userInfoDetail.vue"], resolve)
    },
  ]
};

export default router_module;
