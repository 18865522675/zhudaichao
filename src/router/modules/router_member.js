const router_module = {
  path: "/moduleMain",
  meta: {
    title: "会员管理",
    show: true, // 是否显示
    icon:"vipIconhuiyuan"
  },
  component: resolve => require(["../../views/moduleMain.vue"], resolve),
  children: [
//  {
//    path:"/member/affiliateMarketing",
//    name:"member/affiliateMarketing",
//    meta:{
//      title:"会员营销",
//      show:true
//    },
//    component: resolve =>
//      require(["@/views/member/affiliateMarketing.vue"], resolve)
//  },
    {
      path:"/member/enterpriseMember",
      name:"member/enterpriseMember",
      meta:{
        title:"平台会员",
        show:true
      },
      component: resolve =>
        require(["@/views/member/enterpriseMember.vue"], resolve)
    },
  ]
};

export default router_module;
