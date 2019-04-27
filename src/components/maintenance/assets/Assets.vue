<template>
  <div>
    <v-tabs v-model="tab" grow>
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <!-- ASSETS TAB -->
      <v-tab-item>
       <ViewAssets />
      </v-tab-item>

      <!-- Manufacturers TAB -->
      <v-tab-item>
        <ViewManufacturer />
      </v-tab-item>

      <!-- Facilities TAB -->
      <v-tab-item>
        <ViewFacility />
      </v-tab-item>

    </v-tabs-items>
  </div>
</template>



<script>
import ViewAssets from "./ViewAssets.vue";
import ViewManufacturer from "./ViewManufacturer.vue";
import ViewFacility from "./ViewFacility.vue";

export default {
  components: {
    ViewAssets,
    ViewManufacturer,
    ViewFacility
  },
  data() {
    return {
      tab: null,
      tabs: ["Assets" , "Manufacturers","Facilities"],

     
    };
  }
};
</script>