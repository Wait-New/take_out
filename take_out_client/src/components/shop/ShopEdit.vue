<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-form label-width="100px" label-position="right" :model="shopInfo">
          <el-form-item label="商户名">
            <el-input v-model="shopInfo.name" placeholder="请输入商户名"></el-input>
          </el-form-item>
          <el-form-item label="商店地址">
            <el-autocomplete v-model="shopInfo.address" placeholder="请输入地址关键字" :trigger-on-focus="false" style="width: 100%" :fetch-suggestions="querySearch"></el-autocomplete>
            <span>当前城市：{{city.name}}</span>
          </el-form-item>
          <el-form-item label="商店描述">
            <el-input v-model="shopInfo.description" type="textarea" :rows="5" maxlength="50" placeholder="请输入商店描述" resize="none" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="宣传标语" v-if="notUpdate">
            <el-input v-model="shopInfo.promotion_info" type="textarea" :rows="3" maxlength="20" placeholder="请输入商店描述" resize="none" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="shopInfo.phone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="营业时间" v-if="notUpdate">
            <el-time-select placeholder="请选择开始营业时间" v-model="shopInfo.startTime" :picker-options="{
              start:'05:00',
              end:'23:00'
            }"></el-time-select>
            <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
            <el-time-select placeholder="请选择结束营业时间" v-model="shopInfo.endTime" :picker-options="{
              start:'05:00',
              end:'23:00',
              minTime:shopInfo.shopInfo
            }"></el-time-select>
          </el-form-item>
          <el-form-item label="平台税(%)">
            <el-input placeholder="请输入平台抽取税率" v-model="shopInfo.platform_rate" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="配送费" v-if="notUpdate">
            <el-input-number :max="50" :min="2" v-model="shopInfo.float_delivery_fee"></el-input-number>
          </el-form-item>
          <el-form-item label="起送价格" v-if="notUpdate">
            <el-input-number :max="200" :min="15" :step="5" v-model="shopInfo.float_minimum_order_amount"></el-input-number>
          </el-form-item>
          <el-form-item label="商户分类">
            <el-cascader
              v-model="shopInfo.categorySelect"
              :options="categoryList"
              :props="props"
              @change="formatterCategory">
            </el-cascader>
          </el-form-item>
          <el-form-item label="商户特色">
            <el-switch class="switch-style" v-model="shopInfo.is_premium" active-text="品牌保证"></el-switch>
            <el-switch class="switch-style" v-model="shopInfo.deliveryMode" active-text="蜂鸟专送"></el-switch>
            <el-switch class="switch-style" v-model="shopInfo.news" active-text="新店优惠"></el-switch><br>
            <el-switch class="switch-style" v-model="shopInfo.bao" active-text="超时赔付"></el-switch>
            <el-switch class="switch-style" v-model="shopInfo.zhun" active-text="准时到达"></el-switch>
            <el-switch class="switch-style" v-model="shopInfo.piao" active-text="开发票"></el-switch>
          </el-form-item>
          <el-form-item label="店铺头像">
            <el-upload class="avatar-uploader" :action="uploadPath" :limit="1" :headers="uploadHeader" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeUpload">
              <el-image v-if="image.showImage" :src="image.imageUrl" style="width: 100px;height: 100px" :preview-src-list="image.imagePrevList" class="avatar"></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="营业执照" v-if="notUpdate">
            <el-upload class="avatar-uploader" :action="uploadPath" :limit="1" :headers="uploadHeader" :show-file-list="false" :on-success="businessPathSuccess" :before-upload="beforeUpload">
              <el-image v-if="businessInfo.showBusiness" :src="businessInfo.businessUrl" style="width: 100px;height: 100px" :preview-src-list="businessInfo.businessPrevList" class="avatar"></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="从业资格证" v-if="notUpdate">
            <el-upload class="avatar-uploader" :action="uploadPath" :limit="1" :headers="uploadHeader" :show-file-list="false" :on-success="cateringPathSuccess" :before-upload="beforeUpload">
              <el-image v-if="cateringInfo.showCatering" :src="cateringInfo.cateringUrl" style="width: 100px;height: 100px" :preview-src-list="cateringInfo.cateringPrevList" class="avatar"></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="waring" @click="resetForm">重置</el-button>
            <el-button type="success" @click="submitForm">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const initInfo = {
  name: '',
  address: '',
  description: '',
  promotion_info: '勇敢牛牛，不怕困难',
  phone: '',
  startTime: '6:00',
  endTime: '18:30',
  platform_rate: 5,
  float_delivery_fee: 2,
  float_minimum_order_amount: 15,
  categorySelect: [],
  category: '',
  is_premium: true,
  deliveryMode: true,
  news: true,
  bao: true,
  zhun: true,
  piao: true,
  image_path: '',
  business_license_image: '',
  catering_service_license_image: ''
}
export default {
  name: 'ShopEdit',
  data () {
    return {
      shopInfo: initInfo,
      city: {},
      categoryList: [],
      props: {
        expandTrigger: 'hover',
        children: 'sub_categories',
        value: 'name',
        label: 'name'
      },
      image: {
        imageUrl: '',
        imagePrevList: [],
        showImage: false
      },
      businessInfo: {
        businessUrl: '',
        businessPrevList: [],
        showBusiness: false
      },
      cateringInfo: {
        cateringUrl: '',
        cateringPrevList: [],
        showCatering: false
      },
      uploadPath: process.env.VUE_APP_BASE_API + '/file',
      uploadHeader: {
        Authorization: ''
      },
      loading: {},
      notUpdate: true
    }
  },
  created () {
    this.$nextTick(() => {
      this.init()
      this.getCity()
      this.getCategory()
      this.uploadHeader.Authorization = this.$cookies.get('token')
    })
  },
  methods: {
    resetForm () {
      this.shopInfo = { ...initInfo }
    },
    submitForm () {
      this.loading = this.$loading({ text: 'Wait...' })
      this.shopInfo.activitiesJson = JSON.stringify([{ icon_name: '减', name: '满减优惠', description: '满30减5，满60减8' }])
      this.$http.post('/shopping/' + (this.$route.query.id ? 'updateshop' : 'addShop'), this.shopInfo).then(({ data }) => {
        this.loading.close()
        if (data.code === 20000) {
          this.$alert('保存成功').then(() => {
            this.resetForm()
            this.$router.push('shop')
          })
        } else {
          this.$alert('保存失败')
        }
      })
    },
    getCity () {
      this.$http.get('/v1/cities', { type: 'guess' }).then(({ data }) => {
        if (data.code === 20000) {
          this.city = data.data
        }
      })
    },
    querySearch (query, back) {
      this.$http.get('/v1/pois', { city_id: this.city.id, keyword: query }).then(({ data }) => {
        if (data.code === 20000) {
          const valueList = data.data.map(item => {
            return {
              value: item.address
            }
          })
          const valueList2 = []
          for (const item of data.data) {
            const valueObj = {
              value: item.address
            }
            valueList2.push(valueObj)
          }
          back(valueList)
        }
      })
    },
    getCategory () {
      this.$http.get('/shopping/v2/restaurant/category').then(({ data }) => {
        if (data.code === 20000) {
          this.categoryList = data.data
        }
      })
    },
    formatterCategory (val) {
      this.shopInfo.category = val.join('/')
    },
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
    handleAvatarSuccess (data) {
      if (data.code === 20000) {
        this.image.showImage = true
        this.image.imageUrl = process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=' + data.data.realFileName
        this.image.imagePrevList = [this.image.imageUrl]
        this.shopInfo.image_path = data.data.realFileName
      }
    },
    businessPathSuccess (data) {
      if (data.code === 20000) {
        this.businessInfo.showBusiness = true
        this.businessInfo.businessUrl = process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=' + data.data.realFileName
        this.businessInfo.businessPrevList = [this.businessInfo.businessUrl]
        this.shopInfo.business_license_image = data.data.realFileName
      }
    },
    cateringPathSuccess (data) {
      if (data.code === 20000) {
        this.cateringInfo.showCatering = true
        this.cateringInfo.cateringUrl = process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=' + data.data.realFileName
        this.cateringInfo.cateringPrevList = [this.cateringInfo.cateringUrl]
        this.shopInfo.catering_service_license_image = data.data.realFileName
      }
    },
    init () {
      if (this.$route.query.id) {
        this.notUpdate = false
        this.$http.get('/shopping/restaurant/' + this.$route.query.id).then(({ data }) => {
          if (data.code === 20000) {
            const shop = data.data
            this.shopInfo = {
              id: shop.id,
              name: shop.name,
              address: shop.address,
              description: shop.description,
              phone: shop.phone,
              startTime: shop.opening_hours[0].split('/')[0],
              endTime: shop.opening_hours[0].split('/')[1],
              platform_rate: shop.platform_rate,
              float_delivery_fee: shop.float_delivery_fee,
              float_minimum_order_amount: shop.float_minimum_order_amount,
              categorySelect: shop.category.split('/'),
              category: shop.category,
              is_premium: shop.is_premium,
              deliveryMode: shop.delivery_mode !== undefined,
              zhun: shop.supports.filter(item => item.icon_name === '准').length === 1,
              bao: shop.supports.filter(item => item.icon_name === '保').length === 1,
              piao: shop.supports.filter(item => item.icon_name === '票').length === 1,
              image_path: shop.image_path,
              business_license_image: shop.license.business_license_image,
              catering_service_license_image: shop.license.catering_service_license_image
            }
            this.image = {
              imageUrl: process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=' + this.shopInfo.image_path,
              imagePrevList: [this.image.imageUrl],
              showImage: true
            }
            this.businessInfo = {
              showBusiness: true,
              businessUrl: process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=' + this.shopInfo.business_license_image,
              businessPrevList: [this.businessInfo.businessUrl]
            }
            this.cateringInfo = {
              showCatering: true,
              cateringUrl: process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=' + this.shopInfo.catering_service_license_image,
              cateringPrevList: [this.cateringInfo.cateringUrl]
            }
          }
        })
      }
    }

  }
}
</script>

<style scoped lang="scss">
.switch-style{
  margin-right: 50px;
}
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
