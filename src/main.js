import Vue from 'vue';
import App from './App.vue';

import store from "./store";
import router from './router';
import context from './plugins/ContextMenu';

Vue.config.productionTip = false;
Vue.use(context);

export const globalEventBus = new Vue();

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');