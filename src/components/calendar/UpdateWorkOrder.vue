<template>
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
        <v-btn color="blue darken-1" flat @click="update_workOrder_values() ">Save</v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
import FormGenerator from "@/components/data_entry/FormGenerator";

export default {
  components: {
    FormGenerator
  },
  props: ["id"],
  data: () => ({
    formData_workOrder: {},
    schema_workOrder: []
  }),

  methods: {
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },

    update_workOrder_meta() {
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

          axios
            .get("orders/" + this.id + "/")
            .then(response => {
              let res = response.data;
              let data = {};
              let attributes = Object.keys(res);

              for (let i = 0; i < attributes.length; i++) {
                if (attributes[i] === "extra_data") {
                  let extra_data = JSON.parse(res[attributes[i]]);

                  let fields = extra_data.fields;
                  for (let i = 0; i < fields.length; i++) {
                    data[fields[i].name] = fields[i].value;
                  }
                } else {
                  data[attributes[i]] = res[attributes[i]];
                }
              }
              this.formData_workOrder = data;
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => console.log("success"));
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => console.log("success"));
    },

    update_workOrder_values() {
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
        .put("assets/" + this.formData_workOrder.id + "/", formData_workOrder,config)

        .then(response => {
          console.log(response);
          //this.get_assets();
          //this.clearFormData();
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => console.log("success"));
    }
  },

  mounted() {
    this.update_workOrder_meta();
  }
};
</script>
<style>
</style>
