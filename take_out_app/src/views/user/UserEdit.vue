<template>
  <div>
    <my-header title="用户编辑" :arrow="true" text="返回"></my-header>
    <van-form>
      <van-cell-group>
        <van-cell style="display: flex;justify-content: center;align-items: center">
          <div slot="title">头像</div>
          <van-uploader :max-count="1" v-model="avatarUrl" :after-read="afterRead"></van-uploader>
        </van-cell>
        <van-cell title="用户名" :value="userInfo.username"/>
        <van-cell is-link title="修改密码" @click="$router.push('reset_pwd?username='+userInfo.username)"/>
        <van-cell is-link to="address" @click="$router.push('address?isOrder=false')" title="我的地址"/>
      </van-cell-group>
    </van-form>*-
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
export default {
  name: 'UserEdit',
  components: {
    'my-header': MyHeader
  },
  data () {
    return {
      userInfo: {},
      avatarUrl: []
    }
  },
  methods: {
    getAvatarUrl () {
      this.avatarUrl = [{
        url: process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName=' + this.userInfo.avatar
      }]
    },
    getUserInfo () {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}')
      this.userInfo = { ...userInfo }
    },
    afterRead (file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formDate = new FormData()
      formDate.append('file', file.file)
      this.$axios.post(`/admin/update/avatar/${this.userInfo.user_id}`, formDate).then(({ data }) => {
        if (data.code === 20000) {
          file.status = ''
          file.message = ''
          this.$notify({ message: '上传成功', type: 'success' })
        }
      })
    }
  },
  created () {
    this.$nextTick(() => {
      this.getUserInfo()
      this.getAvatarUrl()
    })
  }
}
</script>

<style lang="scss">
</style>
