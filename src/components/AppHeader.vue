<template>
  <v-app>
    <v-toolbar app dark class="primary">
      <v-toolbar-title v-text="'Учи Kotlin'"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-for="(item, i) in menuItems"
          flat
          :key="`menuitem${i}`"
          :to="item.route"
        >
          <v-icon left v-html="item.icon"></v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-app>
</template>

<script>
export default {
  computed: {
    menuItems() {
      return [
        {
          icon: 'visibility',
          title: 'Читать',
          route: '/books',
        },
        {
          icon: 'extension',
          title: 'Учить',
          route: '/learn',
        },
        {
          icon: 'home',
          title: 'Мой кабинет',
          route: '/profile',
        },
        {
          icon: 'logout',
          title: 'Выйти',
          route: '/logout',
        },
        {
          icon: 'login',
          title: 'Войти',
          route: '/login',
        },
        {
          icon: 'lock_open',
          title: 'Зарегестрироваться',
          route: '/signup',
        },
      ]
    },
  },
}
</script>

<style scoped></style>
