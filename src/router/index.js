import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index.vue'
import Login from "../views/login/Login";
import Nofind from '../views/404'
import registerNew from '../components/registerNew'
import borrowNew from '../components/borrowNew'
import router_system from './modules/router_system'  //系统与角色管理
import router_channel from './modules/router_channel'  //渠道商管理
import router_member from './modules/router_member'  //会员管理
import router_charge from './modules/router_charge'  //充值
import router_auditManage from './modules/router_auditManage'  //审核管理
import router_pressMoney from './modules/router_pressMoney'  //审核管理
import router_orderManage from './modules/router_orderManage'  //审核管理
import router_staticManage from './modules/router_staticManage'  //数据统计
import router_blackAndWhite from './modules/router_blackAndWhite'  //数据统计
import router_operate from './modules/router_operate'  //数据统计
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/index",
      name: "Index",
      component: Index,
      meta: {
        title: '首页',
        requireAuth:true
      },
      children: [
          router_system,
          router_channel,   //渠道商管理
          router_member,    //会员
          router_operate,
          router_orderManage
//        router_auditManage,
//        router_pressMoney,
//        router_orderManage,
//        router_charge,    //充值
//        router_staticManage,
//        router_blackAndWhite

      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "*",
      name: "Nofind",
      component: Nofind
    },
    {
      path: "/borrowNew/:partnerTag",
      name: "borrowNew",
      component: borrowNew
    },
    {
      path: "/registerNew/:partnerTag",
      name: "registerNew",
      component: registerNew
    }
  ],
  mode: "history"
});

export default router
