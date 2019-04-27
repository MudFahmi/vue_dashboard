<template>

 
<div >


<v-container style="backgound:white">


        <v-tabs
          slot="extension"
          v-model="level1"
          fixed-tabs
          color="white"
          
        >
          <v-tabs-slider ></v-tabs-slider>
          <v-tab href="#sections" class="primary--text">
            Section
          </v-tab>
  
          <v-tab href="#degrees" class="primary--text">
            Degree
          </v-tab>
  
          <v-tab href="#gender" class="primary--text">
            Gender
          </v-tab>
        </v-tabs>
   
  
      <v-tabs-items v-model="level1" class="white elevation-1" >
        <v-tab-item 
          :value="'sections'" 
        >
          <v-card>
            <DrillLevel v-bind:level1="'sections'" /> 
          </v-card>
        </v-tab-item>
        
         <v-tab-item 
          :value="'degrees'"
        >
          <v-card>
            <DrillLevel v-bind:level1="'degrees'" /> 
          </v-card>
        </v-tab-item>
        
         <v-tab-item 
          :value="'gender'"
        >
          <v-card >
            <DrillLevel v-bind:level1="'gender'" /> 
          </v-card>
        </v-tab-item>
      </v-tabs-items>

  </v-container>
    </div>
    
</template>

<script>

import DrillLevel from '../components/DrillLevel'
export default {
  
  components: {
      DrillLevel
  },
    

  data () {
    return {

    
        level1:null
      
    }
  },

}
</script>
<style>

</style>
