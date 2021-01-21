<template>
  <div class="container mt-5">
    
    <div class="card">
      <div class="card-header text-center">
        <h1>Inscription au réseau social de Groupomania</h1>
      </div>
      <!-- /// Formulaire d'inscription au reseau social \\\ -->
      <form action="" class="card-body  mt-3 w-75 ml-auto mr-auto">
        <div class="form-group">
          <label class="ml-2" for="name">Entrez votre Pseudo</label>
          <input v-model="name" type="text" id="name" class="form-control">
        </div>
        <div class="form-group">
          <label class="ml-2" for="email">Entrez votre email</label>
          <input v-model="email" type="email" id="email" class="form-control">
        </div>
        <div class="form-group">
          <label class="ml-2" for="password">Entrez votre mot de passe</label>
          <input v-model="password" type="password" id="password" class="form-control">
        </div>
        <div class="form-group text-center">
          <button class="btn btn-primary" @click.prevent="register()">S'incrire</button>
        </div>
      </form>
    </div>
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
        .then(() => {
          this.$router.push('/login')
        })
        .catch(error => {console.log('Impossible de créer votre compte: ', error);})
    }
  },
}
</script>

<style scoped>

</style>