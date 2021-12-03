<template>
<v-app>
    <v-main>
       <v-card
        color="green lighten-1"
        dark
        size="32"
      >
        <v-card-text>
          <v-autocomplete
            clearable
            v-model="model"
            :search-input.sync="search"
            :items="items"
            item-text="name"
            item-value="symbol"
            color="white"
            hide-no-data
            hide-selected
            label="Search Symbols"
            placeholder="Start typing at least 3 letters to Search"
            prepend-icon="mdi-magnify"
            return-object
          ></v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>
        <v-expand-transition>
          <v-list class="green dark-6">
            <v-list-item
              v-for="(field, i) in symbols"
              :key="i"
            >
              <v-list-item-content align="left">
                <v-list-item-title>{{field["1. symbol"]}}</v-list-item-title>
                <v-list-item-subtitle>{{field["2. name"]}}  
                  <v-btn rounded color="primary" dark @click="selectSymbol(field)">Select
                  </v-btn>
                  </v-list-item-subtitle>
                
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expand-transition>
      </v-card> 
      
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Searchbar",
  data() {
    return {
      search: null,
      items: [],
      model: null,
    };
  },
  computed: {
    ...mapState(["symbols"]),
  },
  watch: {
    search(val) {
      if(val.length > 2) {
        this.getSymbols(val);
      }
    },
  },

  methods: {
    ...mapActions(["getSymbols"]),

    selectSymbol(symbol) {
      localStorage.setItem("sp_symbol", JSON.stringify(symbol));
      this.$router.push({name: "Info",query: {symbol: symbol["1. symbol"], serie: "daily"},
      });
      this.items = []; 
    },
  },



  mounted() {
    
  },
  
};
</script>

<style scoped>
</style>
