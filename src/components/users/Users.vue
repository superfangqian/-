<template>
  <div class="user">
      <el-table
        :data="userList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          width="180"
          >
        </el-table-column>
         <el-table-column label="用户状态">
           <template slot-scope="scope">
            <el-switch
            v-model="scope.row.mg_state"
            @change = "changeStatus(scope.row)"
            >
           </el-switch>
           </template>
        </el-table-column>
         <el-table-column label="操作" width = 235>
           <template slot-scope="scope">
             <el-button size="mini" type="primary" plain icon="el-icon-edit"></el-button>
             <el-button size="mini" type="danger" plain icon="el-icon-delete"></el-button>
             <el-button size="mini" type="success" plain icon="el-icon-check">分配角色</el-button>
           </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size = "pagesize"
        :current-page = "pagenum"
        @current-change = "changePage"
        >
      </el-pagination>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  // 一进入页面发送请求
  created() {
    this.getList();
  },
  data() {
    return {
      // 用户列表数据
      userList: [],
      // 总条数
      total: 0,
      pagenum: 1,
      pagesize: 3
    };
  },

  methods: {
    async getList(pagenum = 1) {
      const url = "/users";
      const options = {
        params: {
          query: "",
          pagenum,
          pagesize: 3
        }
      };
      // headers: {
      //   Authorization: localStorage.getItem("token")
      // }
      const res = await this.axios.get(url, options);
      console.log('用户列表数据：',res);

      if (res.data.meta.status === 200) {
        // 获取数据成功
        this.userList = res.data.data.users;
        // 设置总条数：
        this.total = res.data.data.total;
        // 设置当前页
        this.pagenum = res.data.data.pagenum;
      } else {
        //token失效
        //跳回到登录页
        this.$router.push("/login");
        localStorage.removeItem("token");
      }
    },
    changePage(curPage) {
      this.getList(curPage);
    },
    async changeStatus(user) {
      // console.log('changeStatus',user);
      try {
        const res = await this.axios.put(
          `/users/${user.id}/state/${
            user.mg_state
          }`,
          null,
          {
            // headers: {
            //   Authorization: localStorage.getItem("token")
            // }
          }
        );
        if (res.data.meta.status === 200) {
          this.$message({
            type: "success",
            message: res.data.meta.msg,
            duration: 1000
          });
        } else {
          this.$message({
            type: "warning",
            message: res.data.meta.msg
          });
        }
      } catch (error) {
        // this.$message({
        //   type:'error',
        //   message:'状态更新失败'
        // })
      }
    }
  }
};
</script>
<style>
</style>


