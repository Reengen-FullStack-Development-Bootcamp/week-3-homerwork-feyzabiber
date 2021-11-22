<template>
  <div margin="auto" padding="auto">
    <v-app-bar color="deep-orange accent-4" dense dark>
      <v-toolbar-title>
        Stock Market                
      </v-toolbar-title>
   
        <v-btn rounded color="primary" dark router-link to="/logs">Logs</v-btn> 
        <v-btn alignLeft rounded color="primary" dark router-link to="/">Home</v-btn> 
        
      <v-spacer></v-spacer>
      <v-switch v-model="isAdmin" hide-details="" label="Admin"></v-switch>
      
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "HeaderMenu",
  data() {
    return {
      isAdmin: this.$store.getters["getIsAdmin"], 
    };
  },
  watch: {
   
    isAdmin() {
      this.$store.commit("changeStateOfAdmin");
    },
  },
};
</script>

<style scoped>
h3 {
  margin: px 40 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>