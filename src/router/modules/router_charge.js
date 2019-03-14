const router_module = {
  path: "/moduleMain",
  meta: {
    title: "财务管理",
    show: true, // 是否显示
    icon:"el-icon-message"
  },
  component: resolve => require(["../../views/moduleMain.vue"], resolve),
  children: [
    {
      name:"chargeManage/merchantCharge",
      path:"/chargeManage/merchantCharge",
      meta:{
        title:"成本明细",
        show:true
      },
      component: resolve =>
        require(["@/views/chargeManage/merchantCharge.vue"], resolve)
    },
    {
      name:"chargeManage/superManagerCharge",
      path:"/chargeManage/superManagerCharge",
      meta:{
        title:"超级管理员充值",
        show:true
      },
      component: resolve =>
        require(["@/views/chargeManage/superManagerCharge.vue"], resolve)
    },
    {
      name:"chargeManage/loanRecord",
      path:"/chargeManage/loanRecord",
      meta:{
        title:"放款记录",
        show:true
      },
      component: resolve =>
        require(["@/views/chargeManage/loanRecord.vue"], resolve)
    },
    {
      name:"chargeManage/repaymentRecord",
      path:"/chargeManage/repaymentRecord",
      meta:{
        title:"还款记录",
        show:true
      },
      component: resolve =>
        require(["@/views/chargeManage/repaymentRecord.vue"], resolve)
    }
  ]
};

export default router_module;
