<template>
  <div>
    <my-header :arrow="true" title="会员中心"></my-header>
    <van-row class="username">
      <span>为账户<b>&nbsp;&nbsp;{{userInfo.username}}&nbsp;&nbsp;</b>购买会员</span>
    </van-row>
    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <template #title>
          <h3>会员特权</h3>
        </template>
        <template #value>
          会员说明
        </template>
        <template #default>
          <van-row class="explain">
              <van-col :offset="4" :span="20" class="info">
                <van-row>
                  <h3>减免配送费</h3>
                </van-row>
                <van-row style="font-size: 12px">
                  <span>每月减免30单，每日可减免3单，每单最高减4元</span>
                </van-row>
                <van-row>
                  <span>蜂鸟专送专享</span>
                </van-row>
              </van-col>
            </van-row>
          <van-row class="explain">
            <van-col :offset="4" :span="20"  class="info">
              <van-row>
                <h3>减免配送费</h3>
              </van-row>
              <van-row style="font-size: 12px">
                <span>每月减免30单，每日可减免3单，每单最高减4元</span>
              </van-row>
              <van-row>
                <span>蜂鸟专送专享</span>
              </van-row>
            </van-col>
          </van-row>
        </template>
      </van-collapse-item>
    </van-collapse>
    <van-cell-group>
      <template #title >
        <span style="color: #000000">开通会员</span>
      </template>
      <van-cell>
       <template #default>
         <span style="font-size: 14px">1个月<b style="color: #ed6a0c">￥20</b></span>
         <span style="float: right">
           <van-button color="#ed6a0c" plain size="mini" type="info">购买</van-button>
         </span>
       </template>
      </van-cell>
    </van-cell-group>
    <van-cell value="使用卡号卡密" is-link>
      <template #title>
        <span>兑换会员</span>
      </template>
    </van-cell>
    <van-cell value="开发票" is-link>
      <template #title>
        <span>购买记录</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import { mapState } from 'vuex'
export default {
  components: {
    'my-header': MyHeader
  },
  name: 'Member',
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {
      activeNames: ['1']
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
.username {
  height: 8vh;
  line-height: 8vh;
  padding-left: 15px;
  background-color: rgba(0,0,0,.1);
}
.explain {
  height: 15vh;
  line-height: 15vh;
  background-color: #fff;
}

.info {
  .van-row:nth-child(1) {
    height: 9vh;
    line-height: 9vh;
  }
  .van-row:nth-child(2),.van-row:nth-child(3){
    height: 3vh;
    line-height: 3vh;
  }
}
.van-collapse {
  margin-bottom: 15px;
}
</style>
