<template>
  <div>
    <v-tabs style="margin-bottom:12px;" v-model="tab" grow>
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="tab in tabs" :key="tab">{{ tab }}</v-tab>
    </v-tabs>

    <v-tabs-items  v-model="tab">
      <!-- ASSETS TAB -->
      <v-tab-item>
       <Assets />
      </v-tab-item>
      <!-- WORK ORDERS TAB -->
      <v-tab-item>
        <Calendar/>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>


<script>
import Calendar from "../views/Calendar.vue";

import Assets from "../components/maintenance/assets/Assets.vue";


export default {
  components: {
    Calendar,
    Assets,
   
  },
  data() {
    return {
      tab: null,
      tabs: ["Assets", "Work orders"],
    };
  }
};
</script>