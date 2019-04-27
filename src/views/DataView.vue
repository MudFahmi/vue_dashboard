<template>
  <v-container>
    <v-layout mb-3 v-if="chart" row wrap>
      <v-flex md12 v-if="histSection.data">
        <v-card flat>
          <vue-plotly
            :data="histSection.data"
            :layout="histSection.layout"
            :options="histSection.options"
          />
        </v-card>
      </v-flex>

      <v-flex md12 v-if="histDedree.data">
        <v-card flat>
          <vue-plotly
            :data="histDedree.data"
            :layout="histDedree.layout"
            :options="histDedree.options"
          />
        </v-card>
      </v-flex>

      <v-flex md12 v-if="histGender.data">
        <v-card flat>
          <vue-plotly
            :data="histGender.data"
            :layout="histGender.layout"
            :options="histGender.options"
          />
        </v-card>
      </v-flex>
    </v-layout>

    <v-card>
      <v-card-title>
        <h2>{{ $t("data_view") }}</h2>

        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" :label="$t('search')" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn :class="this.$store.getters.get_theme.button"  v-if="chart" v-on:click=" selected= [];chart=false ; ">{{ $t("reset") }}</v-btn>

        <v-btn v-if="selected.length>0"  :class="this.$store.getters.get_theme.button" v-on:click="downloadExcelFile()">{{ $t("export_as_pdf") }}</v-btn>
          
        <v-dialog v-if="selected.length>0" v-model="dialog" persistent max-width="400px">
          <v-btn :class="this.$store.getters.get_theme.button"  slot="activator" v-on:click="selectedTypes=[]">{{ $t("view_charts") }}</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ $t("view_charts") }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md12>
                    <v-checkbox
                      v-model="selectedTypes"
                      :label="$t('bar_chart_based_on_sections')"
                      value="histSection"
                    ></v-checkbox>
                  </v-flex>

                  <v-flex md12>
                    <v-checkbox
                      v-model="selectedTypes"
                      :label="$t('bar_chart_based_on_degrees')"
                      value="histDedree"
                    ></v-checkbox>
                  </v-flex>
                  <v-flex md12>
                    <v-checkbox
                      v-model="selectedTypes"
                      :label="$t('bar_chart_based_on_gender')"
                      value="histGender"
                    ></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :class="this.$store.getters.get_theme.button" flat @click="dialog=false">{{ $t("close") }} </v-btn>
              <v-btn :class="this.$store.getters.get_theme.button" flat @click=" makeChart()">{{ $t("view") }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>

      <v-data-table
        v-model="selected"
        item-key="id"
        select-all
        :loading="isLoading"
        :search="search"
        :headers="headers"
        :items="entry"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>

          <td>{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.emailaddress }}</td>
          <td class="text-xs-center">{{ props.item.gender }}</td>
          <td class="text-xs-center">{{ props.item.degree }}</td>
          <td class="text-xs-center">{{ props.item.section }}</td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import VuePlotly from "@statnett/vue-plotly";
import axios from "axios";


export default {
  components: {
    VuePlotly
  },

  data() {
    return {
      dialog: false,
      isLoading: true,
      chart: false,

      selectedTypes: [],

      selected: [],
      search: "",
      headers: [
        { text: "Name", value: "name", align: "center" },
        { text: "E-Mail", value: "emailaddress", align: "center" },
        { text: "Gender", value: "gender", align: "center" },
        { text: "Degree", value: "degree", align: "center" },
        { text: "Section", value: "section", align: "center" }
      ],

      entry: [],

      histDedree: {
        data: null,
        layout: {},
        options: {}
      },

      histSection: {
        data: null,
        layout: {},
        options: {}
      },
      histGender: {
        data: null,
        layout: {},
        options: {}
      }
    };
  },

  methods: {


downloadExcelFile(){

    let ids = []

     for (let i = 0; i < this.selected.length; i++) {
       
       ids.push(this.selected[i].id)

     }

     let name = new Date().toLocaleString().replace("/","_").replace("/","_").replace(" ","_").replace(" ","_").replace(":","_").replace(":","_").replace(",","_")

     let api_url = "staff/api/table/?ids="+ids+"&type=xls&filename="+name
      
    window.open(api_url, '_blank');
     

  },   
 makeChart() {
      if (this.selected.length >= 1) {
        this.dialog = false;
        this.chart = true;
        this.histSection.data = null;
        this.histDedree.data = null;
        this.histGender.data = null;

        let a = [];
        let b = [];
        let c = [];

        for (let i = 0; i < this.selected.length; i++) {
          a[i] = this.selected[i].degree;
          b[i] = this.selected[i].section;
          c[i] = this.selected[i].gender;
        }

        for (let i = 0; i < this.selectedTypes.length; i++) {
          switch (this.selectedTypes[i]) {
            case "histDedree":
              this.histDedree.data = [{ x: a, type: "histogram" ,marker: {color: '#994c00', opacity: 0.8, line: {color: '#630', width: 3}}}];
              this.histDedree.layout = { title: "BarChart based on degrees " };
              break;

            case "histSection":
              this.histSection.data = [{ x: b, type: "histogram",marker: {color: '#994c00', opacity: 0.8, line: {color: '#630', width: 3}}}];
              this.histSection.layout = { title: "BarChart based on sections" };
              break;

            case "histGender":
              this.histGender.data = [{ x: c, type: "histogram",marker: {color: '#994c00', opacity: 0.8, line: {color: '#630', width: 3}} }];
              this.histGender.layout = { title: "BarChart based on gender" };
              break;
          }
        }
      }
    },

    getAllData() {
      axios
        .get("staff/api/table/?format=json")
        .then(response => {
          let a = [];
          response = response.data;

          for (let i = 0; i < response.data.length; i++) {
            a.push({
              id: response.data[i][0],
              name: response.data[i][1],
              emailaddress: response.data[i][4],
              gender: response.data[i][5],
              degree: response.data[i][7],
              section: response.data[i][8]
            });
          }
          this.entry = a;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => (this.isLoading = false));
    }
  },

  mounted() {
    this.getAllData();
  }
};
</script>

<style scoped>
#app > div.application--wrap > main > div > div > div > div.elevation-1 > div.v-table__overflow > table > thead > tr:nth-child(1) > th.column.sortable.active.asc.text-xs-center {
  color: #F00;
}
</style>


  