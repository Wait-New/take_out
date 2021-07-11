<template>
<div class="info">
  <template>
    <el-skeleton :loading="loading" animated/>
  </template>
  <template v-if="!loading">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" header="筛选内容">
      <el-form style="float: left" :model="searchInfo" inline>
        <el-form-item>
          <el-input v-model="searchInfo.account" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchInfo.name" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getInfo">查询</el-button>
          <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-form inline style="float: right">
        <el-form-item>
          <el-button type="success" @click="openWin()">添加</el-button>
          <el-button type="info" @click="setRole">角色分配</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="userList" border highlight-current-row @current-change="selectRow">
        <el-table-column type="index" width="50" label="#"></el-table-column>
        <el-table-column label="用户名" prop="account" width="100"></el-table-column>
        <el-table-column label="姓名" prop="name" width="100"></el-table-column>
        <el-table-column label="性别" prop="sexName" width="50"></el-table-column>
        <el-table-column label="部门" prop="deptName" width="50"></el-table-column>
        <el-table-column label="角色" prop="roleName" width="100"></el-table-column>
        <el-table-column label="生日" prop="birthday" show-overflow-tooltip></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="邮箱" prop="email" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" prop="statusName" width="70"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-edit" size="mini" @click="openWin(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteInfo(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.current"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pageInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </el-card>
  </template>
  <UserEdit ref="userEdit" @reloadTable="getInfo"></UserEdit>
  <UserRole ref="userRole" @reloadTable="getInfo"></UserRole>
</div>
</template>

<script>
import UserEdit from '@/components/user/UserEdit'
import UserRole from '@/components/user/UserRole'
export default {
  name: 'User',
  data () {
    return {
      loading: true,
      searchInfo: {
        account: '',
        page: 1,
        limit: 5
      },
      userList: [],
      pageInfo: {},
      selectRowDate: {}
    }
  },
  created () {
    this.$nextTick(() => {
      this.getInfo()
    })
  },
  components: {
    UserEdit, UserRole
  },
  methods: {
    getInfo () {
      this.$http.get('http://192.168.26.105:8082/user/list', this.searchInfo).then(({ data }) => {
        this.loading = false
        if (data.code === 20000) {
          this.userList = data.data.records
          this.pageInfo = data.data
        }
      })
    },
    handleSizeChange (val) {
      this.searchInfo.limit = val
      this.getInfo()
    },
    handleCurrentChange (newPage) {
      this.searchInfo.page = newPage
      this.getInfo()
    },
    openWin (info) {
      this.$refs.userEdit.init(info)
    },
    async deleteInfo (userId) {
      // 询问是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult === 'confirm') {
        this.$axios.delete('user', { params: { userId } }).then(({ data }) => {
          if (data.code === 20000) {
            this.$message({
              message: '删除成功',
              type: 'success',
              onClose: () => {
                this.getInfo()
              }
            })
          } else {
            this.$message.error('删除失败')
          }
        })
      } else {
        this.$message.info('用户取消删除')
      }
    },
    selectRow (row) {
      this.selectRowDate = row
    },
    setRole () {
      if (this.selectRowDate.id) {
        this.$refs.userRole.init(this.selectRowDate)
      } else {
        this.$alert('请选择用户', { type: 'error' })
      }
    },
    reset () {
      this.searchInfo.account = ''
      this.searchInfo.name = ''
      this.getInfo()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
