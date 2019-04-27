<template>

<v-container>

    <v-card>

        <v-card-title>
       <h3><span v-if="level1Name"> {{ level1 }} is {{level1Name}} </span>
       <span v-if="level2aName"> And {{ level2a }} is {{level2aName}} </span>
       <span v-if="level2bName"> And {{ level2b }} is {{level2bName}} </span>  </h3>
       <v-spacer></v-spacer>
    
      <v-btn :class="button" v-on:click="downloadExcelFile()">
       <span>{{$t("export_as_excel")}}</span>
        <v-icon :class="icon" right>archive</v-icon>
      </v-btn>


        </v-card-title>
            <v-layout row wrap>

              <v-flex md6 v-if="barChart.data[0]">
                <v-card >
                   <vue-plotly  :data="barChart.data" :layout="barChart.layout" :options="barChart.options"/>
                </v-card>
              </v-flex>

              <v-flex md6  v-if="pieChart.data[0]">
                <v-card >
                   <vue-plotly :data="pieChart.data" :layout="pieChart.layout" :options="pieChart.options"/>
                </v-card>
              </v-flex>

            </v-layout>
  
 <template v-if="staffData.headers.length">
 <v-data-table item-key="id"  :headers="staffData.headers" :items="staffData.data" class="elevation-1" >
       <template slot="items" slot-scope="props">
        
        <td v-for="(l) in (staffData.headers.length)" :key="l" class="text-xs-center"> {{ props.item[l-1] }}</td>
       

      </template> 
    
     
    </v-data-table>
</template>
        
        </v-card> 
</v-container>
</template>

<script>
import axios from 'axios'
import VuePlotly from '@statnett/vue-plotly'
import store from '../store'


export default {

    components:{
        VuePlotly
    },    

props: ['level1', 'level1ID','level1Name','level2a', 'level2aID','level2aName','level2b', 'level2bID','level2bName'],

data(){
    return{

        staffData:{
            headers:[],
            data:[]
        },

        barChart:{
              data    : [],
              layout  : {},
              options : {}
            },
            
            pieChart:{
               data    : [],
               layout  : {},
               options : {},

            },

    }
},
computed: {
         primary() {
            return this.$store.getters.get_theme.primary
        },
        button(){
          return this.$store.getters.get_theme.button
        },
        icon(){
          return this.$store.getters.get_theme.icon
        }
    },

methods:{
   
     viewStaff(level1,level1ID,level2a,level2b,level2aID,level2bID){
          let temp_level1 = level1
          let temp_level2a = level2a
          let temp_level2b = level2b 

          if(level1 == 'sections' || this.level1 =='degrees'){

               level1 = level1.slice(0, this.level1.length-1)
          }
          if(level2a == 'sections' || level2a =='degrees'){
               level2a = level2a.slice(0,level2a.length-1)
          }
          if(level2b == 'sections' || level2b =='degrees'){
               level2b = level2b.slice(0, level2b.length-1)
          }
        
        let api_url=""

        if(level2bID){
           api_url = api_url = "staff/api/table/?"+level1+"="+level1ID+"&"+level2a+"="+level2aID+"&"+level2b+"="+level2bID
       }
       else if (level2aID){
         api_url = "staff/api/table/?"+level1+"="+level1ID+"&"+level2a+"="+level2aID
       }
       else if(level1ID){
        api_url="staff/api/table/?"+level1+"="+level1ID
       }
        
        console.log(api_url)


            axios.get(api_url)
                   .then(response => {
                    response=response.data

                    let header=[];
                    for (let i=0;i<response.headers.length;i++){
                       header[i]={ text: response.headers[i], value: response.headers[i], align: 'center'} 
                       
                      
                     }
                    
                     this.staffData={headers:header,data:response.data}  

                    if(level2bID){
                            
                        }
                        else if (level2aID && response.data[0] ){
                            this.makeBarChart(temp_level1,level1ID,temp_level2a,'Bar Chart Based on '+temp_level2b,level2aID,temp_level2b)
                            this.makePieChart(temp_level1,level1ID,temp_level2a,'Pie Chart Based on '+temp_level2b,level2aID,temp_level2b) 
                        }
                        else if(level1ID && response.data[0]){
                            this.makeBarChart(temp_level1,level1ID,temp_level2a,'Bar Chart Based on '+temp_level2a)
                            this.makePieChart(temp_level1,level1ID,temp_level2b,'Pie Chart Based on '+temp_level2b)  
                        }

                   })
                   .catch(error => {console.log(error)})
                   .finally(() => {console.log("success")
                
                   })  
        },


    makeBarChart(level1,level1ID,level2,chart_title,level2ID,level3){

       let api_url =''
       let lvl     = ''

       if(level3){
           api_url = "staff/api/drilldown/?"+this.level1+"="+level1ID+"&"+level2+"="+level2ID+"&query="+level3
           lvl = level3
       }
       else{
         api_url = "staff/api/drilldown/?"+this.level1+"="+level1ID+"&query="+level2
           lvl = level2
       }
    
          axios.get(api_url)
                   .then(response => {
                    response=response.data

                    let x_axis=[]
                    let y_axis=[]

                     switch (lvl){
                        case "sections":  
                         for (let i=0;i<response.values.length;i++){                
                            x_axis.push(response.meta.sections[i].name)
                            y_axis.push(response.values[i][1])
                   
                         }  
                        break;

                        case "degrees":
                    
                          for (let i=0;i<response.values.length;i++){
                            x_axis.push(response.meta.degrees[i].name)
                            y_axis.push(response.values[i][1])
                       
                         }  
                        break;

                        case"gender":

                          for (let i=0;i<response.values.length;i++){
                            x_axis.push(response.meta.gender[i].name)
                            y_axis.push(response.values[i][1])
                    
                         }  
                        break;
                    }
                    this.barChart.data=[{x:x_axis,y:y_axis,type:"bar"}]
                    this.barChart.layout= {
                      title:chart_title
                    }
                    
                   })
                   .catch(error => {console.log(error)})
                   .finally(() => {console.log("success bar")
                   
                   })
     },

    makePieChart(level1,level1ID,level2,chart_title,level2ID,level3){

       let api_url =''
       let lvl     = ''

       if(level3){
           api_url = "staff/api/drilldown/?"+level1+"="+level1ID+"&"+level2+"="+level2ID+"&query="+level3
           lvl = level3
       }
       else{
         api_url = "staff/api/drilldown/?"+level1+"="+level1ID+"&query="+level2
           lvl = level2
       }
    
          axios.get(api_url)
                   .then(response => {
                    response=response.data

                    let x_axis=[]
                    let y_axis=[]

                     switch (lvl){
                        case "sections":  
                         for (let i=0;i<response.values.length;i++){                
                            x_axis.push(response.meta.sections[i].name)
                            y_axis.push(response.values[i][1])
                   
                         }  
                        break;

                        case "degrees":
                    
                          for (let i=0;i<response.values.length;i++){
                            x_axis.push(response.meta.degrees[i].name)
                            y_axis.push(response.values[i][1])
                       
                         }  
                        break;

                        case"gender":

                          for (let i=0;i<response.values.length;i++){
                            x_axis.push(response.meta.gender[i].name)
                            y_axis.push(response.values[i][1])
                    
                         }  
                        break;
                    }
                    this.pieChart.data=[{labels:x_axis,values:y_axis,type:"pie"}]
                    this.pieChart.layout={
                      title : chart_title
                    }
                    
                   })
                   .catch(error => {console.log(error)})
                   .finally(() => {console.log("success bar")
                   
                   })

      },

      downloadExcelFile(){

          if(this.level1 == 'sections' || this.level1 =='degrees'){
               this.level1 = this.level1.slice(0, this.level1.length-1)
          }
          if(this.level2a == 'sections' || this.level2a =='degrees'){
               this.level2a = this.level2a.slice(0,this.level2a.length-1)
          }
          if(this.level2b == 'sections' || this.level2b =='degrees'){
               this.level2b = this.level2b.slice(0, this.level2b.length-1)
          } 

       let api_url=''
       
       let name = new Date().toLocaleString().replace("/","_").replace("/","_").replace(" ","_").replace(" ","_").replace(":","_").replace(":","_").replace(",","_")

       console.log(name)

       if(this.level2bID)
          api_url = "staff/api/table/?"+this.level1+"="+this.level1ID+"&"+this.level2a+"="+this.level2aID+"&"+this.level2b+"="+this.level2bID+"&type=xls&filename="+name
       else if(this.level2aID)
          api_url= "staff/api/table/?"+this.level1+"="+this.level1ID+"&"+this.level2a+"="+this.level2aID+"&type=xls&filename="+name
       else
          api_url= "staff/api/table/?"+this.level1+"="+this.level1ID+"&type=xls&filename="+name



       
       

        window.open(api_url, '_blank');
     
     }, 
},


mounted() {
   
   this.viewStaff(this.level1,this.level1ID,this.level2a,this.level2b,this.level2aID,this.level2bID)

    
},




}
</script>

<style>

</style>
