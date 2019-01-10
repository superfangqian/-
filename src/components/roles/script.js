export default {
  data() {
    return {
      // 用户列表数据
      roleList: [],

      // 授权框的配置
      dialogFormVisible: false,
      // 树形控件
      rightTree: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 当前角色id
      curRoleId:-1

    }
  },
  // 一进入页面发送请求
  created() {
    this.getRolesList();
    this.getRightTree();
  },
  methods: {
    // 获取列表数据
    async getRolesList() {
      const res = await this.axios.get('/roles')
      console.log(res);
      this.roleList = res.data.data
    },
    // 自定义索引号
    getIndex(index) {
      return index + 1
    },
    // 删除用户的权限
    async delRights(roleId, rightId) {
      const res = await this.axios.delete(`/roles/${roleId}/rights/${rightId}`)
      console.log(res);

      this.$message({
        type: 'success',
        message: res.data.meta.msg
      })
      // 重新刷新列表
      this.getRolesList()

    },
    //点击分配权限，弹出对话框
    isShowDialog(curRole) {
      this.dialogFormVisible = true
      // console.log(curRole);
      // 获取用户id ,roleid
      // 暂存
      this.curRoleId = curRole.id
      const check = []
      curRole.children.forEach(level1 => {
        curRole.children.forEach(level2 => {
          curRole.children.forEach(level3 => {
            check.push(level3.id)
          })
        })
      })
      // console.log(check);
      // this.$refs.tree.getCheckedNodes()通过这个选中
      /*
       如何获取到tree组件？
         只要调用 $nextTick() 方法，在回调函数中再获取 tree 就可以获取到了
         因为 $nextTick 中的回调函数，会在DOM渲染后，立即调用，所以，当 回调函数 执行的时候，tree组件已经完成渲染，此时，就可以获取到的 tree 了
     */
      // console.log(this.$refs,this.$refs.tree);
      // this.$refs.tree.setCheckedKeys(check)
      this.$nextTick(() => {
        // 设置选中
        // console.log(this.$refs.tree);
        console.log(this.$refs.tree);
        this.$refs.tree.setCheckedKeys(check)
      })
    },
    // 获取树形列表数据
    async getRightTree() {
      const res = await this.axios.get('rights/tree')
      // console.log(res);
      this.rightTree = res.data.data
    },
    // 给角色分配权限
    async assignRights() {
      // 获取id
      // console.log(this.$refs.tree.getCheckedKeys());
      // 获取全选中的key
      const check = this.$refs.tree.getCheckedKeys()
      // 获取半选中的key
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()

      const allKey = [...check,...halfCheckedKeys]
      // 获取到 roleId？？？
      // this.curRoleId

      const res = await this.axios.post(`roles/${this.curRoleId}/rights`,{
        rids:allKey.join(',')
      })

      // 成功后
      // 关闭对话框
      this.dialogFormVisible = false
      // 提示成功
      this.$message({
        type:'success',
        message:res.data.meta.msg

      })
      // 重新获取列表数据
      this.getRolesList();
    }
  }
}

