const router_module = {
  path: "/moduleMain",
  meta: {
    title: "运营管理",
    show: true, // 是否显示
    icon:"el-icon-rank"
  },
  component: resolve => require(["../../views/moduleMain.vue"], resolve),
  children: [
      {
      path: "/operator/channelList",
      name: "operator/channelList",
      meta: {
        title: "渠道列表",
        show: true
      },
      component: resolve =>
        require(["@/views/operator/channelList.vue"], resolve)
    },
    {
      path: "/operator/adList",
      name: "operator/adList",
      meta: {
        title: "广告位管理",
        show: true
      },
      component: resolve =>
        require(["@/views/operator/adList.vue"], resolve)
    },
  ]
};

export default router_module;
