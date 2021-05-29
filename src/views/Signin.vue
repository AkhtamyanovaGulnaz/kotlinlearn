<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Вход</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert :value="error" type="warning">
              {{ error }}
            </v-alert>
            <v-form v-model="valid">
              <v-text-field prepend-icon="email" name="login" label="E-mail" type="email" required v-model="email" :rules="emailRules"></v-text-field>
              <v-text-field id="password" prepend-icon="lock" name="password" label="Пароль" type="password" required v-model="password" :rules="passwordRules" v-on:keyup.enter="signin"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn style="flex: 1" color="primary" @click.prevent="googleLogin">Google</v-btn>
            <v-btn style="flex: 1" color="primary" @click.prevent="facebookLogin">Facebook</v-btn>
            <v-btn style="flex: 1" color="primary" @click.prevent="signin" :disabled="processing || !valid">Войти</v-btn>
          </v-card-actions>
          <!-- <v-card-actions>
             <v-spacer></v-spacer>
            <v-btn color="primary" @click.prevent="googleLogin">Войти через Google</v-btn>
           </v-card-actions> -->
           <!-- <v-card-actions>
             <v-spacer></v-spacer>
            
           </v-card-actions> -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      valid: false,
      emailRules: [(v) => !!v || 'Пожалуйста введите E-mail', (v) => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Неправильный e-mail'],
      passwordRules: [(v) => !!v || 'Пожалуйста введите пароль', (v) => (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'],
    }
  },
  computed: {
    error() {
      return this.$store.getters.getError
    },
    processing() {
      return this.$store.getters.getProcessing
    },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated
    },
  },
  watch: {
    isUserAuthenticated(val) {
      if (val === true) this.$router.push('/')
    },
  },
  methods: {
    signin() {
      this.$store.dispatch('SIGNIN', { email: this.email, password: this.password })
    },
    facebookLogin() {
      this.$store.dispatch('SIGNUPWITHFACEBOOK');
    },
    googleLogin() {
      this.$store.dispatch('SIGNWITHGOOGLE');
    }
  },
}
</script>

<style scoped></style>
