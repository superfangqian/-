export default {
  created() {
    // console.log('当前页',this.$route.params.page);
    // 显示当前页
    const pagenum = this.$route.params.page
    // 根据传入的页面，获取指定页码
    this.GetGoodList(pagenum)
  },
  watch: {
    $route(to, from) {
      // 监听路由的改变，只要路由发生改变，就执行这段代码逻辑
      // 方法中通过 to 获取到当前路由中的 页码
      // 然后，根据当前页来获取数据
      const pagenum = to.params.page - 0
       // 方法根据传入的页码，来获取指定页的数据
      this.GetGoodList(pagenum)
    }
  },
  data() {
    return {
      goodForm: [],
      pagenum: 1,
      // 每页大小
      pagesize: 5,
      // 总条数
      total: 0
    }
  },
  methods: {
    async GetGoodList(pagenum = 1) {
      const res = await this.axios.get('/goods', {
        params: {
          query: '',
          pagenum,
          pagesize: this.pagesize
        }
      })
      const { goods, pagenum: curPage, total } = res.data.data
      this.goodForm = goods
      this.pagenum = curPage - 0
      this.total = total
    },
    // 改变分页
    changePage(curPage) {
      // this.GetGoodList(curPage)
      this.$router.push(`/goods/${curPage}`)

    }
  }
}
