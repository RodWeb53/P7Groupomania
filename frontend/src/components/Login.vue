<template>
  <div class="container pt-5 pb-5 mt-5 mb-4">
    <div class="card">
      <div class="card-header text-center">
        <h1>Connexion au réseau social de Groupomania</h1>
      </div>
      <!-- /// Formulaire pour le Login au reseau Social \\\ -->
      <form action="" class="card-body  mt-3 w-75 ml-auto mr-auto">
        <div class="form-group">
          <label class="ml-2" for="email">Entrez votre email</label>
          <input v-model="email" type="email" id="email" class="form-control">
        </div>
        <div class="form-group">
          <label class="ml-2" for="password">Entrez votre mot de passe</label>
          <input v-model="password" type="password" id="password" class="form-control">
        </div>
        <div class="form-group text-center">
          <button class="btn btn-primary" @click.prevent="login()">Se connecter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return{
      email: '',
      password: '',
    }
  },
  methods: {
        login() {
          axios.post('http://localhost:3000/login', {
            email: this.email,
            password: this.password,
            })
            .then(response => {
              this.$store.dispatch('setToken', response.data.token)
              this.$store.dispatch('setUser', response.data.userId)
              this.$store.dispatch('setModerateur', response.data.ismoderateur)
              this.$router.push('/message')
            })
            .catch(error => {console.log("Une erreur s'est produite: ", error.response);})
        },
      }
}
</script>

<style scoped>
.container {
  height: 100vh;
}
.card {
  opacity: 0.9;
}
</style>