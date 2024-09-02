<template>
  <ManageLayout currentSection="用户管理">
    <!-- 用户管理的具体内容 -->
    <el-card>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input v-model="search.username" placeholder="用户名" />
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.phone" placeholder="手机号" />
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="manage-table">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" @click="addUser">新增用户</el-button>
          <el-button type="danger" @click="deleteSelectedUsers">批量删除</el-button>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="paginatedData" style="width: 100%" v-loading="loading">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="username" label="用户名" align="center"></el-table-column>
          <el-table-column prop="role" label="角色" align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain">启用</el-tag>
              <el-tag v-else type="danger" effect="plain">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template v-slot="scope">
              <el-button size="small" @click="editUser(scope.row)">修改</el-button>
              <el-button size="small" type="danger" @click="deleteUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

  </ManageLayout>
</template>

<script>
import ManageLayout from '@/layouts/ManageLayout.vue';
export default {
  components: {
    ManageLayout  // 确保正确注册组件
  },
  data() {
    return {
      search: {
        username: '',
        phone: ''
      },
      loading: false,
      userData: [
        { username: 'Gary Gonzalez', role: 'editor', phone: '18154679215', email: 's.hfk@huxve.lc', status: '启用', createTime: '1988-08-29 01:58:38' },
        { username: 'Brian Rodriguez', role: 'editor', phone: '19846761974', email: 't.lpifcvfv@ddylyrsx.bm', status: '禁用', createTime: '1991-01-13 23:51:10' },
        { username: 'Mark Williams', role: 'admin', phone: '18171451557', email: 'j.ppdfz@hzhjj.es', status: '禁用', createTime: '1991-02-24 13:16:50' },
        // 更多数据...
      ],
      paginationData: {
        layout: 'total, sizes, prev, pager, next, jumper', // 布局配置
        pageSizes: [1,2,3], // 可选择的每页数据条数
        total: 100, // 总数据条数
        pageSize: 1, // 当前每页显示的数据条数
        currentPage: 1 // 当前页码
      },
    };
  },
  methods: {
    onSearch() {
      console.log('搜索功能还未实现');
    },
    onReset() {
      this.search.username = '';
      this.search.phone = '';
    },
    addUser() {
      console.log('新增用户功能还未实现');
    },
    deleteSelectedUsers() {
      console.log('批量删除功能还未实现');
    },
    editUser(user) {
      console.log('编辑用户', user);
    },
    deleteUser(user) {
      console.log('删除用户', user);
    },
    handleCurrentChange(newPage) {
      this.paginationData.currentPage = newPage;
    },
    handleSizeChange(newSize) {
      this.paginationData.pageSize = newSize;
    },
  },
  computed: {
    paginatedData() {
      const start = (this.paginationData.currentPage - 1) * this.paginationData.pageSize;
      const end = start + this.paginationData.pageSize;
      return this.userData.slice(start, end);
    }
  },
  mounted() {
    this.paginationData.total = this.userData.length; // 初始化总数据量
  }
};
</script>

<style scoped>
.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.manage-table {
  margin-top: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: center;
}
</style>