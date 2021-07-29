<template>
  <div>
    <van-nav-bar @click-left="$router.back()">
      <template #left>
        <van-icon name="arrow-left" color="#FFF" size="18px"></van-icon>
      </template>
    </van-nav-bar>
    <van-row style=" background-color: #FFD100;display: flex;align-items: center;justify-content: center">
      <van-col :span="8">
        <van-image :src="baseImgPath+shop.image_path" height="70px" width="70px" round></van-image>
      </van-col>
      <van-col :span="16">
        <div><span>口号：</span>{{ shop.promotion_info }}</div>
        <div>
          <span>承诺：</span>
          <van-tag plain type="success" v-for="item in shop.supports" :key="item.id">{{ item.name }}</van-tag>
        </div>
        <div>
          <span>店铺类型：{{ shop.category.split('/')[0] }}</span>
        </div>
      </van-col>
    </van-row>
    <van-row class="shop-info">
      <van-col :span="18">
        <van-notice-bar left-icon="volume-o" :scrollable="false" background="#FFD101">
          <van-swipe :autoplay="3000" :show-indicators="false" :vertical="true" style="height: 40px;line-height: 40px">
            <van-swipe-item v-for="item in shop.activities" :key="item.id">
              <van-row>
                <van-col :span="24">{{ item.description }}</van-col>
              </van-row>
            </van-swipe-item>
          </van-swipe>
        </van-notice-bar>
      </van-col>
      <van-col :span="6">
        <div style="font-size: 14px;color:#ed6a0c;">共{{ shop.activities.length }}个活动</div>
      </van-col>
    </van-row>
    <!-- tab切换 -->
    <van-tabs v-model="active" animated sticky>
      <van-tab>
        <template #title>
          <span>点餐</span>
        </template>
        <van-tree-select height="500" :items="categoryList" :main-active-index.sync="treeActive">
          <template #content>
            <!-- index 取值返回是 [1,.length] -->
            <template v-for="index in categoryList.length">
              <!--template 的for循环会得到和分类个数一直的div，但是每次只需要显示一次 treeActive：表示左边选中导航下标与右边显示div下标一直才显示，否则隐藏-->
              <div :key="index" v-if="treeActive===(index-1)">
                <!--展示当前分类有哪些食物，但是后台接口返回食物列表是整个店铺的所有食物组成的数组-->
                <div>
                  <!--  遍历整个食物数组 -->
                  <template v-for="(food,fi) in cartList">
                    <!--当前食物所在div的下标就是分类的下标     -->
                    <!--食物分类ID和当前div所属分类ID相等时，显示该食物-->
                    <van-card :key="fi" v-if="categoryList[index-1].id == food.category_id" num="2"
                              :price="food.price" :desc="food.description" :title="food.name"
                              :thumb="baseImgPath+food.image_path">
                      <template slot="price-top">
                        <div>
                          <span>规格：</span>
                          <!--规格：每个食物的规格个数不同，因此也需要单独的for循环遍历处理-->
                          <!--默认情况下：food.specActive的值一定是0，表示选中的食物规格是那个，单机事件需要改变的也是该属性-->
                          <!-- @click=changeSpec(fi,specIndex) fi表示 当前被点击规格所属的食物下标-->
                          <van-tag style="margin-right: 3px" plain v-for="(spec,specIndex) in food.specfoods"
                                   :key="specIndex"
                                   :type="specIndex===food.specActive?'success':'warning'"
                                   @click="changeSpec(fi,specIndex)">
                            {{ spec.name }}
                          </van-tag>
                        </div>
                      </template>
                      <template slot="price">
                        <div>
                          <span>价格：</span>￥
                          <span>{{ food.specfoods[food.specActive].price }}</span>
                        </div>
                      </template>
                      <template #num>
                        <div>
                          <van-stepper v-model="food.selectCount" theme="round"
                                       style="margin-top: 10px;margin-right: 5px" input-width="15" min="0"
                                       :show-minus="food.showMinus" :show-input="food.showInput" button-size="16"
                                       disable-input @change="changeNum" :name="fi"/>
                        </div>
                      </template>
                      <template slot="bottom">
                        <div>
                          <div>
                            <span>配送费：</span>￥
                            <span>{{ food.specfoods[food.specActive].packing_fee }}</span>
                          </div>
                        </div>
                      </template>
                    </van-card>
                  </template>
                </div>
              </div>
            </template>
          </template>
        </van-tree-select>
      </van-tab>
      <van-tab>
        <template #title>
          <span>评价</span>
        </template>
        内容2
      </van-tab>
      <van-tab>
        <template #title>
          <span>商家</span>
        </template>
        内容3
      </van-tab>
    </van-tabs>
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" :badge="cartCount" text="购物车" @click="showCart=cartCount>0"></van-goods-action-icon>
      <div>
        <div>总价￥{{ cartSumPrice }}</div>
        <div>配送费￥5</div>
      </div>
      <van-goods-action-button type="danger" :disabled="cartCount===null" @click="$router.push('order/detail')" text="立即下单"></van-goods-action-button>
    </van-goods-action>
    <van-action-sheet title="购物车详细" v-model="showCart">
      <div style="padding-bottom: 50px">
        <template v-for="(item,index) in cartList">
        <van-card v-if="item.selectCount>0" :key="index" :thumb="baseImgPath+item.image_path">
          <div slot="title">
            <b>{{ item.name }}</b>
          </div>
          <div slot="desc">
            规格：
            <van-tag plain type="success">{{ item.specfoods[item.specActive].name }}</van-tag>
          </div>
          <div slot="price">价格：{{ item.specfoods[item.specActive].price }}</div>
          <div slot="bottom">包装：{{ item.specfoods[item.specActive].packing_fee }}</div>
          <div slot="num">
            <van-stepper v-model="item.selectCount" @change="changeCartNum" theme="round" disable-input button-size="15"
                         min="0" :name="index" input-width="15"></van-stepper>
          </div>
        </van-card>
        </template>
      </div>
      <van-submit-bar  @submit="$router.push('order/detail')" button-text="下单" :price="orderSumPrice"></van-submit-bar>
    </van-action-sheet>
  </div>
</template>

<script>
const shop = {
  id: '',
  name: '逆时光',
  image_path: '',
  promotion_info: '',
  supports: [],
  category: '',
  activities: []
}
export default {
  name: 'ShopDetail',
  data () {
    return {
      shop: { ...shop },
      baseImgPath: process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=',
      active: 0,
      categoryList: [],
      foodList: [],
      treeActive: 0,
      showCart: false,
      cartCount: 0,
      cartSumPrice: 0
    }
  },
  computed: {
    orderSumPrice () {
      return (this.cartSumPrice + 5) * 100
    },
    cartList () {
      const cartInfo = this.$store.state.cartInfo
      if (cartInfo.userId === this.$cookies.get('user_id') && cartInfo.shopId === this.getShopId()) {
        return cartInfo.cartList
      }
      return this.foodList
    }
  },
  created () {
    this.getShop(this.getShopId())
    this.getCategoryList()
    this.getFoodList()
    this.getCartTotal()
  },
  methods: {
    /* 两种触发条件：点击页面上的按钮会触发change、其他方法导致count或selectCount发送变化会触发change ，v-model绑定的那个属性change就一定会触发 */
    changeNum (num, detail) {
      this.cartList[detail.name].showInput = num > 0
      this.cartList[detail.name].showMinus = num > 0
      this.getCartTotal()
    },
    changeCartNum () {
      this.getCartTotal()
      if (this.cartCount === null) {
        this.showCart = false
      }
    },
    changeSpec (foodIndex, specIndex) {
      this.cartList[foodIndex].specActive = specIndex
    },
    getCategoryList () {
      this.$axios.get('/shopping/v2/menu', { params: { restaurant_id: this.getShopId() } }).then(({ data }) => {
        if (data.code === 20000) {
          this.categoryList = data.data.map(item => {
            return {
              id: item.id,
              text: item.name
            }
          })
        }
      })
    },
    getShop (shopId) {
      this.$axios.get(`/shopping/restaurant/${shopId}`).then(({ data }) => {
        if (data.code === 20000) {
          this.shop.id = data.data.id
          this.shop.name = data.data.name
          this.shop.image_path = data.data.image_path
          this.shop.promotion_info = data.data.promotion_info
          this.shop.category = data.data.category
          this.shop.activities = [{
            description: '满50减20 满100减40,会员打8折',
            name: '满减优惠',
            id: 1
          }, {
            description: '新人立减14元（本优惠与新人首单红包不可同享）',
            name: '优惠大酬宾',
            id: 2
          }]
          this.$store.commit('setShopInfo', this.shop)
        }
      })
    },
    getShopId () {
      return this.$route.query.id
    },
    getFoodList () {
      this.$axios.get(`/shopping/v2/foodList/${this.getShopId()}`).then(({ data }) => {
        if (data.code === 20000) {
          this.foodList = data.data.map(item => {
            return {
              ...item,
              specActive: 0,
              selectCount: 0,
              showMinus: false,
              showInput: false
            }
          })
          for (const food of this.foodList) {
            for (const cart of this.cartList) {
              if (food.item_id === cart.item_id) {
                if (cart.selectCount > 0) {
                  food.selectCount = cart.selectCount
                  food.specActive = cart.specActive
                  food.showMinus = cart.showMinus
                  food.showInput = cart.showInput
                }
              }
            }
          }
          // const cartInfo = {
          //   [this.$cookies.get('user_id')]: {
          //     [this.getShopId()]: {
          //       cartList: this.foodList
          //     }
          //   }
          // }
          this.$store.commit('setCartInfo', { userId: this.$cookies.get('user_id'), shopId: this.getShopId(), cartList: this.foodList })
        }
      })
    },
    getCartTotal () {
      /* 每次叠加购物车总数量时都要先清空之前的和 */
      this.cartCount = null
      // 购物车总价
      this.cartSumPrice = 0
      // 循环叠加商品购物车
      for (const food of this.cartList) {
        if (food.selectCount > 0) {
          this.cartCount += food.selectCount
          this.cartSumPrice += (food.specfoods[food.specActive].price + food.specfoods[food.specActive].packing_fee) * food.selectCount
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.shop-info {
  background-color: #FFD101;
  display: flex;
  justify-content: center;
  align-items: center;
}

.van-tree-select {
  height: calc(100vh - 260px) !important;
}

.van-nav-bar {
  background: linear-gradient(to right top, #848887, #6F7372, #6D726F, #848887);
}

.van-nav-bar__right {
  .van-icon {
    margin-right: 5px;
    font-size: 19px;
  }
}

.van-tree-select__content {
  flex: 4;
}

.van-action-sheet__content {
  padding-bottom: 10px;
}
</style>
