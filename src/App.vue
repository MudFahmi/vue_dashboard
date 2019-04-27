<template>
  <v-app :class="this.$store.getters.get_theme.background">
    

     <Navbar /> 

    <v-alert
      v-model="alert"
      dismissible
      :type="notification.type"
      class="v-alert--notification"
      transition="slide-fade"
      style="top:7%;right:5%;position:fixed; z-index:10"
    >
      {{notification.content}}
    </v-alert>
    <v-content style="padding-top:17px;">
      <router-view></router-view>  
    </v-content>
      <Footer/>  


  </v-app>

</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";

import { setInterval } from "timers";

export default {
  name: "App",
  components: {
    Navbar,
    Notification,
    Footer
  },
  data() {
    return {
      notification: {
        type: "success",
        icon: "",
        content: ""
      },
      alert: false
    };
  },

  methods: {
    repeat() {

      /*   axios.get('staff/api/degrees/pie/?format=json')
            .then(response => {
                      let a=[];
                      let b=[];
                     for (let i=0;i<response.data.labels.length;i++){
                       a[i]=response.data.labels[i]
                       b[i]=response.data.values[i]
                     }


                     this.notification={type:'success',icon:'',content:a[1]+" "+a[2]}
                     this.alert=true


                     //this.notification.alert=true
                     //this.notification.content = a[1] +" "+ a[2]
 
                 

                   }).catch(error => {console.log(error)})
                   .finally(() => console.log("success"))
                   */
                   } 
  

  },

  mounted() {
    setInterval(() => {
      this.repeat();
    }, 1000 * 20);
  }
};
</script>

<style>
@media print {
  * {
    text-align: center;
  }

  input [type="button"] {
    display: none;
  }
  .v-card {
    margin-top: 6%;
  }
  .v-input {
    display: none;
  }
  .v-datatable__actions {
    display: none;
  }
  .v-btn {
    display: none;
  }
}
</style>

