<template>
  <ManageLayout currentSection="菜品管理">
    <!-- 查询条件 -->
    <el-card>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input v-model="search.name" placeholder="菜品名称" />
        </el-col>
        <el-col :span="8">
          <el-select v-model="search.category" placeholder="请选择分类" clearable>
            <el-option v-for="category in categories" :key="category" :label="category" :value="category" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 菜品管理表格 -->
    <el-card class="manage-table">
      <div class="toolbar-wrapper">
        <el-button type="primary" @click="openDialog('add')">新增菜品</el-button>
        <el-button type="danger" @click="deleteSelectedDishes">批量删除</el-button>
      </div>
      <el-table :data="paginatedData" style="width: 100%" v-loading="loading">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="菜品名称" align="center"></el-table-column>
        <el-table-column prop="image" label="图片" align="center" width="120">
          <template #default="scope">
            <el-image :src="scope.row.image" class="preview-image" />
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" align="center"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template v-slot="scope">
            <el-button size="small" @click="openDialog('edit', scope.row)">修改</el-button>
            <el-button size="small" type="danger" @click="deleteDish(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager-wrapper">
        <el-pagination background :layout="paginationData.layout" :page-sizes="paginationData.pageSizes"
          :total="paginationData.total" :page-size="paginationData.pageSize" :current-page="paginationData.currentPage"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>

    <!-- 新增/编辑菜品弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
      <el-form :model="formData" label-width="80px" ref="formRef">
        <el-form-item label="菜名" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <el-upload ref="upload" :auto-upload="false" :limit="1" :on-change="handleChange" :show-file-list="false">
            <template #trigger>
              <el-button type="primary" v-if="!imageUrl">上传图片</el-button>
            </template>
          </el-upload>
          <div v-if="imageUrl" @click="triggerUpload">
            <el-image :src="imageUrl"  class="upload-image" />
            <el-icon class="icon-in-image icon-zoom" @click.stop="previewImage">
              <ZoomIn />
            </el-icon>
            <el-icon class="icon-in-image icon-delete" @click.stop="removeImage">
              <Delete />
            </el-icon>
          </div>
        </el-form-item>
        <!-- 放大预览 -->
        <el-dialog v-model="preVisible" width="60%" append-to-body>
          <img :src="imageUrl" alt="预览" style="width: 100%" />
        </el-dialog>
        <el-form-item label="分类" prop="category">
          <el-select v-model="formData.category" placeholder="请选择分类">
            <el-option v-for="category in categories" :key="category" :label="category" :value="category" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveDish">保存</el-button>
      </template>
    </el-dialog>
  </ManageLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import ManageLayout from '@/layouts/ManageLayout.vue';
import { ZoomIn, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';


const upload = ref(null);
const formRef = ref(null);
const loading = ref(false);
const dialogVisible = ref(false);
const dialogTitle = ref('');
const imageUrl = ref('');
const preVisible = ref(false);

// 搜索相关数据
const search = ref({ name: '', category: '' });
const categories = ref(['中餐', '西餐', '饮品']);

// 表单数据
const formData = ref({
  name: '',
  category: '',
  imageFile: null, // 存储文件对象
});

// 菜品数据
const dishData = ref([
  { name: '宫保鸡丁', image: 'https://via.placeholder.com/50', category: '中餐' },
  { name: '牛肉汉堡', image: 'https://via.placeholder.com/50', category: '西餐' },
]);

// 分页数据
const paginationData = ref({
  layout: 'total, sizes, prev, pager, next, jumper',
  pageSizes: [5, 10],
  total: dishData.value.length,
  pageSize: 5,
  currentPage: 1,
});

// 分页处理
const paginatedData = computed(() => {
  const start = (paginationData.value.currentPage - 1) * paginationData.value.pageSize;
  const end = start + paginationData.value.pageSize;
  return dishData.value.slice(start, end);
});

// 方法
const onSearch = () => {
  console.log('搜索功能未实现');
};

const onReset = () => {
  search.value.name = '';
  search.value.category = '';
};

const deleteDish = (dish) => {
  console.log('删除菜品', dish);
};

const deleteSelectedDishes = () => {
  console.log('批量删除未实现');
};

const openDialog = (type, dish = null) => {
  dialogTitle.value = type === 'add' ? '新增菜品' : '编辑菜品';
  if (dish) {
    formData.value = {
      name: dish.name,
      category: dish.category,
      imageFile: null,
    };
    imageUrl.value = dish.image; // 编辑时显示已有图片
  } else {
    formData.value = { name: '', category: '', imageFile: null };
    imageUrl.value = '';
  }
  dialogVisible.value = true;
};

const handleChange = (uploadFile) => {
  const file = uploadFile.raw;
  if (file) {
    formData.value.imageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result; // 使用 imageUrl 显示预览
    };
    reader.readAsDataURL(file);
    // 清空上传组件的内部状态
    upload.value.clearFiles();
  }
};

const triggerUpload = () => {
  upload.value.$el.querySelector('input').click();
};

const removeImage = () => {
  formData.value.imageFile = null;
  imageUrl.value = '';
  upload.value.clearFiles(); // 清空上传组件状态
};

const previewImage = () => {
  preVisible.value = true; // 显示放大预览
};

const saveDish = async () => {
  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.value.name);
  formDataToSend.append('category', formData.value.category);
  if (formData.value.imageFile) {
    formDataToSend.append('image', formData.value.imageFile);
  }

  try {
    loading.value = true;
    if (dialogTitle.value === '新增菜品') {
      await axios.post('/api/dish/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      await axios.post('/api/dish/edit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    // 成功后刷新列表（这里你可以重新拉取 dishData）
    ElMessage.success('保存成功');
    dialogVisible.value = false;
    // 重新拉取列表（如果后端有接口的话）
    // await fetchDishList();
  } catch (error) {
    console.error('保存菜品失败', error);
    const errorMessage = error?.response?.data?.message;
    ElMessage.error(errorMessage ? `保存失败：${error}` : '保存失败，请稍后再试');
  } finally {
    loading.value = false;
  }
};

const handleCurrentChange = (newPage) => {
  paginationData.value.currentPage = newPage;
};

const handleSizeChange = (newSize) => {
  paginationData.value.pageSize = newSize;
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

.pager-wrapper {
  display: flex;
  justify-content: center;
}

.preview-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  display: block;
  margin: auto;
}

.upload-image {
  position: relative;
  border-radius: 12px;
  object-fit: cover;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon-in-image {
  position: absolute;
  width: 30px;
  height: 30px;
  text-align: center;
  background: rgb(0, 0, 0, 0.3);
  color: #fff;
  line-height: 30px;
  cursor: pointer;

  &.icon-zoom {
    left: 0;
  }

  &.icon-delete {
    right: 0;
    bottom: 0;
  }
}
</style>