<template>
  <div>
    <my-header :arrow="true" title="我的积分"/>
    <van-list error-text="暂无规则">
      <van-cell v-for="(item,index) in list" :key="index">
        <template #title>
          <h3>{{item.title}}</h3>
        </template>
        <template #label>
          <div v-for="(text,index) in item.textList" :key="index">
            <p style="height: 30px;line-height: 30px;font-size: 15px">
              {{text}}
            </p>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
export default {
  components: {
    'my-header': MyHeader
  },
  data () {
    return {
      list: [
        {
          title: 'Q1:怎么获得积分？',
          textList: ['在线支付的订单将获得订单积分奖励', '积分将在用户完成评价后获得。', '可获得积分=订单金额×10(即1元=10点积分)。', '订单金额指实际付款金额，不包含活动优思金额', '每位用户每天最多可以获得2000积分，体验商家的订单', '和评价不会増加积分。']
        },
        {
          title: 'Q2:积分用来做什么？',
          textList: ['可以在积分商城兑换各种礼品。']
        },
        {
          title: 'Q3:礼品兑换很多天了还没有收到，该怎么办',
          textList: ['礼品从换日起，3个工作日（周末不算）内处理发货', '发货后，通常会在3个工作日左右送达']
        },
        {
          title: 'Q4:礼品兑换中的手机充值卡兑换，怎么样进行',
          textList: ['充值，充值之前会和我电话确认嘛？']
        }
      ]
    }
  }
}

</script>

<style scoped lang="scss">
.van-list {
  height: calc(100vh - 46px) !important;
}
</style>
