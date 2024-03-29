import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: []
    },
    mutations: {
        setPaymentsListData(state, payload) {
            state.paymentsList = payload;
        },
        addPayment(state, payload) {
            if (!payload.id) {
                payload.id = state.paymentsList.length + 1;
            }
            state.paymentsList = [...state.paymentsList, payload];
        },
        addPayments(state, payload) {
            state.paymentsList = [...state.paymentsList, ...payload];
        },
        deletePayment(state, id) {
            state.paymentsList.splice(state.paymentsList.findIndex(item => item.id === id), 1);
        },
        editPayment(state, payload) {
            state.paymentsList.splice(
                state.paymentsList.findIndex(item => item.id === payload.id), 1, payload
            );
        }
    },
    getters: {
        getPaymentsList: state => state.paymentsList,
        getSumOfPayments: state => {
            return state.paymentsList.reduce((res, cur) => res + cur.value, 0);
        },
        getLength: state => state.paymentsList.length,
        getFrame: state => (from, to) => {
            return state.paymentsList.slice(from, to);
        },
        getUniqueCategories: state => {
            let res = [];
            state.paymentsList.forEach(item => {
                if (!res.includes(item.category)) {
                    res.push(item.category);
                }
            });
            return res;
        },
        getValuesByCategory: state => {
            let cat = [];
            let val = [];
            state.paymentsList.forEach(item => {
                if (!cat.includes(item.category)) {
                    cat.push(item.category);
                    val.push(item.value);
                } else {
                    val[cat.indexOf(item.category)] += item.value;
                }
            });
            return val;
        }
    },
    actions: {
        fetchData(context) {
            let data = [
                { "id": 1, "date": "20.03.2020", "category": "Продукты", "value": 169 },
                { "id": 2, "date": "21.03.2020", "category": "Поездки", "value": 5 },
                { "id": 3, "date": "22.03.2020", "category": "Спорт", "value": 450 },
                { "id": 4, "date": "23.03.2020", "category": "Развлечения", "value": 969 },
                { "id": 5, "date": "24.03.2020", "category": "Образование", "value": 1500 },
                { "id": 6, "date": "25.03.2020", "category": "Продукты", "value": 200 }
            ];
            context.commit("addPayments", data);
        }
    }
})