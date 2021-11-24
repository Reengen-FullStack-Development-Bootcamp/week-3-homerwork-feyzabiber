<template>
  <div>
    <h1
      v-if="symbol"
      class="mt-8 mb-5"
    >
      {{ symbol["2. name"] }}
      <span class="subtitle-1">
        {{ symbol["1. symbol"] }}
      </span>
    </h1>
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
      serie: "daily", // time serie
      symbol: JSON.parse(localStorage.getItem("sp_symbol")),
    };
  },
  computed: {
    ...mapGetters(["getFormattedTimeSeries"]),
  },
  watch: {
   
    
  },
  created() {
    // when page is created check if there is a serie query in url
    // if there is serie query in url, set local serie state
    const serie = this.$route.query.serie;
    if (serie) {
      this.serie = serie;
    }
    // fetch the series
    this.fetchSeries();
  },
  methods: {
    ...mapActions(["fetchTimeSeries"]),
    // sets the serie state and updates the url accordingly
    setSerie(serie) {
      if (this.serie === serie) {
        return;
      }
      this.serie = serie;
      this.$router.push({
        path: `/symbol/${this.$route.params.symbol}`,
        query: {
          serie: this.serie,
        },
      });
    },
    // fetch series and triggers chart drawing
    fetchSeries() {
      this.drawChart = false;
      this.fetchTimeSeries({
        symbol: this.$route.params.symbol,
        serie: this.serie,
      }).then(() => {
        this.drawChart = true;
      });
    },
  },
};
</script>