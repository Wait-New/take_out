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
      <el-form inline>
        <el-form-item>
          <el-button type="success" @click="openWin()">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="shopList" border highlight-current-row >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="部门编号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="部门名称">
                <span>{{ props.row.fullname }}</span>
              </el-form-item>
              <el-form-item label="排序值">
                <span>{{ props.row.num }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="编号" prop="id" width="50"></el-table-column>
        <el-table-column label="部门名" prop="fullname"></el-table-column>
        <el-table-column label="排序值" prop="num"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-edit" size="mini" @click="openWin(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteInfo(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </template>
  <DeptEdit ref="deptEdit" @reloadTable="getInfo"></DeptEdit>
</div>
</template>

<script>
import DeptEdit from '@/components/dept/DeptEdit'
export default {
  name: 'Dept',
  data () {
    return {
      loading: true,
      shopList: []
    }
  },
  created () {
    this.$nextTick(() => {
      this.getInfo()
    })
  },
  components: {
    DeptEdit
  },
  methods: {
    getInfo () {
      this.$http.get('dept/list').then(({ data }) => {
        this.loading = false
        if (data.code === 20000) {
          this.shopList = data.data
        }
      })
    },
    openWin (info) {
      this.$refs.deptEdit.init(info)
    },
    async deleteInfo (id) {
      // 询问是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult === 'confirm') {
        this.$axios.delete('dept', { params: { id } }).then(({ data }) => {
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
