import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import DataView from './views/DataView.vue'
import store from './store.js'
import Analysis from './views/Analysis.vue'
import LevelDetails from './views/LevelDetails.vue'
import Log from './components/Log.vue'
import DataEntry from './views/DataEntry.vue'
import Calendar from './views/Calendar.vue'
import Manager from './views/Manager.vue'
import Maintenance from './views/Maintenance.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

let router = new Router({

  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta :{
          title: 'Dashboard',
          permissions:['can_view_data','can_view_all','can_view_drill']     
        } 
       
      },
      {
        path: '/data-view',
        name: 'dataview',
        component: DataView,
        meta :{
          title: 'Data View',
          permissions:['can_view_data','can_view_all'],
          
         
        } 
      },
      {
        path: '/analysis',
        name: 'analysis',
        component: Analysis,
         meta :{
          title: 'Analysis',
          permissions:['can_view_drill','can_view_all'],
          
        
        } 
      },
      {
        path: '/level_details',
        name: 'level details',
        component: LevelDetails,
        props(route) {
           return  route.query || {}
         },
        meta :{
          title: 'details',
          permissions:['can_view_drill','can_view_all'],
               
        }
     },
     {
      path: '/log',
      name: 'Log View',
      component: Log,
      props(route) {
        return route.query || {}
      },
      meta: {
        title: 'Log',
        permissions:['can_view_all'],
        
      }
    },
    {
      path: '/data-entry',
      name: 'Data Entry',
      component: DataEntry,
      meta: {
        title: 'Data Entry',
        permissions:['can_view_all'],
       

      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: {
        title: 'Calendar',
        permissions:['can_view_all'],
        
        
      }
    },
    {
      path: '/manage',
      name: 'Manager',
      component: Manager,
      meta: {
        title: 'Manage',
        permissions:['can_view_all'],
       
      }
    },
    {
      path: '/maintenance',
      name: 'Maintenance',
      component: Maintenance,
      meta: {
        title: 'Maintenance',
        permissions:['can_view_all'],
      }
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
      meta: {
        title: 'None',
      }
    },

  ],

})


router.beforeEach((to, from, next) => {
  if (to.meta.title !== "None")
    to.matched.some(record => document.title = record.meta.title);
  if (!store.getters.permissions && to.name != '404') {
    store.dispatch('getPermissions').then(response => {

      if (to.matched.some(record => record.meta.permissions.length > 0)) {

        if (matching(to.meta.permissions , store.getters.permissions )) {
          next()
        } else {
          next({
            path: '/*'
          })
        }
      }
       else {
        next()
      }
    }).catch(error => {
      next({
        path: '*'
      })
    })
  } else {
    if (to.matched.some(record => record.meta.permissions.length > 0)) {
      if (matching(to.meta.permissions , store.getters.permissions )) {
        next()
      } else {
        next({
          path: '/*'
        })
      }
    }  else {
      next()
    }
  }

})

function matching(a,b) {

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if(a[i]===b[j]){
        return true
      }
      
    }
  }

  return false
  
}

export default router;