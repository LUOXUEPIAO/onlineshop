<template>
  <div id="app">
    <header v-show="showheader">
      <el-row>
        <el-col :span="16">
          <div></div>
        </el-col>
        <el-col :span="8">
          <el-menu background-color="#f5f5f5" class="el-menu-demo" mode="horizontal" :router='true'>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/login" v-if="!isLogin">请登录</el-menu-item>
            <el-menu-item index="/register" v-if="!isLogin">免费注册</el-menu-item>
            <el-menu-item index="/mine">我的</el-menu-item>
            <el-menu-item index="/cart">购物车</el-menu-item>
            <el-menu-item @click="doLogout"  v-if="isLogin">注销</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </header>
    <router-view />
  </div>
</template>

<style>
  header {
    background-color: #f5f5f5;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .el-row {
    width: 100%;
  }

  header .el-col {
    min-height: 36px;
  }
</style>
<script>
  export default {
    data: function () {
      return {
        showheader: true,
        isLogin:false,
      }
    },
    watch: {
      $route(to, from) {
        if (to.path.indexOf('login') > -1) {
          this.showheader = false;
        } else {
          this.showheader = true;
        }
        // 判断是否登录，若登录，则不显示登录页面路由了
        if(sessionStorage.getItem('loginUser') == null){
          this.isLogin = false;
        }else{
          this.isLogin = true;
        }
        console.log(to.path);
      }
    },
    methods: {
      doLogout(){
       
        this.$http.post('api/logout',{}).then(response => {
                            //跳转首页
                            if (response.data.resultCode == 1) {
                                this.$message({
                                    message: '已经注销!',
                                    type: 'success'
                                });
                                sessionStorage.removeItem("loginUser");
                                this.isLogin = false;
                                this.$router.push('/');
                            } else {
                                console.log('logout failed:' + response.data.msg);
                                
                                this.$message.error('注销失败!');
                            }
                        })
      }
    },
  }
</script>