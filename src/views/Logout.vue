<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Вы действительно хотите выйти?</v-toolbar-title>
          </v-toolbar>
          <v-card-actions>
            <v-btn color="primary" @click.prevent="logout">Да, выйти</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT', {})
      this.$router.push('/')
    },
  },
}
</script>

<style scoped></style>
