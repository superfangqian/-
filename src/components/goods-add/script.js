// 导入富文本编辑器样式文件：
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'


export default {
  components: {
    quillEditor
  },
  created(){
    this.getCateList()
  },
  data() {
    return {
      active: 0,
      // tab栏选中项
      tabActive: 'basic',
      // 表单数据
      goodsAddForm: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        // 上传图片文件的临时路径数组
        pics: [],
        // 商品分类选中项数组
        goods_cat_add: [],
        // 是否促销：
        is_promote: false
      },
      // 级联菜单
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
      cateList:[],
      headers:{
        Authorization:localStorage.getItem('token')
      }
    }
  },

  methods: {
    tabChange(tab) {
      // console.log('change',tab);
      this.active = tab.index - 0
    },
    next(active, tabActive) {
      this.active = active
      this.tabActive = tabActive
    },
    async getCateList(){
      const res = await this.axios.get('/categories',{
        params:{
          type:3
        }
      })
      // console.log("商品列表",res);
      this.cateList = res.data.data
    },
    // 上传图片成功时要传递的参数
    onSuccess(response, file, fileLis){
      // console.log('上传成功',response, file, fileLis);
      this.goodsAddForm.pics.push({
        pic:response.data.tmp_path
      })
    },
    // 添加商品
    async addGoods(){
      // console.log('addGoods');
      const {
        goods_name,
        goods_cat_add,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics,
        is_promote
      } = this.goodsAddForm

      const res = await this.axios.post('/goods', {
        goods_name,
        goods_cat: goods_cat_add.join(','),
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics,
        is_promote
      })
      // console.log('添加成功',res);
        // 提示成功
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        // 跳转到商品列表页面
        this.$router.push('/goods')
    }
  }
}
