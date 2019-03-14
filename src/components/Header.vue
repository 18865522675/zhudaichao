<template>
	<header class="header-nav">
		<el-row>
			<el-col :span="6" class='logo-container' style="display: flex;align-items: center">
				<!-- <img src="./../assets/logo.png" alt="" class="logo"> -->
				<!-- 折叠按钮 -->

				<!--<img src="../assets/img/logo.png" style="width: 50px;height: 50px" class="marL10" alt="">-->
				<span class="title marL10">贷超平台</span>
				<div class="collapse-btn" @click="collapseChage">
					<!--<img src="../assets/img/logo.png" alt="">-->
					<i class="el-icon-menu icon-btn"></i>
				</div>
			</el-col>
			<!-- <el-col :span="6">
				<div class="music">
					<aplayer
						autoplay
						listmaxheight="30px"
						:music="music"
						:showlrc="showlrc"
					>
					</aplayer>
				</div>
			</el-col> -->
			<el-col :span="7" class="user">
				<div class="btn-fullscreen icon-font">

				</div>
				<div class="userinfo">
					<!--<div class="btn-fullscreen icon-font">-->
						<!--<el-tooltip class="item" effect="dark" content="锁屏" placement="bottom">-->
							<!--<i class="iconfont icon-bofangqi-suoping" @click="handleLockScreen"></i>-->
						<!--</el-tooltip>-->
					<!--</div>-->
					<div class="btn-fullscreen icon-font">
						<el-tooltip class="item" effect="dark" content="关于北境科技" placement="bottom">
							<a href="https://xin.baidu.com/detail/compinfo?pid=xlTM-TogKuTwZj*ZHznnmVIy1Go9XCWxQwmd&from=ps" target="_blank">
								<i class="iconfont icon-github"></i>
							</a>
						</el-tooltip>
					</div>
					<div class="btn-fullscreen icon-font">
						<el-tooltip class="item" effect="dark" content="换色" placement="bottom">
							<theme/>
						</el-tooltip>
					</div>
					<!-- 全屏显示 -->
					<div class="btn-fullscreen" @click="handleFullScreen">
						<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
							<i class="el-icon-rank"></i>
						</el-tooltip>
					</div>

					<!--<img class="avatar" :src="users.avatar">-->
					<div class="welcome">
						<p class="name comename">欢迎</p>
						<!--<p class="name avatarname">{{users.userName}}</p>-->
					</div>
					<span class='username'>
						<el-dropdown trigger="click" @command='setDialogInfo'>
							<span class="el-dropdown-link">
								<i class="el-icon-caret-bottom el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<!--<el-dropdown-item command='info'>个人信息</el-dropdown-item>-->
								<el-dropdown-item command='logout' @click="logout()">退出</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</span>
				</div>
			</el-col>
		</el-row>
	</header>
</template>

<script>
	import bus from '../common/bus'
	import theme from '../common/theme'
	import Aplayer from 'vue-aplayer'
	// @ is an alias to /src
	export default {
		name: 'header-nav',
		data() {
			return {
				collapse: false, //菜单栏是否闭合
				fullscreen: false,
				showlrc:true,
			  	adminName:"风控管理系统",
			    userName:""
				// music:{
				// 	title:"",
				// 	author:"",
				// 	url:"",
				// 	pic:"",
				// 	lrc:""
				// }
			}
		},
		computed: {
			users() { //通过vuex获取用户信息
				return this.$store.getters.user
			},
		},
	    mounted(){
//		  this.getThisLogin();
		},
		// created(){
		// 	this.$axios.get('https://api.apiopen.top/searchMusic?name=%E6%9D%8E%E7%99%BD').then(res => {
		// 		this.music = {
		// 			title: res.data.result[0].title,
		// 			author: res.data.result[0].author,
		// 			url :res.data.result[0].url,
		// 			author: res.data.result[0].author,
		// 			pic: res.data.result[0].pic,
		// 			lrc :res.data.result[0].lrc,
		// 		}
		// 		console.log(this.music)
		// 	})
		// },
		methods: {
          getThisLogin(){
            this.$api.system.getThisLogin().then((res)=>{
              switch (res.data.partnerId) {
				case 10:this.adminName="贷你富后台管理";break;
                case 11:this.adminName="急速周转后台管理";break;
                case 12:this.adminName="猪八借后台管理";break;
                case 13:this.adminName="零用花花后台管理";break;
                case 14:this.adminName="花啦花啦后台管理";break;
                case 15:this.adminName="易乐贷后台管理";break;
                case 16:this.adminName="好享花后台管理";break;
                case 18:this.adminName="易花花后台管理";break;
                case 20:this.adminName="易花花后台管理";break;
                case 21:this.adminName="南瓜钱袋后台管";break;
                case 22:this.adminName="柠檬兔后台管理";break;
                case 23:this.adminName="贝贝贷后台管理";break;
                case 24:this.adminName="钞好借后台管理";break;
                case 25:this.adminName="安心宝后台管理";break;
                case 26:this.adminName="幸福米庄后台管理";break;
                case 27:this.adminName="秒到应急后台管理";break;
                case 28:this.adminName="速来花后台管理";break;
                case 29:this.adminName="大润花后台管理";break;
                case 30:this.adminName="万元户后台管理";break;
                case 31:this.adminName="立马花后台管理";break;
                case 32:this.adminName="好易花后台管理";break;
				default:this.adminName="风控管理系统";break
              }
              this.userName=res.data.userName
			})
		  },
		    logout(){
				this.$api.auth.logout().then((res)=>{
				    this.$message.success("退出成功");
				    setTimeout(()=>{
				        this.$router.replace("/login");
				        this.$toolkit.removeCookie("userInfo");
					},500)
				}).catch((e)=>{
				    this.$messgae.error("退出失败")
				})
			},
			setDialogInfo(cmditem) {
				switch (cmditem) {
					case 'info':
						this.showInfoList()
						break;
					case 'logout':
						this.logout()
						break;
				}
			},
			handleLockScreen(){
				this.$confirm('是否要进行锁屏?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  this.$message({
					type: 'success',
					message: '锁屏成功!'
				  });
				  setTimeout(() => {
					  this.$router.push('/lock')
				  },100)
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '锁屏失效'
				  });
				});
			},
			showInfoList() {
				// console.log('下来菜单')
				this.$router.push('/Infoshow')
			},
			logout() {
				// console.log('退出')
				//清除token
				localStorage.removeItem('eleToken');
				//清除vuex
				// this.$store.dispatch('createUser')
				//路由跳转
				this.$router.push('/login')
			},
			collapseChage() {
				//点击隐藏左侧菜单栏，
				this.collapse = !this.collapse;
				//非父子组件传值
				bus.$emit('collapse', this.collapse);
			},
			handleFullScreen() {
				//获取到整个html
				let element = document.documentElement;
				// console.log(element)
				if (this.fullscreen) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if (element.requestFullscreen) {
						element.requestFullscreen();
					} else if (element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen();
					} else if (element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if (element.msRequestFullscreen) {
						// IE11
						element.msRequestFullscreen();
					}
				}
				this.fullscreen = !this.fullscreen;
			}
		},
		components:{
			theme,
			Aplayer
		}
	}
</script>
<style scoped>
	.header-nav {
		width: 100%;
		height: 70px;
		background: transparent;
		color: #fff;
		/*border-bottom: 1px solid #1f2d3d;*/
		overflow: hidden;
		/*padding: 5px 0;*/
	}

	.collapse-btn {
		width: 50px;
		margin-left: 20px;
		display: inline-block;
	}
	.aplayer {
		margin: 0;
	}
	.icon-btn {
		font-size: 36px;
		vertical-align: middle;
		cursor: pointer;
	}

	.logo-container {
		line-height: 60px;
		min-width: 400px;
		padding: 0 5px;
	}

	.logo {
		height: 50px;
		width: 50px;
		margin-right: 5px;
		vertical-align: middle;
		display: inline-block;
	}

	.title {
		vertical-align: middle;
		font-size: 22px;
		font-family: "Microsoft YaHei";
		letter-spacing: 3px;
	}

	.user {
		line-height: 60px;
		text-align: right;
		float: right;
		padding-right: 10px;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		vertical-align: middle;
		display: inline-block;
	}

	.welcome {
		display: inline-block;
		width: auto;
		vertical-align: middle;
		padding: 0 5px;
	}

	.name {
		line-height: 20px;
		text-align: center;
		font-size: 14px;
	}

	.comename {
		font-size: 12px;
	}

	.avatarname {
		color: #409eff;
		font-weight: bolder;
	}

	.username {
		cursor: pointer;
		margin-right: 5px;
	}

	.el-dropdown {
		color: #fff;
	}

	.btn-fullscreen {
		display: inline-block;
		font-size: 24px;
		vertical-align: middle;
		margin-right: 20px;
		transform: rotate(45deg);
		cursor: pointer;
	}

	.icon-font {
		transform: none;

	}

	a {
		text-decoration: none;
		color: #fff;
	}

	.icon-font i {
		font-size: 20px;
	}

	.userinfo {
		display: inline-block;
	}
</style>
