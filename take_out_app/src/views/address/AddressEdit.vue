<template>
<div>
  <my-header title="编辑地址" :arrow="true" text="返回"></my-header>
  <van-address-edit :show-delete="showDelete" :area-list="areaList" @save="onSave"></van-address-edit>
</div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import { areaList } from '@vant/area-data'
const address = {
  name: '',
  address: '',
  address_detail: '',
  phone: '',
  isDefault: false
}
export default {
  components: {
    'my-header': MyHeader
  },
  data () {
    return {
      areaList,
      searchResult: [],
      address: { ...address },
      showDelete: false
    }
  },
  methods: {
    onSave (data) {
      this.address.name = data.name
      this.address.address = data.province + data.city + data.county
      this.address.address_detail = data.addressDetail
      this.address.phone = data.tel
      this.address.isDefault = false
      this.$axios.post(`/v1/users/${this.$cookies.get('user_id')}/addresses`, this.address).then(({ data }) => {
        if (data.code === 20000) {
          this.$dialog.alert({ message: '添加地址信息' }).then(() => {
            this.address = { ...address }
            this.$router.push('/address?isOrder=false')
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
