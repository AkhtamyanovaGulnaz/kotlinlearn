<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0"><v-icon>person</v-icon>{{ userName }}</h3>
          <h3 class="headline mb-0"><v-icon>email</v-icon>{{ userEmail }}</h3>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="550">
          <v-btn slot="activator" flat color="orange">Изменить мои данные</v-btn>
          <v-card>
            <v-card-title class="headline">Изменить мои данные?</v-card-title>
            <v-card-text>
              <v-alert :value="getError" type="warning">
                {{ getError }}
              </v-alert>
              <v-form v-model="valid">
                <v-text-field prepend-icon="person" name="login" label="Е-мейл" type="email" required v-model="email" :rules="emailRules"></v-text-field>
                <v-text-field id="password" prepend-icon="lock" name="password" label="Пароль" type="password" required v-model="password" :rules="passwordRules"></v-text-field>

                <h3>Я хочу изменить</h3>
                <v-radio-group v-model="changeType">
                  <v-radio label="Имя" :value="'name'"></v-radio>
                  <v-text-field v-if="changeType == 'name'" prepend-icon="person" name="newName" label="Новое имя" type="text" required v-model="newName" :rules="nameRules"></v-text-field>
                  <v-radio label="Е-мейл" :value="'email'"></v-radio>
                  <v-text-field v-if="changeType == 'email'" prepend-icon="email" name="newLogin" label="Новый е-мейл" type="email" required v-model="newEmail" :rules="emailRules"></v-text-field>
                  <v-radio label="Пароль" :value="'password'"></v-radio>
                  <v-text-field
                    v-if="changeType == 'password'"
                    prepend-icon="lock"
                    name="newPassword"
                    label="Новый пароль"
                    type="password"
                    required
                    v-model="newPassword"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-radio-group>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Отмена</v-btn>
              <v-btn color="green darken-1" flat @click.prevent="changeUserData" :disabled="getProcessing || !valid">Изменить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      dialog: false,
      changeType: 'name',

      email: null,
      password: null,

      newName: null,
      newEmail: null,
      newPassword: null,

      valid: false,

      nameRules: [(v) => !!v || 'Пожалуйста введите Ваше имя'],
      emailRules: [(v) => !!v || 'Пожалуйста введите е-майл', (v) => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Неправильный е-майл'],
      passwordRules: [(v) => !!v || 'Пожалуйста введите пароль', (v) => (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'],
    }
  },
  computed: {
    ...mapGetters(['userName', 'userEmail', 'getProcessing', 'getError']),
  },
  methods: {
    changeUserData() {
      this.$store.dispatch('CHANGE_USER_PROFILE_DATA', {
        email: this.email,
        password: this.password,
        newName: this.newName,
        newEmail: this.newEmail,
        newPassword: this.newPassword,
        changeType: this.changeType,
      })
    },
  },
  created() {
    this.$bus.$on('user-profile-data-changed', () => {
      this.dialog = false
    })
  },
  beforeDestroy() {
    this.$bus.$off('user-profile-data-changed')
  },
}
</script>

<style scoped></style>
