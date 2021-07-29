<template>
  <div>
    <div class="header"></div>
    <my-header :arrow="true" title="我的积分">
    </my-header>
    <van-cell-group>
      <van-cell title="当前积分">
        <template #default>
          <van-icon name="question" color="#0092E8" size="1.2em" style="padding-right: 5px"></van-icon>
          <a href="#" @click="$router.push('integral/description')">积分说明</a>
        </template>
      </van-cell>
      <van-cell>
        <van-form>
          <van-field style="height: 10vh;font-size: 40px" v-model="number" type="number" placeholder="0分"/>
        </van-form>
      </van-cell>
      <van-cell>
        <van-button type="info" size="large" text="积分兑换商品" color="#FF6235" style="border-radius: 8px"></van-button>
      </van-cell>
    </van-cell-group>
    <van-cell title="最近30天无积分记录"></van-cell>
    <van-empty>
      <template #description>
        <span style="font-size: 20px">最近30天无积分记录</span>
        <p style="text-align: center">快去下单赚取积分吧</p>
      </template>
    </van-empty>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
export default {
  components: {
    'my-header': MyHeader
  },
  name: 'Balance',
  data () {
    return {
      number: ''
    }
  }
}
</script>

<style scoped lang="scss">
.van-cell {
  background-color:#FFF
}
</style>
