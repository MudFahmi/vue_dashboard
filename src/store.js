import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as types from './mutation-types'
import Cookies from 'js-cookie';

import {
  app
} from './main'


Vue.use(Vuex)

export default new Vuex.Store({

  state: {

    lang: 'en',
    csrf_token: Cookies.get("csrftoken"),

    currentUser: {
      permissions: '',
      username: '',
      avatar: ''
    },


    themes: [{
        primary: 'grey darken-4',

        background: 'grey darken-2',

        text: 'white--text darken-4',

        icon: 'light-blue--text darken-4',

        button: 'grey darken-4 white--text darken-4 ',

      },

      {
        primary: 'blue darken-4',

        background: 'blue lighten-5',

        text: 'white--text darken-4',

        icon: 'white--text lighten-4',

        button: 'blue accent-3 white--text',
      },

      {
        primary: 'teal darken-3',

        background: 'grey lighten-2',

        text: 'white--text lighten-3',

        icon: 'amber--text lighten-4',

        button: 'teal lighten-2 white--text lighten-3 ',

      },

      {
        primary: 'orange darken-3',

        background: 'brown lighten-3',

        text: 'white--text darken-5',

        icon: 'brown--text darken-4',

        button: 'orange darken-2 white--text',
      },


      {
        primary: 'deep-purple darken2',

        background: 'brown lighten-4',

        text: 'white--text darken-4',

        icon: 'yellow--text',

        button: 'deep-purple lighten-2 yellow--text',
      },

      {
        primary: 'pink lighten-4',

        background: 'brown lighten-4',

        text: 'brown--text darken-1',

        icon: 'deep-purple--text darken-3',

        button: 'pink accent-1 white--text',
      },

    ],


    currentTheme: {

      primary: 'grey darken-4',

      background: 'grey darken-2',

      text: 'white--text darken-4',

      icon: 'light-blue--text darken-4',

      button: 'grey darken-4 white--text darken-4 ',

    },

  },

  mutations: {

    [types.SET_LANG](state, payload) {
      app.$i18n.locale = payload
      axios.get("en/accounts/lang/set/?lang=" + payload)
        .then(resp => {
          console.log(resp.data)
        })
        .catch(err => {
          console.log(err.data)
        })
    },

    auth_success(state, payload) {
      state.currentUser.permissions = payload.permissions
      state.currentUser.username = payload.username
      state.currentUser.avatar = payload.avatar
    },
    auth_error(state) {
      state.currentUser.permission = ''
      state.currentUser.username = ''
      state.currentUser.avatar = ''
    },

    change_theme(state, payload) {
      state.currentTheme = state.themes[payload]
    },






  },

  actions: {

    setLanguage({
      commit
    }, payload) {
      commit(types.SET_LANG, payload)

    },


    getPermissions({
      commit
    }) {
      return new Promise((resolve, reject) => {

        axios.get("me/")
          .then(resp => {
            let payload = {
              username: resp.data.username,
              permissions: resp.data.permissions,
              avatar: resp.data.avatar
            }

            console.log(resp)

            commit(types.SET_LANG, resp.data.lang)
            commit('auth_success', payload)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            reject(err)
          })
      })
    },


    changeTheme({
      commit
    }, theme_index) {

      let payload = theme_index

      commit('change_theme', payload)

    },




  },

  getters: {


    get_theme: state => state.currentTheme,

    permissions: state => state.currentUser.permissions,

    can_view_all: state => state.currentUser.permissions == 'can_view_all',
    can_view_data: state => state.currentUser.permissions == 'can_view_charts',
    can_view_drill: state => state.currentUser.permissions == 'can_view_drilldown',
    get_csrf_token: state => state.csrf_token



  }
})
