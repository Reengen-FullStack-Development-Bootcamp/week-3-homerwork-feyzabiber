<template>
  <div class="Logs">
    <!-- ADMIN -->
    <div v-if="AdminStatus">
      <h2> Logs </h2>
          <div>
            {{ items }}
          </div>
    </div>

    <!-- GUESTS -->
    <div v-else text-color="red"> !!! Authorized Access !!!

          <v-snackbar v-model="showAlert" :color="AdminStatus ? 'white' : 'red'"
      >You cannot see logs because you are not an admin.
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="showAlert = false">
          Close
        </v-btn>
      </template></v-snackbar>

    </div>
    
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [], 
    showAlert: false, 
    AdminStatus: true, 
  }),
  created() {

    const logs = JSON.parse(localStorage.getItem("routingHistory"));
    if (logs) {
      this.items = [
        ...logs.map((item, index) => ({
          id: index,
          name: `${new Date(item.date).toLocaleString()} ${
            !item.authorized ? " - Failed" : ""
          }`,
          authorized: item.authorized,
          children: [
            { name: `From: ${item.from}`, authorized: item.authorized },
            { name: `To: ${item.to}`, authorized: item.authorized },
          ],
        })),
      ];
    }
  },
  mounted() {
    if (this.$store.getters.getIsAdmin) {
      this.showAlert = false;
      this.AdminStatus = true;
    }
  },
  methods: {
    // Remove all logs in localstorage.
    removeAllLogs() {
      localStorage.removeItem("routingHistory");
      this.items = [];
    },
  },
  watch: {
    "$store.getters.getIsAdmin"(val) {
      this.showAlert = !val;
      this.AdminStatus = val;
    },
  },
};
</script>


<style scoped>

</style>