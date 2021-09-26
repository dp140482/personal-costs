import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: []
    },
    mutations: {
        setPaymentsListData(state, payload) {
            state.paymentsList = payload
        },
    },
    getters: {
        getPaymentsList: state => state.paymentsList,
        getSumOfPayments: state => {
            return state.paymentsList.reduce((res, cur) => res + cur.value, 0);
        },
    }
})