<template>
    <div>
        <div class="header">
            <img src="../assets/logo.jpg" width="100px" height="60px" alt="">
        </div>
        <!-- <el-alert title="用户名或密码错" type="error" show-icon v-show="isLoginFail">
        </el-alert> -->
        <div class="content">
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px"
                class="demo-loginForm">
                <div class="title"><span>密码登录</span></div>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="loginForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
    
    export default {
        data: function () {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.loginForm.checkPass !== '') {
                        this.$refs.loginForm.validateField('checkPass');
                    }
                    callback();
                }
            };

            return {
                loginForm: {
                    name: '',
                    password: '',
                },
                rules: {
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],

                },
                isLoginFail: false,
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/api/login', this.loginForm).then(response => {
                            //跳转首页
                            if (response.data.resultCode == 1) {
                                this.$message({
                                    message: '登录成功!',
                                    type: 'success'
                                });
                                sessionStorage.setItem("loginUser",this.loginForm.name);
                                this.$router.push('/');
                            } else {
                                console.log('login failed:' + response.data.msg);
                                this.$message.error('登录失败!');
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>


<style>
    .header {
        width: 100%;
        height: 60px;

    }

    .content {
        width: 100%;
        height: 800px;
        background-image: url(https://gtms01.alicdn.com/tps/i1/TB1GTCYLXXXXXcHXpXXcoeQ2VXX-2500-600.jpg);
        background-size: cover;
        background-position: 50%;
        background-repeat: no-repeat;
    }

    .el-form {
        position: absolute;
        margin-top: 120px;
        right: 60px;
        width: 350px;
        background: #fff;
        padding: 24px;
    }

    .title {
        font-size: 20px;
        line-height: 1.7;
        text-align: center;
        margin-bottom: 24px;

    }
</style>