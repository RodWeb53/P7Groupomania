<template>
  <div class="container mt-3" v-if="$store.state.isUserLoggedIn">
    <!-- Bouton pour faire apparaitre la fenêtre de création d'un POST -->
    <div class="text-center">
      <button class="btn btn-primary mb-2" v-on:click="newPost = !newPost">Ajouter un Post</button>
    </div>
    <!-- /// Card pour la création d'un post \\\ -->
    <div v-if="newPost" class="card">
      <h3 class="card-header text-center">Créez votre message</h3>
      <form action="" class="card-body  mt-1 w-75 ml-auto mr-auto">
        <div class="form-group">
          <textarea class="form-control" name="content" id="texteMessage" rows="4" v-model="content" maxlength="500" placeholder="Saisir un texte de 500 caractères maximum"></textarea>
        </div>
        <div class="form-group text-center mb-1">
          <button class="btn btn-primary" @click.prevent="postMessage()">Publier votre Post</button>
        </div>
      </form>
    </div>
    <!-- /// Fin pour la création d'un post \\\ -->

    <!-- lignes de card pour faire apparaitre les posts plus les commentaires -->
    <div class="container mt-3" v-bind:key="index" v-for="(message, index) in allMessages">
      <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-2">
                    <!-- Routage pour aller vers le profil de l'utilisateur du message sur un clic sur son avatar -->
                    <router-link :to="`/profil/${message.User.userId}`">
                      <img :src="message.User.avatar" style="width:60px">
                    </router-link>
                  </div>
                  <div class="col-5">
                    <p>Créer par : {{ message.User.name }}</p>
                    <!-- Routage pour aller vers le message avec un clic sur le nombre de like -->
                    <router-link :to="`/message/${message.msgId}`">
                      <p><i class="far fa-thumbs-up"></i> {{ totalLikes[index] }}</p>
                    </router-link>
                  </div>
                  <div class="col-5">
                    <p>Le : {{ message.createdAt | formatDate }}</p>
                    <!-- Routage pour aller vers le message avec un clic sur le nombre de commentaire -->
                    <router-link :to="`/message/${message.msgId}`">
                      <p>Voir les : {{ totalComments[index] }} commentaires</p>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="card-text mt-2">
                <p style="white-space: pre" class="ml-2 mr-2">{{ message.content }}</p>
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
import Swal from 'sweetalert2'

export default {
  name: 'Message',
  data () {
    return {
      content: '',
      allMessages: [],
      usersLiked: [],
      totalLikes: [],
      totalComments: [],
      messagesId: [],
      newPost: false,
    }
  },
  methods : {
    postMessage() {
      axios.post('http://localhost:3000/message', {
        content: this.content,
        userId: store.state.userId },
        { headers: { Authorization: `Bearer ${store.state.token}` },}
      )
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Message publié',
          showConfirmButton: false,
          timer: 2000
        })
        window.location.reload()
      })
      .catch(error => {console.log("Message non publié: ", error.response);
        Swal.fire({
          title: "Une erreur est survenue",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true
        }) 
      })
    },
  },

  mounted() {
    axios.get('http://localhost:3000/message', {
      headers: {Authorization: `Bearer ${store.state.token}`},}
      )
      .then(response => {
        for(const message of response.data.messages){
        this.allMessages.push(message)
        }
        this.allMessages.forEach(message => {
          this.messagesId.push(message.msgId)
          })
          for(let i=0; i < this.messagesId.length; i++){ 
            axios.get(`http://localhost:3000/message/${this.messagesId[i]}/like`, {
              headers: {Authorization: `Bearer ${store.state.token}`},})
              .then(response => {
                this.totalLikes.push(response.data.likes.count)
                this.usersLiked = []
                this.usersLiked.push(response.data.likes.rows);
              })
              .then(() => {
                axios.get(`http://localhost:3000/message/${this.messagesId[i]}/comment`, {
                  headers: {Authorization: `Bearer ${store.state.token}`},}
                )
                .then(response => {
                  this.totalComments.push(response.data.comments.length)
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