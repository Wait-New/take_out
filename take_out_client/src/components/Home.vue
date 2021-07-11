<template>
  <div>
    <el-container>
      <el-aside :style="{ width: asideWidth }">
        <el-menu :collapse="isCollapse" :collapse-transition="false"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 menu-trigger="click"
                 router
                 default-active="about"
                 >
          <el-menu-item index="about">
              <i class="el-icon-s-home"></i>
              <span>首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-shop"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="user">用户管理</el-menu-item>
              <el-menu-item index="role">角色管理</el-menu-item>
              <el-menu-item index="dept">部门管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="">添加商户</el-menu-item>
              <el-menu-item index="">商户列表</el-menu-item>
              <el-menu-item index="">商品列表</el-menu-item>
              <el-menu-item index="">订单管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="height: 50px">
          <el-row>
            <el-col :span="12">
              <el-tooltip class="item" effect="dark" :content="hint" placement="top-start">
                <i :class="isShowFold" @click="fold"></i>
              </el-tooltip>
            </el-col>
            <el-col :span="12">
              <el-dropdown trigger="click">
              <el-avatar shape="square" :size="40" :src="require('@/assets/avator.gif')"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      searchInfo: {},
      isCollapse: false
    }
  },
  created () {
  },
  methods: {
    fold () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      this.$confirm('确认退出系统吗?', { type: 'info' }).then(() => {
        this.$router.replace('login')
      })
    }
  },
  computed: {
    asideWidth () {
      return this.isCollapse ? '64px' : '200px'
    },
    isShowFold () {
      return this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    hint () {
      return this.isCollapse ? '菜单显示' : '菜单隐藏'
    }
  }
}
</script>

<style scoped lang="scss">
.el-container {
  display: flex;
  flex-direction:row;
  .el-aside {
    height: 100vh;
    background-color: #545c64;
    ul {
      border: 0;
      li {}
    }
  }
  .el-container {
    .el-header {
      line-height: 50px;
      background-color: #f5f5f5;
      .el-row {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-col:last-child {
          height: 50px;
          line-height: 78px;
          text-align: right;
        }
      }
    }
    .el-main {
    }
  }
}
</style>
