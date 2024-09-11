import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './rooter'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const app = createApp(App);
// 全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用 Element Plus 并配置国际化
app.use(ElementPlus, {
  locale: zhCn,
});

app.use(router);
router.isReady().then(() => {
    app.mount("#app")
  })
  
