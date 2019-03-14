import Vue from 'vue'
import Vuex from 'vuex'
// import Cookies from 'js-cookie'
Vue.use(Vuex)

const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER:'SET_USER',
  SET_MENU:'SET_MENU'
	// SET_LANGUAGE:'SET_LANGUAGE'
};

const state = {
  isAuthenticated:false,  //授权
  user:{},  //用户登录
    token:"",
  menu:[],
  routesArr:[],
  btnStr:"",
  clientHeight:0
	// 中英文
	// language: Cookies.get('language') || 'zh'
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user:state => state.user,
	// language: state => state.language,
};

const mutations = {
  [types.SET_AUTHENTICATED](state,isAuthenticated) {
    if (isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    } else {
      state.isAuthenticated = false
    }
  },

  [types.SET_MENU](state,menu) {
    if(menu) {
      state.menu = menu
    } else {
      state.menu = []
    }
  },
  menu_ready(state, res) {
    return (state.routesArr = res);
  },
    setState(state,payload){
      state[payload.cType]=payload.value;
      sessionStorage.setItem("token",payload.value)
    },
};

const actions = {
  setAuthenticated({ commit }, isAuthenticated) {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  SET_MENU({commit},menu){
    commit(types.SET_MENU,menu)
  },
  createUser:({commit}) => {
    commit(types.SET_AUTHENTICATED,false)
    commit(types.SET_USER,null)
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
