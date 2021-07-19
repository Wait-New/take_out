<template>
<div class="info">
  <template>
    <el-skeleton :loading="loading" animated/>
  </template>
  <template v-if="!loading">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" header="筛选内容">
      <el-form style="float: left" :model="searchInfo" inline>
        <el-form-item>
          <el-input v-model="searchInfo.name" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
      <el-form inline style="float: right">
        <el-form-item>
          <el-button type="success" @click="openWin()">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="shopList" border highlight-current-row>
        <el-table-column label="编号" prop="id" width="50"></el-table-column>
        <el-table-column label="角色名" prop="name"></el-table-column>
        <el-table-column label="授权码" prop="tips"></el-table-column>
        <el-table-column label="部门" prop="deptName"></el-table-column>
        <el-table-column label="上级角色" prop="pName"></el-table-column>
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
  <RoleEdit ref="roleEdit" @reloadTable="getInfo"></RoleEdit>
</div>
</template>

<script>
import RoleEdit from '@/components/role/RoleEdit'
export default {
  name: 'Role',
  data () {
    return {
      loading: true,
      searchInfo: {
        name: '',
        page: 1,
        limit: 5
      },
      shopList: [],
      pageInfo: {}
    }
  },
  created () {
    this.$nextTick(() => {
      this.getInfo()
    })
  },
  components: {
    RoleEdit
  },
  methods: {
    getInfo () {
      this.$http.get('role/list', this.searchInfo).then(({ data }) => {
        this.loading = false
        if (data.code === 20000) {
          this.shopList = data.data
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
      this.$refs.roleEdit.init(info)
    },
    async deleteInfo (roleId) {
      // 询问是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult === 'confirm') {
        this.$axios.delete('role', { params: { roleId } }).then(({ data }) => {
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
    }
  }
}
</script>

<style scoped lang="scss">
</style>
