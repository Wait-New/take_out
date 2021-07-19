<template>
<div>
  <el-card class="cart-box" header="食物分类" shadow="hover">
    <el-form>
      <el-form-item label="食品分类">
        <el-select v-model="food.category_id">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button style="margin-left: 15px" type="success" @click="categoryForm=!categoryForm">新分类</el-button>
      </el-form-item>
      <template v-if="categoryForm">
        <el-form-item label="分类名称">
          <el-input placeholder="请输入分类名称" v-model="food.category.name"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input type="textarea" placeholder="请输入分类描述" rows="3" resize="none" v-model="food.category.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveCategory">添加分类</el-button>
        </el-form-item>
      </template>
    </el-form>
  </el-card>
  <el-card class="cart-box" header="食品信息" shadow="hover">
    <el-form>
      <el-form-item label="食品名称">
        <el-input v-model="food.name" placeholder="请输入食品名称"></el-input>
      </el-form-item>
      <el-form-item label="食品描述">
        <el-input type="textarea" resize="none" rows="2" v-model="food.descript" placeholder="请输入食品描述"></el-input>
      </el-form-item>
      <el-form-item label="活动内容">
        <el-input v-model="food.activity" placeholder="请输入活动内容"></el-input>
      </el-form-item>
      <el-form-item label="食品图片">
        <el-upload class="avatar-uploader" :action="uploadPath" :limit="1" :headers="uploadHeader" :show-file-list="false" :on-success="uploadSuccess" :before-upload="beforeUpload">
          <el-image v-if="image.showImage" :src="image" style="width: 100px;height: 100px" :preview-src-list="image.preList" class="avatar"></el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="食品特色">
        <!--   multiple 多选    -->
        <el-select multiple v-model="food.attributesJson">
          <el-option v-for="(item,index) in attrList" :key="index" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="食品规格">
        <el-button type="success" @click="visible=true">添加规格</el-button>
        <el-table stripe :data="food.specsJson">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="规格名称" prop="specs"></el-table-column>
          <el-table-column label="打包费用" prop="packing_fee"></el-table-column>
          <el-table-column label="产品价格" prop="price"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="specsEdit(scope.row)">修改</el-button>
              <el-button type="danger" size="small" @click="deleteSpecs(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="saveFood">保存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :title="title" :visible="visible" @close="visible=false">
      <el-form :model="specs">
        <el-form-item label="规格名称">
          <el-input v-model="specs.specs" placeholder="请输入规格名称"></el-input>
        </el-form-item>
        <el-form-item label="打包费用">
          <el-input-number v-model="specs.packing_fee" :min="0" :max="5"></el-input-number>
        </el-form-item>
        <el-form-item label="产品价格">
          <el-input-number v-model="specs.price" :min='0'></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveSpecs">确定</el-button>
          <el-button type="waring" @click="visible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</div>
</template>

<script>
const initSpecs = {
  specs: '默认',
  packing_fee: 1,
  price: 15
}
const initFood = {
  id: '',
  idShop: '',
  category_id: '',
  category: {
    name: '',
    description: ''
  },
  name: '',
  descript: '',
  activity: '',
  image_path: '',
  attributesJson: [],
  specsJson: [{ specs: '中杯', packing_fee: 1, price: 10 },
    { specs: '大杯', packing_fee: 2, price: 15 },
    { specs: '超大杯', packing_fee: 3, price: 20 }]
}
export default {
  name: 'FoodEdit',
  data () {
    return {
      food: { ...initFood },
      categoryList: [],
      categoryForm: false,
      uploadPath: process.env.VUE_APP_BASE_API + '/file',
      image: {
        showImage: false,
        url: '',
        preList: []
      },
      uploadHeader: {
        Authorization: ''
      },
      attrList: [
        { text: '新品', value: '新' },
        { text: '招牌', value: '招' }
      ],
      visible: false,
      title: '添加规格',
      specs: { ...initSpecs }
    }
  },
  created () {
    this.init()
    this.uploadHeader.Authorization = this.$cookies.get('token')
    this.getCategoryList()
  },
  methods: {
    init () {
      this.food.idShop = this.$route.params.restaurant_id
      if (this.$route.params.item_id) {
        const showFood = this.$route.params
        this.food.name = showFood.name
        this.food.descript = showFood.description
        this.food.category_id = showFood.category_id
        this.food.image_path = showFood.image_path
        this.food.specsJson = showFood.specfoods.map(item => {
          return {
            specs: item.name,
            packing_fee: item.packing_fee,
            price: item.price
          }
        })
        this.food.id = showFood.item_id
        this.image.showImage = true
        this.image.src = process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=' + this.food.image_path
        this.image.prevList = [this.image.src]
      }
    },
    /* 获取食品分类列表 */
    getCategoryList () {
      this.$http.get('/shopping/getcategory/' + this.food.idShop).then(({ data }) => {
        console.log(data)
        if (data.code === 20000) {
          this.categoryList = data.category_list
        }
      })
    },
    /* 保存食物分类 */
    saveCategory () {
      this.$http.post('/shopping/addcategory', {
        name: this.food.category.name,
        description: this.food.category.description,
        restaurant_id: this.food.idShop
      }).then(({ data }) => {
        console.log(data)
        if (data.code === 20000) {
          this.$message({
            type: 'success',
            message: '操作成功',
            onClose: () => {
              this.$router.push('shop')
            }
          })
        } else {
          this.$message.error('操作失败')
        }
      })
    },
    /* 图片上传规则 */
    beforeUpload (file) {
      const isType = (file.type === 'image/jpeg') || (file.type === 'image/png')
      if (!isType) {
        this.$message.error('请上传正确格式图片：png/jpeg')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('请上传图片大小不能超过2M')
      }
      return isType && isLt2M
    },
    /* 上传食物图片成功 */
    uploadSuccess (data) {
      if (data.code === 20000) {
        this.food.image_path = data.data.realFileName
        this.image = {
          showImage: true,
          url: process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=' + data.data.realFileName,
          preList: [this.image.url]
        }
      }
    },
    /* 修改食品规格 */
    specsEdit (info) {
      this.visible = true
      this.specs = {
        index: info.$index,
        specs: info.specs,
        packing_fee: info.packing_fee,
        price: info.price
      }
      this.title = '修改规格'
    },
    /* 保存食物规格 */
    saveSpecs () {
      if (!isNaN(this.specs.index)) {
        this.food.specsJson[this.specs.index].specs = this.specs.specs
        this.food.specsJson[this.specs.index].packing_fee = this.specs.packing_fee
        this.food.specsJson[this.specs.index].price = this.specs.price
        this.$message.success('修改规格成功')
      } else {
        this.food.specsJson.push(this.specs)
        this.$message.success('添加规格成功')
      }
      this.visible = false
      this.title = '添加规格'
      this.specs = { ...initSpecs }
    },
    /* 删除食物规格 */
    deleteSpecs ($index) {
      if ($index) {
        this.$confirm('确认删除该数据吗?').then(() => {
          this.food.specsJson.splice($index, 1)
          this.$message.success('删除成功')
        }).catch(err => err)
      }
    },
    /* 保存食物 */
    saveFood () {
      this.food.attributesJson = JSON.stringify(this.food.attributesJson)
      this.food.specsJson = JSON.stringify(this.food.specsJson)
      this.food.idMenu = this.food.category_id
      this.food.imagePath = this.food.image_path
      this.$http.post(`/shopping/${this.food.id ? 'v2/updatefood' : 'addfood'}`, this.food).then(({ data }) => {
        if (data.code === 20000) {
          this.$message({
            message: `${this.food.id ? '修改' : '添加'}成功`,
            type: 'success',
            onClose: () => {
              this.food = { ...initFood }
              this.specs = { ...initSpecs }
              this.$router.push('shop')
            }
          })
        } else {
          this.$message({ type: 'success', message: '操作失败' })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  i {
    border: 1px dashed slategrey;
  }
  border: 1px dashed slategrey;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
