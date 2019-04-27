<template>
  <nav>
    <v-toolbar :class="this.$store.getters.get_theme.primary" flat app>
      <v-toolbar-side-icon @click="drawer = !drawer" :class="this.$store.getters.get_theme.icon"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="logo_container">
          <img v-bind:src="get_logo_url" class="logo">
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon  :class="this.$store.getters.get_theme.icon"  onclick="window.print();">
        <v-icon circle >picture_as_pdf</v-icon>
      </v-btn>

      <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
        <v-btn flat icon slot="activator">
          <v-icon :class="this.$store.getters.get_theme.icon">color_lens</v-icon>
        </v-btn>
        <v-card>
          <v-list dense>
            <v-list-tile avatar v-on:click="changeTheme(0)">
              <v-list-tile-content>
                <v-list-tile-title>Dark theme</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-avatar>
                <img src="../assets/default-avatar.png">
              </v-list-tile-avatar>
            </v-list-tile>

            <v-list-tile avatar v-on:click="changeTheme(1)">
              <v-list-tile-content>
                <v-list-tile-title>Light theme</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-avatar>
                <img src="../assets/default-avatar.png">
              </v-list-tile-avatar>
            </v-list-tile>

            <v-list-tile avatar v-on:click="changeTheme(2)">
              <v-list-tile-content>
                <v-list-tile-title>Green theme</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-avatar>
                <img src="../assets/default-avatar.png">
              </v-list-tile-avatar>
            </v-list-tile>

            <v-list-tile avatar v-on:click="changeTheme(3)">
              <v-list-tile-content>
                <v-list-tile-title>Orange theme</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-avatar>
                <img src="../assets/default-avatar.png">
              </v-list-tile-avatar>
            </v-list-tile>

            <v-list-tile avatar v-on:click="changeTheme(4)">
              <v-list-tile-content>
                <v-list-tile-title>Purple theme</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-avatar>
                <img src="../assets/default-avatar.png">
              </v-list-tile-avatar>
            </v-list-tile>

            <v-list-tile avatar v-on:click="changeTheme(5)">
              <v-list-tile-content>
                <v-list-tile-title>Pink theme</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-avatar>
                <img src="../assets/default-avatar.png">
              </v-list-tile-avatar>
            </v-list-tile>

          </v-list>
        </v-card>
      </v-menu>

      <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
        <v-btn flat icon slot="activator">
          <v-icon :class="this.$store.getters.get_theme.icon">language</v-icon>
        </v-btn>
        <v-card>
          <v-list dense>
            <v-list-tile v-on:click="setLanguage('en')">
              <v-list-tile-content>
                <v-list-tile-title>English</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-on:click="setLanguage('fr')">
              <v-list-tile-content>
                <v-list-tile-title>Français</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-on:click="setLanguage('ar')">
              <v-list-tile-content>
                <v-list-tile-title>العربية</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-on:click="setLanguage('es')">
              <v-list-tile-content>
                <v-list-tile-title>Español</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-on:click="setLanguage('cn')">
              <v-list-tile-content>
                <v-list-tile-title>中文</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-on:click="setLanguage('it')">
              <v-list-tile-content>
                <v-list-tile-title>Italiano</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>

      <v-menu
        bottom
        left
        offset-y
        :close-on-content-click="false"
        :min-width="300"
        :max-width="400"
        transition="slide-x-reverse-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn flat icon color="white" v-on="on">
            <v-badge color="green" left overlap>
              <template v-slot:badge>
                <span>{{unread_count}}</span>
              </template>
              <v-icon large icon>notifications</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list subheader three-line>
          <v-subheader>
            <div>Recent Notifiactions</div>
            <v-spacer></v-spacer>
            <v-btn v-if="unread_count > 0" flat @click="mark_all_read()">
              <v-icon color="teal">done_all</v-icon>Mark all read
            </v-btn>

            <v-btn v-else disabled flat>
              <v-icon color="teal">done_all</v-icon>Mark all read
            </v-btn>
          </v-subheader>
          <div v-for="item in first_five()" :key="item.id">
            <v-list-tile :class="!item.read ? 'success lighten-5' : '' ">
              <v-list-tile-content @click="show_notf_details(item)">
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.content"></v-list-tile-sub-title>
                <v-list-tile-sub-title>
                  <small>{{item.timestamp}}</small>
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action @click="toggle_read(notifications.indexOf(item))">
                <v-btn flat icon>
                  <v-icon title="Mark unread" :color="'primary'" v-if="item.read">done_all</v-icon>
                  <v-icon title="Mark read" :color="'grey'" v-else>done</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </div>
        </v-list>
        <v-list subheader>
          <v-list-tile @click="show_all_notf=true">
            <v-list-tile-content>
              <v-list-tile-title style="text-align:center">See all</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-dialog v-model="show_all_notf" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-toolbar dark>
          <v-btn icon dark @click="show_all_notf = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Notifications</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn v-if="unread_notifications() > 0" dark flat @click="mark_all_read()">
              <v-icon color="teal">done_all</v-icon>MARK ALL READ
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list subheader three-line>
          <v-subheader>
            <div>Recent Notifications</div>
            <v-spacer></v-spacer>
          </v-subheader>
          <div v-for="item in notifications" :key="item.id">
            <v-list-tile :class="!item.read ? 'success lighten-5' : '' ">
              <v-list-tile-content @click="show_notf_details(item)">
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.content"></v-list-tile-sub-title>
                <v-list-tile-sub-title>
                  <small>{{item.timestamp}}</small>
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action @click="toggle_read(notifications.indexOf(item))">
                <v-btn flat icon>
                  <v-icon title="Mark unread" :color="'primary'" v-if="item.read">done_all</v-icon>
                  <v-icon title="Mark read" :color="'grey'" v-else>done</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </div>
          <v-layout row justify-center>
            <v-flex xs1>
              <v-btn flat v-if="load_more_flag" color="grey" @click="load_more()">Load more</v-btn>
              <v-layout v-if="loading" row wrap justify-center>
                <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-list>
      </v-card>
    </v-dialog>

    <v-dialog v-model="not_detail_dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{not_detail_data.title}}</v-card-title>

        <v-card-text>{{not_detail_data.content}}</v-card-text>
        <v-card-text>
          <small>{{not_detail_data.timestamp}}</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-navigation-drawer
      app
      hide-overlay
      v-model="drawer"
      :class="this.$store.getters.get_theme.primary"
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img
              v-if="this.$store.state.currentUser.avatar"
              class="text-lg-center"
              :src="this.$store.state.currentUser.avatar"
            >
            <img
              v-if="this.$store.state.currentUser.avatar == ''"
              class="text-lg-center"
              src="../assets/default-avatar.png"
            >
          </v-avatar>
          <div style="text-align:center">
            <p
              id="user_name"
              :class="this.$store.getters.get_theme.icon"
            >{{this.$store.state.currentUser.username}}</p>
          </div>
        </v-flex>
      </v-layout>

      <div @click="drawer = !drawer">
        <v-list>
          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon :class="this.$store.getters.get_theme.icon">dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title :class="this.$store.getters.get_theme.text">{{ $t("dashboard") }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>

      <div
        @click="drawer = !drawer"
        v-if=" matching(this.$store.getters.permissions,['can_view_data','can_view_all']) "
      >
        <v-list>
          <v-list-tile to="/data-view">
            <v-list-tile-action>
              <v-icon :class="this.$store.getters.get_theme.icon">list_alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title :class="this.$store.getters.get_theme.text">{{ $t("data_view") }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>

      <div
        @click="drawer = !drawer"
        v-if=" matching(this.$store.getters.permissions,['can_view_drill','can_view_all']) "
      >
        <v-list>
          <v-list-tile to="/analysis">
            <v-list-tile-action>
              <v-icon :class="this.$store.getters.get_theme.icon">show_chart</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title :class="this.$store.getters.get_theme.text">{{ $t("analysis") }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list>
          <v-list-tile @click="settings">
            <v-list-tile-action>
              <v-icon :class="this.$store.getters.get_theme.icon">settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title :class="this.$store.getters.get_theme.text">{{ $t("settings") }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>

      <div
        @click="drawer = !drawer"
        v-if=" matching(this.$store.getters.permissions,['can_view_all']) "
      >
        <v-list>
          <v-list-tile to="/log">
            <v-list-tile-action>
              <v-icon :class="this.$store.getters.get_theme.icon">touch_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title :class="this.$store.getters.get_theme.text">Activities</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>

      <div
        @click="drawer = !drawer"
        v-if=" matching(this.$store.getters.permissions,['can_view_all']) "
      >
        <v-list>
          <v-list-tile to="/manage">
            <v-list-tile-action>
              <v-icon :class="this.$store.getters.get_theme.icon">account_balance</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title :class="this.$store.getters.get_theme.text">Employees</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>


      <div
        @click="drawer = !drawer" 
      >
        <v-list>
          <v-list-tile to="/maintenance">
            <v-list-tile-action>
              <v-icon :class="this.$store.getters.get_theme.icon">build</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title :class="this.$store.getters.get_theme.text">Maintenance</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>



      <div>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon :class="this.$store.getters.get_theme.icon">exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title :class="this.$store.getters.get_theme.text">{{ $t("sign_out") }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      drawer: false,
      show_all_notf: false,
      not_detail_dialog: false,
      csrf_cookie: "",
      not_detail_data: {},
      get_logo_url:
        window.location.protocol +
        "//" +
        "192.168.1.211:8000" +
        "/static/" +
        "LogoEvorezm.png",
      notifications: [],
      next_notification_page: null,
      load_more_flag: true,
      loading: false,
      unread_count: 0
    };
  },

  methods: {
    matching(a, b) {
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
          if (a[i] === b[j]) {
            return true;
          }
        }
      }
      return false;
    },

    setLanguage(language) {
      this.$store.dispatch("setLanguage", language);
    },

    changeTheme(theme_index) {
      this.$store.dispatch("changeTheme", theme_index);
    },

    logout: function() {
      window.location.replace(
        window.location.protocol + "//" + window.location.host + "/logout/"
      );
    },
    settings: function() {
      window.location.replace(
        window.location.protocol +
          "//" +
          window.location.host +
          "/" +
          this.$i18n.locale +
          "/accounts/account/settings/"
      );
    },
    get_notifications: function(endpoint) {
      if (!endpoint) endpoint = `notifications/`;
      axios
        .get(endpoint)
        .then(response => {
          response = response.data;
          this.next_notification_page = response.next;
          this.notifications = this.notifications.concat(response.results);
          if (this.next_notification_page === null) this.load_more_flag = false;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
          this.loading = false;
        });
    },
    load_more: function() {
      this.loading = true;
      if (this.next_notification_page !== null)
        this.get_notifications(this.next_notification_page);
      this.loading = false;
    },
    unread_notifications: function() {
      axios
        .get("notifications/unread/")
        .then(response => {
          response = response.data;
          this.unread_count = response.count;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
          this.loading = false;
        });
      return this.unread_count;
    },
    first_five: function() {
      if (this.notifications.length <= 5) return this.notifications;
      else return this.notifications.slice(0, 5);
    },
    toggle_read: function(index) {
      let config = {
        headers: {
          "X-CSRFToken": this.$store.getters.get_csrf_token
        }
      };
      console.table(this.$store.getters.get_csrf_token)
      let id = this.notifications[index].id;
      let endpoint = `notifications/toggle/${id}/`;
      axios
        .put(endpoint, {}, config)
        .then(response => {
          this.notifications[index].read = response.data.read;
          if (response.data.read) this.unread_count -= 1;
          else this.unread_count += 1;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
        });
    },
    mark_all_read: function() {
      let config = {
        headers: {
          "X-CSRFToken": this.$store.getters.get_csrf_token
        }
      };
      let endpoint = `notifications/markread/`;
      axios
        .put(endpoint, {}, config)
        .then(response => {
          for (let index = 0; index < this.notifications.length; index++) {
            this.notifications[index].read = true;
          }
          this.unread_count = 0;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("success");
        });
    },
    show_notf_details(item) {
      this.not_detail_data = item;
      this.not_detail_dialog = true;
      if (!item.read) {
        this.toggle_read(this.notifications.indexOf(item));
      }
    }
  },
  mounted() {
    this.get_notifications();
  }
};
</script>

<style scoped >
.logo {
  height: 200px;
  width: auto;
  margin-top: 5px;
}

@media screen and (max-width: 768px) {
  .logo {
    height: 95px;
    margin-top: -2px;
    margin-left: -10px;
    width: auto;
    margin-top: 5px;
  }
  .logo_container {
    padding-left: -40px;
  }
}

#user_name {
  margin-top: 20px;
  font-size: 25px;
  text-transform: uppercase;
}
</style>
