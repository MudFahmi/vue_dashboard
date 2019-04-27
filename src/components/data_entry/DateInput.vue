<template>
  <div>
    <h4>{{label}}</h4>
    <v-layout row wrap>
      <v-flex sm12 md8>
        <v-menu
          v-model="menu_date"
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
              :rules="textInputRules()"
              label="pick date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu_date = false ;  update()"></v-date-picker>
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
      date: new Date().toISOString().slice(0, 10),
      menu_date: false,
      input_val: this.value
    };
  },

  methods: {
    update() {
      this.input_val = this.date;
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
  mounted() {
    this.date = this.input_val;
  }
};
</script>