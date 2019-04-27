<template>
  <div>

    <!-- Start Summary Cards Container -->
    <v-container class="mt-5 mb-2 pa-0 mobile">
      <v-layout class="wrap row mx-2">
        <v-flex class="mb-4" xs12 sm6 md6 lg3>
          <v-card class="mx-2 text-xs-center">
            <v-responsive>
              <v-card-title :class="this.$store.getters.get_theme.primary">
                <div class="headline text-center">
                  <v-icon :class="this.$store.getters.get_theme.icon" large>dashboard</v-icon>
                  <span :class="this.$store.getters.get_theme.text">&nbsp; &nbsp; {{summary_labels[0]}}</span>
                </div>
              </v-card-title>
              <v-card-text class="display-3 text-center">{{summary_values[0]}}</v-card-text>
            </v-responsive>
          </v-card>
        </v-flex>
        <v-flex class="mb-4"  xs12 sm6 md6 lg3>
          <v-card class="mx-2 text-xs-center">
            <v-responsive>
              <v-card-title :class="this.$store.getters.get_theme.primary">
                <div class="headline text-lg-center">
                  <v-icon :class="this.$store.getters.get_theme.icon" large>accessibility_new</v-icon>
                  <span :class="this.$store.getters.get_theme.text">&nbsp; &nbsp; {{summary_labels[1]}}</span>
                </div>
              </v-card-title>
              <v-card-text class="display-3 text-center">{{summary_values[1]}}</v-card-text>
            </v-responsive>
          </v-card>
        </v-flex>
        <v-flex class="mb-4"  xs12 sm6 md6 lg3>
          <v-card class="mx-2 text-xs-center">
            <v-responsive>
              <v-card-title :class="this.$store.getters.get_theme.primary">
                <div class="headline text-lg-center">
                  <v-icon :class="this.$store.getters.get_theme.icon" large>chrome_reader_mode</v-icon>
                  <span :class="this.$store.getters.get_theme.text">&nbsp; &nbsp; {{summary_labels[2]}}</span>
                </div>
              </v-card-title>
              <v-card-text class="display-3 text-center">{{summary_values[2]}}</v-card-text>
            </v-responsive>
          </v-card>
        </v-flex>
        <v-flex class="mb-4"  xs12 sm6 md6 lg3>
          <v-card class="mx-2 text-xs-center">
            <v-responsive>
              <v-card-title :class="this.$store.getters.get_theme.primary">
                <div class="headline text-lg-center">
                  <v-icon :class="this.$store.getters.get_theme.icon" large>donut_large</v-icon>
                  <span :class="this.$store.getters.get_theme.text">&nbsp; &nbsp; {{summary_labels[3]}}</span>
                </div>
              </v-card-title>
              <v-card-text class="display-3 text-center">{{summary_values[3]}}</v-card-text>
            </v-responsive>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- End Summary Cards Container -->


    <!-- Start KPI Cards Container -->
    <v-container class="mb-2 pa-0">
      <v-layout class="wrap row mx-2">
        <v-flex class="mb-4" xs12 sm6 md6 lg3>
          <v-card class="mx-2 text-xs-center">
            <v-responsive>
              <iframe
                class="kpi-frame"
                scrolling="no"
                frameborder="0"
                width="100%"
                srcdoc='
                  <div id="gauge" class="gauge" style="width:200px;margin: 0 auto;color:black";></div>


                    <script src="https://cdnjs.cloudflare.com/ajax/libs/justgage/1.2.2/justgage.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.4/raphael.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.js"></script>

                    <script>
                      axios.get("http://192.168.1.211:8000/api/books/kpi/?format=json").then(response => {

                            KPITitle=response.data.title;
                            KPIValue=response.data.value;
                            KPIMin=response.data.min_value;
                            KPIMax=response.data.max_value;

                            var g = new JustGage({
                                  customSectors: [
                                  { color : "orange", lo : 0, hi : 50 }
                                ,{ color : "yellow", lo : 51, hi : 69.9 }
                                ,{ color: "green", lo : 70, hi: 94.9 }
                                ,{ color: "darkgreen", lo: 95, hi: 100 }
                              ],
                            id: "gauge",
                            valueFontColor:"black",
                            pointer: true,
                            gaugeWidthScale: 0.8,
                            counter: true,
                            relativeGaugeSize: true,
                            titleFontColor: "black",
                            fontColor:"black",
                            value: this.KPIValue,
                            min: this.KPIMin,
                            max: this.KPIMax,
                            title: this.KPITitle,

                          })


                      })
                    </script>'
              ></iframe>
            </v-responsive>
          </v-card>
        </v-flex>

        <v-flex class="mb-4" xs12 sm6 md6 lg3>
          <v-card class="mx-2 text-xs-center">
            <v-responsive>
              <iframe
                class="kpi-frame"
                scrolling="no"
                frameborder="0"
                width="100%"
                srcdoc='
                  <div id="gauge" class="gauge" style="width:200px;margin: 0 auto;color:black";></div>


                    <script src="https://cdnjs.cloudflare.com/ajax/libs/justgage/1.2.2/justgage.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.4/raphael.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.js"></script>

                    <script>
                      axios.get("http://192.168.1.211:8000/api/books/kpi/?format=json").then(response => {

                            KPITitle=response.data.title;
                            KPIValue=response.data.value;
                            KPIMin=response.data.min_value;
                            KPIMax=response.data.max_value;

                            var g = new JustGage({
                                  customSectors: [
                                  { color : "orange", lo : 0, hi : 50 }
                                ,{ color : "yellow", lo : 51, hi : 69.9 }
                                ,{ color: "green", lo : 70, hi: 94.9 }
                                ,{ color: "darkgreen", lo: 95, hi: 100 }
                              ],
                            id: "gauge",
                            valueFontColor:"black",
                            pointer: true,
                            gaugeWidthScale: 0.8,
                            counter: true,
                            relativeGaugeSize: true,
                            titleFontColor: "black",
                            fontColor:"black",
                            value: this.KPIValue,
                            min: this.KPIMin,
                            max: this.KPIMax,
                            title: this.KPITitle,

                          })


                      })
                    </script>'
              ></iframe>
            </v-responsive>
          </v-card>
        </v-flex>

        <v-flex class="mb-4" xs12 sm6 md6 lg3>
          <v-card class="mx-2 text-xs-center">
            <v-responsive>
              <iframe
                class="kpi-frame"
                scrolling="no"
                frameborder="0"
                width="100%"
                srcdoc='
                  <div id="gauge" class="gauge" style="width:200px;margin: 0 auto;color:black";></div>


                    <script src="https://cdnjs.cloudflare.com/ajax/libs/justgage/1.2.2/justgage.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.4/raphael.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.js"></script>

                    <script>
                      axios.get("http://192.168.1.211:8000/api/books/kpi/?format=json").then(response => {

                            KPITitle=response.data.title;
                            KPIValue=response.data.value;
                            KPIMin=response.data.min_value;
                            KPIMax=response.data.max_value;

                            var g = new JustGage({
                                  customSectors: [
                                  { color : "orange", lo : 0, hi : 50 }
                                ,{ color : "yellow", lo : 51, hi : 69.9 }
                                ,{ color: "green", lo : 70, hi: 94.9 }
                                ,{ color: "darkgreen", lo: 95, hi: 100 }
                              ],
                            id: "gauge",
                            valueFontColor:"black",
                            pointer: true,
                            gaugeWidthScale: 0.8,
                            counter: true,
                            relativeGaugeSize: true,
                            titleFontColor: "black",
                            fontColor:"black",
                            value: this.KPIValue,
                            min: this.KPIMin,
                            max: this.KPIMax,
                            title: this.KPITitle,

                          })


                      })
                    </script>'
              ></iframe>
            </v-responsive>
          </v-card>
        </v-flex>

        <v-flex class="mb-4" xs12 sm6 md6 lg3>
          <v-card class="mx-2 text-xs-center">
            <v-responsive>
              <iframe
                class="kpi-frame"
                scrolling="no"
                frameborder="0"
                width="100%"
                srcdoc='
                  <div id="gauge" class="gauge" style="width:200px;margin: 0 auto;color:black";></div>


                    <script src="https://cdnjs.cloudflare.com/ajax/libs/justgage/1.2.2/justgage.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.4/raphael.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.js"></script>

                    <script>
                      axios.get("http://192.168.1.211:8000/api/books/kpi/?format=json").then(response => {

                            KPITitle=response.data.title;
                            KPIValue=response.data.value;
                            KPIMin=response.data.min_value;
                            KPIMax=response.data.max_value;

                            var g = new JustGage({
                                  customSectors: [
                                  { color : "orange", lo : 0, hi : 50 }
                                ,{ color : "yellow", lo : 51, hi : 69.9 }
                                ,{ color: "green", lo : 70, hi: 94.9 }
                                ,{ color: "darkgreen", lo: 95, hi: 100 }
                              ],
                            id: "gauge",
                            valueFontColor:"black",
                            pointer: true,
                            gaugeWidthScale: 0.8,
                            counter: true,
                            relativeGaugeSize: true,
                            titleFontColor: "black",
                            fontColor:"black",
                            value: this.KPIValue,
                            min: this.KPIMin,
                            max: this.KPIMax,
                            title: this.KPITitle,

                          })


                      })
                    </script>'
              ></iframe>
            </v-responsive>
          </v-card>
        </v-flex>
      
      </v-layout>
    </v-container>
    <!-- End KPI Cards Container -->


    

    <!-- Start Plotly Charts Container -->
    <v-container class="mb-2 pa-0">
      <v-layout class="wrap row mx-2">

        <v-flex xs12>
          <v-card class="ma-1 text-xs-center">
            <vue-plotly :data="glob.data" :layout="glob.layout" :options="glob.options"/>
          </v-card>
        </v-flex>

        <v-flex xs12>
          <v-card class="ma-1 text-xs-center">
            <vue-plotly
              :data="secTimeSeries.data"
              :layout="secTimeSeries.layout"
              :options="secTimeSeries.options"
            />
          </v-card>
        </v-flex>

        <v-flex xs12>
          <v-card class="ma-1 text-xs-center">
            <vue-plotly
              :data="degTimeSeries.data"
              :layout="degTimeSeries.layout"
              :options="degTimeSeries.options"
            />
          </v-card>
        </v-flex>

        <v-flex xs12>
          <v-card class="ma-1 text-xs-center">
            <vue-plotly :data="hist2d.data" :layout="hist2d.layout" :options="hist2d.options"/>
          </v-card>
        </v-flex>

        <v-flex xs12 md6>
          <v-card class="ma-1 text-xs-center">
            <vue-plotly :data="bar.data" :layout="bar.layout" :options="bar.options"/>
          </v-card>
        </v-flex>

        <v-flex xs12 md6>
          <v-card class="ma-1 text-xs-center">
            <vue-plotly :data="pie.data" :layout="pie.layout" :options="pie.options"/>
          </v-card>
        </v-flex>

        <v-flex xs12 md6>
          <v-card class="ma-1 text-xs-center">
            <vue-plotly :data="hist.data" :layout="hist.layout" :options="hist.options"/>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
    <!-- End Plotly Charts Container -->
  </div>
</template>




<!-- Start Script -->
<script>
  import VuePlotly from "@statnett/vue-plotly";
  import axios from "axios";

  export default {
    components: {
      VuePlotly
    },

    data() {
      return {
        api: {
          secTimeSeriesLine: "staff/api/degrees/staff_time_series/?format=json",
          degTimeSeriesLine: "staff/api/sections/staff_time_series/?format=json",
          globLine: "staff/api/degrees/bar/?format=json",
          staffPie: "staff/api/degrees/pie/?format=json",
          staffBar: "staff/api/degrees/pie/?format=json",
          staffHist: "staff/api/table/?format=json",
          staffHist2d: "staff/api/table/?format=json",
          summary_endpoint: "api/summary/?format=json"
        },

        secTimeSeries: {
          data: [],
          layout: {},
          options: { displaylogo: false }
        },
        degTimeSeries: {
          data: [],
          layout: {},
          options: { displaylogo: false }
        },

        glob: {
          data: [],
          layout: {},
          options: { displaylogo: false }
        },

        pie: {
          data: [],
          layout: {},
          options: { displaylogo: false }
        },

        bar: {
          data: [],
          layout: {},
          options: { displaylogo: false }
        },

        hist: {
          data: [],
          layout: {},
          options: { displaylogo: false }
        },
        hist2d: {
          data: [],
          layout: {},
          options: { displaylogo: false }
        },
        summary_labels: [],
        summary_values: []
      };
    },

    methods: {
      plotStaffPie() {
        axios
          .get(this.api.staffPie)
          .then(response => {
            let a = [];
            let b = [];
            for (let i = 0; i < response.data.labels.length; i++) {
              a[i] = response.data.labels[i];
              b[i] = response.data.values[i];
            }
            this.pie.data = [{ labels: a, values: b, type: "pie" }];
            this.pie.responsive = true;

            this.pie.layout = {
              title: "Staff Distrbution"
            };
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => console.log("success"));
      },

      plotStaffBar() {
        axios
          .get(this.api.staffBar)
          .then(response => {
            let a = [];
            let b = [];
            for (let i = 0; i < response.data.labels.length; i++) {
              a[i] = response.data.labels[i];
              b[i] = response.data.values[i];
            }
            this.bar.data = [
              {
                x: a,
                y: b,
                type: "bar",
                marker: {
                  color: "#00949B",
                  opacity: 0.8,
                  line: { color: "#19AC9E", width: 3 }
                }
              }
            ];

            this.bar.layout = {
              title: "staff degrees distribution",
              xaxis: {
                title: "degree"
              },
              yaxis: {
                title: "count"
              }
            };
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => console.log("success"));
      },

      plotStaffHist() {
        axios
          .get(this.api.staffHist)
          .then(response => {
            let a = [];
            //let b=[];

            response = response.data;

            for (let i = 0; i < response.data.length; i++) {
              a[i] = response.data[i][5];
              //b[i]=response.data[i][8]
            }
            //this.hist.data=[{x:a,y:b,type:'histogram2d'}]
            this.hist.data = [
              {
                x: a,
                type: "histogram",
                marker: {
                  color: "#6F6DB3",
                  opacity: 0.8,
                  line: { color: "#8080B9", width: 3 }
                }
              }
            ];

            this.hist.layout = {
              title: "staff gender distribution",
              xaxis: {
                title: "gender"
              },
              yaxis: {
                title: "count"
              }
            };
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => console.log("success"));
      },
      plotGlobLine() {
        axios
          .get(this.api.globLine)
          .then(response => {
            let a = [];
            let b = [];
            let c = [];

            response = response.data;

            for (let i = 0; i < response.labels.length; i++) {
              a[i] = response.labels[i];
            }
            for (let i = 0; i < response.values.length; i++) {
              b[i] = response.values[i];

              c.push({ x: a, y: b[i], name: response.legends[i] });
            }

            this.glob.data = c;

            this.glob.layout = {
              title: response.title,
              xaxis: {
                title: response.x_label
              },
              yaxis: {
                title: response.y_label
              }
            };
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => console.log("success"));
      },
      plotSecTimeSeriesLine() {
        axios
          .get(this.api.secTimeSeriesLine)
          .then(response => {
            let a = [];
            let b = [];
            let c = [];

            response = response.data;

            for (let i = 0; i < response.labels.length; i++) {
              a[i] = response.labels[i];
            }
            for (let i = 0; i < response.values.length; i++) {
              b[i] = response.values[i];

              c.push({ x: a, y: b[i], name: response.legends[i] });
            }

            this.secTimeSeries.data = c;

            this.secTimeSeries.layout = {
              title: response.title,
              xaxis: {
                title: response.x_label
              },
              yaxis: {
                title: response.y_label
              }
            };
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => console.log("success"));
      },

      plotDegTimeSeriesLine() {
        axios
          .get(this.api.degTimeSeriesLine)
          .then(response => {
            let a = [];
            let b = [];
            let c = [];

            response = response.data;

            for (let i = 0; i < response.labels.length; i++) {
              a[i] = response.labels[i];
            }
            for (let i = 0; i < response.values.length; i++) {
              b[i] = response.values[i];

              c.push({ x: a, y: b[i], name: response.legends[i] });
            }

            this.degTimeSeries.data = c;

            this.degTimeSeries.layout = {
              title: response.title,
              xaxis: {
                title: response.x_label
              },
              yaxis: {
                title: response.y_label
              }
            };
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => console.log("success"));
      },

      plotHist2d() {
        axios
          .get(this.api.staffHist2d)
          .then(response => {
            let a = [];
            let b = [];

            response = response.data;

            for (let i = 0; i < response.data.length; i++) {
              a[i] = response.data[i][7];
              b[i] = response.data[i][8];
            }
            this.hist2d.data = [{ x: a, y: b, type: "histogram2d" }];

            this.hist2d.layout = {
              title: "stuff count in every section and degree",
              xaxis: {
                title: "Degree"
              },
              yaxis: {
                title: "Section"
              }
            },
              this.hist2d.responsive = true
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => console.log("success"));
      },

      get_summary() {
        axios
          .get(this.api.summary_endpoint)
          .then(response => {
            response = response.data;
            for (let i = 0; i < response.length; i++) {
              this.summary_labels.push(response[i].title);
              this.summary_values.push(response[i].value);
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => console.log("success"));
      }
    },
    mounted() {
      this.get_summary();
      this.plotGlobLine();
      this.plotSecTimeSeriesLine();
      this.plotDegTimeSeriesLine();
      this.plotHist2d();
      this.plotStaffBar();
      this.plotStaffPie();
      this.plotStaffHist();

      console.log(window.navigator.language.substring(0, 2));
    }
  };
</script>
<!-- End Script -->



<!-- Start Styling on Dashboard.vue -->
<style scoped>

</style>
<!-- End Styling on Dashboard.vue -->
