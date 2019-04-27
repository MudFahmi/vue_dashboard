<template>
  <div>
    <v-text-field
      :name="name"
      v-model="input_val"
      @input="$emit('input',input_val)"
      :placeholder="placeholder"
      :label="label"
      :rules="textInputRules()"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  name: "TextInput",
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