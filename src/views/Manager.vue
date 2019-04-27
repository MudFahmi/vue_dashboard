<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Employees</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="add_employee_dialog=!add_employee_dialog">Add Employee</v-btn>
    </v-toolbar>

    <v-dialog v-model="add_employee_dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    label="First Name*"
                    v-model="firstName"
                    :error-messages="firstNameErrors"
                    required
                    @input="$v.firstName.$touch()"
                    @blur="$v.firstName.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    label="Last Name*"
                    v-model="lastName"
                    :error-messages="lastNameErrors"
                    required
                    @input="$v.lastName.$touch()"
                    @blur="$v.lastName.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    label="Username*"
                    v-model="username"
                    :error-messages="usernameErrors"
                    required
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-autocomplete :items="roles"
                    label="Role*"
                    v-model="role"
                    required
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Email*"
                    v-model="email"
                    :error-messages="emailErrors"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Password*"
                    type="password"
                    :append-icon="show_password ? 'visibility' : 'visibility_off'"
                    :type="show_password ? 'text' : 'password'"
                    @click:append="show_password = !show_password"
                    v-model="password"
                    :error-messages="passwordErrors"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="add_employee_dialog = false  ; clear()">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="add_employee()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table :headers="headers" :items="employees" :expand="expand" item-key="id">
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-xs-center">{{ props.item.id }}</td>
          <td class="text-xs-center">{{ props.item.username }}</td>
          <td class="text-xs-center">{{ props.item.email }}</td>
          <td class="text-xs-center">
            <div v-if="props.item.is_active">
              <v-btn flat @click="toggle_active(employees.indexOf(props.item))">
                <v-icon color="teal">check_circle</v-icon>&nbsp;&nbsp;DEACTIVATE
              </v-btn>
            </div>
            <div v-else>
              <v-btn flat @click="toggle_active(employees.indexOf(props.item))">
                <v-icon color="error">highlight_off</v-icon>&nbsp;&nbsp;
                ACTIVATE&nbsp;&nbsp;&nbsp;
              </v-btn>
            </div>
          </td>

          <td class="text-xs-center">
            <div v-if="props.item.two_factor">
              <v-btn align-start flat @click="toggle_twofactor(employees.indexOf(props.item))">
                <v-icon color="teal">check_circle</v-icon>&nbsp;&nbsp;DISABLE
              </v-btn>
            </div>
            <div v-else>
              <v-btn align-start flat @click="toggle_twofactor(employees.indexOf(props.item))">
                <v-icon color="error">highlight_off</v-icon>&nbsp;&nbsp;ENABLE&nbsp;&nbsp;
              </v-btn>
            </div>
          </td>
          <td class="text-xs-center">
            <v-autocomplete :items="roles" v-model="props.item.role"></v-autocomplete>
          </td>

          <td class="text-xs-center">
            <div>
              <v-btn align-start flat @click="change_role(employees.indexOf(props.item))">
                <v-icon color="teal">save</v-icon>&nbsp;&nbsp;SAVE&nbsp;&nbsp;
              </v-btn>
            </div>
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
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    firstName: { required },
    lastName: { required },
    email: { required, email },
    username: { required },
    password: { required }
  },

  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("First Name is required.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("Last Name is required.");
      return errors;
    },

    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
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
        { text: "Username", value: "username", align: "center" },
        { text: "E-Mail", value: "email", align: "center" },
        { text: "Active", value: "active", align: "center" },
        { text: "Two-Factor", value: "twofactor", align: "center" },
        { text: "Role", value: "role", align: "center" },
        { text: "", value: "", align: "center" }
      ],
      roles: ["Manager", "Supervisor", "Employee", "Maintainer"],
      employees: [],
      add_employee_dialog: false,
      show_password: false,
      firstName: null,
      lastName: null,
      username: null,
      password: null,
      email: null, 
      role : null,
    };
  },

  methods: {
    get_employees: function() {
      let endpoint = "manager/company/employees/";
      axios
        .get(endpoint)
        .then(response => {
          this.employees = response.data;
          console.log(this.employees[0]);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
        });
    },
    toggle_active: function(index) {
      let id = this.employees[index].id;
      let active = this.employees[index].is_active;
      let config = {
        headers: {
          "X-CSRFToken": this.$store.getters.get_csrf_token
        }
      };
      let endpoint = `manager/company/employees/${id}/`;
      axios
        .put(endpoint, { is_active: !active }, config)
        .then(response => {
          this.employees[index].is_active = response.data.is_active;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
        });
    },
    change_role: function(index) {
      let id = this.employees[index].id;
      let role = this.employees[index].role;
      let config = {
        headers: {
          "X-CSRFToken": this.$store.getters.get_csrf_token
        }
      };
      let endpoint = `manager/company/employees/${id}/change_role/`;
      axios
        .put(endpoint, { role: role }, config)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
        });
    },

    toggle_twofactor: function(index) {
      let id = this.employees[index].id;
      let two_factor = this.employees[index].two_factor;
      let config = {
        headers: {
          "X-CSRFToken": this.$store.getters.get_csrf_token
        }
      };
      let endpoint = `manager/company/employees/${id}/toggle_twofactor/`;
      axios
        .put(endpoint, {}, config)
        .then(response => {
          this.employees[index].two_factor = response.data.two_factor;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
        });
    },

    add_employee: function() {
      this.$v.$touch();

      let config = {
        headers: {
          "X-CSRFToken": this.$store.getters.get_csrf_token
        }
      };

      let employee = {
        username: this.username,
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        role : this.role
      };
      let endpoint = `manager/company/employees/add/`;
      axios
        .post(endpoint, employee, config)
        .then(response => {
          console.log(response.data);
          this.get_employees();
          this.add_employee_dialog = false;
          this.username = '';
          this.firstName = '';
          this.lastName = '';
          this.password = '';
          this.email = '';
          this.role = '';
          this.$v.$reset()
        })
        .catch(error => {
          let errors = error.response.data;
          console.log(errors);

          console.log(erroes);
        })
        .finally(() => {
          console.log("success");
        });
    },

    clear() {
      this.$v.$reset();
      (this.firstName = ""),
        (this.lastName = ""),
        (this.username = ""),
        (this.password = ""),
        (this.email = null);
    }
  },
  mounted() {
    this.get_employees();
  }
};
</script>