<template>
  <v-container>
    <div class="text-xs-center">
      <v-toolbar flat color="white" id="log_table_header">
        <v-toolbar-title>Recent system activities logs</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="dialog=true">
          <img src="https://img.icons8.com/ios/24/000000/sorting-options.png">&nbsp;&nbsp; Filter
        </v-btn>
      </v-toolbar>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Filter</v-card-title>

          <v-card-text>
            <v-flex>
              <v-autocomplete
                v-model="user"
                :items="user_list"
                label="User"
                placeholder="User ..."
                required
              ></v-autocomplete>

              <v-autocomplete
                v-model="action"
                :items="action_list"
                label="Action"
                placeholder="Action ..."
                required
              ></v-autocomplete>

              <v-switch v-model="filter_by_date" :label="`Filter By Date`"></v-switch>
              <div v-if="filter_by_date">
                <v-layout row>
                  <v-dialog
                    ref="dialog1"
                    v-model="modal1"
                    :return-value.sync="start_date"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="start_date"
                        label="Start Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="start_date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal1 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog1.save(start_date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>

                  <v-dialog
                    ref="dialog2"
                    v-model="modal2"
                    :return-value.sync="end_date"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="end_date"
                        label="End Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="end_date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog2.save(end_date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-layout>
              </div>
            </v-flex>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog=false">close</v-btn>
            <v-btn color="blue darken-1" flat @click="reset()">Reset</v-btn>
            <v-btn color="primary" flat @click="filter_data()">Filter</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-data-table
      :headers="headers"
      :items="data"
      v-bind:pagination.sync="pagination"
      class="elevation-1 fixed-header"
      sort
    >
      <template v-slot:items="props">
        <tr @click="get_current_detail(props, data.indexOf(props.item))">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.username }}</td>
          <td>{{ props.item.action }}</td>
          <td>{{ props.item.timestamp }}</td>
          <td>{{ props.item.extra }}</td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-card-text>
            <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Record Details</h3>
            </div>
          </v-card-title>
            <table class="secondary lighten-5" style="width:100%; table-layout:fixed;">
              <tr v-for="item in current_table" :key="current_table.indexOf(item)">
                <td>{{item.key}}</td>
                <td>{{item.value}}</td>
              </tr>
            </table>
          </v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </v-container>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      filter_by_date: false,
      user: "",
      action: "",
      user_list: [],
      action_list: [],
      start_date: new Date().toISOString().substr(0, 10),
      end_date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal1: false,
      modal2: false,
      headers: [
        { text: "#", value: "id" },
        { text: "Username", value: "username" },
        { text: "Action", value: "action" },
        { text: "Timestamp", value: "timestamp" },
        { text: "Extra Info", value: "extra" }
      ],
      data: [],
      pagination: { sortBy: "id", descending: true, rowsPerPage: 5 },
      picker: new Date().toISOString().substr(0, 10),
      landscape: false,
      reactive: false,
      current_details: {},
      current_table: []
    };
  },
  methods: {
    get_log: function(params = {}) {
      let endpoint = `log/?action=${this.action}&user=${this.user}`;
      if (params.filter_by_date) {
        endpoint += `&start_date=${this.start_date}&end_date=${this.end_date}`;
      }
      axios
        .get(endpoint)
        .then(response => {
          response = response.data;
          this.data = [];
          for (let i = 0; i < response.length; i++) {
            let row = {};
            row.id = response[i].id;
            row.username = response[i].username;
            row.action = response[i].action;
            row.timestamp = response[i].timestamp;
            row.extra = response[i].extra.detail;
            row.object_url = response[i].object_url;
            row.details = null;
            this.data.push(row);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
        });
    },

    filter_data: function() {
      this.dialog = false;
      let params = {};
      params.filter_by_date = this.filter_by_date;

      if (this.filter_by_date) {
        params.start_date = this.start_date;
        params.end_date = this.end_date;
      }

      params.user = this.user;
      params.action = this.action;
      this.get_log(params);
    },
    reset: function() {
      this.user = "";
      this.action = "";
      this.filter_by_date = false;
      this.start_date = new Date().toISOString().substr(0, 10);
      this.end_date = new Date().toISOString().substr(0, 10);
      this.get_log();
    },
    populate_dropdowns: function() {
      let endpoint = "log/actions/";
      axios
        .get(endpoint)
        .then(response => {
          this.action_list = response.data.actions;
          this.user_list = response.data.users;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
        });
    },
    get_record: function(endpoint, index) {
      axios
        .get(`${endpoint}?short_details=true`)
        .then(response => {
          this.data[index].details = response.data;
          this.current_details = response.data;
          this.get_current_table(this.current_details);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success222");
        });
    },
    get_current_detail: function(props, index) {
      props.expanded = !props.expanded;
      if (this.data[index].details === null) {
        this.get_record(this.data[index].object_url, index);
      } else {
        this.current_details = this.data[index].details;
        this.get_current_table(this.current_details);
      }
    },
    get_current_table: function(obj) {
      this.current_table = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          this.current_table.push({ key: key, value: obj[key] });
          // console.log(`${key}==>${obj[key]}`);
        }
      }
      // console.log("=========================");
      console.table(this.current_table)
    }
  },
  mounted() {
    this.get_log();
    this.populate_dropdowns();
  }
};
</script>

<style scoped>

</style>
