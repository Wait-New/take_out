<template>
  <div class="login-group">
    <el-form  :model="loginInfo" :rules="rules" @keydown.enter.native="login" ref="loginRef" label-width="80px" class="login-info">
      <el-avatar fit="fit"></el-avatar>
      <h2>极速外卖后台管理</h2>
      <el-form-item prop="username">
        <span class="label-span" slot="label">用户名</span>
        <el-input v-model="loginInfo.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="label-span" slot="label">密&nbsp;&nbsp;&nbsp;&nbsp;码</span>
        <el-input v-model="loginInfo.password" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" ></el-input>
      </el-form-item>
      <el-form-item>
        <span class="label-span" slot="label">选择类型</span>
        <el-radio-group v-model="loginInfo.userType">
          <el-radio :label="1">商家</el-radio>
          <el-radio :label="2">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  created () {
    this.$cookies.remove('token')
  },
  data () {
    return {
      loginInfo: {
        username: 'admin',
        password: 'admin',
        userType: 1
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginRef.validate(valid => {
        if (valid) {
          // 开启遮罩层
          this.loading = this.$loading({ text: '加载中...' })
          // 发送登录请求
          this.$http.post('/account/login', this.loginInfo).then(({ data }) => {
            if (data.code === 20000) {
              /* 获取token存入cookie */
              this.$cookies.set('token', data.data.token)
              /* 提示信息进入页面跳转 */
              this.$message({
                message: '登录成功',
                type: 'success',
                onClose: () => {
                  this.$router.replace('/')
                }
              })
            } else {
              this.$alert(data.msg, { type: 'error' })
            }
          }).catch(err => {
            console.log(err)
            this.$alert('服务器连接失败，请稍后重试...', { type: 'error' })
          }).finally(() => {
            // 关闭遮蔽层
            this.loading.close()
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

  .login-group {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    text-align: center;
    background: url("../assets/bg.jpg") no-repeat center/cover;
    .login-info {
      height: 45vh;
      width: 35vw;
      background-color: rgba(0,0,0,.2);
      box-shadow: 2px 2px 2px slategrey;
      padding: 10px;
      position: relative;
      z-index: 1;
      .el-form-item:nth-child(6) {
        display: flex;
        justify-content: center;
        .el-button {
          margin-right: 5vw;
        }
      }
      .el-avatar {
        position: absolute;
        top: -6vw;
        left: 13vw;
        height: 20vh;
        width: 11vw;
        z-index: -1;
        background: url("../assets/here.jpg") no-repeat center/cover;
      }
      h2 {
        padding-bottom: 15px;
      }
      .label-span {
        color: black;
        font-weight: 800;
      }
      .el-radio-group {
        display: flex;
        justify-content: left;
        align-items: center;
        line-height: 40px;
        height: 40px;
        font-size: 14px;
      }
    }
  }
</style>
