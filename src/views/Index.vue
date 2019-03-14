<template>
  <div class="index">
      <Header></Header>
      <div class="flex-r">
		  <LeftMenu></LeftMenu>
		  <div class="rightContainer" style="flex:1" :class="{'content-collapse':collapse}">
			  <div class="tagsWrap">
				  <Tags/>
			  </div>
			  <div class="content" >
				  <transition name="move" mode="out-in">
					  <keep-alive :include="tagsList">
						  <router-view style="height: 100%;"></router-view>
					  </keep-alive>
				  </transition>
			  </div>
		  </div>
	  </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import LeftMenu from '../components/LeftMenu'
import bus from '../common/bus'
import Tags from '../common/Tags'
 // import moment from 'moment'
// @ is an alias to /src
export default {
  name: 'Index',
	data() {
		return {
			tagsList: [],
			collapse: false
		}
	},
  components:{
    Header,
    LeftMenu,
		Tags
  },
	created() {
		//内容区域跟随变化
		 bus.$on('collapse', msg => {
			console.log(msg)
			this.collapse = msg;
		}),
		// 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
		bus.$on('tags', msg => {
				let arr = [];
				for(let i = 0, len = msg.length; i < len; i ++){
						msg[i].name && arr.push(msg[i].name);
				}
				this.tagsList = arr;
				// console.log(tags)
		})
	},
    mounted(){
     this.$nextTick(()=>{
       this.$store.commit({
         type:"setState",
         cType:"clientHeight",
		 value:document.body.clientHeight-70
       })
	 })
      this.reGetMenu()
	},
  methods:{
    reGetMenu(){
       let menus=JSON.parse(sessionStorage.getItem("menus"));
       if(menus&&menus.length){
         this.$store.dispatch('SET_MENU',menus);
	   }
    }
  }
}
</script>
<style scoped>
	.memberDialog{
	@keyframes dialog-fade-in {
		0% {
			transform: translate3d(100%, 0, 0);
			opacity: 0;
		}
		100% {
			transform: translate3d(0%, 0, 0);
			opacity: 1;
		}
	}

	@keyframes  dialog-fade-out {
		0% {
			transform: translate3d(0%, 0, 0)!important;
			opacity: 1;
		}
		100% {
			transform: translate3d(100%,0, 0)!important;
			opacity: 0;
		}
	}

	}
.index{
  width: 100%;
	height: auto;
  /*height: 100%;*/
	background: url("../assets/img/insideBg.png");
	background-size:100% 100%;
	background-repeat: no-repeat;
	background-position: center center;
  /*overflow: hidden;*/
}
.content {
	/*width: auto;*/
  height: 100%;
	width: 100%;
  padding: 30px;
	padding-top: 0;
  overflow-y: scroll;
  box-sizing: border-box;
}

.content::-webkit-scrollbar {/*滚动条整体样式*/
	width: 1px;     /*高宽分别对应横竖滚动条的尺寸*/
	height: 4px;
}
.content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	border-radius: 5px;
	-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	background: rgba(0,0,0,0.2);
}
.content::-webkit-scrollbar-track {/*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
	border-radius: 0;
	background: rgba(0,0,0,0.1);
}

.rightContainer.content-collapse {
	/*left: 0px;*/
}
.rightContainer {
	position: relative;
	/*left: 180px;*/
	right: 0;
	/*top: 72px;*/
	bottom: 0;
	width: 600px!important;
	/*flex: 1!important;*/
	padding-bottom: 30px;
	transition: left .3s ease-in-out;
}
	.tagsWrap{
		padding: 0 30px;
		border-top-left-radius: 10px!important;
		border-top-right-radius: 10px!important;
		overflow: hidden;
	}
</style>
