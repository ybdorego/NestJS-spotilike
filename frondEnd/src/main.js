import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './components/Store';
import * as VeeValidate from 'vee-validate';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const app = createApp(App);

app.use(router);
app.use(store);

// Correct usage for VeeValidate in Vue 3 with Vite

app.use(VeeValidate);

app.mount('#app');

