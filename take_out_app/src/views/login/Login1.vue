<template>
  <div>
    <van-row type="flex" justify="space-between">
      <van-col span="2">
        <van-icon name="cross"/>
      </van-col>
      <van-col offset="18" span="4">
        <a href="#">帮助</a>
      </van-col>
    </van-row>
    <van-row>
      <van-col offset="2">
        <h3>欢迎登陆极速外卖</h3>
      </van-col>
    </van-row>
    <van-form @submit="onSubmit">
      <van-row>
        <van-col offset="2" span="18">
          <!-- 输入手机号，调起手机号键盘 -->
          <van-field v-model="loginInfo.tel" type="tel" label="手机号" placeholder="请输入手机号"
                     :rules="[{ required: true }]"/>
        </van-col>
      </van-row>
      <van-row>
        <van-col offset="2" span="18">
          <van-field v-model="loginInfo.password" type="password" name="密码" label="密码" placeholder="请输入密码"
                     :rules="[{ required: true}]"/>
        </van-col>
      </van-row>
      <van-row>
        <van-col offset="2" span="18">
          <van-field v-model="loginInfo.captcha" type="captcha" name="验证码" label="验证码"
                     :rules="[{ validator,message:'验证码错误'}]">
            <template slot="extra">
              <van-image :src="captchaSrc"></van-image>
            </template>
          </van-field>
        </van-col>
      </van-row>
      <van-row></van-row>
      <van-row>
        <van-col offset="2" span="18">
          <div style="margin: 16px;">
            <van-button block color="#FEF0CC" type="primary" native-type="submit">登陆</van-button>
          </div>
        </van-col>
      </van-row>
    </van-form>
    <van-row>
      <van-col offset="3" span="7">
        <a href="">验证码登陆</a>
      </van-col>
      <van-col offset="6" span="4">
        <a href="#">遇到问题</a>
      </van-col>
    </van-row>
  </div>
</template>

<script>
const loginInfo = {
  tel: '',
  password: ''
}
export default {
  name: 'Login',
  data () {
    return {
      loginInfo: { ...loginInfo },
      captchaSrc: '',
      validator: '/^d{4}$/'
    }
  },
  methods: {
    onSubmit (values) {
    }
  }
}
</script>

<style scoped lang="scss">
.van-row {
  height: 45px;
  line-height: 45px;
  font-size: 22px;
  text-align: center;
}

.van-row:nth-child(2) {
  height: 85px;
  line-height: 85px;

  h3 {
    font-size: 25px;
    font-weight: normal;
  }
}

.van-form .van-row{
  height: 60px;
  line-height: 60px;
  .van-col {
    border-bottom: 1px solid rgba(0,0,0,.2);
  }
}
.van-form .van-row:last-child {
  .van-col{
    border-bottom: none;
  }
  .van-button {
    border-radius: 1vh;
  }
}
.van-row:last-child {
  height: 65px;
  line-height: 65px;
  font-size: 12px;
  text-align: left;
}
</style>
