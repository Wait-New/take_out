<template>
  <div>
    <van-nav-bar title="重置密码" left-arrow left-text="返回" @click-left="$router.back()">
    </van-nav-bar>
    <van-form @submit="onReset">
      <van-cell-group>
        <van-cell title="账号"></van-cell>
        <van-cell>
          <van-field label="旧密码" type="password" v-model="loginInfo.oldpassword" placeholder="请输入旧密码" :rules="[{required: true,message: '密码不能为空'}]"></van-field>
        </van-cell>
        <van-cell>
          <van-field label="新密码" type="password" v-model="loginInfo.newpassword" placeholder="请输入新密码" :rules="[{required: true,message: '密码不能为空'}]"></van-field>
          <van-field label="确认密码" type="password" v-model="loginInfo.confirmpassword" placeholder="确认信密码" :rules="[{required: true,message: '密码不能为空'}]"></van-field>
        </van-cell>
      </van-cell-group>
      <div style="margin: 5px 10px">
        <van-button type="info" block round native-type="submit">重置密码</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
const loginInfo = {
  username: '',
  oldpassword: '',
  newpassword: '',
  confirmpassword: ''
}
export default {
  name: 'ResetPwd',
  data () {
    return {
      loginInfo: { ...loginInfo }
    }
  },
  methods: {
    onReset () {
      if (this.loginInfo.newpassword === this.loginInfo.confirmpassword) {
        this.$axios.post(`/v1/users/v2/changepassword?username=${this.loginInfo.username}&oldpassword=${this.loginInfo.oldpassword}&newpassword=${this.loginInfo.newpassword}&confirmpassword=${this.loginInfo.confirmpassword}`).then(({ data }) => {
          if (data.code === 20000) {
            this.$notify({ message: '重置密码成功', type: 'success' })
            this.$axios.get('/v1/users/v2/logout').then(({ data }) => {
              if (data.code === 20000) {
                // 清空cookies
                this.$cookies.remove('user_id')
                sessionStorage.removeItem('userInfo')
                // z跳转到登录界面
                this.$router.push('login')
              }
            })
          } else {
            this.$notify('重置密码失败')
          }
        }).catch(() => {
          this.$notify('重置密码失败')
        })
      } else {
        this.$notify('两次输入密码不一致')
      }

      // 判断两次输入的密码是否相同
      // 提交信息给后台，修改密码成功
    }
  },
  created () {
    this.loginInfo.username = this.$route.query.username
  }
}
</script>

<style scoped>

</style>
