<template>
  <div>
    <h1 v-if="symbol" class="mt-8 mb-5">
       {{ symbol["1. symbol"] }} - {{ symbol["2. name"] }}
    </h1>
    <v-btn-toggle primary v-model="activeBtn" class="mr-5">
      <v-btn
        v-for="(serie, i) in series"
        :key="i"
        medium
        :v-model="serie"
        @click="setSerie(serie)"
      >
        {{ serie }}
      </v-btn>
    </v-btn-toggle>
    <candle-chart
      :draw="drawChart"
      :serie="serie"
      :symbol="symbol"
      @set-serie="setSerie"
    />
  </div>
</template>

<script>
import CandleChart from "@/components/CandleChart";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Info",
  components: {
    CandleChart,
  },
  data() {
    return {
      drawChart: false,
      serie: "daily", 
      symbol: JSON.parse(localStorage.getItem("sp_symbol")),
      series: ["daily", "weekly", "monthly"],
      activeBtn: 0,
    };
  },
    created() {
    const serie = this.$route.query.serie;
    if (serie) {
      this.serie = serie;
   
      this.activeBtn = this.series.indexOf(this.serie);
    }

    this.fetchSeries();
  },
  computed: {
    ...mapGetters(["getFormattedTimeSeries"]),
  },
  watch: {
    
    $route(to, from) {
      const serie = from.query.serie;
      if (serie && to.params.symbol !== from.params.symbol) {
        this.$router.push({path:`/info`,query: {symbol: this.symbol["1. symbol"], serie: serie}});
      }
      this.fetchSeries();
    },
  },

  methods: {
    ...mapActions(["fetchTimeSeries"]),

    setSerie(serie) {
     
      if (this.serie === serie) {
        
        return;
      }
      this.serie = serie;
      this.$router.push({path:`/info`,query: {symbol: this.symbol["1. symbol"], serie: serie}});
    },
    fetchSeries() {
      this.drawChart = false;
      this.fetchTimeSeries({
        symbol: this.$route.query.symbol,
        serie: this.serie,
      }).then(() => {
        this.drawChart = true;
      });
    },
  },
};
</script>