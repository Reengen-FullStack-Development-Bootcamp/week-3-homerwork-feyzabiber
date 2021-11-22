<template>
  <div class="Logs">
    <!-- ADMIN -->
    <div v-if="isAdmin">
      <h2>Logs</h2>
      <div align="left">
        <!--{{ items }}-->
        <v-treeview :items="items" v-if="isAdmin">
          <template #label="data" style="">
            <div
              :style="{
                color: data.item.authorized ? 'black' : 'red',
                'font-weight': data.item.authorized ? 'normal' : 'bold',
              }"
            >
              {{ data.item.name }}
            </div>
          </template>
        </v-treeview>
      </div>
    </div>

    <!-- GUESTS -->
    <div v-else text-color="red">!!! Authorized Access !!!</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    items: [],
    showAlert: false,
  }),
  computed: {
    ...mapState(["isAdmin"]),
  },

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
  mounted() {},
  methods: {
    // Remove all logs in localstorage.
    removeAllLogs() {
      localStorage.removeItem("routingHistory");
      this.items = [];
    },
  },
  watch: {},
};
</script>


<style scoped>
</style>