<template>
  <div class="about">
      <div class="header_info_tools">
        <van-sticky>
        <van-row class="header">
          <van-col span="18">
            <h3>我的</h3>
          </van-col>
          <van-col span="3">
            <van-icon name="setting-o" @click="UC"></van-icon>
          </van-col>
          <van-col span="3">
            <van-icon name="service"></van-icon>
          </van-col>
        </van-row >
        </van-sticky>
        <van-row class="info" @click="$router.push('useredit').catch(()=>{})" >
          <van-col span="4">
            <van-image round :src="avatarUrl"></van-image>
          </van-col>
          <van-col span="20">
            <van-row class="username">
              <h4>{{userInfo.username}}</h4>
            </van-row>
            <van-row class="credit">
              <a href="#">信用分{{userInfo.point}}</a>
              <a href="#">成长值</a>
            </van-row>
          </van-col>
        </van-row>
        <van-row class="tools">
          <van-col span="6">
            <van-goods-action-icon icon="cart-o" text="购物车" />
          </van-col>
          <van-col span="6">
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000"/>
          </van-col>
          <van-col span="6">
            <van-goods-action-icon icon="flower-o" text="足迹"/>
          </van-col>
          <van-col span="6">
            <van-goods-action-icon icon="paid" text="红包卡卷"/>
          </van-col>
        </van-row>
      </div>
    <div class="title">业务信息</div>
    <div>
      <van-cell-group>
        <van-cell title="我的余额"  icon="balance-pay" is-link to="balance"/>
        <van-cell title="我的订单"  icon="orders-o" is-link to="order"/>
        <van-cell title="积分商城"  icon="shop-o" is-link to="integral"/>
        <van-cell title="我的地址"  icon="location-o" is-link to="address?isOrder=false"/>
        <van-cell title="会员信息"  icon="gem-o" is-link to="member"/>
      </van-cell-group>
    </div>
    <div class="title">系统信息</div>
    <div>
      <van-cell-group>
        <van-cell title="意见反馈"  icon="comment-o" is-link />
        <van-cell title="服務中心"  icon="comment-o" is-link to="service"/>
        <van-cell title="联系我们"  icon="balance-o" is-link value="点击拨打客服电话" @click="call" />
      </van-cell-group>
    </div>
    <van-row type="flex" justify="center" class="login">
      <van-col span="22">
      <van-button v-if="!isLogin" round type="waring" size="large" block to="login" :text="btnMsg" color="#FF976A"></van-button>
      <van-button v-else round type="waring" size="large" block @click="logout" :text="btnMsg" color="#FF976A"></van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
const userInfo = {
  username: '未登录，请重新登录',
  point: 0,
  balance: 0
}
export default {
  data () {
    return {
      btnMsg: '登录/注册',
      userInfo: { ...userInfo },
      avatarUrl: '',
      isLogin: false
    }
  },
  created () {
    this.$nextTick(() => {
      this.$store.dispatch('getUserInfo')
      this.checkLogin()
    })
  },
  methods: {
    UC () {
      this.$router.push('useredit')
    },
    checkLogin () {
      if (this.$cookies.isKey('user_id')) {
        this.$axios.get('/v1/users', { params: { user_id: this.$cookies.get('user_id') } }).then(({ data }) => {
          if (data.code === 20000) {
            this.userInfo = data.data
            sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
            this.avatarUrl = process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=' + data.data.avatar
          }
        })
        this.btnMsg = '退出登录'
        this.isLogin = true
      } else {
        this.isLogin = false
        this.btnMsg = '登录/注册'
        this.userInfo = { ...userInfo }
        this.avatarUrl = 'https://img.zcool.cn/community/01a3865ab91314a8012062e3c38ff6.png@1280w_1l_2o_100sh.png'
      }
    },
    logout () {
      this.$dialog.confirm({ message: '确认退出系统吗？', title: '系统提示' }).then(() => {
        this.$axios.get('/v1/users/v2/logout').then(({ data }) => {
          if (data.code === 20000) {
            this.isLogin = false
            this.$cookies.remove('user_id')
            sessionStorage.removeItem('userInfo')
            this.checkLogin()
          }
        })
      }).catch(err => {
        console.log(err)
      })
    },
    call () {
      location.href = 'tel:18735888649'
    }
  }
}
</script>
<style scoped lang="scss">
.about {
  background-color: #FAFAFA;
}
.header_info_tools {
  background-color: #FFD100;
}
.van-row {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 16px;
  h3{
    font-size: 14px;
  }
}
.header {
  .van-icon{
    font-weight: 800;
  }
}
.van-row:nth-child(2){
  height: 72px;
  line-height: 72px;
}
.info {
  .van-col {
    height: 100%;
    .van-image{
      width: 65px;
      height: 65px;
      padding: 5px;
    }
    .credit {
      a {
        font-size: 12px;
        display:inline-block;
        background-color: rgba(0,0,0,.1);
        margin-right: 5px;
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        border-radius: 10px;
      }
    }
    .van-row {
      text-align: left;
      padding-left: 20px;
      height: 35px;
      line-height: 35px;
    }
  }
}
.tools {
  padding-bottom: 65px;
  .van-goods-action-icon{
    background-color: #FFD100;
  }
}
.title {
  padding-left: 10px;
  height: 35px;
  line-height: 35px;
}
.van-cell-group {
  padding: 5px;
  .van-cell{
  }
}
.van-card {
  padding-top: -10px;
}
.van-card__header {
  background-color: aqua;
}
.login {
  height: 10vh;
  line-height: 10vh;
  padding: 10px 0;
}
</style>
