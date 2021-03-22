import { createApp } from 'vue';
import App from './App.vue';
import GUI from 'g-ui';

import 'theme-chalk/index.scss';
createApp(App).use(GUI).mount('#app');