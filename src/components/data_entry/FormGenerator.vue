<template>
  <v-form ref="form">
    <component v-for="(field, index) in schema"
               :key="index"
               :is="field.fieldType"
               :value="value[field.name]"
               @input="updateForm(field.name, $event)"
               v-bind="field">
    </component>


   
  </v-form>
</template>

<script>
import NumberInput from "./NumberInput";
import SelectList from "./SelectList";
import TextInput from "./TextInput";
import BooleanInput from "./BooleanInput";
import DateTimeInput from "./DateTimeInput";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import TextFieldInput from "./TextFieldInput";
export default {
  name: "FormGenerator",
  components: { NumberInput, SelectList, TextInput ,BooleanInput,DateTimeInput,DateInput,TimeInput,TextFieldInput},
  props: ["schema", "value"],
  data() {
    return {
      formData:  ''
    };
  },
  methods: {
    updateForm(fieldName, value) {
     
      if(this.formData==''){
        this.formData = this.value
       
      }
      
      this.$set(this.formData, fieldName, value);
      this.$emit("input", this.formData);
    },
  },
 
};
</script>
