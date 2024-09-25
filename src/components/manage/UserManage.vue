<template>
  <ManageLayout currentSection="用户管理">
    <!-- 用户管理的具体内容 -->
    <el-card>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input v-model="search.username" placeholder="用户名" />
        </el-col>
        <el-col :span="8">
          <el-input v-model="search.email" placeholder="邮箱" />
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
          <el-button type="primary" @click="openCreateDialog"
            >新增用户</el-button
          >
          <el-button type="danger" @click="deleteSelectedUsers"
            >批量删除</el-button
          >
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="paginatedData" style="width: 100%" v-loading="loading">
          <el-table-column
            type="selection"
            width="50"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
          ></el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain"
                >启用</el-tag
              >
              <el-tag v-else type="danger" effect="plain">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="lastLoginTime"
            label="最后登录时间"
            align="center"
          ></el-table-column>

          <el-table-column label="操作" width="150" align="center">
            <template v-slot="scope">
              <el-button size="small" @click="openEditDialog(scope.row)"
                >修改</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="deleteUser(scope.row)"
                >删除</el-button
              >
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
          :current-Page="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 新增/修改用户对话框 -->
      <el-dialog
        v-model="dialogVisible"
        :title="isEditing ? '修改用户' : '新增用户'"
        @closed="resetForm"
        width="30%"
      >
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="100px"
          label-position="left"
        >
          <el-form-item prop="username" label="用户名">
            <el-input v-model="formData.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="formData.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item v-if="isEditing" prop="role" label="角色">
            <el-select v-model="formData.role" placeholder="请选择角色">
              <el-option label="admin" value="admin"></el-option>
              <el-option label="商家" value="商家"></el-option>
              <el-option label="顾客" value="顾客"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="!isEditing" prop="password" label="密码">
            <el-input
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="handleCreateOrUpdate"
            :loading="loading"
            >确认</el-button
          >
        </template>
      </el-dialog>
    </el-card>
  </ManageLayout>
</template>

<script>
import ManageLayout from "@/layouts/ManageLayout.vue";
import axios from "axios";
import dayjs from "dayjs";
import { ElMessageBox, ElMessage } from 'element-plus';

export default {
  components: {
    ManageLayout, // 确保正确注册组件
  },
  data() {
    return {
      search: {
        username: "",
        email: "",
      },
      loading: false,
      userData: [],
      dialogVisible: false, // 控制对话框显示
      isEditing: false, // 控制是否为编辑模式
      originalUsername: "", // 保存原始用户名
      formData: {
        username: "",
        email: "",
        role: "",
        password: "", // 新增用户时需要密码
      },
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      paginationData: {
        layout: "total, sizes, prev, pager, next, jumper", // 布局配置
        pageSizes: [10, 20, 50], // 可选择的每页数据条数
        total: 0, // 总数据条数
        pageSize: 10, // 当前每页显示的数据条数
        currentPage: 1, // 当前页码
      },
    };
  },
  methods: {
    onSearch() {
      console.log("搜索功能还未实现");
    },
    onReset() {
      this.search.username = "";
      this.search.email = "";
    },

    deleteSelectedUsers() {
      console.log("批量删除功能还未实现");
    },

    deleteUser(user) {
      console.log("删除用户", user);
    },

    //打开创建用户对话框
    openCreateDialog() {
      this.isEditing = false;
      this.resetForm();
      this.dialogVisible = true;
    },

    // 打开修改用户对话框
    openEditDialog(user) {
      this.isEditing = true;
      this.originalUsername = user.username;
      this.formData = {
        username: user.username,
        email: user.email,
        role: user.role,
        password: "", // 密码不展示
      };
      this.dialogVisible = true;
    },

    // 重置表单
    resetForm() {
      this.formData = {
        username: "",
        email: "",
        role: "",
        password: "",
      };
      if (this.$refs.formRef) {
        this.$refs.formRef.resetFields();
      }
    },

    // 处理新增或修改用户
    async handleCreateOrUpdate() {
      this.loading = true;
      try {
        if (this.isEditing) {
          // 修改用户逻辑
          await this.updateUser();
        } else {
          // 新增用户逻辑
          await this.createUser();
          this.$alert(
            `用户创建成功！<br/>用户名: ${this.formData.username}<br/>邮箱: ${this.formData.email}`,
            "创建用户成功",
            {
              dangerouslyUseHTMLString: true,
              confirmButtonText: "确认",
              type: 'success',
            }
          );
        }
        this.dialogVisible = false; // 关闭对话框
        this.$message.success(
          this.isEditing
            ?  `${this.originalUsername} 用户修改成功`
            : `${this.formData.username} 用户添加成功！`
        );
        this.fetchUsers(); // 刷新用户数据
      } catch (error) {
        console.error("操作失败", error);
        const errorMessage = error.response?.data
          ? JSON.stringify(error.response.data) // 转换为字符串显示
          : "操作失败";

        // 使用 this.$message.error 显示错误信息
        this.$message.error(errorMessage);
      } finally {
        this.loading = false;
      }
    },

    // 创建用户
    async createUser() {
      await axios.post("/api/users/manage_users/", {
        username: this.formData.username,
        email: this.formData.email,
        password: this.formData.password, // 只有新增用户时才需要密码
      });
    },

    // 更新用户
    async updateUser() {
      await axios.put(`/api/users/manage_users/${this.originalUsername}/`, {
        username: this.formData.username,
        email: this.formData.email,
        role: this.formData.role,
      });
    },

    async fetchUsers() {
      this.loading = true;
      try {
        const params = {
          username: this.search.username,
          email: this.search.email,
          page: this.paginationData.currentPage,
          page_size: this.paginationData.pageSize,
        };
        const response = await axios.get("/api/users/manage_users/", {
          params,
        }); // 通过反向代理访问后端 API
        this.userData = response.data.results.map((user) => {
          // 解构并排除 is_superuser ,date_joined,last_login, is_staff
          const { is_superuser, is_staff, date_joined, last_login, ...rest } =
            user;

          // 根据 is_superuser 和 is_staff 决定角色
          let role = "顾客";
          if (is_superuser) {
            role = "admin";
          } else if (is_staff) {
            role = "商家";
          }

          // 返回新对象，其中去掉了 is_superuser 和 is_staff，并添加了 role 和 status
          return {
            ...rest, // 展开其余属性
            status: user.is_active, // status 由 is_active 决定
            role: role, // 角色根据逻辑设置
            createTime: dayjs(date_joined).format("YYYY-MM-DD HH:mm:ss"),
            lastLoginTime: dayjs(last_login).format("YYYY-MM-DD HH:mm:ss"),
          };
        });
        this.paginationData.total = response.data.count;
      } catch (error) {
        console.error("获取用户数据失败", error);
      } finally {
        this.loading = false;
      }
    },

    handleCurrentChange(newPage) {
      this.paginationData.currentPage = newPage;
      this.fetchUsers();
    },

    handleSizeChange(newSize) {
      this.paginationData.pageSize = newSize;
      this.fetchUsers();
    },
  },
  computed: {
    paginatedData() {
      return this.userData;
    },
  },
  mounted() {
    this.fetchUsers();
  },
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
