const router_module = {
  path: "/moduleMain",
  meta: {
    title: "催款管理",
    show: true, // 是否显示
    icon:"el-icon-rank"
  },
  component: resolve => require(["../../views/moduleMain.vue"], resolve),
  children: [
    {
      name:"pressMoney/normalPeople",
      path:"/pressMoney/normalPeople",
      meta:{
        title:"正常待还款客户",
        show:true
      },
      component: resolve =>
        require(["@/views/pressMoney/normalPeople.vue"], resolve)
    },
    {
      name:"pressMoney/overduePeople",
      path:"/pressMoney/overduePeople",
      meta:{
        title:"逾期待催款客户",
        show:true
      },
      component: resolve =>
        require(["@/views/pressMoney/overduePeople.vue"], resolve)
    },
    {
      name:"pressMoney/collectionStatic",
      path:"/pressMoney/collectionStatic",
      meta:{
        title:"催收统计",
        show:true
      },
      component: resolve =>
        require(["@/views/pressMoney/collectionStatic.vue"], resolve)
    }
  ]
};

export default router_module;
