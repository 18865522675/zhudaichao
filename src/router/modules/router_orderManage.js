const router_module = {
  path: "/moduleMain",
  meta: {
    title: "产品管理",
    show: true, // 是否显示
    icon:"el-icon-document"
  },
  component: resolve => require(["../../views/moduleMain.vue"], resolve ),
  children: [
    {
      name:"productManage/loanProduct",
      path:"/productManage/loanProduct",
      meta:{
        title:"贷款类产品",
        show:true
      },
      component: resolve =>
        require(["@/views/productManage/loanProduct.vue"], resolve)
    },
  ]
};

export default router_module;
