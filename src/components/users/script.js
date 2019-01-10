export default {
  // 一进入页面发送请求
  created() {
    this.getList();
    this.getRoleList();
  },
  data() {
    return {
      labelPosition: 'right',
      // 用户列表数据
      userList: [],
      // 总条数
      total: 0,
      pagenum: 1,
      pagesize: 3,
      searchText: "",
      // 添加对话框
      dialogFormVisible: false,
      // 添加用户数据
      userAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6到 12 个字符", trigger: "blur" }
        ],
        email: [
          { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: "邮箱格式不正确", trigger: "blur" }
        ],
        mobile: [
          { pattern: /^1(3|4|5|7|8)\d{9}$/, message: "手机号格式不正确", trigger: "blur" }
        ]
      },

      // 编辑对话框
      editUserMask: false,
      // 添加用户数据
      userEditForm: {
        id: "",
        username: "",
        email: "",
        mobile: ""
      },

      // 分配角色对话框
      isShowRoleDialog: false,
      roleList: [],
      roleForm: {
        userName: '',
        rid: -1,
        // 暂存userid
        userId: -1
      },
    };
  },

  methods: {
    async getList(pagenum = 1, query = "") {
      const url = "/users";
      const options = {
        params: {
          query,
          pagenum,
          pagesize: 3
        }
      };
      // headers: {
      //   Authorization: localStorage.getItem("token")
      // }
      const res = await this.axios.get(url, options);
      console.log("用户列表数据：", res);

      if (res.data.meta.status === 200) {
        // 解构
        const { users, total, pagenum } = res.data.data
        // 获取数据成功
        this.userList = users;
        // 设置总条数：
        this.total = total;
        // 设置当前页
        this.pagenum = pagenum;
      } else {
        //token失效
        //跳回到登录页
        this.$router.push("/login");
        localStorage.removeItem("token");
      }
    },
    // 分页
    changePage(curPage) {
      this.getList(curPage, this.searchText);
    },
    async changeStatus(user) {
      // console.log('changeStatus',user);
      try {
        const res = await this.axios.put(
          `/users/${user.id}/state/${user.mg_state}`,
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
      } catch (error) { }
    },
    // 搜索功能
    clickSearch() {
      this.getList(1, this.searchText);
    },
    // 删除功能
    async deleteUser(id) {
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        //发送请求，删除数据
        const res = await this.axios.delete(`/users/${id}`);
        console.log("删除结果", res);
        if (res.data.meta.status === 200) {
          this.$message({
            type: "success",
            message: res.data.meta.msg,
            duration: 1000
          });
          // 重新刷新页面
          this.getList(1, this.searchText);
        }
      } catch (error) {
        this.$message({
          type: "info",
          message: "取消删除"
        });
      }
    },
    // 点击添加按钮，弹出添加框
    showUserAddDialog() {
      this.dialogFormVisible = true;
    },
    // 添加用户
    async addUser() {
      try {
        // 进行表单验证
        await this.$refs.userAddFormRef.validate();
        // 进行进行用户添加逻辑
        const res = await this.axios.post('/users', this.userAddForm);
        console.log(res);
        if (res.data.meta.status === 201) {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          // 重新刷新列表
          this.getList(1, this.searchText)
        }
      } catch (error) {
        // 表单验证失败

      }
    },
    // 编辑用户
    // - 1 给编辑按钮绑定单击事件
    // - 2 在单击事件中，弹出对话框
    // - 3 获取到当前用户数据，并且展示在 编辑对话框 中
    // - 4 给 确定 按钮，绑定单击事件
    // - 5 获取当前用户数据，发送请求，修改数据
    // - 6 修改成功后，关闭对话框、提示用户编辑用户成功、刷新列表数据
    showEditUser(user) {
      // 在单击事件中，弹出对话框
      this.editUserMask = true
      // 因为展示编辑对话框的时候，要展示用户数据，所以，
      // 在这，通过 参数user 将数据赋值给 编辑对话框 的数据就可以了
      for (let key in this.userEditForm) {
        this.userEditForm[key] = user[key]
      }
    },

    // 点击确定按钮，编辑成功
    async updaterUser() {
      //获取数据
      // console.log(this.userEditForm);
      // 解构
      const { id, email, mobile } = this.userEditForm
      const res = await this.axios.put(`users/${id}`, {
        email,
        mobile
      })

      // console.log(res);
      // 解构
      const { meta: { status, msg: message } } = res.data
      if (status === 200) {
        // 关闭对话框
        this.editUserMask = false
        // 提示更新成功
        this.$message({
          type: 'success',
          message
        })
        // 刷新列表
        this.getList(1, this.searchText)
      }
    },

    // 点击分配角色弹出对话框
    ShowRoles(curUser) {
      this.isShowRoleDialog = true
      // console.log(curUser);
      const role = this.roleList.find(item => item.roleName === curUser.role_name)
      // console.log(role);
      // 注意：admin用户的角色是 超级管理员 ，这个角色不在角色列表中，所以，需要判断 role是否存在，如果存在就获取 role.id；如果不存在，就设置默认值 ''
      const rid = role ? role.id : ''
      //  console.log(rid);
      this.roleForm.userName = curUser.username
      this.roleForm.rid = rid
      this.roleForm.userId = curUser.id
    },
    // 获取所有角色列表数据
    async getRoleList() {
      const res = await this.axios.get('/roles')
      console.log('角色列表', res);
      this.roleList = res.data.data
    },
    // 给用户分配角色
    async assignRole(){
      const {userId,rid} = this.roleForm
      const res = await this.axios.put(`users/${userId}/role`,{
        rid
      })
      // console.log(res);
      // 成功后做几件事
      // 关闭对话框
      this.isShowRoleDialog = false
      // 提示成信息
      this.$message({
        type:"success",
        message:res.data.meta.msg
      })
      // 刷新列表
      this.getList(this.pagenum, this.searchText);



    }

  }
}
