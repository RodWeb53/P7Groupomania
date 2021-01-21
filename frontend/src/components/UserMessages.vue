<template>
  <div class="container mt-3" v-if="$store.state.isUserLoggedIn">
    <!-- Affichage des posts de l'utilisateur souhaité -->
    <div class="container mt-5" v-bind:key="index" v-for="(message, index) in allMessages">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-2">
                  <router-link :to="`/profil/${message.userId}`">
                    <img :src="message.User.avatar" style="width:80px">  
                  </router-link>           
                </div>
                <div class="col-5">
                  <p>Post créer par : {{ message.User.name }}</p>
                    <p><i class="far fa-thumbs-up"></i> {{ totalLikes }} </p>
                </div>
                <div class="col-4">
                  <p>Le : {{ message.createdAt | formatDate }}</p>
                  <!-- Si 'utilisateur ou modérateur' route vers la modification du message -->
                  <div v-if="message.User.userId === $store.state.userId || $store.state.isModerateur">
                    <router-link :to="`/message/${message.msgId}`">
                      <button class="btn btn-secondary mb-3">Modifier le message ...  <i class="fas fa-arrow-right"></i></button>
                    </router-link>
                  </div>
                  <!-- Sinon route vers l'ajout d'un commentaire -->
                  <div v-else>
                    <router-link :to="`/message/${message.msgId}`">                    
                      <button class="btn btn-secondary mb-3">Commenter le post ...   <i class="fas fa-arrow-right"></i></button>
                    </router-link>
                  </div>
                </div>
                <!-- Si 'utilisateur ou modérateur' acces pour la suppression du message  -->
                <div class="col-1">
                  <button v-if="message.User.userId === $store.state.userId || $store.state.isModerateur" type="button" class="btn btn-default btn-lg sup" @click="deleteMessage()"><i class="far fa-trash-alt"></i></button>
                </div>
              </div>
            </div>
            <div class="card-text mt-1 mb-4">
              <p style="white-space: pre" class="ml-2 mr-2">{{ message.content }}</p>
            </div>
            <!-- Ajout des commentaires pour chaque messages -->
            <div class="row"  v-bind:key="index" v-for="(comment, index) in allComments">
              <div class="col" v-if="comment.msgId == message.msgId">
                <div class="card">
                  <div class="card-header">
                    <div class="row">
                      <div class="col-2">
                          <img :src="comment.User.avatar" style="width:40px">
                      </div>
                      <div class="col-5">
                        <p>Commentaire créer par : {{ comment.User.name }}</p>
                      </div>
                      <div class="col-4">
                        <p>Le : {{ comment.createdAt | formatDate }}</p>
                      </div>
                      <!-- Si utilisateur ou modérateur acces pour la suppression du commentaire  -->
                      <div class="col-1">
                        <button v-if="comment.User.userId === $store.state.userId || $store.state.isModerateur" type="button" class="btn btn-default btn-lg sup" @click="deleteComment(comment.commentId)">
                          <i class="far fa-trash-alt"></i> 
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="card-text mt-2">
                    <p style="white-space: pre" class="ml-2 mr-2">{{ comment.comment }}</p>
                  </div>
                </div>
              </div>
              <!-- fin de l'ajout des commentaires -->
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
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'UserMessages',
  data () {
    return {
      message: [],
      content: '',
      allComments: [],
      id: this.$route.params.id,
      usersLiked: [],
      userLikeSearch: false,
      totalLikes: [],
      allMessages: [],
      messagesId: [],
      commentsId: [],
    }
  },
  methods : {
    deleteMessage() {
      Swal.fire({
        title: 'Suppression du message ?',
        text: "Attention il est impossible de revenir en arrière !",
        icon: 'warning',
        confirmButtonText: 'Oui, je suis sur!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Message supprimé!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
        })
        axios.delete(`http://localhost:3000/message/${this.id}`, {
          headers: {Authorization: `Bearer ${store.state.token}`},}
          )
          this.$router.push('/message/')
          window.location.reload()
        }
      }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: "Le message n'a pas pu être supprimé, veuillez réessayer plus tard !",
            showConfirmButton: false,
            timer: 2500
          })
          console.log('An error occurred:', error.response);
      })
    },

    deleteComment(commentId) {
      Swal.fire({
        title: 'Suppression du commentaire ?',
        text: "Attention il est impossible de revenir en arrière !",
        icon: 'warning',
        confirmButtonText: 'Oui, je suis sur!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Commentaire supprimé!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          })
          axios.delete('http://localhost:3000/message/' + `${this.id}` + '/comment/' + commentId, {
            headers: {Authorization: `Bearer ${store.state.token}`},}
          )
          .then(() => {
          this.allComments = []
          axios.get(`http://localhost:3000/message/${this.id}/comment`, {
          headers: {Authorization: `Bearer ${store.state.token}`},}
          )
          .then(response => {
            for(const comment of response.data.comments){
                this.allComments.push(comment)
            }
            window.location.reload()
          })      
          .catch(error => {console.log('An error occurred:', error.response);})
          })
        }
      }).catch(error => {
          Swal.fire({
            icon: 'error',
            title: "Le commentaire n'a pas pu être supprimé, veuillez réessayer plus tard !",
            showConfirmButton: false,
            timer: 2500
          })
          console.log('An error occurred:', error.response);
      })
    },
    
  },

  computed: {
      ...mapState(['isModerateur', 'userId']),
  },
  
  mounted() {
    axios.get(`http://localhost:3000/message/${this.id}/messages/count`, {
      headers: {Authorization: `Bearer ${store.state.token}`},}
      )
      .then(response => {
        for(const message of response.data.messagesUser){
        this.allMessages.push(message)
        }
        this.allMessages.forEach(message => {
        this.messagesId.push(message.msgId)
        })
          for(let i=0; i < this.messagesId.length; i++){        
            axios.get(`http://localhost:3000/message/${this.messagesId[i]}/like`, {
              headers: {Authorization: `Bearer ${store.state.token}`},})
              .then(response => {
                this.totalLikes = response.data.likes.count
                response.data.likes.rows.forEach(rows => {
                this.usersLiked.push(rows.userId);
                })
                if(this.usersLiked.indexOf(this.$store.state.userId) === -1) {
                  this.userLikeSearch = false
                } else {
                  this.userLikeSearch = true
                }
              }) 
              .then(() => {
                axios.get(`http://localhost:3000/message/${this.messagesId[i]}/comment`, {
                  headers: {Authorization: `Bearer ${store.state.token}`},}
                )
              .then(response => {
                for(const comment of response.data.comments){      
                  this.allComments.push(comment)
                }
                this.allComments.forEach(comment => {
                this.commentsId.push(comment.msgId)
                })
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
.sup {
  color: red;
}
</style>