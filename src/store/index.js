import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAdmin: false,
    title: 'Company',
    number: 0,
    apiURL: 'https://imdb8.p.rapidapi.com/',
    headers: {
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
      'x-rapidapi-key': 'c942ed61e6mshc63b352f1b33912p19fb42jsn19568bc63c83' //api kodu
    },
    searchResults: [],
    favMovies: [],
    movieDetails: [],
    actorDetails: [],
  },
  mutations: {
    SET_IS_ADMIN(state, payload){
      state.isAdmin = payload
    },

    deleteMatchedCompanies(state) {
      state.matchedCompanies = [];
    },
    
  },
  actions: {
    searchCompany(context, data) {
      axios
        .get(`${context.state.api_endpoint}/query`, {
          params: {
            keywords: data.keywords,
            function: "SYMBOL_SEARCH",
            datatype: "json",
          },
          headers: {
            "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
            "x-rapidapi-key":
              "c942ed61e6mshc63b352f1b33912p19fb42jsn19568bc63c83",
          },
        })
        .then((response) => {
          context.commit("setMatchedCompanies", response.data.bestMatches);
          console.log(response);
        });
     },
  },

  getters: {

  },
  modules: {},
});
