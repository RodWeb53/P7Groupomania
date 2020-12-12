<template>
  <div class="container mt-3">

    <h1>Bienvenue sur le réseau social de Groupomania</h1>

    <form action="">

      <div class="form-group">
        <label for="name">Entrez votre Pseudo</label>
        <input v-model="name" type="text" id="name" class="form-control">
      </div>

      <div class="form-group">
        <label for="email">Entrez votre email</label>
        <input v-model="email" type="email" id="email" class="form-control">
      </div>

      <div class="form-group">
        <label for="password">Entrez votre mot de passe</label>
        <input v-model="password" type="password" id="password" class="form-control">
      </div>

      <div class=" form-group">
        <button class="btn btn-primary" @click="register()">S'incrire</button>
      </div>

    </form>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignUp',
  data () {
    return{
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
        register() {
          axios.post('http://localhost:3000/signup', {
            name: this.name,
            email: this.email,
            password: this.password,
            })
            .then(response => {
              
              console.log(response.data)
              
            })
            .catch(error => {
              
              console.log('Impossible de créer votre compte: ', error.response);
            })
        }
      }
  
}
</script>

<style scoped>

</style>