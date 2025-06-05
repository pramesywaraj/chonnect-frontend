import { createApp } from 'vue';

import routes from './routes';
import './main.css';
import App from './App.vue';

const app = createApp(App);

app.use(routes);

app.mount('#app');
