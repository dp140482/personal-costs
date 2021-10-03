import Vue from 'vue';
import store from "./store";
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

export const globalEventBus = new Vue();

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');