import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/iconfont/iconfont.css'




import 'viewerjs/dist/viewer.css'
import viewer from 'v-viewer'
Vue.use(viewer);
viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});


// 表格封面
import tableCover from "@/components/tableCover.vue";
Vue.component("tableCover", tableCover);



import api from "@/api";
Vue.prototype.$api=api;

import toolkit from "@/common/toolkit.js";
Vue.prototype.$toolkit=toolkit;

//
//import moment from 'moment'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts



//权限accountManage

let permissionReady=()=>{
//	    reGetMenu(){
       let menus=JSON.parse(sessionStorage.getItem("menus"));
       console.log(menus)
       if(menus&&menus.length){
         	store.dispatch('SET_MENU',menus);
	   }
  return new Promise((resolve,reject)=>{
    let routesArr=router.options.routes[1].children;
    let sessionMenus=JSON.parse(sessionStorage.getItem("menus"))||[];
    console.log(sessionMenus)
    routesArr.map((item)=>{
      sessionMenus.map((sItem)=>{
        if(item.meta.title==sItem.name){
          item.meta={
            ...item.meta,
            routerStatus:true
          }
          console.log(123456)
          if(item.children&&item.children.length&&sItem.permissionVOS&&sItem.permissionVOS.length){

            item.children.map((cItem)=>{
              sItem.permissionVOS.map((csItem)=>{
                if(cItem.meta.title==csItem.name){
                  cItem.meta={
                    ...cItem.meta,
                    routerStatus:true
                  }
                }
              })
            })
          }
        }
      })
    })
    console.log(routesArr)
    store.commit("menu_ready",routesArr);
    resolve();
  })
}


const setRouteBtns = (to) => {
  let sessionMenus=JSON.parse(sessionStorage.getItem("menus"))||[];
  let secondArr=[]
  console.log(sessionMenus)
  sessionMenus.map((item)=>{
    secondArr.push(...item.permissionVOS)
  })
  let str="";
  secondArr.map((item)=>{
    if(item.name==to.meta.title){
      item.permissionVOS.map((cItem)=>{
        str+=cItem.name
      })
    }
  })
  console.log(str)
  store.commit({
    type:"setState",
    cType:"btnStr",
    value:str
  });
}


let resetRoutes=()=>{
    let routesArr=router.options.routes[1].children;
    routesArr.map((item)=>{
      item.meta={
        ...item.meta,
        routerStatus:false
      }
      if(item.children&&item.children.length){
        item.children.map((cItem)=>{
          cItem.meta={
            ...cItem.meta,
            routerStatus:false
          }
        })
      }
    })
}

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    const routes = sessionStorage.getItem("loginToken")
    if (!routes) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      sessionStorage.removeItem("loginToken")
      return false
    }
    // if(to.path=="/index"){
    //   next()
    //   return false
    // }

//  permissionReady();
//  setRouteBtns(to)
    next()
  } else {
    if(to.path=='/login'){
      sessionStorage.removeItem("loginToken");
      store.commit("menu_ready",[]);
      resetRoutes()
    }
    next()
  }
})

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
