<template>
  <div>
    <van-nav-bar @click-left="$router.back()" title="提交订单" left-arrow left-text="返回"></van-nav-bar>
    <van-cell-group inset title="配送地址">
      <van-cell is-link to="/address?isOrder=true" v-if="hasAddress">
        <div slot="title" class="title">
          <van-row>
            <van-col :span="8">姓名：{{ address.name }}</van-col>
            <van-col :span="16">电话：{{ address.phone }}</van-col>
          </van-row>
        </div>
        <div slot="label">
          <span>{{ address.address }}</span>
        </div>
      </van-cell>
      <van-cell v-else title="暂无地址" label="点击添加地址" is-link to="/address/edit">
      </van-cell>
    </van-cell-group>
    <van-cell-group inset title="商户信息">
      <van-cell :title="shopInfo.name" :icon="baseImgPath+shopInfo.image_path" is-link
                :to="`/shop?id=${shopInfo.id}`"></van-cell>
    </van-cell-group>
    <van-cell-group inset title="订单信息">
      <van-cell title="选购列表">
        <template #label>
          <template v-for="item in cartList">
            <van-card v-if="item.selectCount>0" :key="item.item_id" :num="item.selectCount"
                      :price="item.specfoods[item.specActive].price" :title="item.name"
                      :thumb="baseImgPath+item.image_path" class="cart-list">
              <div slot="desc">
                <span>规格：</span>
                <van-tag plain type="success">{{ item.specfoods[item.specActive].name }}</van-tag>
              </div>
              <div slot="price">
                <span>价格：</span>
                <span>￥<b>{{ item.specfoods[item.specActive].price }}</b></span>
              </div>
            </van-card>
          </template>
        </template>
      </van-cell>
      <van-submit-bar :price="orderPrice" button-text="提交订单" @submit="onSubmit"/>
      <van-action-sheet v-model="showPay" title="收银台" style="height: 380px;width:100%">
        <van-password-input :value="password" info="密码为6位数"/>
        <!-- 数字键盘 -->
        <van-number-keyboard @hide="password=''" v-model="password" :show="showPay" @blur="showPay = false"/>
      </van-action-sheet>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { uuid } from 'vue-uuid'

export default {
  name: 'OrderDetail',
  data () {
    return {
      password: '',
      showPay: false,
      show: false,
      address: {
        name: '',
        phone: '',
        address: ''
      },
      hasAddress: false,
      baseImgPath: process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=',
      orderList: []
    }
  },
  computed: {
    ...mapState(['cartInfo', 'shopInfo']),
    cartList () {
      if (this.cartInfo.userId === this.$cookies.get('user_id') && this.cartInfo.shopId === this.shopInfo.id) {
        return this.cartInfo.cartList
      }
      return []
    },
    orderPrice () {
      let price = 0
      for (const cart of this.cartList) {
        if (cart.selectCount > 0) {
          price += cart.selectCount * (cart.specfoods[cart.specActive].price + cart.specfoods[cart.specActive].packing_fee)
        }
      }
      return (price + 5) * 100
    }
  },
  created () {
    this.$nextTick(() => {
      this.getAddress(this.$route.params.index)
      this.orderList = JSON.parse(localStorage.getItem('orderList') || '[]')
    })
  },
  methods: {
    getAddress (index) {
      this.$axios.get(`v1/users/${this.$cookies.get('user_id')}/addresses`).then(({ data }) => {
        if (data.code === 20000) {
          if (data.data.length > 0) {
            if (!index) {
              index = 0
            }
            this.address = data.data.reverse()[index]
            this.hasAddress = true
          }
        }
      })
    },
    onSubmit () {
      this.showPay = true
    }
  },
  watch: {
    password (value) {
      if (value.length === 6) {
        if (value === '043480') {
          /*
          * 用户id
          * 商户id
          * 订单id(uuid库生成uuid)
          *   uuid.v1()：生成时间戳的uuid
          *   uuid.v3()：MD5加密的uuid
          *   uuid.v4()：随机生成
          *   uuid.v5()：sha-1加密的uuid
          * 下单时间
          * 商品总价
          * 配送费
          * 食物列表
          * 订单状态
          * */

          let cartPrice = 0
          const items = this.cartList.filter(item => item.selectCount > 0).map(item => {
            const food = {
              id: item.item_id,
              name: item.name,
              spec: item.specfoods[item.specActive].name,
              price: item.specfoods[item.specActive].price,
              packing_fee: item.specfoods[item.specActive].packing_fee,
              image_path: item.image_path,
              count: item.selectCount
            }
            cartPrice += (food.price + food.packing_fee) * food.count
            return food
          })
          const order = {
            id: uuid.v4(),
            userId: this.$cookies.get('user_id'),
            shopId: this.shopInfo.id,
            shopName: this.shopInfo.name,
            showImg: this.shopInfo.image_path,
            orderTime: new Date().toLocaleString(),
            cartPrice: cartPrice,
            state: 1,
            delivery_fee: 5,
            foodList: items,
            address_id: this.address.id
          }
          this.orderList.push(order)
          localStorage.setItem('orderList', JSON.stringify(this.orderList))
          this.$dialog.alert({ message: '付款成功' }).then(() => {
            this.$axios.post('/order/save', order).then(({ data }) => {
              if (data.code === 20000) {
                this.$notify('下单成功')
              } else {
                this.$notify('下单失败')
              }
            }).catch(err => {
              console.log(err)
            })
            this.$store.commit('setCartInfo', [])
            sessionStorage.removeItem('cartInfo')
            this.$router.replace('/order')
          })
        } else {
          this.$dialog.alert({ message: '密码错误' })
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  height: 30vh;
  width: 100vh;
}

.van-password-input {
}
</style>
