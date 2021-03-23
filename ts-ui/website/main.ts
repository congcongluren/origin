import { createApp } from 'vue';
import App from './App.vue';
import GUI from 'g-ui';
// import GUI from '../lib/index.esm.js';
import 'theme-chalk/src/index.scss';

createApp(App).use(GUI).mount('#app');