<template>
  <div ma-3>
    <v-toolbar flat color="white">
      <v-toolbar-title>Manufacturers</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        color="primary"
        @click=" filter_manufacturer_meta(); filter_manufacturer_dialog=!filter_manufacturer_dialog"
      >Filter Manufacturers</v-btn>
      <v-btn
        flat
        color="primary"
        @click="add_manufacturer_meta(); add_manufacturer_dialog=!add_manufacturer_dialog"
      >Add Manufacturer</v-btn>
    </v-toolbar>

    <!-- filter manufacturers !-->

    <v-layout row justify-center>
      <v-dialog v-model="filter_manufacturer_dialog" persistent max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">Choose Filter ptions</span>
          </v-card-title>
          <v-card-text>
            <form-generator
              v-if="!isEmpty(filter_formData_manufacturer)"
              :schema="filter_schema_manufacturer"
              v-model="filter_formData_manufacturer"
            ></form-generator>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              flat
              @click="filter_manufacturer_dialog = false ;clearFormData_filter() "
            >Reset</v-btn>
            <v-btn color="blue darken-1" flat @click="filter_manufacturer_values()">Filter</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <!-- Add data in model !-->
    <v-dialog
      v-model="add_manufacturer_dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-toolbar dark color="primary">
        <v-btn icon dark @click=" clearFormData(); add_manufacturer_dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Add New Manufacturer</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <!-- Add new field in model !-->

          <v-layout row justify-center>
            <v-dialog v-model="add_field_dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn flat dark v-on="on">Add New Field</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Field Attributes</span>
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm8 md8>
                          <v-text-field
                            label="Name*"
                            v-model="fieldName"
                            :error-messages="fieldNameErrors"
                            required
                            @input="$v.fieldName.$touch()"
                            @blur="$v.fieldName.$touch()"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm8 md8>
                          <v-select
                            v-model="fieldType"
                            :items="inputTypes"
                            label="Field Type"
                            outline
                          ></v-select>
                        </v-flex>

                        <v-flex xs12 sm8 md8>
                          <v-text-field
                            label="Max Length"
                            v-model="max_length"
                            type="number"
                            min="1"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                          <v-checkbox v-model="notNull" label=" Make this field required "></v-checkbox>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    flat
                    @click="add_field_dialog = false  ; clearFieldValues() "
                  >Close</v-btn>
                  <v-btn color="blue darken-1" flat @click="add_field_values()">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-toolbar-items>
      </v-toolbar>
      <v-card>
        <v-container>
          <v-card-text>
            <form-generator
              v-if="!isEmpty(formData_manufacturer)"
              :schema="schema_manufacturer"
              v-model="formData_manufacturer"
            ></form-generator>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              flat
              @click="add_manufacturer_dialog = false  ; clearFormData()  "
            >Close</v-btn>
            <v-btn color="blue darken-1" flat @click="add_or_update_manufacturer_values() ">Save</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      hide-actions
      :items="manufacturers"
      :expand="expand"
      item-key="id"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-xs-center">{{ props.item.id }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.country }}</td>
          <td class="text-xs-center">{{ props.item.added_by_name }}</td>
          <td class="text-xs-center">{{ props.item.added_at }}</td>

          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="get_update_manufacturer(props.item.id); add_manufacturer_dialog=!add_manufacturer_dialog"
            >edit</v-icon>
          </td>
        </tr>
      </template>
      <template>
        <v-card flat>
          <v-card-text>
            <!-- More Data Here -->
          </v-card-text>
        </v-card>
      </template>
    </v-data-table>

    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination_page" :length="pagination_total" @input="paginate"></v-pagination>
    </div>
    <div style="flex: 1 1 auto;"></div>

    <v-snackbar v-model="snackbar" color="error" :timeout="6000" top>
      {{ error }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import FormGenerator from "@/components/data_entry/FormGenerator";
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { parse } from "querystring";

export default {
  mixins: [validationMixin],
  components: { FormGenerator },
  validations: {
    fieldName: { required }
  },
  computed: {
    fieldNameErrors() {
      const errors = [];
      if (!this.$v.fieldName.$dirty) return errors;
      !this.$v.fieldName.required && errors.push("Field Name is required.");
      return errors;
    }
  },

  data() {
    return {
      expand: false,
      headers: [
        {
          text: "#ID",
          align: "center",
          value: "id"
        },
        { text: "Name", value: "name", align: "center" },
        { text: "Country", value: "country", align: "center" },
        { text: "Added By", value: "added_by_name", align: "center" },
        { text: "Added At", value: "added_at", align: "center" },
        { text: "Actions", value: "actions", align: "center" }
      ],
      manufacturers: [],

      add_asset_dialog: false,
      add_field_dialog: false,
      add_manufacturer_dialog: false,
      add_facility_dialog: false,

      fieldName: "",
      inputTypes: [
        "NumberInput",
        "TextInput",
        "BooleanInput",
        "DateTimeInput",
        "DateInput",
        "TimeInput",
        "TextFieldInput"
      ],
      fieldType: "TextInput",
      max_length: null,
      notNull: false,

      formData_manufacturer: {},
      schema_manufacturer: [],

      filter_manufacturer_dialog: false,
      //filter_values: ['name','serial_number','model_number','status','manufacturer','facility'],
      filter_formData_manufacturer: {},
      filter_schema_manufacturer: [],

      pagination_page: 1,
      pagination_total: 0,
      pagination_perPage: 0,
      pagination_visible: 7,

      snackbar: false,
      error: null
    };
  },

  methods: {
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },

    clearFormData() {
      let attributes = Object.keys(this.formData_manufacturer);
      for (let i = 0; i < attributes.length; i++) {
        delete this.formData_manufacturer[attributes[i]];
      }
    },

    clearFormData_filter() {
      let attributes = Object.keys(this.filter_formData_manufacturer);
      for (let i = 0; i < attributes.length; i++) {
        delete this.filter_formData_manufacturer[attributes[i]];
      }
      this.get_manufacturers();
    },

    clearFieldValues() {
      this.fieldName = null;
      this.fieldType = "TextInput";
      this.notNull = false;
    },

    paginate(page) {
      let endpoint = "assets/manufacturers/?page=" + page;

      if (!this.isEmpty(this.filter_formData_manufacturer)) {
        let filters = "&";
        let attributes = Object.keys(this.filter_formData_manufacturer);
        for (let i = 0; i < attributes.length; i++) {
          if (this.filter_formData_manufacturer[attributes[i]] == null) {
            filters += attributes[i] + "=&";
          } else {
            filters +=
              attributes[i] +
              "=" +
              this.filter_formData_manufacturer[attributes[i]] +
              "&";
          }
        }
        console.log(filters);
        endpoint += filters;
      }
      axios
        .get(endpoint)
        .then(response => {
          this.pagination_page = page;
          this.manufacturers = response.data.results;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
        });
    },

    get_manufacturers() {
      let endpoint = "assets/manufacturers/";
      axios
        .get(endpoint)
        .then(response => {
          this.pagination_page = response.data.current;
          this.pagination_total = response.data.numberOfPages;
          this.manufacturers = response.data.results;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
        });
    },

    add_manufacturer_meta() {
      //this.formData_asset = Object.assign({},this.formData_asset_default)
      //console.log(this.formData_asset)

      axios
        .get("assets/manufacturers/?get_meta=true")
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

                data[fields[i].name] = null;
              }
               }
            } else {
              res[i]["type"] = "model_field";
              schema.push(res[i]);
              data[res[i].name] = res[i].value;
            }
          }

          this.schema_manufacturer = schema;

          //this.formData_asset_default = Object.assign({},data)
          data.name = null;

          this.formData_manufacturer = data;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => console.log("success"));
    },

    add_or_update_manufacturer_values() {
      let formData_manufacturer = {};

      let attributes = Object.keys(this.formData_manufacturer);

      for (let i = 0; i < this.schema_manufacturer.length; i++) {
        if (this.schema_manufacturer[i].required === "required") {
          if (this.formData_manufacturer[attributes[i]] == "") {
            console.log(
              this.schema_manufacturer[i].label + " Can not be empty"
            );
            this.snackbar = true;
            this.error =
              this.schema_manufacturer[i].label + " Can not be empty";
            return false;
          }
        }
      }

      let add_extra_data = [];

      for (let i = 0; i < this.schema_manufacturer.length; i++) {
        if (this.schema_manufacturer[i].type === "extra_model_field") {
          add_extra_data.push({
            name: this.schema_manufacturer[i].name,
            value: formData_manufacturer[this.schema_manufacturer[i].name]
          });
        } else {
          formData_manufacturer[
            this.schema_manufacturer[i].name
          ] = this.formData_manufacturer[this.schema_manufacturer[i].name];
        }
      }

      let fields = { fields: add_extra_data };

      formData_manufacturer["extra_data"] = JSON.stringify(fields);

let config = {
        headers: {
          "X-CSRFToken": this.$store.getters.get_csrf_token
        }
      };

      if (this.formData_manufacturer.id) {
        axios
          .put(
            "assets/manufacturers/" + this.formData_manufacturer.id + "/",
            formData_manufacturer ,config
          )

          .then(response => {
            console.log(response);

            this.get_manufacturers();

            this.add_manufacturer_dialog = false;
            this.clearFormData();
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => console.log("success"));
      } else {
        axios
          .post("assets/manufacturers/", formData_manufacturer,config)
          .then(response => {
            console.log(response);
            this.get_manufacturers();

            this.add_manufacturer_dialog = false;
            this.clearFormData();
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => console.log("success"));
      }
    },

    add_field_values() {
      this.$v.$touch();
      if (this.fieldName.length != "") {
        axios
          .get("assets/manufacturers/scheme/")
          .then(response => {
            let scheme = JSON.parse(response.data.scheme);

            let fields1 = [];
            if (!this.isEmpty(scheme)) {
              fields1 = scheme.fields;
            }
            if (this.notNull) {
              this.notNull = "required";
            }

            console.log(scheme.fields);

            let fieldObject = {
              name: this.fieldName,
              required: this.notNull,
              label: this.fieldName,
              fieldType: this.fieldType,
              max_length: this.max_length
            };

            fields1.push(fieldObject);
            let scheme1 = { fields: fields1 };
            let final = { scheme: JSON.stringify(scheme1) };

let config = {
        headers: {
          "X-CSRFToken": this.$store.getters.get_csrf_token
        }
      };

            axios
              .put("assets/manufacturers/scheme/", final , config)
              .then(response => {
                console.log(response);

                this.fieldName = null;
                this.fieldType = "TextInput";
                this.notNull = false;

                let id = this.formData_manufacturer.id;
                if (id) {
                  this.clearFormData();
                  this.get_update_manufacturer(id);
                  this.add_field_dialog = false;
                } else {
                  this.clearFormData();
                  this.add_manufacturer_meta();
                  this.add_field_dialog = false;
                }
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
      }
    },

    get_update_manufacturer(id) {
      // this.formData_asset = Object.assign({},this.formData_asset_default)
      // this.schema_asset = []

      axios
        .get("assets/manufacturers/?get_meta=true")
        .then(response => {
          let res = response.data.meta;
          let schema = [];

          for (let i = 0; i < res.length; i++) {
            if (res[i].name === "extra_scheme") {
              let extra_scheme = JSON.parse(res[i].value);
               if (!this.isEmpty(extra_scheme)) {
              let fields = extra_scheme.fields;
              for (let i = 0; i < fields.length; i++) {
                fields[i]["type"] = "extra_model_field";
                schema.push(fields[i]);
              }
               }
            } else {
              res[i]["type"] = "model_field";
              schema.push(res[i]);
            }
          }

          this.schema_manufacturer = schema;

          axios
            .get("assets/manufacturers/" + id + "/")
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
              this.formData_manufacturer = data;
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

    filter_manufacturer_meta() {
      axios
        .get("assets/manufacturers/?get_meta=true")
        .then(response => {
          let res = response.data.filters;

          console.log(res);
          let schema = [];
          let data = {};
          for (let i = 0; i < res.length; i++) {
            schema.push(res[i]);
            data[res[i].name] = res[i].value;
          }

          this.filter_schema_manufacturer = schema;
          this.filter_formData_manufacturer = data;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => console.log("success"));
    },

    filter_manufacturer_values() {
      let filters = "?";
      let attributes = Object.keys(this.filter_formData_manufacturer);

      for (let i = 0; i < attributes.length; i++) {
        if (this.filter_formData_manufacturer[attributes[i]] == null) {
          filters += attributes[i] + "=&";
        } else {
          if (this.filter_schema_manufacturer[i].multi) {
            let j = 0;
            for (
              let j = 0;
              j < this.filter_formData_manufacturer[attributes[i]].length;
              j++
            ) {
              filters +=
                attributes[i] +
                "=" +
                this.filter_formData_manufacturer[attributes[i]][j] +
                "&";
            }
          } else {
            filters +=
              attributes[i] +
              "=" +
              this.filter_formData_manufacturer[attributes[i]] +
              "&";
          }
        }
      }
      console.log(filters);
      let endpoint = "assets/manufacturers/" + filters;
      axios
        .get(endpoint)
        .then(response => {
          this.pagination_page = 1;
          this.pagination_total = response.data.numberOfPages;
          this.manufacturers = response.data.results;
          this.filter_manufacturer_dialog = false;
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
    this.get_manufacturers();
  }
};
</script>