<template>
  <div>
    <v-navigation-drawer absolute temporary v-model="drawer" class="hidden-md-and-up">
      <v-list>
        <v-list-tile v-for="(item, i) in menuItems" :key="`navdrawer${i}`" :to="item.route">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-dialog v-model="dialog" width="350" v-if="isUserAuthenticated">      
          <template v-slot:activator="{ on, attrs }">
            <v-list-tile v-bind="attrs" v-on="on">
            <v-list-tile-action>
              <v-icon left>logout</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              Выйти
            </v-list-tile-content>
          </v-list-tile> 
          </template> 
          <v-card>
            <v-card-title class="headline grey lighten-2">
              Выйти?
            </v-card-title>
            <v-card-text>
              Вы действительно хотите выйти?
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="signout">
                Да
              </v-btn>
              <v-btn color="primary" text @click="dialog = false">
                Нет
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <router-link to="/" tag="span" style="cursor:pointer">
        <v-toolbar-title v-text="'Учи Kotlin'"></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(item, i) in menuItems" flat :key="`menuitem${i}`" :to="item.route">
          <v-icon left v-html="item.icon"></v-icon>
          {{ item.title }}
        </v-btn>

        <v-dialog v-model="dialog" width="350" v-if="isUserAuthenticated">
          <template v-slot:activator="{ on, attrs }">
            <v-btn flat v-bind="attrs" v-on="on">
              <v-icon left>mdi-anchor</v-icon>
              Выйти
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              Выйти?
            </v-card-title>

            <v-card-text>
              Вы действительно хотите выйти?
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="signout">
                Да
              </v-btn>
              <v-btn color="primary" text @click="dialog = false">
                Нет
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      dialog: false,
    }
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated
    },
    menuItems() {
      return this.isUserAuthenticated
        ? [
            {
              icon: 'visibility',
              title: 'Изучать',
              route: '/books',
            },
            {
              icon: 'home',
              title: 'Мой кабинет',
              route: '/profile',
            },
          ]
        : [
            {
              icon: 'visibility',
              title: 'Изучать',
              route: '/books',
            },
            {
              icon: 'login',
              title: 'Войти',
              route: '/signin',
            },
            {
              icon: 'lock_open',
              title: 'Зарегистрироваться',
              route: '/signup',
            },
          ]
    },
  },
  methods: {
    signout() {
      this.$store.dispatch('SIGNOUT')
      this.dialog = false
      if (this.$router.history.current.name !== 'Home') {
        this.$router.push({ name: 'Home' })
      } 
    },
  },
}
</script>

<style scoped></style>
