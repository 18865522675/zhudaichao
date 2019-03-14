<template>
	<div class="sidebar">
		<template v-for="(item,index) in items">
			<router-link :to="item.path">
				<el-menu-item v-if="!item.children&&item.meta.show" :index="item.path">
					<i :class="item.meta.icon" v-if="isParent"></i>
					<span>{{item.meta.title}}</span>
				</el-menu-item>
			</router-link>
			<!-- 判断是否有二级路由 -->
			<el-submenu v-if="item.children&&item.children.length" :index="String(index*3+3)">
				<template slot="title">
					<i :class="item.meta.icon" v-if="item.meta.title!='会员管理'"></i>
					<i class="vipIcon" :class="item.meta.icon" v-else></i>
					<span>{{item.meta.title}}</span>
				</template>
				<!--递归组件，把遍历的值传回子组件，完成递归调用-->
				<Menu :items="item.children" :isParent="false"/>
			</el-submenu>
		</template>
	</div>
</template>
<!--&&item.meta.routerStatus-->
<script>
  // import bus from '../common/bus';
  // @ is an alias to /src
  import { mapState } from 'vuex'
  export default {
    name: "Menu",
    props: {
      items:Array,
      isParent:Boolean
    },
    data() {
      return {
        routes:[]
        // collapse: false,
      }
    },
    computed: mapState([
      // map this.count to store.state.count
      'routesArr'
    ]),
    mounted(){
    }
// 		created() {
// 			// 通过 Event Bus 进行组件间通信，来折叠侧边栏
// 			bus.$on('collapse', msg => {
// 				this.collapse = msg;
// 			})
// 		}
  };
</script>
<style  lang="less">
	.el-submenu{
		.el-submenu__title{
			font-size:13px;
			padding: 0 10px!important;
		}
		.el-menu-item{
			font-size: 13px;
			color:black!important;
			padding-left: 50px!important;
			/*text-align: center;*/
			/*padding: 0 px!important;*/
		}
		i{
			font-size:12px
		}
	}
	.el-submenu__icon-arrow{
		right: 8px!important;
	}
	.el-submenu .el-menu-item{
		width: 180px!important;
		min-width: auto!important;
		font-weight: bold!important;
	}
	.sidebar{
		.el-submenu{
				.el-submenu__title{
					font-weight: bold;
				}
		}
	}
	.menu_page {
		position: relative;
		top: 0px!important;
		left: 0;
		min-height: 100%;
		background-color: white;
		z-index: 99;
	}

	.sidebar::-webkit-scrollbar {
		width: 0;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 250px;
	}

	.el-menu {
		border: none;
		span{
			color:rgba(0,0,0,0.6);
		}
		.is-active{
			span{
				color: #8aa8fb!important;
			}
		}
	}

	.fa-margin {
		margin-right: 5px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 180px;
		min-height: 400px;
	}

	.el-menu-vertical-demo {
		width: 64px;
	}

	.el-submenu .el-menu-item {
		min-width: 180px;
	}

	.hiddenDropdown,
	.hiddenDropname {
		display: none;
	}
	i.el-submenu__icon-arrow.el-icon-arrow-right {
		display: none !important;
	}
	a {
		color:#ccc;
		text-decoration: none;
	}
	.el-menu-item.is-active{
		background-color: #ecf1fc!important;
	}
</style>
