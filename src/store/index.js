import Vue from "vue";
import Vuex from "vuex";
import axios from "@/plugins/AxiosInstance.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAdmin: false,
    symbols: [],
    isLoading: false,
    timeSeries: {}
  },
  mutations: {
    SET_IS_ADMIN(state, payload) {
      state.isAdmin = payload
    },
    SET_SYMBOLS(state, payload) {
      state.symbols = payload
    },

    SET_TIME_SERIES(state, payload) {
      state.timeSeries = payload;
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

    },

    fetchTimeSeries({ commit, state }, payload) {
      state.isLoading = true
      return axios.get("/query", {
        params: {
          symbol: payload.symbol,
          function: `TIME_SERIES_${payload.serie.toUpperCase()}`,
          outputsize: 'compact',
          datatype: 'json'
        }
      },

      )
        .then(resp => {
          if (resp.status === 200) {

            if (resp.data.Note) {
              throw new Error(resp.data.Note);
            }

            commit("SET_TIME_SERIES", resp.data)
          }
        })
        .catch(err => {
          console.log(err)

        })
        .finally(() => state.isLoading = false)
    },



  },
  getters: {
    getFormattedTimeSeries: (state) => (serie) => {
      let serieKey = ""
      serie = serie[0].toUpperCase() + serie.slice(1, serie.length)

      switch (serie) {
        case "Daily":
          serieKey = `Time Series (${serie})`
          break;
        case "Weekly":
          serieKey = `${serie} Time Series`
          break;
        case "Monthly":
          serieKey = `${serie} Time Series`
          break;
        default:
          break;
      }

      const timeSeries = state.timeSeries[serieKey];

      return Object.keys(timeSeries).map(key => {
        return {
          open: parseFloat(timeSeries[key]["1. open"]),
          high: parseFloat(timeSeries[key]["2. high"]),
          low: parseFloat(timeSeries[key]["3. low"]),
          close: parseFloat(timeSeries[key]["4. close"]),
          volume: parseFloat(timeSeries[key]["5. volume"]),
          date: key
        }
      });
    }
  },
  modules: {},
})
