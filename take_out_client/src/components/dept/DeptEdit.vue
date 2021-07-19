<template>
  <el-dialog :title="title" :visible.sync='visible' :before-close="handleClose">
    <el-form :model="shopInfo" label-position="right" label-width="80px">
      <el-form-item label="部门全称">
        <el-input v-model="shopInfo.fullname" placeholder="部门全称"></el-input>
      </el-form-item>
      <el-form-item label="部门简称">
        <el-input v-model="shopInfo.simplename" placeholder="部门简称"></el-input>
      </el-form-item>
      <el-form-item label="部门排序">
        <el-input v-model="shopInfo.num" placeholder="部门排序"></el-input>
      </el-form-item>
      <el-form-item label="上级部门">
        <el-cascader :options="deptList" :show-all-levels="false" :props="{label:'fullname',value:'id',emitPath:false}" v-model="shopInfo.deptid"></el-cascader>
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
  fullname: '',
  simplename: '',
  num: '',
  pid: '',
  id: ''
}
export default {
  name: 'DeptEdit',
  data () {
    return {
      title: '添加部门',
      visible: false,
      shopInfo: {},
      deptList: [],
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
          this.loading.close()
          if (info) {
            this.title = '修改部门'
            const updateInfo = {
              id: info.id,
              fullname: info.fullname,
              simplename: info.simplename,
              pid: info.pid,
              num: info.num
            }
            this.shopInfo = updateInfo
          } else {
            this.title = '添加部门'
            this.shopInfo = initInfo
          }
        }
      })
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
      this.$http.post('dept', this.shopInfo).then(({ data }) => {
        if (data.code === 20000) {
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
