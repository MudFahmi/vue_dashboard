
<template>
  <div> 
  <v-expansion-panel  >
    <v-expansion-panel-content   v-for="(i) in (level1Array.length)" :key="i" >
     <div slot="header" v-on:click="level_2A_count(level1Array[i-1].id,level2a);level_2B_count(level1Array[i-1].id,level2b)"><h2 style="text-align:center">{{level1Array[i-1].name}} </h2>  <h2 style="text-align:center">{{level1Array[i-1].count}}</h2>
      
      <v-btn v-if="level1Array[i-1].count > 0 " :class="button"  v-on:click="level1Name = level1Array[i-1].name ; goToLevel(level1Array[i-1].id,level2a,level2b) " >{{$t("details")}}</v-btn>


      </div>

<v-layout v-if="loadingLevel1Count" row wrap justify-center>  
  <v-progress-circular 
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
</v-layout>
  

       <v-layout v-if="!loadingLevel1Count" row wrap>
        <v-flex xs12 lg6 mb-3>
        <v-expansion-panel  >
          <v-expansion-panel-content  v-for="(j) in (level2AArray.length)" :key="j">

            <div slot="header" v-on:click="level_3A_count(level1Array[i-1].id,level2AArray[j-1].id,level2a,level2b)" > <h2 style="text-align:center">{{level2AArray[j-1].name}} </h2>  <h2 style="text-align:center">{{level2AArray[j-1].count}}</h2>
               
          
           <v-btn :class="button" v-on:click="level1Name = level1Array[i-1].name ; level2Name = level2AArray[j-1].name ;goToLevel(level1Array[i-1].id,level2a,level2b,level2AArray[j-1].id)" >{{$t("details")}}</v-btn>
        
  
               
                </div>

        <v-expansion-panel>

            <v-layout v-if="loadingLevel2aCount" justify-center>  
              <v-progress-circular 
                    :size="70"
                    :width="7"
                    color="purple"
                    indeterminate
                ></v-progress-circular>
            </v-layout>
        
     <div v-if="!loadingLevel2aCount">

              <v-chip slot="activator" v-on:click="level1Name = level1Array[i-1].name ; level2Name = level2AArray[j-1].name ; level3Name = level3AArray[k-1].name ; goToLevel(level1Array[i-1].id,level2a,level2b,level2AArray[j-1].id,level3AArray[k-1].id)  " v-for="(k) in (level3AArray.length)" :key="k" style="padding:1.5%;font-size:1.5em" >
                  {{level3AArray[k-1].name}}  &nbsp;&nbsp;<i>{{level3AArray[k-1].count}}</i>
                  </v-chip>
       </div>

        </v-expansion-panel>    
            </v-expansion-panel-content>
        </v-expansion-panel>
        </v-flex>

        <v-flex xs12 lg5 offset-lg1>
         <v-expansion-panel>
          <v-expansion-panel-content  v-for="(j) in (level2BArray.length)" :key="j">
                <div slot="header"  v-on:click="level_3B_count(level1Array[i-1].id,level2BArray[j-1].id,level2b,level2a)" ><h2 style="text-align:center">{{level2BArray[j-1].name}} </h2>  <h2 style="text-align:center">{{level2BArray[j-1].count}}</h2>  
           <v-btn :class="button" v-on:click=" level1Name = level1Array[i-1].name ; level2Name = level2BArray[j-1].name ; goToLevel(level1Array[i-1].id,level2b,level2a,level2BArray[j-1].id)">{{$t("details")}}</v-btn>
     </div>
      <v-expansion-panel  >
            <v-layout v-if="loadingLevel2bCount" justify-center>  
              <v-progress-circular 
                    :size="70"
                    :width="7"
                    color="purple"
                    indeterminate
                ></v-progress-circular>
            </v-layout>
        
     <div v-if="!loadingLevel2bCount">
          <v-chip v-on:click="level1Name = level1Array[i-1].name ; level2Name = level2BArray[j-1].name ; level3Name = level3BArray[k-1].name ; goToLevel(level1Array[i-1].id,level2b,level2a,level2BArray[j-1].id,level3BArray[k-1].id)  "  v-for="(k) in (level3BArray.length)" :key="k" style="padding:1.5%;font-size:1.5em" >
                  {{level3BArray[k-1].name}}  &nbsp;&nbsp;<i>{{level3BArray[k-1].count}}</i>
              </v-chip>
   
     </div>
        </v-expansion-panel>
              
            </v-expansion-panel-content>
          </v-expansion-panel>  
        </v-flex>
       </v-layout>  

      </v-expansion-panel-content>
    </v-expansion-panel> 

   
  </div>    
</template>
    

<script>

import axios from 'axios'
import VuePlotly from '@statnett/vue-plotly'
import store from '../store'


export default {

    components:{
        VuePlotly
    },
     
     props:{

         
         level1:String,
         

     },
     computed: {
         primary() {
            return this.$store.getters.get_theme.primary
        },
        button(){
          return this.$store.getters.get_theme.button
        } 
    },

    data(){
        return{

            loadingLevel1Count :true,
            loadingLevel2aCount :true,
            loadingLevel3aCount :true,
            loadingLevel2bCount :true,



            level1Name:'',
            level2Name:'',
            
            level3Name:'',
           

            level1Array   :[],
            level2AArray  :[],
            level2BArray  :[],
            level3AArray  :[],
            level3BArray  :[],
            levels:['sections','degrees','gender'],

            level2a:'',
            level2b:'',
            staffData:{
              headers:'',
              data :''
            },

            staffDataLevel1:{
              headers:'',
              data :''
            },

            staffDataLevel2:{
              headers:'',
              data :''
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
   methods:{

     goToLevel(level1id,level2,level3,level2id,level3id){

       let query_params  =''

       if(level3id){
         query_params = {level1:this.level1 , level1ID:level1id,level1Name:this.level1Name ,level2a:level2,level2aID:level2id,level2aName:this.level2Name , level2b:level3,level2bID:level3id,level2bName:this.level3Name}
       }
       else if(level2id){

         query_params = {level1:this.level1 , level1ID:level1id,level1Name:this.level1Name ,level2a:level2,level2aID:level2id,level2aName:this.level2Name , level2b:level3}

       }
       else{
          query_params = {level1:this.level1 , level1ID:level1id,level1Name:this.level1Name ,level2a:level2 , level2b:level3 }
       }

       let routeData = this.$router.resolve({name: 'level details', query:query_params});
        window.open(routeData.href, '_blank');


     },
 

    level_3A_count(level1ID,level2ID,level2,level3){
            
            this.loadingLevel2aCount=true

            axios.get("staff/api/drilldown/?"+this.level1+"="+level1ID+"&"+level2+"="+level2ID+"&query="+level3)
                   .then(response => {
                    response=response.data   
                    let lvl=[]
                    let x_axis=[]
                    let y_axis=[]
                     switch (level3){
                        case "sections":  
                         for (let i=0;i<response.values.length;i++){
                                   
                            lvl.push({id:String(response.values[i][0]) , name:response.meta.sections[i].name , count:response.values[i][1]})
                            x_axis.push(response.meta.sections[i].name)
                            y_axis.push(response.values[i][1])                     
                         }  
                        break;

                        case "degrees":
                    
                          for (let i=0;i<response.values.length;i++){            
                            lvl.push({id:String(response.values[i][0]) , name:response.meta.degrees[i].name , count:response.values[i][1]})
                            x_axis.push(response.meta.degrees[i].name)
                            y_axis.push(response.values[i][1])                      
                         }  
                        break;

                        case"gender":
                          for (let i=0;i<response.values.length;i++){
                                   
                            lvl.push({id:String(response.values[i][0]) , name:response.meta.gender[i].name , count:response.values[i][1]})
                            x_axis.push(response.meta.gender[i].name)
                            y_axis.push(response.values[i][1])                       
                         }  
                        break;
                    }
                    this.level3AArray=lvl
                    
                   })
                   .catch(error => {console.log(error)})
                   .finally(() => {console.log("success")
                    this.loadingLevel2aCount=false
                   })

        },

        level_3B_count(level1ID,level2ID,level2,level3){
            
            this.loadingLevel2bCount=true

            axios.get("staff/api/drilldown/?"+this.level1+"="+level1ID+"&"+level2+"="+level2ID+"&query="+level3)
                   .then(response => {
                    response=response.data        
                    let lvl=[]
                     switch (level3){
                        case "sections":  
                         for (let i=0;i<response.values.length;i++){                
                            lvl.push({id:String(response.values[i][0]) , name:response.meta.sections[i].name , count:response.values[i][1]}) 
                         }  
                        break;

                        case "degrees":                
                          for (let i=0;i<response.values.length;i++){                                
                            lvl.push({id:String(response.values[i][0]) , name:response.meta.degrees[i].name , count:response.values[i][1]})                    
                         }  
                        break;

                        case"gender":
                          for (let i=0;i<response.values.length;i++){                                 
                            lvl.push({id:String(response.values[i][0]) , name:response.meta.gender[i].name , count:response.values[i][1]})                       
                         }  
                        break;
                    }
                    this.level3BArray=lvl
                   })
                   .catch(error => {console.log(error)})
                   .finally(() => {console.log("success")
                    this.loadingLevel2bCount=false
                   })

        },

 

       

        level_2A_count(level1ID,level2){
           this.loading=true 
            axios.get("staff/api/drilldown/?"+this.level1+"="+level1ID+"&query="+level2)
                   .then(response => {
                    response=response.data
          
                    let lvl=[]

                     switch (level2){
                        case "sections":  
                         for (let i=0;i<response.values.length;i++){
                            lvl.push({id:String(response.values[i][0]) , name:response.meta.sections[i].name , count:response.values[i][1]})                                  
                     }  
                        break;

                        case "degrees":
                         for (let i=0;i<response.values.length;i++){      
                          lvl.push({id:String(response.values[i][0]) , name:response.meta.degrees[i].name , count:response.values[i][1]}) 
                         }
                        break;

                        case"gender":
                         for (let i=0;i<response.values.length;i++){
                           lvl.push({id:String(response.values[i][0]) , name:response.meta.gender[i].name , count:response.values[i][1]}) 
                          }
                        break;
                    }
                    this.level2AArray=lvl                   
                   })
                   .catch(error => {console.log(error)})
                   .finally(() => {console.log("success")   
                   this.loadingLevel1Count = false
                   }
                   )

        },

        level_2B_count(level1ID,level2){ 
           axios.get("staff/api/drilldown/?"+this.level1+"="+level1ID+"&query="+level2)
                   .then(response => {
                    response=response.data
                    let lvl=[]
                     switch (level2){
                        case "sections":  
                         for (let i=0;i<response.values.length;i++){
                            lvl.push({id:String(response.values[i][0]) , name:response.meta.sections[i].name , count:response.values[i][1]})                                                 
                     }  
                        break;

                        case "degrees":
                         for (let i=0;i<response.values.length;i++){      
                          lvl.push({id:String(response.values[i][0]) , name:response.meta.degrees[i].name , count:response.values[i][1]}) 
                         }
                        break;

                        case"gender":

                         for (let i=0;i<response.values.length;i++){
                           lvl.push({id:String(response.values[i][0]) , name:response.meta.gender[i].name , count:response.values[i][1]}) 
                          }
                        break;

                    }
                    this.level2BArray=lvl
                  
                   })
                   .catch(error => {console.log(error)})
                   .finally(() => console.log("success"))

        },
       

        level_1_count(){
            axios.get("staff/api/drl/?levels="+this.level1)
                   .then(response => {
                    response=response.data                    
                    let lvl=[]                   
                    switch (this.level1){
                        case "sections":         
                         for (let i=0;i<response.values.length;i++){                 
                       lvl.push({id:String(response.values[i][0]) , name:response.meta.sections[i].name , count:response.values[i][1]})
                     }  
                        break;

                        case "degrees":
                         for (let i=0;i<response.values.length;i++){                       
                       lvl.push({id:String(response.values[i][0]) , name:response.meta.degrees[i].name , count:response.values[i][1]})
                     }
                        break;

                        case"gender":
                         for (let i=0;i<response.values.length;i++){                        
                       lvl.push({id:response.values[i][0] , name:response.meta.gender[i].name , count:response.values[i][1]})
                     }
                        break;
                    }
                    this.level1Array = lvl
                    let level  = this.levels.indexOf(this.level1);
                    this.levels.splice(level, 1)  
                    this.level2a = this.levels[0]
                    this.level2b = this.levels[1]
                   })
                   .catch(error => {console.log(error)})
                   .finally(() => console.log("success"))
        },
       
    },

    mounted(){
        this.level_1_count()
    }
}
</script>


<style>

</style>