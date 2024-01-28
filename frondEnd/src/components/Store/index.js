import { createApp } from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';

const app = createApp();
app.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  }
});
