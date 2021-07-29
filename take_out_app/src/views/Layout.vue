<template>
<div>
  <van-tabbar router v-model="$store.state.defaultActive">
    <van-tabbar-item replace to="/" name="home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="order" name="order" icon="balance-list-o">订单</van-tabbar-item>
    <van-tabbar-item replace to="about" name="about" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
  <van-pull-refresh @refresh="onRefresh" v-model="isLoading" success-text="刷新成功" pulling-text="下拉刷新" loosing-text="释放刷新" loading-text="加载中...">
    <router-view style="padding-bottom: 48px"></router-view>
  </van-pull-refresh>
</div>
</template>
<script>
export default {
  name: 'Layout',
  data () {
    return {
      /* 是否处于加载状态中 */
      isLoading: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
</style>
