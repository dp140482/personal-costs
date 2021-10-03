import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/add/payment/:category',
        name: 'addpayment'
    }, {
        path: '/add/payment',
        name: 'addvalue'
    }]
})

export default router;