<template>
  <div>

    <v-container>
    <h1>Form Generator</h1>

    <form-generator :schema="schema"
                    v-model="formData">
    </form-generator>


    <v-btn @click.prevent="submit">submit</v-btn>
    <v-btn @click.prevent="clear">clear</v-btn>

    <!--  <p v-for="(field, index) in schema"
               :key="index"
               >
               {{field.name}} 
               {{formData[field.name]}}

    </p>  -->

    </v-container>
  </div>
</template>
 
<script>
import FormGenerator from "../components/data_entry/FormGenerator";
import axios from 'axios'
import { constants } from 'fs';
export default {
  name: "GeneratorDemo",
  components: { FormGenerator },
   constants:{
         initialData: {},
    },
  data() {
    return {
     
      formData: {},
      schema: []
    };
  },

methods: { 

      
      submit () {
        
        console.log(this.formData)

         axios.post("api/books/create/",
     this.formData
    )
                   .then(response => {

                      console.log(response)

                   })
                   .catch(error => {console.log(error)})
                   .finally(() => console.log("success"))


    

      },

      clear () {
         
         //this.formData = {}
        
         console.log(this.initialData)

      },
        
        getFormTypes(){

          axios.get("api/books/create/?get_meta=true")
                   .then(response => {
                     
                      response = response.data
                      this.schema = response
                      
                      response[0].value ='vic'
                      let data = {}
                      for (let i=0;i<response.length;i++){
                        
                        
                        if(response[i].fieldType === "JsonInput")
                        {

                        data[response[i].name] = JSON.stringify(response[i].value)
                        }
                       else{
                        data[response[i].name] = response[i].value
                      //this.initialData[response[i].name] = response[i].value
                     
                     }
                     }
                      
                      this.formData = data 

                      

                   })
                   .catch(error => {console.log(error)})
                   .finally(() => console.log("success"))


        },
},

  mounted() {
    this.getFormTypes()

  },
};
</script>
