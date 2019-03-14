const router_module = {
  path: "/moduleMain",
  meta: {
    title: "数据统计",
    show: true, // 是否显示
    icon:"el-icon-printer"
  },
  component: resolve => require(["../../views/moduleMain.vue"], resolve),
  children: [
    {
      path:"/static/staticPage",
      name:"static/staticPage",
      meta:{
        title:"统计报表",
        show:true
      },
      component: resolve =>
        require(["@/views/static/staticPage.vue"], resolve)
    },
  ]
};

export default router_module;
