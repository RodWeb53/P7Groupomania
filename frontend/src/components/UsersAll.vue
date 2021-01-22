<template>
  <div class="container pt-5 pb-4 mt-5 mb-4" v-if="$store.state.isUserLoggedIn">
    <!-- lignes de card pour faire apparaitre les posts plus les commentaires -->
    <div class="container mt-3" >
      <div class="row"  v-bind:key="index" v-for="(user, index) in allUsers">
          <div class="col mt-4">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-2">
                    <router-link :to="`/profil/${user.userId}`">
                      <img :src="user.avatar" style="width:80px">
                    </router-link>
                  </div>
                  <div class="col-5">
                    <p>Utilisateur : {{ user.name }}</p>
                    <router-link :to="`/UserMessages/${user.userId}`">
                      <button class="btn btn-secondary mb-3 float-left">Voir les messages  <i class="fas fa-arrow-right"></i></button>
                    </router-link>
                  </div>
                  <div class="col-5">
                    <p>{{ user.name }} a publié {{ totalMessages[index] }} messages et {{ totalComments[index] }} commentaires</p>
                    <p>et a liké <i class="far fa-thumbs-up"></i> {{ totalLikes[index] }} messages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'

export default {
  name: 'UsersAll',
  data () {
    return{
      id: this.$route.params.id,
      user: [],
      allUsers: [],
      profil: [],
      totalLikes: [],
      totalComments: [],
      totalMessages: [],
    }
  },
 mounted() {
  //récupération des utilisateurs
  axios.get(`http://localhost:3000/profil`, {
    headers: {Authorization: `Bearer ${store.state.token}`}}
    )
      .then(response => {
        for(const utilisateur of response.data.users){
        this.allUsers.push(utilisateur)
        }
        this.allUsers.forEach(utilisateur => {
        this.profil.push(utilisateur.userId)
        })
          for(let i=0; i < this.profil.length; i++){
            //récupération du nombre de messages par utilisateur
            axios.get(`http://localhost:3000/message/${this.profil[i]}/messages/count`, {
              headers: {Authorization: `Bearer ${store.state.token}`},})
              .then(response => {
                this.totalMessages.push(response.data.messagesUser.length)
               })
                .then(() => {   
                  //récupération du nombre de likes par utilisateur
                  axios.get(`http://localhost:3000/message/${this.profil[i]}/like/count`, {
                    headers: {Authorization: `Bearer ${store.state.token}`},})
                    .then(response => {
                      this.totalLikes.push(response.data.usersLikes.count)
                    })
                    .catch(error => {console.log('An error occurred:', error.response);})
                    })
                      .then(() => {
                        //récupération du nombre de commentaires par utilisateur
                        axios.get(`http://localhost:3000/message/${this.profil[i]}/comment/count`, {
                          headers: {Authorization: `Bearer ${store.state.token}`},})
                        .then(response => {
                          this.totalComments.push(response.data.usersComments.count)
                        })
                        .catch(error => {console.log('An error occurred:', error.response);})
                      })
            .catch(error => {console.log('An error occurred:', error.response);})
          }     
      })
    .catch(error => {console.log('An error occurred:', error.response);})
  },
 }





</script>

<style scoped>

</style>