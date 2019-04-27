<template>
  <div>
    <v-text-field
      type="number"
      :name="name"
      v-model="input_val"
      min="0"
      v-on:input="$emit('input',parseInt(input_val))"
      :placeholder="placeholder"
      :label="label"
      :rules="textInputRules()"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  name: "NumberInput",
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