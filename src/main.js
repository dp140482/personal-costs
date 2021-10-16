import Vue from 'vue';
import App from './App.vue';

import store from "./store";
import router from './router';
import context from './plugins/ContextMenu';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(context);

export const globalEventBus = new Vue();

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');