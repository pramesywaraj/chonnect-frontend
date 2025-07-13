import { createApp } from 'vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

import routes from './routes';
import './main.css';
import App from './App.vue';

const queryClient = new QueryClient();
const app = createApp(App);

app.use(routes);
app.use(VueQueryPlugin, { queryClient });

app.mount('#app');
