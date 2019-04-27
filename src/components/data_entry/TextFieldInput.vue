<template>
  <div>
    <v-text-field
      :name="name"
      v-model="input_val"
      :rules="textInputRules()"
      v-on:input="$emit('input',input_val)"
      :placeholder="placeholder"
      :label="label"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  name: "TextFieldInput",
  props: ["placeholder", "label", "name", "value", "max_length", "required"],
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