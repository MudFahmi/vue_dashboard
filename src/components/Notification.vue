<template>
    <v-alert
      v-model="alerting"
      dismissible
      :type="type"
      class="v-alert--notification"
      transition="slide-fade"
      style="top:7%;right:5%;position:fixed; z-index:10"
    >
      {{content}}
    </v-alert>
 

</template>

<script>
export default {
    props :['alert','type','icon','content'],
    data() {
      return {
           alerting:this.alert
      }
  },
}
</script>

<style scoped>

.v-alert--notification {
  border-radius: 4px !important;
  border-top: none !important;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
