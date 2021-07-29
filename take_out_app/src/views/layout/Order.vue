<template>
  <div>
    <van-nav-bar @click-left="$router.back()" title="订单详细" left-arrow left-text="返回"></van-nav-bar>
    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="order in orderList" :key="order.id" :title="order.shopName" :icon="baseImgPath+order.showImg">
        <template #default>
            <template v-for="food in order.foodList">
              <van-card :key="food.id" :num="food.count" :price="food.price" :title="food.name"
                        :thumb="baseImgPath+food.image_path" class="cart-list">
                <div slot="desc">
                  <span>规格：{{ food.id }}</span>
                  <van-tag plain type="success">{{ food.spec }}</van-tag>
                </div>
                <div slot="price">
                  <span>价格：</span>
                  <span>￥<b>{{ food.price }}</b></span>
                </div>
              </van-card>
            </template>
          <van-row>
          <van-col :span="4" :offset="16">总价：</van-col>
          <van-col :span="4">
            <span>
              <b>￥</b>
              <span>{{ order.cartPrice }}</span>
            </span>
          </van-col>
          </van-row>
        </template>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const shop = {
  id: '',
  name: '',
  image_path: ''
}
export default {
  name: 'Order',
  data () {
    return {
      shop: { ...shop },
      activeNames: ['1'],
      baseImgPath: process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=',
      orderList: []
    }
  },
  computed: {
    ...mapState(['shopInfo'])
  },
  methods: {
    getOrder () {
      this.$axios.get('/order/list/' + this.$cookies.get('user_id')).then(({ data }) => {
        if (data.code === 20000) {
          this.orderList = data.data
        }
      })
    },
    getShop (shopId) {
      if (shopId) {
        this.$axios.get(`/shopping/restaurant/${shopId}`).then(({ data }) => {
          if (data.code === 20000) {
            this.shop.id = data.data.id
            this.shop.name = data.data.name
            this.shop.image_path = data.data.image_path
          }
        })
      }
      return this.shop
    }
  },
  created () {
    this.getOrder()
  }
}
</script>

<style scoped lang="scss">
.van-card {
  background-color: rgba(0,0,0,.1);
}
.van-row {
  height: 45px;
  line-height: 45px;
  color: #333333;
  background-color: rgba(0,0,0,.1);
}
</style>
