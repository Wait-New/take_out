<template>
  <div>
    <van-nav-bar title="登陆" left-arrow left-text="返回" @click-left="$router.back()">
      <h3 slot="title">登陆</h3>
    </van-nav-bar>
    <van-form @submit="login()">
      <van-cell-group>
        <van-field label="用户名" v-model="loginInfo.username" placeholder="请输入用户名"  :rules="[{ required: true, message: '请填写用户名' }]"></van-field>
        <van-field label="密码" type="password" v-model="loginInfo.password" placeholder="请输入密码" :rules="[{required: true,message: '密码不能为空'}]"></van-field>
        <van-field label="验证码" v-model="loginInfo.captcha" placeholder="请输入验证码" :rules="[{validator:checkCaptcha,message:'验证码格式不正确'}]">
          <template slot="extra">
            <van-image :src="captchaSrc" @click="getCaptcha" width="60" height="20"></van-image>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 5px 10px">
        <van-button type="info" block round native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
const loginInfo = {
  username: '',
  password: '',
  captcha: '',
  captchaId: ''
}
export default {
  name: 'Login',
  data () {
    return {
      loginInfo: { ...loginInfo },
      captchaSrc: ''
    }
  },
  methods: {
    getCaptcha () {
      this.$axios.post('/v1/captchas').then(({ data }) => {
        if (data.code === 20000) {
          this.loginInfo.captchaId = data.data.captchCodeId
          this.captchaSrc = data.data.code
        }
      })
    },
    login () {
      this.$axios.post('/v1/users/v2/login', this.loginInfo).then(({ data }) => {
        if (data.user_id) {
          this.$cookies.set('user_id', data.user_id)
          this.$store.state.loginInfo = { ...data }
          this.$notify({
            message: '登录成功',
            type: 'success',
            onClose: () => {
              this.loginInfo = { ...loginInfo }
              this.$router.replace('/about')
            }
          })
        } else {
          this.$dialog.alert({ message: data.message })
          this.loginInfo = { ...loginInfo }
          this.getCaptcha()
        }
      }).catch(() => {})
    },
    checkCaptcha (val) {
      return val.length === 4
    }
  },
  created () {
    this.$nextTick(() => {
      this.getCaptcha()
    })
  }
}
</script>

<style scoped>

</style>
