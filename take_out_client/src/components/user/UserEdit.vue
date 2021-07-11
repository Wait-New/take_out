<template>
  <el-dialog :title="title" :visible.sync='visible' :before-close="handleClose">
    <el-form :model="userInfo" label-position="right" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.account" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userInfo.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="userInfo.name" placeholder="请输入名字"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userInfo.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="userInfo.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="userInfo.sex">
          <el-radio :label="2">女</el-radio>
          <el-radio :label="1">男</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="userInfo.birthday" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item label="部门选择">
        <el-cascader :options="deptList" :show-all-levels="false" :props="{label:'fullname',value:'id',emitPath:false}" v-model="userInfo.deptid"></el-cascader>
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
  account: '',
  name: '',
  password: '',
  birthday: '',
  sex: 1,
  email: '',
  phone: '',
  deptid: '',
  status: 1
}
export default {
  name: 'User-Edit',
  data () {
    return {
      title: '添加用户',
      visible: false,
      userInfo: {},
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
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
        }
      })
      if (info) {
        this.title = '修改用户'
        this.userInfo = info
      } else {
        this.title = '添加用户'
        this.userInfo = initInfo
      }
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
      this.$http.post('user', this.userInfo).then(({ data }) => {
        if (data.code === 20000) {
          this.$message({
            message: this.userInfo.id ? '修改成功' : '保存成功',
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
