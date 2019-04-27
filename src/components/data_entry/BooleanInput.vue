<template>
  <div>
    <v-layout justify-center row>
      <v-flex md2>
        <h4>{{label}}</h4>
      </v-flex>
      <v-flex md2>
        <v-radio-group
          :name="name"
          v-model="input_val"
          :rules="textInputRules()"
          v-on:change="$emit('input',input_val)"
          row
        >
          <v-radio label="Yes" :value="true"></v-radio>
          <v-radio label="No" :value="false"></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex md6></v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: "BooleanInput",
  props: ["placeholder", "label", "name", "value", "required"],
  data() {
    return {
      input_val: this.value
    };
  },
  methods: {
    textInputRules() {
      let rules = [];
      if (this.required) {
        rules.push(v => !!v || "Name is required");
      }

      return rules;
    }
  }
};
</script>