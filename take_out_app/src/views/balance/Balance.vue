<template>
  <div>
    <div class="header"></div>
    <my-header :arrow="true" title="我的余额">
    </my-header>
    <van-cell-group>
      <van-cell title="当前余额">
        <template #default>
          <van-icon name="question" color="#0092E8" size="1.2em" style="padding-right: 5px"></van-icon>
          <a href="#">余额说明</a>
        </template>
      </van-cell>
      <van-cell>
          <van-form>
            <van-field style="height: 10vh;font-size: 40px" v-model="number" type="number" placeholder="0.00元"/>
          </van-form>
      </van-cell>
      <van-cell>
        <van-button type="info" size="large" text="提现" color="#CCCCCC" style="border-radius: 8px"></van-button>
      </van-cell>
    </van-cell-group>
      <van-cell title="交易明细"></van-cell>
      <van-empty style="height:100%" description="暂无明细记录"></van-empty>
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
