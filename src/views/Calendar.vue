<template>
  <v-app>
    <v-layout wrap>
      <v-flex sm12 lg3 class="pa-3 mb-3 feature-pane">
        <v-card>
          <v-container>
            <v-card-text>
              <form-generator
                v-if="!isEmpty(formData_workOrder)"
                :schema="schema_workOrder"
                v-model="formData_workOrder"
              ></form-generator>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat>Reset</v-btn>
              <v-btn color="blue darken-1" flat @click="add_workOrder_values()  ">Save</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex sm12 lg9 class="pl-3">
        <v-sheet class="bb1">
          <v-layout wrap>
            <v-flex sm4 xs12 class="text-sm-left text-xs-center">
              <v-btn @click="$refs.calendar.prev()">
                <v-icon dark left>keyboard_arrow_left</v-icon>Prev
              </v-btn>
            </v-flex>
            <v-flex sm4 xs12 class="text-xs-center">
              <v-select v-model="type" :items="typeOptions" label="Type"></v-select>
            </v-flex>
            <v-flex sm4 xs12 class="text-sm-right text-xs-center">
              <v-btn @click="$refs.calendar.next()">
                Next
                <v-icon right dark>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>

          <v-calendar
            ref="calendar"
            v-model="today"
            :value="today"
            :type="type"
            :dark="dark"
            :weekdays="weekdays"
          >
            <template v-slot:day="{ date }">
              <template v-for="event in eventsFromMap[date]">
                <v-menu :key="event.id" v-model="event.open" full-width offset-x>
                  <template v-slot:activator="{ on }">
                    <div
                      v-if="!event.time"
                      v-ripple
                      class="my-event"
                      :class="event.color"
                      v-on="on"
                      v-html="event.title"
                    ></div>
                  </template>
                  <!-- Start pop up Card Contains work order details -->
                  <v-card color="grey lighten-3" max-width="600px" flat>
                    <v-toolbar :color="event.color">
                      <v-toolbar-title class="black--text">Title</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn icon @click=" id = event.id ; update_workOrder_dialog = true">
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-title primary-title>
                      <v-container>
                        <v-layout row>
                          <v-flex xs6 order-lg2>
                            <v-layout row>
                              <v-flex>Alaa</v-flex>
                            </v-layout>
                            <v-layout row>
                              <v-flex>Alaa</v-flex>
                            </v-layout>
                            <v-layout row>
                              <v-flex>Alaa</v-flex>
                            </v-layout>
                            <v-layout row>
                              <v-flex>Alaa</v-flex>
                            </v-layout>
                            <v-layout row>
                              <v-flex>Alaa</v-flex>
                            </v-layout>
                            <v-layout row>
                              <v-flex>Alaa</v-flex>
                            </v-layout>
                            <v-layout row>
                              <v-flex>Alaa</v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex xs6>
                            El Hamouly
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn flat color="secondary">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                  <!-- End pop up Card Contains work order details -->
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-flex>

      <v-dialog
        v-model="update_workOrder_dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-toolbar dark color="primary">
          <v-btn icon dark @click=" update_workOrder_dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Update Work Order</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items></v-toolbar-items>
        </v-toolbar>
        <v-container>
          <UpdateWorkOrder v-if="update_workOrder_dialog" :id="id"/>
        </v-container>
      </v-dialog>
    </v-layout>
  </v-app>
</template>
<script>
import FormGenerator from "@/components/data_entry/FormGenerator";
import UpdateWorkOrder from "@/components/calendar/UpdateWorkOrder";
import axios from "axios";

export default {
  components: {
    FormGenerator,
    UpdateWorkOrder
  },

  data: () => ({
    dark: false,
    today: new Date().toISOString().slice(0, 10),
    nowMenu: false,
    end: "2019-01-06",
    weekdays: [6, 0, 1, 2, 3, 4, 5],
    type: "month",
    start: "2019-01-01",
    end: "2019-01-06",
    typeOptions: [
      { text: "Week", value: "week" },
      { text: "Month", value: "month" }
    ],

    id:0,

    formData_workOrder: {},
    schema_workOrder: [],

    workOrders: [],

    update_workOrder_dialog: false
  }),

  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsFromMap() {
      let map = {};
      this.workOrders.forEach(e =>
        (map[e.view_date] = map[e.view_date] || []).push(e)
      );

      return map;
    }
  },

  methods: {
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },

    open(event) {
      alert(event.title);
    },

    parseDate(str) {
      var incept_dt = str.split("-");

      return new Date(incept_dt[0], incept_dt[1] - 1, incept_dt[2]);
    },

    datediff(first, second) {
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    },

    addDays(date, days) {
      var incept_dt = date.split("-");
      var in_date = new Date(incept_dt[0], incept_dt[1] - 1, incept_dt[2]);
      in_date.setDate(in_date.getDate() + days);
      var yy = String(in_date.getFullYear());
      var mm = String(in_date.getMonth() + 1);
      var dd = String(in_date.getDate());
      let final_Date = "";
      if (!mm[1]) {
        mm = "0" + mm;
      }
      if (!dd[1]) {
        dd = "0" + dd;
      }
      final_Date = yy + "-" + mm + "-" + dd;

      return final_Date;
    },

    add_workOrder_meta() {
      axios
        .get("orders/?get_meta=true")
        .then(response => {
          let res = response.data.meta;
          let schema = [];
          let data = {};
          for (let i = 0; i < res.length; i++) {
            if (res[i].name === "extra_scheme") {
              let extra_scheme = JSON.parse(res[i].value);
              if (!this.isEmpty(extra_scheme)) {
                let fields = extra_scheme.fields;
                for (let i = 0; i < fields.length; i++) {
                  fields[i]["type"] = "extra_model_field";
                  schema.push(fields[i]);

                  data[fields[i].name] = "";
                }
              }
            } else {
              res[i]["type"] = "model_field";
              schema.push(res[i]);
              data[res[i].name] = res[i].value;
            }
          }

          this.schema_workOrder = schema;
          this.formData_workOrder = data;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => console.log("success"));
    },

    add_workOrder_values() {
      let formData_workOrder = {};
      let attributes = Object.keys(this.formData_workOrder);

      let add_extra_data = [];

      for (let i = 0; i < this.schema_workOrder.length; i++) {
        if (this.schema_workOrder[i].required === "required") {
          if (this.formData_workOrder[attributes[i]] == "") {
            console.log(this.schema_workOrder[i].label + " Can not be empty");
            this.snackbar = true;
            this.error = this.schema_workOrder[i].label + " Can not be empty";
            return false;
          }
        }
      }
      for (let i = 0; i < this.schema_workOrder.length; i++) {
        if (this.schema_workOrder[i].type === "extra_model_field") {
          add_extra_data.push({
            name: this.schema_workOrder[i].name,
            value: this.formData_workOrder[this.schema_workOrder[i].name]
          });
        } else {
          formData_workOrder[
            this.schema_workOrder[i].name
          ] = this.formData_workOrder[this.schema_workOrder[i].name];
        }
      }

      let fields = { fields: add_extra_data };
      formData_workOrder["extra_data"] = JSON.stringify(fields);
      console.log(this.formData_workOrder);

      let config = {
        headers: {
          "X-CSRFToken": this.$store.getters.get_csrf_token
        }
      };

      axios
        .post("orders/", formData_workOrder,config)
        .then(response => {
          console.log(response);
          this.get_workOrders();
          //this.clearFormData();
        })
        .catch(error => {
          console.log(error.response);
        })
        .finally(() => console.log("success"));
    },

    get_workOrders() {
      let endpoint = "orders/";
      axios
        .get(endpoint)
        .then(response => {
          let workOrders = [];
          let pre_workOrders = response.data;

          for (let i = 0; i < pre_workOrders.length; i++) {
            let start_date_time = pre_workOrders[i].start_date.split(" ");
            pre_workOrders[i].start_date_day = start_date_time[0];

            let end_date_time = pre_workOrders[i].end_date.split(" ");
            pre_workOrders[i].end_date_day = end_date_time[0];

            pre_workOrders[i].open = false;
            pre_workOrders[i].color = "red yellow";
            pre_workOrders[i].duration =
              this.datediff(
                this.parseDate(pre_workOrders[i].start_date_day),
                this.parseDate(pre_workOrders[i].end_date_day)
              ) + 1;

            for (let j = 0; j < pre_workOrders[i].duration; j++) {
              let element = Object.assign({}, pre_workOrders[i]);

              element.view_date = this.addDays(
                pre_workOrders[i].start_date_day,
                j
              );

              workOrders.push(element);
            }
          }

          this.workOrders = workOrders;

          console.log(workOrders);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
        });
    }
  },

  mounted() {
    this.add_workOrder_meta();

    this.get_workOrders();
  }
  /* mounted() {
        let eventat = []
        let eventually =[]
        let enter =''

        for (let i=0;i<this.events.length;i++){

        this.events[i].duration = this.datediff(this.parseDate(this.events[i].date_from),this.parseDate(this.events[i].date_to))+1
        
       
        
        for (let j=0;j<this.events[i].duration;j++){

            enter = ''

            enter= {
                    id:this.events[i].id,
                    title: this.events[i].title,
                    details: this.events[i].details,
                    date_from:this.events[i].date_from,
                    time_from: this.events[i].time_from,
                    date_to: this.events[i].date_to,
                    time_to: this.events[i].time_to,
                    duration: this.events[i].duration,
                    view_date:this.addDays(this.events[i].date_from,j),
                    notes: this.events[i].notes,
                    color: this.events[i].color,
                    cateogry: this.events[i].cateogry,
                    periority: this.events[i].periority,
                    state:this.events[i].state,
                    open: this.events[i].open
                  } 


            
            eventually.push(enter)
         }  
                   
         }

         this.events=''
         this.events=eventually
       
    
    },  */
};
</script>

<style lang="stylus" scoped>
.feature-pane {
  position: relative;
  padding-top: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.day-header {
  margin: 0px 2px 2px 2px;
  padding: 2px 6px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  border-radius: 2px;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.day-body {
  position: absolute;
  top: 400px;
  height: 36px;
  margin: 2px;
  padding: 2px 6px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  border-radius: 2px;
  left: 0;
  right: 0;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.day {
  position: relative;
  height: 24px;
  margin: 0px;
  padding: 0px 6px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  border-radius: 2px;
  left: 0;
  right: 0;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  border: 1px solid;
  border-color: #1867c0 !important;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}

.bb1 {
  height: auto;
}
</style>