<template>
    <div class="login-wrap">
        <canvas></canvas>
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="name">
                    <el-input v-model.trim="ruleForm.name" auto-complete="new-password" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码"  auto-complete="new-password" v-model.trim="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">Tips : 请填写用户名和密码再登陆。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                ruleForm: {
                  name: '',
                    password: ''
                },
                rules: {
                  name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
            // this.$nextTick(()=>{
            //   require("./initCanvas.js")
            // })
        },
        methods: {
            submitForm (formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try{
                            // this.ruleForm.password=md5(this.ruleForm.password);
                            const res= await this.$api.auth.login(this.ruleForm);
                            sessionStorage.setItem("loginToken",res.data.token)
//                          sessionStorage.setItem("menus",JSON.stringify(res.data))
                            // this.$toolkit.setCookie('user',JSON.stringify(res.data));
//                          this.$store.dispatch('SET_MENU', res.data);
                            this.$message.success("登陆成功!")
                            this.$router.replace("/index")
                        }catch(e){
                            this.$message.error(e.message)
                            console.log(e)
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/background.png);
        background-size: 100% 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.1);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
    .hk_logo_wrap .hk_logo_img{
    	width:200px;
    }
    .hk_logo_wrap{
    	padding: 50px;
    }
</style>
