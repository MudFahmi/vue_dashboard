<template>
  <div>
    <h4>{{label}}</h4>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <v-menu
          v-model="menu_date"
          :required="required"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="pick date"
              prepend-icon="event"
              readonly
              v-on="on"
              :rules="textInputRules()"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu_date = false ;  update()"></v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex sm12 md6>
        <v-menu
          ref="menu_time"
          v-model="menu_time"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="time"
              :rules="textInputRules()"
              label="Picker time"
              prepend-icon="access_time"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu_time"
            v-model="time"
            full-width
            @click:minute="$refs.menu_time.save(time); update()"
          ></v-time-picker>
        </v-menu>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: "DateTimeInput",
  props: ["placeholder", "label", "name", "value", "required"],
  data() {
    return {
      today: new Date().toISOString().slice(0, 10),

      date: new Date().toISOString().slice(0, 10),
      menu_date: false,
      time: "00:00",
      menu_time: false,

      input_val: this.value
    };
  },

  methods: {
    update() {
      this.input_val = this.date + " " + this.time;
      this.$emit("input", this.input_val);
    },

    textInputRules() {
      let rules = [];
      if (this.required) {
        rules.push(v => !!v || "Name is required");
      }

      return rules;
    }
  },
  created() {
    if(this.input_val != ''){
    let get = this.input_val.split(" ");
  
    this.date = get[0];
    this.time = get[1];
  }
  }
};
</script>