<template>

  <v-col>
    <v-autocomplete
      v-model="SearchBarValue"
      loading="Loading..."
      color="blue"
      hide-no-data
      hide-selected
      item-text="Description"
      item-value="API"
      label="Companies"
      placeholder="Start typing to Search"
      prepend-inner-icon="mdi-magnify"
      return-object
      clearable
      outlined
      solo
      v-on:keyup.enter="searchCompaniesByKeywords"
    ></v-autocomplete>
    <v-btn rounded height="auto">Search</v-btn>
  </v-col>
</template>

<script>
export default {
  name: "Searchbar",
  data() {
    return {
      SearchBarValue: "",
      loading: false,
      selectedCompany: null, 
    };
  },
  computed: {
        // Returns matchedCompanies from store.
    matchedCompanies() {
      return this.$store.state.matchedCompanies;
    },
  },

  methods: {
     searchCompaniesByKeywords() {
      if (this.SearchBarValue && this.SearchBarValue.length > 0) {
        this.$store.dispatch("searchCompany", { keywords: this.SearchBarValue });
      } else {
        this.$store.commit("deleteMatchedCompanies");
      }
      this.selectedCompany = null;
    },
    setKeywords(keywords) {
      this.keywords = keywords;
    },
  },



  mounted() {
    if (this.$route.query.title) {
      this.loading = true;
      this.searchValue = this.$route.query.title;
      this.searchFromMovieTitle(this.searchValue).then(() => {
        this.loading = false;
      });
    }
  },
  
};
</script>

<style scoped>
</style>
