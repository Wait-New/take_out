<template>
  <div class="home">
    <!--  头部开始  -->
    <van-nav-bar right-text="江苏软件园" @click-left="$router.back()">
    <template slot="left">
      <van-icon name="arrow-left" color="#000000"></van-icon>
      <h4>外卖</h4>
    </template>
    <template slot="right">
      <van-icon name="location"></van-icon>
      <h4>江苏软件园</h4>
      <van-icon name="arrow" color="#000000" size="8px"></van-icon>
      <van-icon badge="99" name="bulb-o" size="20px" color="#000000"></van-icon>
    </template>
    </van-nav-bar>
    <!--  头部结束  -->
    <!-- 搜索框开始   -->
    <van-sticky>
      <van-search shape="round" maxlength="30" placeholder="热情烧烤饭 满20减5" autofocus show-action>
        <template #action>
          <div @click="onSearch" class="search">搜索</div>
        </template>
      </van-search>
    </van-sticky>
    <!-- 搜索框结束   -->
    <!-- 提示栏开始   -->
    <van-cell>
      <ul>
        <li>地锅鸡</li>
        <li>重庆小面</li>
        <li>馄饨</li>
        <li>奶茶</li>
        <li>汉堡</li>
        <li>炒饭</li>
      </ul>
    </van-cell>
    <!-- 提示栏结束   -->
    <!-- 轮播图开始  -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#FFD100">
      <van-swipe-item>
        <van-grid :column-num="4" icon-size="20px">
          <van-grid-item v-for="item  in firstBannerList" :key="item.id" :icon="baseBannerImg+item.image_url" :text="item.title" />
        </van-grid>
      </van-swipe-item>
      <van-swipe-item>
        <van-grid :column-num="4" icon-size="20px">
          <van-grid-item v-for="item in lastBannerList" :key="item.id" :icon="baseBannerImg+item.image_url" :text="item.title" />
        </van-grid>
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播结束  -->
    <div class="shop-group">
      <van-card v-for="item in shopList" :index="item.id" :key="item.id" :desc="item.description" :title="item.name" :thumb="baseShopImg+item.image_path" :tag="item.is_premium==='true'?'招牌':''" @click="$router.push(`shop?id=${item.id}`)">
        <template #title>
          <h3 style="margin-top: 0">{{item.name}}</h3>
        </template>
        <template #desc>
          <div style="margin-bottom: 3px;overflow: hidden;white-space: nowrap;text-after-overflow: ellipsis">{{item.description}}</div>
          <div>
            <span>起送价格：{{item.float_minimum_order_amount}}</span>|
            <span>配送价格：{{item.float_delivery_fee}}</span>
          </div>
        </template>
        <template #tags>
          <van-tag v-for="(active,index) in item.activities[0].description.split(',')" :key="index" style="margin-right: 3px" type="danger" plain>
            {{active}}
          </van-tag>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      bannerList: [],
      shopList: [],
      baseBannerImg: 'http://fuss10.elemecdn.com/',
      baseShopImg: process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName='
    }
  },
  computed: {
    firstBannerList () {
      return this.bannerList.slice(0, 8)
    },
    lastBannerList () {
      return this.bannerList.slice(8, 16)
    }
  },
  methods: {
    onSearch () {
      alert('搜素成功')
    },
    getBannerList () {
      this.$axios.get('/v2/index_entry').then(({ data }) => {
        if (data.code === 20000) {
          this.bannerList = data.data
        }
      })
    },
    getShopList () {
      this.$axios.get('/shopping/restaurants', {
        params: {
          offset: 0,
          limit: 20
        }
      }).then(({ data }) => {
        if (data.code === 20000) {
          this.shopList = data.data.records
        }
      })
    }
  },
  created () {
    this.$nextTick(() => {
      this.getBannerList()
      this.getShopList()
    })
  }
}
</script>
<style scoped lang="scss">
.van-nav-bar {
  background-color: #FFD100;
}
.van-search {
  border-radius: 20px 20px 0px 0px;
}
.van-cell {
  li {
    height: 18px;
    line-height: 16px;
    text-align: center;
    border-radius: 8px;
    font-size: 12px;
    padding: 2px 4px;
    margin-right: 3px;
    background-color: rgba(0,0,0,.2);
  }
}
.van-grid {
    van-grid-item {
      border-radius: 50%;
    }
}
</style>
