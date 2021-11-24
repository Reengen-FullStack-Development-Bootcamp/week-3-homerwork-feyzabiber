import Vue from "vue";
import Vuex from "vuex";
import axios from "@/plugins/AxiosInstance.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAdmin: false,
    symbols: [],
  },
  mutations: {
    SET_IS_ADMIN(state, payload){
      state.isAdmin = payload
    },
    SET_SYMBOLS(state, payload) {
      state.symbols = payload
    },
    
  },
  actions: {
    getSymbols(context, payload) {
      return axios.get("/query", {
        params: {
          function: "SYMBOL_SEARCH",
          keywords: payload,
          datatype: 'json'
        }
      })
        .then((resp) => {
          context.commit("SET_SYMBOLS", resp.data.bestMatches)
        })
        .catch(err => console.log(err))
    }

  },

  getters: {
  },
  modules: {},
});
