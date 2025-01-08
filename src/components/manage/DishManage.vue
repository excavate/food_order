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
            <el-image :src="scope.row.image[0]?.url" class="preview-image" />
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
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :current-page="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑菜品弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="菜名">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            ref="upload"
            v-model:file-list="formData.image"
            class="upload-demo"
            action=""
            :limit="1"
            :before-upload="beforeUpload"
            list-type="picture-card"
            :on-remove="handleRemove"
            :on-preview="handlePictureCardPreview"
          >
            <template #default>
              <el-image
                v-if="formData.image.length > 0"
                :src="formData.image[0].url"
                class="upload-image"
                @click="triggerUpload"
              />
              <el-button type="primary" v-else>上传图片</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="formData.category" placeholder="请选择分类">
            <el-option v-for="category in categories" :key="category" :label="category" :value="category" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveDish">保存</el-button>
      </div>
    </el-dialog>
  </ManageLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import ManageLayout from '@/layouts/ManageLayout.vue';

const upload=ref();
const loading=false;
// 搜索相关数据
const search = ref({ name: '', category: '' });
const categories = ref(['中餐', '西餐', '饮品']);

// 菜品数据
const dishData = ref([
  { name: '宫保鸡丁', image: [{name:'1',url:'https://via.placeholder.com/50'}], category: '中餐' },
  { name: '牛肉汉堡', image: [{name:'2',url:'https://via.placeholder.com/50'}], category: '西餐' },
]);

// 分页数据
const paginationData = ref({
  layout: 'total, sizes, prev, pager, next, jumper',
  pageSizes: [5, 10],
  total: dishData.value.length,
  pageSize: 5,
  currentPage: 1,
});

// 对话框控制
const dialogVisible = ref(false);
const dialogTitle = ref('');
const formData = ref({ name: '', image: [], category: '' });

// 分页处理
const paginatedData = computed(() => {
  const start = (paginationData.value.currentPage - 1) * paginationData.value.pageSize;
  const end = start + paginationData.value.pageSize;
  return dishData.value.slice(start, end);
});

// 方法
const onSearch = () => { console.log('搜索功能未实现'); };
const onReset = () => { search.value.name = ''; search.value.category = ''; };
const deleteDish = (dish) => { console.log('删除菜品', dish); };
const deleteSelectedDishes = () => { console.log('批量删除未实现'); };
const openDialog = (type, dish = null) => {
  dialogTitle.value = type === 'add' ? '新增菜品' : '编辑菜品';
  formData.value = dish ? { ...dish } : { name: '', image: [], category: '' };
  dialogVisible.value = true;
};
const saveDish = () => {
  if (dialogTitle.value === '新增菜品') {
    dishData.value.push({ ...formData.value });
  }
  dialogVisible.value = false;
};
const beforeUpload = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    formData.value.image = [
          {
            name: file.name, // 文件名称
            url: e.target.result, // Base64 数据
          },
        ];
  };
  reader.readAsDataURL(file);
  return false;
};
const triggerUpload = () => {
  upload.click();
};

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
  formData.value.image = [];
}

const handlePictureCardPreview = (uploadFile) => {
  
}
const handleCurrentChange = (newPage) => { paginationData.value.currentPage = newPage; };
const handleSizeChange = (newSize) => { paginationData.value.pageSize = newSize; };
</script>

<style scoped>
.toolbar-wrapper { display: flex; justify-content: space-between; margin-bottom: 20px; }
.manage-table { margin-top: 20px; }
.pager-wrapper { display: flex; justify-content: center; }
.preview-image { width: 50px; height: 50px; object-fit: cover; display: block; margin: auto; }
</style>
