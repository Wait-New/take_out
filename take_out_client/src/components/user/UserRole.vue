<template>
    <el-dialog :visible.sync="visible" title="选择角色">
      <el-form :model="role">
        <el-form-item>
          <el-checkbox-group v-model="role.roleIds">
            <el-checkbox v-for="item in shopList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="waring" @click="visible=false">取消</el-button>
        <el-button type="primary" @click="setRole">确定</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
  name: 'UserRole',
  data () {
    return {
      visible: false,
      shopList: [],
      role: {
        userId: '',
        roleIds: []
      },
      roleLoading: {}
    }
  },
  methods: {
    init (shopInfo) {
      this.visible = true
      this.role.userId = shopInfo.id
      this.role.roleIds = shopInfo.roleid.split(',')
      this.roleLoading = this.$loading({ text: '加载中...' })
      this.$http.get('/role/list').then(({ data }) => {
        if (data.code === 20000) {
          this.shopList = data.data
        }
      }).finally(() => {
        this.roleLoading.close()
      })
    },
    setRole () {
      this.roleLoading = this.$loading({ text: '加载中...' })
      this.$http.get('/user/setRole', this.role).then(({ data }) => {
        if (data.code === 20000) {
          this.$message({
            message: '授权成功',
            type: 'success',
            onClose: () => {
              this.roleLoading.close()
              this.visible = false
              this.$emit('reloadTable')
            }
          })
        } else {
          this.$message.error('授权失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
