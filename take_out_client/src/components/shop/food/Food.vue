<template>
  <div>
    <template>
      <el-skeleton :loading="loading" animated></el-skeleton>
    </template>
    <el-card v-if="!loading">
      <el-form style="float: left" :model="searchInfo" inline>
        <el-form-item>
          <el-input v-model="searchInfo.name" placeholder="请输入食物名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
          <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="foodList">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="食物编号">
                    <span>：{{ props.row.item_id }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="食物中文名称">
                    <span>：{{ props.row.name }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="食物拼音名称">
                    <span>：{{ props.row.pinyin_name }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="所在商店">
                    <span>：{{ props.row.shopName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="活动内容">
                    <span>：{{ props.row.activity }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="食物规格">
                  <div v-for="(item,index) in props.row.specfoods" :key="index">
                    <el-tag>规格名称：{{item.name}}</el-tag>
                    <el-tag>打包费用：{{item.packing_fee}}</el-tag>
                    <el-tag>食物价格：{{item.price}}</el-tag>
                  </div>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="食物特色">
                    <div v-for="(item,index) in props.row.attributes" :key="index" typeof="success">
                      <el-tag>{{item.icon_name}}</el-tag>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="食物图片">
                   <el-image style="width: 120px;height: 120px;" fit="fill" :src="imageSrc+props.row.image_path"></el-image>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="食品名称" prop="name"></el-table-column>
        <el-table-column label="食品描述" prop="description"></el-table-column>
        <el-table-column label="食品状态" prop="stateStr"></el-table-column>
        <el-table-column label="食品销售" prop="tips"></el-table-column>
        <el-table-column label="是否启用" prop="state">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="changeState(scope.row)" v-if="scope.row.state === '1'">启用</el-button>
            <el-button type="danger" size="mini" @click="changeState(scope.row)" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button type="success" icon="el-icon-edit" size="mini" @click="openWin(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchInfo.page"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="searchInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Food',
  data () {
    return {
      foodList: [],
      loading: false,
      searchInfo: {
        name: '',
        page: 1,
        limit: 5,
        restaurant_id: ''
      },
      pageInfo: {},
      total: 0,
      imageSrc: process.env.VUE_APP_BASE_API + '/file/getImgStream?fileName='
    }
  },
  methods: {
    changeState (food) {
      this.$confirm(`确定${food.state === '1' ? '禁用' : '启用'}该食物吗？`).then(() => {
        this.$http.post('/shopping/auditFood', { item_id: food.item_id, state: (food.state === '1' ? -1 : 1) }).then(({ data }) => {
          if (data.code === 20000) {
            this.$message.success('操作成功')
            this.getList()
          }
        })
      })
    },
    handleSizeChange (val) {
      this.searchInfo.limit = val
      this.getList()
    },
    handleCurrentChange (newPage) {
      this.searchInfo.page = newPage
      this.getList()
    },
    reset () {
      this.searchInfo.name = ''
      this.getList()
    },
    getList () {
      this.$http.get('/shopping/v2/foods', this.searchInfo).then(({ data }) => {
        if (data.code === 20000) {
          this.foodList = data.data.records
          this.pageInfo = data.data
          this.total = data.data.total
        }
      })
    },
    openWin (info) {
      if (info) {
        this.$router.push({ name: 'FoodEdit', params: info })
      } else {
        this.$router.push('food')
      }
    },
    init (idShop) {
      if (idShop) {
        this.searchInfo.restaurant_id = idShop
      } else {
        this.$message.error('没有指定店铺ID，请重新查看')
      }
      this.getList()
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
