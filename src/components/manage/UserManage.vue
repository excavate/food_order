<template>
    <div>
      <el-row>
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
  
      <el-button type="primary" @click="addUser">新增用户</el-button>
      <el-button type="danger" @click="deleteSelectedUsers">批量删除</el-button>
  
      <el-table :data="userData" style="width: 100%" v-loading="loading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="role" label="角色" width="180"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="230"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template v-slot="scope">
            <el-tag :type="scope.row.status === '启用' ? 'success' : 'danger'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <el-button size="small" @click="editUser(scope.row)">修改</el-button>
            <el-button size="small" type="danger" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
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
        ]
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
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  