import Vue from 'vue';
import store from "./store";
import App from './App.vue';
import router from './router';
import modalWindow from './plugins/modalWindow';

Vue.config.productionTip = false;

export const globalEventBus = new Vue();

new Vue({
    store,
    router,
    modalWindow,
    render: h => h(App),
}).$mount('#app');