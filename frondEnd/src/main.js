import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './components/Store';
import * as VeeValidate from 'vee-validate';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { FontAwesomeIcon } from './components/plugins/font-awesome.js';
const app = createApp(App);

app.use(router);
app.use(store);

// Correct usage for VeeValidate in Vue 3 with Vite

app.use(VeeValidate);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

