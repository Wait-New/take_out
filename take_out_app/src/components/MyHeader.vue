<template>
  <van-nav-bar :style="navbarClass" :left-arrow="arrow" :left-text="leftText" @click-left="$router.back()">
    <h3 slot="title">{{title}}</h3>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'MyHeader',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    navbarClass: {
      type: Object
    },
    arrow: {
      type: Boolean,
      default: false
    },
    text: {
      type: String
    }
  },
  computed: {
    leftText () {
      return this.arrow ? this.text : ''
    }
  }
}
</script>

<style scoped>
.van-nav-bar {
  background-color: #FFD100;
}
.van-hairline--bottom::after {
  border: none;
}
</style>
