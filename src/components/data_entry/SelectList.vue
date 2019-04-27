<template>
  <div>
    <v-autocomplete
      :items="options"
      item-text="value"
      item-value="id"
      autocomplete
      box
      v-model="input_val"
      v-on:input="$emit('input', input_val)"
      :label="label"
      :multiple="multi"
      :rules="textInputRules()"
    ></v-autocomplete>
  </div>
</template>
<script>
export default {
  name: "SelectList",
  props: ["multi", "options", "name", "label", "value", "required"],
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
  },

  created() {
    if (this.multi && this.input_val == null) {
      this.input_val = [];
      this.$emit("input", this.input_val);
    }
  }
};
</script>