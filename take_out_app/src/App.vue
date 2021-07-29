<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {
    saveVuex () {
      if (Object.keys(this.$store.state.cartInfo).length > 0) {
        sessionStorage.setItem('cartInfo', JSON.stringify(this.$store.state.cartInfo))
      }
      if (Object.keys(this.$store.state.shopInfo).length > 0) {
        sessionStorage.setItem('shopInfo', JSON.stringify(this.$store.state.shopInfo))
      }
    },
    getVuex () {
      const cartInfo = sessionStorage.getItem('cartInfo')
      const shopInfo = sessionStorage.getItem('shopInfo')
      if (cartInfo) {
        this.$store.commit('setCartInfo', JSON.parse(cartInfo))
      }
      if (shopInfo) {
        this.$store.commit('setShopInfo', JSON.parse(shopInfo))
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.getVuex()
    })
    window.onunload = () => {
      this.saveVuex()
    }
  }
}
</script>
<style lang="scss">
</style>
