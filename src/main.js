import { createApp } from 'vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import routes from './routes';
import './main.css';
import App from './App.vue';

const queryClient = new QueryClient();
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(routes);
app.use(VueQueryPlugin, { queryClient });

app.mount('#app');
