<template>
  <div class="home">
    <el-container class="home-container">
      <!-- 头部 -->
      <el-header class="home-header">
        <el-row type="flex" align = "middle">
          <el-col :span="6" class="home-logo"><img src="../../assets/imgs/logo.png" alt=""></el-col>
          <el-col><h1>电商后台管理系统</h1></el-col>
          <el-col :span="6"><div>欢迎上海前端31期星曜会员
            <a href="javascript:;" class="logout" @click="logout">退出</a>
            </div></el-col>
        </el-row>
      </el-header>
      <el-container>

        <el-aside width="200px" class="home-aside">
          <!--  :router="true" 启用Vue的路由模式，启用后，会以 index 值作为路由的哈希值 -->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router = "true"
            >
            <!-- 用户列表 -->
            <el-submenu index="1">
              <!-- 一级导航 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
                <el-menu-item index="users">
              <!-- 二级菜单的图标和名称： -->
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>用户列表</span>
                  </template>
                </el-menu-item>
            </el-submenu>
            <!-- 权限列表 -->
            <el-submenu index="2">
              <!-- 一级导航 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
                <el-menu-item index="roles">
              <!-- 二级菜单的图标和名称：角色列表 -->
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>角色列表</span>
                  </template>
                </el-menu-item>
              <!-- 二级菜单的图标和名称：权限列表 -->
                 <el-menu-item index="rights">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>权限列表</span>
                  </template>
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <!-- 子路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  created() {
    this.getMenuList();
  },
  data() {
    return {
      menus: []
    };
  },
  methods: {
    logout() {
      this.$confirm("您确定要退出吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push("/login");
          localStorage.removeItem("token");
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消退出",
            duration: 1000
          });
        });
    },
    async getMenuList() {
      const res = await this.axios.get("/menus");
      // console.log(res);
      this.menus = res.data.data;
    }
  }
};
</script>
<style>
.home {
  height: 100%;
}
.home-container {
  height: 100%;
  background-color: #eaeef1;
}
.home-header {
  background-color: #b3c1cd;
  padding-left: 0;
}
.home-header img {
  width: 200px;
}
.home-header h1 {
  margin: 0;
  text-align: center;
  color: #fff;
  font-size: 28px;
  font-weight: bolder;
}
.home-header div {
  min-width: 235px;
  font-weight: bold;
}
.home-header div .logout {
  color: #daa520;
}
.home-aside {
  background-color: #545c64;
}
</style>


