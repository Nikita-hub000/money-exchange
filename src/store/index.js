import { createStore } from 'vuex';

export default createStore({
  state: {
    currencyData: null,
    mainCurrency: 'rub',
    currencyList: ['rub', 'usd', 'eur'],
  },
  mutations: {
    setCurrencyData(state, data) {
      state.currencyData = data;
    },
    setMainCurrency(state, currency) {
      state.mainCurrency = currency;
    },
  },
  actions: {
    async fetchCurrencyData({ commit, state }) {
      if (!state.currencyData) {
        try {
          const response = await fetch(
            'https://status.neuralgeneration.com/api/currency'
          );
          const data = await response.json();
          commit('setCurrencyData', data);
        } catch (error) {
          console.error(error);
        }
      }
    },
    updateCurrency({ commit }, currency) {
      commit('setMainCurrency', currency);
    },
  },
});
