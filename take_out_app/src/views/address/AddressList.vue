<template>
<div>
  <my-header title="地址列表" :arrow="true" text="返回"></my-header>
  <van-address-list :list="addressList" v-model="defaultChoose" @add="$router.push('address/edit')" @edit="delAddress" @select="selectAddress" >
    <h3 v-if="addressList.length===0">暂无地址</h3>
  </van-address-list>
</div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
const addressList = [
  {
    isDefault: true
  }
]
export default {
  name: 'AddressList',
  created () {
    this.$nextTick(() => {
      this.getAddressList()
    })
  },
  components: {
    'my-header': MyHeader
  },
  data () {
    return {
      addressList: [...addressList],
      defaultChoose: 1
    }
  },
  methods: {
    delAddress (item) {
      this.$dialog.confirm({ message: '确认删除该地址吗?' }).then(() => {
        this.$axios.post(`/v1/users/${this.$cookies.get('user_id')}/addresses/${item.id}`).then(({ data }) => {
          if (data.code === 20000) {
            this.$notify({
              message: data.data,
              type: 'success',
              onClose: () => {
                this.getAddressList()
              }
            })
          }
        })
      })
    },
    getAddressList () {
      this.$axios.get(`/v1/users/${this.$cookies.get('user_id')}/addresses`).then(({ data }) => {
        if (data.code === 20000) {
          this.addressList = data.data.map(item => {
            if (item.is_user_default) {
              this.defaultChoose = item.id
            }
            return {
              id: item.id,
              name: item.name,
              tel: item.phone,
              address: item.address + '' + item.address_detail,
              isDefault: item.is_user_default
            }
          }).reverse()
        }
      })
    },
    selectAddress (item, index) {
      this.defaultChoose = index
      if ((this.$route.query.isOrder === 'true')) {
        this.$router.replace({ name: 'OrderDetail', params: { index } })
      }
    }
  }
}
</script>

<style scoped>

</style>
