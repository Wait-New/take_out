<template>
  <el-dialog :title="title" :visible.sync='visible' :before-close="handleClose">
    <el-form :model="shopInfo" label-position="right" label-width="80px">
      <el-form-item label="角色名">
        <el-input v-model="shopInfo.name" placeholder="请输入角色名"></el-input>
      </el-form-item>
      <el-form-item label="授权码">
        <el-input v-model="shopInfo.tips" placeholder="请输入授权码"></el-input>
      </el-form-item>
      <el-form-item label="部门选择">
        <el-cascader :options="deptList" :show-all-levels="false" :props="{label:'fullname',value:'id',emitPath:false}" v-model="shopInfo.deptid"></el-cascader>
      </el-form-item>
      <el-form-item label="上级角色">
        <el-select filterable v-model="shopInfo.pid">
          <el-option v-for="item in shopList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="waring" @click="visible=false">取 消</el-button>
      <el-button type="success" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
const initInfo = {
  name: '',
  tips: '',
  deptid: '',
  pid: '',
  id: ''
}
export default {
  name: 'RoleEdit',
  data () {
    return {
      title: '添加角色',
      visible: false,
      shopInfo: {},
      deptList: [],
      shopList: [],
      loading: {}
    }
  },
  methods: {
    init (info) {
      this.visible = true
      this.loading = this.$loading({ text: '加载中...' })
      this.$http.get('dept/list').then(({ data }) => {
        if (data.code === 20000) {
          this.deptList = this.formatterDate(data.data)
          this.$http.get('/role/list').then(({ data }) => {
            if (data.code === 20000) {
              this.loading.close()
              this.shopList = data.data
              if (info) {
                this.title = '修改角色'
                const updateInfo = {
                  id: info.id,
                  name: info.name,
                  deptid: info.deptid,
                  pid: info.pid,
                  tips: info.tips
                }
                this.shopInfo = updateInfo
              } else {
                this.title = '添加角色'
                this.shopInfo = initInfo
              }
            }
          })
        }
      })
      this.$axios.all([this.getDeptList(), this.getRoleList()]).then(this.$ajax.spread((deptRes, roleRes) => {
      }))
    },
    getDeptList () {
      return this.$axios.get('dept/list')
    },
    getRoleList () {
      return this.$axios.get('role/list')
    },
    formatterDate (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children.length === 0) {
          arr[i].children = undefined
        } else {
          this.formatterDate(arr[i].children)
        }
      }
      return arr
    },
    handleClose (done) {
      this.$confirm('确定关闭吗？').then(_ => {
        done()
      }).catch(_ => {})
    },
    save () {
      this.$http.post('/role', this.shopInfo).then((res) => {
        if (res.data && res.data.code === 20000) {
          this.$message({
            message: this.shopInfo.id ? '修改成功' : '保存成功',
            type: 'success',
            onClose: () => {
              this.visible = false
              this.$emit('reloadTable')
            }
          })
        } else {
          this.$alert('操作失败', { type: 'error' })
        }
      }).catch((err) => {
        const data = err.response.data
        this.$alert(data.message, { type: 'error' })
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
