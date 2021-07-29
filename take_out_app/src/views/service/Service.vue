<template>
  <div>
    <my-header :arrow="true" title="服务中心"></my-header>
    <van-row>
      <van-col :span="12">
        <van-row>
          <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" fit="fill"  height="5rem" width="6rem"></van-image>
          <div>
            <span>服务中心</span>
          </div>
        </van-row>
      </van-col>
      <van-col :span="12">
        <van-row>
          <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" fit="fill" height="5rem" width="6rem"></van-image>
          <div>
            <span>客服中心</span>
          </div>
        </van-row>
      </van-col>
    </van-row>
    <van-cell-group>
      <van-cell>
        <h2>热门问题</h2>
      </van-cell>
      <van-cell is-link title="超级会员权益说明"></van-cell>
      <van-cell is-link title="签到规则"></van-cell>
      <van-cell is-link title="用户等级说明"></van-cell>
      <van-cell is-link title="积分问题"></van-cell>
      <van-cell is-link title="教我拍大片"></van-cell>
      <van-cell is-link title="支付问题"></van-cell>
      <van-cell is-link title="其他问题"></van-cell>
      <van-cell is-link title="准时达问题"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
export default {
  components: {
    'my-header': MyHeader
  },
  name: 'Service'
}
</script>

<style scoped lang="scss">
.van-row {
  text-align: center;
  height: 20vh;
  .van-col{
    font-size: 17px;
    border: 1px  solid rgba(0,0,0,.1);
    .van-image{
      padding: 1vh;
      margin-top: 2vh;
    }
    div {
      text-align: center;
      line-height: 2vh;
    }
  }

}
</style>
