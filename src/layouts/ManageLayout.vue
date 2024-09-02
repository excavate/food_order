<template>
  <div class="manage-layout">
    <!-- 侧边栏 -->
    <el-container>
      <el-aside class="sidebar">
        <div class="logo"><a href=""><img src="#" alt="">logo</a></div>
        <el-menu class="sidebar-menu">
          <el-menu-item index="1">
            <el-icon>
              <House />
            </el-icon>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <UserFilled />
            </el-icon>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <Dish />
            </el-icon>
            <span slot="title">菜品管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <span slot="title">商户管理</span>
          </el-menu-item>
          <!-- 添加其他菜单项 -->
        </el-menu>
      </el-aside>

      <!-- 主体内容 -->
      <el-container class="main-content">
        <!-- 导航栏 -->
        <el-header class="header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentSection }}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>

        <!-- 内容区域 -->
        <el-main class="content">
          <!-- 插槽内容 -->
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {
  UserFilled,
  Menu as IconMenu,
  Dish,
  Setting,
  House
} from '@element-plus/icons-vue'
export default {
  name: 'ManageLayout',
  props: {
    currentSection: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.manage-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #001428;
  overflow: hidden;
}

.sidebar-menu {
  --el-menu-text-color: #cfd3dc;
  --el-menu-hover-text-color: #cfd3dc;
  --el-menu-bg-color: #001428;
  --el-menu-hover-bg-color: rgb(13, 100, 186);
  --el-menu-active-color: #ffd04b;
  --el-menu-level: 0;
  border: none;
  min-height: 100%;
  width: 100% !important;
}

.sidebar-menu .el-menu-item {
  font-size: 16px;
  /* 设置菜单项的字号 */
  padding-left: 0 !important;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #131313;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.content {
  padding: 20px;
  background-color: #f5f7fa;
  flex: 1;
  overflow-y: auto;
}
</style>
