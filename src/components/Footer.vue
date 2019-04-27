<template>
 <v-footer
      height="auto"
      :class="this.$store.getters.get_theme.primary"
    >
      <v-layout justify-center row wrap>
        
        <v-flex  :class="this.$store.getters.get_theme.text" py-3 text-xs-center   xs12 >
          &copy;2019 — <strong>Evorezm</strong>
        </v-flex>
      </v-layout>
    </v-footer>

</template>

<script>
export default {
    data(){
     return{   
  
    }
}
    
  
}
</script>

<style>

</style>