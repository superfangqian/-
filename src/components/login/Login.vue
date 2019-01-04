<template>
<div class="login">
  <el-row type="flex" justify = "center" align = "middle" class="login-row">
    <el-col  :xs="14" :sm="12" :md="10" :lg="8" :xl="6" class="login-col">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login-form" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
      </el-form>
    </el-col>
</el-row>
</div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async submitForm(formName) {
     try {
        // $refs是Vue提供的一个对象，作用：用来获取页面中所有带有ref属性的元素
      await this.$refs[formName].validate()
        // valid形参表示：表单验证是否成功
        // if (!valid) {
        //   // 验证失败时,不需要左任何处理
        //   return false;
        // }
        // 验证成功
        // 1.获取用户名和密码
        // 2. 调用登录接口，完成登陆
        // 3.登录成功，跳转到首页
        // 4.登录失败，提示用户错误信息
        const res =await this.axios.post("/login", this.loginForm)
            if (res.data.meta.status === 200) {
              // 存储token,载跳转到路由
              localStorage.setItem("token", res.data.data.token);
              this.$router.push("/home");
            } else {
              //弹出信息错误提示框
              this.$message({
                message: res.data.meta.msg,
                type: "error",
                duration: 1000
              });
            }
     } catch (e) {}
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.login {
  height: 100%;
  background-color: #2d434c;
}
.login-row {
  height: 100%;
}

.login-form {
  min-width: 380px;
  padding: 30px 20px;
  border-radius: 10px;
  background-color: #fff;
}
</style>
