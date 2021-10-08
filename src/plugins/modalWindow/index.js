import Vue from "vue";

export default {
    install(Vue) {
        if (this.installed) { return; }
        this.installed = true;

        Vue.prototype.$modal = {
            show() {
                console.log('show');
            },
            hide() {
                console.log('hide');
            }
        }
    }
}