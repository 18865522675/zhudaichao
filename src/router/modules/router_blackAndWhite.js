const router_module = {
  path: "/moduleMain",
  meta: {
    title: "黑白名单查询",
    show: true, // 是否显示
    icon:"el-icon-printer"
  },
  component: resolve => require(["../../views/moduleMain.vue"], resolve),
  children: [
    {
      path:"/blackAndWhite/blackAndWhitePage",
      name:"blackAndWhite/blackAndWhitePage",
      meta:{
        title:"黑白名单查询",
        show:true
      },
      component: resolve =>
        require(["@/views/blackAndWhite/blackAndWhitePage.vue"], resolve)
    },
  ]
};

export default router_module;
