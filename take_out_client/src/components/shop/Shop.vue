<template>
<div class="info">
  <template>
    <el-skeleton :loading="loading" animated/>
  </template>
  <template v-if="!loading">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商家管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" header="筛选内容">
      <el-form style="float: left" :model="searchInfo" inline>
        <el-form-item>
          <el-input v-model="searchInfo.name" placeholder="请输入商店名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getInfo">查询</el-button>
          <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="shopList" border highlight-current-row >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="商电编号">
                    <span>：{{ props.row.id }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="商店名称">
                    <span>：{{ props.row.name }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="商店地址">
                    <span>：{{ props.row.address }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="宣传标语">
                    <span>：{{ props.row.promotion_info }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="商店分类">
                    <span>：{{ props.row.category }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="营业时间">
                    <span>：AM:{{ props.row.opening_hours[0].split('/')[0] }}</span>
                    <span>-</span>
                    <span>PM:{{ props.row.opening_hours[0].split('/')[1] }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="商店图标">
                      <el-image style="height: 100px;width: 100px" fit="fill" :src="process.env.VUE_APP_BASE_API+'/file/getImgStream?fileName='+props.row.image_path"></el-image>
                    </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="编号" prop="id" width="60"></el-table-column>
        <el-table-column label="商店名称" prop="name" width="100"></el-table-column>
        <el-table-column label="商店简称" prop="description"></el-table-column>
        <el-table-column label="商店地址" prop="address"></el-table-column>
        <el-table-column label="商店联系" prop="phone" width="120"></el-table-column>
        <el-table-column label="商店口号" prop="promotion_info" width="100"></el-table-column>
        <el-table-column label="商店分类" prop="category"></el-table-column>
        <el-table-column label="商店食物">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-edit" size="small" @click="addFood(scope.row.id)">添加食物</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="showFoodInfo(scope.row.id)">查看食物</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-edit" size="small" @click="openWin(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteInfo(scope.row.id)">删除</el-button>
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
    <el-dialog title="食物列表" :visible.sync="foodVisible">
      <Food ref="foodInfo"></Food>
    </el-dialog>
  </template>
</div>
</template>
<script>
import Food from '@/components/shop/food/Food'
export default {
  name: 'Shop',
  data () {
    return {
      loading: true,
      shopList: [],
      searchInfo: {
        name: '',
        page: 1,
        limit: 5
      },
      pageInfo: {},
      foodVisible: false
    }
  },
  components: {
    Food
  },
  created () {
    this.$nextTick(() => {
      this.getInfo()
    })
  },
  methods: {
    handleSizeChange (val) {
      this.searchInfo.limit = val
      this.getInfo()
    },
    handleCurrentChange (newPage) {
      this.searchInfo.page = newPage
      this.getInfo()
    },
    getInfo () {
      this.$http.get('/shopping/listShop', this.searchInfo).then(({ data }) => {
        this.loading = false
        if (data.code === 20000) {
          this.shopList = data.data.records
          this.pageInfo = data.data
        }
      })
    },
    openWin (info) {
      if (info) {
        this.$router.push('shopEdit?id=' + info.id) // 跳转页面
      } else {
        alert('编辑失败')
      }
    },
    addFood (isShop) {
      this.$router.push({ name: 'FoodEdit', params: { restaurant_id: isShop } })
    },
    showFoodInfo (isShop) {
      this.foodVisible = true
      this.$nextTick(() => {
        this.$refs.foodInfo.init(isShop)
      })
    },
    reset () {
      this.searchInfo.name = ''
      this.getInfo()
    },
    async deleteInfo (id) {
      // 询问是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult === 'confirm') {
        this.$axios.delete('shopping/restaurants/' + id).then(({ data }) => {
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
