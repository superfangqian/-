export default {
  created() {
    this.getCateList()
    // 获取添加分类时用到的 一级和二级分类数据
    this.getAddCateList()
  },
  data() {
    return {
      cateList: [],
      //  总页数
      total: 0,
      // 当前页
      pagenum: 0,
      //  每页数量
      pagesize: 5,
      // 加载
      loading: true,
      // 弹出对话框
      isShowCate: false,
      cateAddForm: {
        catPidArr: []
      },
      cateAddList: [],
      // options: [
      //   {
      //     // 每个选择的值，是给程序使用的
      //     value: 'ziyuan',
      //     // 通过 label 属性，来作为当前 选项的名称，是给用户看的
      //     label: '资源',
      //     // children属性指定子级分类
      //     children: [
      //       {
      //         value: 'axure',
      //         label: 'Axure Components'
      //       },
      //       {
      //         value: 'sketch',
      //         label: 'Sketch Templates'
      //       },
      //       {
      //         value: 'jiaohu',
      //         label: '组件交互文档'
      //       }
      //     ]
      //   }
      // ]
    }
  },
  methods: {
    async getCateList(curPage = 1) {
      this.loading = true
      const res = await this.axios.get('/categories', {
        params: {
          type: 3,
          pagenum: curPage,
          pagesize: 5
        }
      })
      console.log('分类列表', res);
      const { result, pagenum, total } = res.data.data
      this.cateList = result
      // 从0开始的，所以加一
      this.pagenum = pagenum + 1
      this.total = total
      this.loading = false
    },
    changePage(curPage) {
      // console.log(curPage);
      this.getCateList(curPage);
    },

    // 展示添加商品对话框
    showDialog() {
      this.isShowCate = true
    },
    // 获取添加分类时用到的 一级和二级分类数据
    async getAddCateList() {
      const res = await this.axios.get('categories', {
        params: {
          type: 2,
        }
      })
      // console.log('一级二级：',res);
      this.cateAddList = res.data.data
    },

    // 点击确定按钮，关闭对话框
    async addCate() {
      const { cat_name, catPidArr } = this.cateAddForm
      // console.log(cat_name,catPidArr);

      const res = await this.axios.post('/categories', {
        cat_pid: catPidArr[catPidArr.length - 1],
        cat_name,
        cat_level:catPidArr.length
      })
      // console.log(res);
      // 关闭对话框
      this.isShowCate = false
      this.$message({
        type:'success',
        message:res.data.meta.msg
      })
      // 刷新列表
      this.getCateList()
    }
  }
}

