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
            <v-btn color="primary" @click.prevent="googleLogin">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
              </svg>
              </v-btn>
            <v-btn   color="primary" @click.prevent="facebookLogin">
              <!-- <v-layout> -->
              <!-- <v-icon left>facebook</v-icon></v-layout></v-btn> -->
              <span class="material-icons">facebook</span></v-btn>
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
import { mdiGoogle } from '@mdi/js';
import { mdiFacebook } from '@mdi/js';
export default {
  data() {
    return {
      googleIcon: mdiGoogle,
      facebookIcon: mdiFacebook,
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
