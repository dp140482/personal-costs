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
            state.paymentsList = [...state.paymentsList, payload];
        },
        addPayments(state, payload) {
            state.paymentsList = [...state.paymentsList, ...payload];
        }
    },
    getters: {
        getPaymentsList: state => state.paymentsList,
        getSumOfPayments: state => {
            return state.paymentsList.reduce((res, cur) => res + cur.value, 0);
        },
    },
    actions: {
        fetchData(context, args) {
            let dataObj = {
                "page1": [
                    { "id": 1, "date": "20.03.2020", "category": "Продукты", "value": 169 },
                    { "id": 2, "date": "21.03.2020", "category": "Поездки", "value": 5 },
                    { "id": 3, "date": "22.03.2020", "category": "Спорт", "value": 450 }
                ],
                "page2": [
                    { "id": 4, "date": "23.03.2020", "category": "Развлечения", "value": 969 },
                    { "id": 5, "date": "24.03.2020", "category": "Образование", "value": 1500 },
                    { "id": 6, "date": "25.03.2020", "category": "Продукты", "value": 200 }
                ]
            };
            context.commit("addPayments", dataObj["page" + args.page]);
        }
    }
})