<template>
    


    <form>
        <h2 align-center>Add Event Or Task to Schedule</h2>
    <v-text-field
      v-model="title"
      :error-messages="titleErrors"
      label="Title"
      required
      @input="$v.title.$touch()"
      @blur="$v.title.$touch()"
    ></v-text-field>

    <v-textarea
          outline
          v-model="details"
          :error-messages="detailsErrors"
          label="Details"
          required
          height="80px"
          
          @input="$v.details.$touch()"
          @blur ="$v.details.$touch()"
        ></v-textarea>

    <h3>when start </h3>
    <v-layout row wrap>

      <v-flex
        sm12
        md6 >
    <v-menu
        v-model="menu_date_from"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date_from"
            label="pick start date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date_from" @input="menu_date_from = false"></v-date-picker>
      </v-menu>
    </v-flex>

    <v-flex
      sm12
      md6 >
  <v-menu
        ref="menu_time_from"
        v-model="menu_time_from"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time_from"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="time_from"
            label="Picker start time"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu_time_from"
          v-model="time_from"
          full-width
          @click:minute="$refs.menu_time_from.save(time_from)"
        ></v-time-picker>
      </v-menu>
    </v-flex>  
    </v-layout>

      <h3>when finish </h3>
    <v-layout row wrap>

      <v-flex
        sm12
        md6 >
    <v-menu
        v-model="menu_date_to"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date_to"
            label="pick start date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date_to" @input="menu_date_to = false"></v-date-picker>
      </v-menu>
    </v-flex>

    <v-flex
      sm12
      md6 >
 <v-menu
        ref="menu_time_to"
        v-model="menu_time_to"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time_to"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="time_to"
            label="Picker start time"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu_time_to"
          v-model="time_to"
          full-width
          @click:minute="$refs.menu_time_to.save(time_to)"
        ></v-time-picker>
      </v-menu>
    </v-flex>  
    </v-layout>

        <v-textarea
          outline
          v-model="notes"
          :error-messages="notesErrors"
          label="Make Some Notes"
          hint="Hint text"
          required
          height="90px"
          @input="$v.notes.$touch()"
          @blur ="$v.notes.$touch()"
        ></v-textarea>
  
  
    <div class="picker">
       <v-icon left >
         color_lens
        </v-icon>
      <input id="fg-color" v-on:focus="color_palette_open = false" type="text" maxlength="7" v-model="colors.hex" readonly>
      <button class="fg-color-sample" v-on:click.prevent="toggle" v-bind:style="{ background: colors.hex }"></button>
    </div>
    <chrome-picker v-show="color_palette_open" v-model="colors" ></chrome-picker>


    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>


</template>

<script>

import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

import { Photoshop,Material,Compact,Swatches,Slider,Sketch,Chrome } from 'vue-color'

export default {


   components: {
    'material-picker': Material,
    'compact-picker': Compact,
    'swatches-picker': Swatches,
    'slider-picker': Slider,
    'sketch-picker': Sketch,
    'chrome-picker': Chrome,
    'photoshop-picker': Photoshop
  },

    mixins: [validationMixin],

    validations: {
      title   : { required  },
      details : { },
      notes   : { },
    
      
    },

    data: () => ({

      today   : new Date().toISOString().slice(0,10),
      title   : '',
      details : '',
      
      date_from :'',
      menu_date_from:false,
      time_from :'',
      menu_time_from:false,

      date_to :'',
      menu_date_to:false,
      time_to :'',
      menu_time_to:false,
     
      notes   : '',

        colors: {
         "hex": "#000000",
         "source": "hex"
        },
      updateValue: '',
      hex: '',
      color_palette_open:false,
    }),

    computed: {
      titleErrors () {
        const errors = []
        if (!this.$v.title.$dirty) return errors
        !this.$v.title.required && errors.push('title is required.')
        return errors
    },
    detailsErrors () {
        const errors = []
        if (!this.$v.details.$dirty) return errors
    },

    notesErrors () {
        const errors = []
        if (!this.$v.notes.$dirty) return errors
    },

    },

methods: {

toggle() {
 
        this.color_palette_open = !this.color_palette_open
        this.colors.source = 'hex'
     },
    submit () {
        //this.$v.$touch()

        console.log(this.colors)
      },
    clear () {
        this.$v.$reset()
        this.title   = ''
        this.details = ''
        this.notes   = ''
      },

    addDays(date,days){
    var incept_dt = date.split("-");
    var in_date = new Date(incept_dt[0], incept_dt[1], incept_dt[2])
    in_date.setDate(in_date.getDate() + 1)
    var yy = String(in_date.getFullYear());
    var mm = String(in_date.getMonth());
    var dd = String(in_date.getDate()+days);
    
    if(!mm[1]){
      mm='0'+mm
    }
    if(!dd[1]){
      dd='0'+dd
    }
    return final_Date = yy + "-"+ mm + "-"+ dd; 
      
    },
}
}
</script>

<style scoped>


.vue-color__chrome__alpha-wrap, 
.vue-color__chrome__toggle-btn, 
.vue-color__chrome__fields-wrap,
.vue-color__chrome__color-wrap {
  display: none !important;
}

.vue-color__chrome__controls {
    align-items: center;
}

.vue-color__chrome__active-color {
  margin-top: 0;
}

#fg-color {
  height: 35px;
  flex: 1;
}

.fg-color-sample {
  display: inline-block;
  width: 50%;
  border: none;
}

.picker {
  display: flex;
  justify-content: justify;
  border: solid 1px;
}

#colorpicker {
  max-width: 100%;
}

</style>
