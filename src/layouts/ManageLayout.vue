<template>
  <div class="manage-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <el-menu>
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-s-tools"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-s-goods"></i>
          <span slot="title">菜品管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-shop"></i>
          <span slot="title">商户管理</span>
        </el-menu-item>
        <!-- 添加其他菜单项 -->
      </el-menu>
    </aside>

    <!-- 主体内容 -->
    <div class="main-content">
      <!-- 导航栏 -->
      <header class="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ currentSection }}</el-breadcrumb-item>
        </el-breadcrumb>
      </header>

      <!-- 内容区域 -->
      <section class="content">
        <!-- 插槽内容 -->
        <slot></slot>
      </section>
    </div>
  </div>
</template>

<script>
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
  background-color: #2d3a4b;
  color: #fff;
  height: 100%;
  padding-top: 20px;
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
