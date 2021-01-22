<template>
  <div class="container haut pt-5 pb-5 mt-5 mb-4" v-if="$store.state.isUserLoggedIn">
    <div class="text-center">
      <!-- /// Route pour retourner vers les messages \\\ -->
      <router-link :to="`/message`">
        <button class="btn btn-primary mb-3 float-left"><i class="fas fa-arrow-left"></i> Retour messages</button>
      </router-link>
      <!-- bouton pour ouvrir la fenêtre d'ajout d'un commentaire -->
      <button class="btn btn-primary mb-3" v-on:click="newComment = !newComment">Ajouter un commentaire</button>
    </div>
    <!-- /// ligne pour faire apparitre le message sélectionné et ses commentaires -->
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-2">
                <router-link :to="`/profil/${message.userId}`">
                  <img :src="message.User.avatar" style="width:60px">
                </router-link>
              </div>
              <!-- /// gestion du Likes et dislikes sur le message \\\ -->
              <div class="col-5">
                <p>Créer par : {{ message.User.name }}</p>
                <p id="like" v-if="userLikeSearch" @click="disliked()"><i class="far fa-thumbs-up"></i> {{ totalLikes }}</p>
                <p id="dislike" v-else-if="!userLikeSearch" @click="liked()"><i class="far fa-thumbs-up"></i> {{ totalLikes }}</p>
              </div>
              <div class="col-4">
                <p>Le : {{ message.createdAt | formatDate }}</p>
              </div>
              <div class="col-1">
                <!-- Bouton pour activer la modification du message si on est le propriétaire du message -->
                <button type="button" class="btn btn-default btn-lg edit" v-if="message.User.userId === $store.state.userId" @click="userChange()"><i class="far fa-edit"></i></button>
                <!-- Bouton pour la suppression du message si on est le propriétaire du message ou le modérateur -->
                <button v-if="message.User.userId === $store.state.userId || $store.state.isModerateur" type="button" class="btn btn-default btn-lg sup" @click="deleteMessage()"><i class="far fa-trash-alt"></i></button>
              </div>
            </div>
          </div>
          <div class="card-text mt-2">
            <!-- /// Gestion de la modification du message d'origine \\\ -->
            <p v-if="!changeContent" style="white-space: pre" class="ml-2 mr-2">{{ message.content }}</p>
            <form v-else-if="changeContent" action="" class="card-body  mt-1 w-75 ml-auto mr-auto">
              <div class="form-group">
                <p>{{ message.content }}</p>
                <textarea class="form-control" name="modifyContent" id="modifyContent" rows="4" maxlength="500" v-model="modifyContent" ></textarea>
              </div>
              <div class="form-group text-center mb-1">
                <button class="btn btn-primary" @click.prevent="updateMessage(message.messageId)">Publier la modification</button>
              </div>
            </form>
        </div>
        <!-- /// Gestion de la création d'un commentaire au message \\\ -->
        <div v-if="newComment" class="card">
          <h4 class="card-header text-center">Créez votre Commentaire</h4>
          <div class="row">
            <div class="col">
              <form action="" class="card-body  mt-1 w-75 ml-auto mr-auto">
                <div class="form-group">
                  <textarea class="form-control" name="comment" id="texteMessage" rows="3" v-model="comment" maxlength="500" placeholder="Saisir un texte de 500 caractères maximum"></textarea>
                </div>
                <div class="form-group text-center mb-1">
                  <button class="btn btn-primary" @click.prevent="postComment()">Publier votre Commentaire</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <!-- /// Fin de la gestion de la création d'un commentaire au message \\\ -->
        </div>
      </div>
  </div>
  <!-- /// Affichage de tous les commentaires \\\ -->
  <div class="container mt-3">
    <div class="row" v-bind:key="index" v-for="(comment, index) in allComments">
      <div class="col" >
        <div class="card mt-1">
          <div class="card-header">
            <div class="row">
              <div class="col-2">
                <router-link :to="`/profil/${comment.User.userId}`">
                  <img :src="comment.User.avatar" style="width:40px">
                </router-link>
              </div>
              <div class="col-5">
                <p>Créer par : {{ comment.User.name }}</p>
              </div>
              <div class="col-4">
                <p>Le : {{ comment.createdAt | formatDate }}</p>
              </div>
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
  name: 'OneMessage',
  data () {
    return {
      message: [],
      comment: '',
      allComments: [],
      id: this.$route.params.id,
      usersLiked: [],
      userLikeSearch: false,
      totalLikes: '',
      newComment: false,
      changeContent: false,
      modifyContent:''
    }
  },
  methods : {
    postComment() {
      axios.post(`http://localhost:3000/message/${this.id}/comment`, {
        comment: this.comment,
        userId: store.state.userId },
       { headers: {Authorization: `Bearer ${store.state.token}`},}
      )
        .then(() => {
          //console.log(comment)
          this.allComments = []
          this.comment = ''
            Swal.fire({
              icon: 'success',
              title: 'Commentaire posté',
              showConfirmButton: false,
              timer: 1000
            })
            axios.get(`http://localhost:3000/message/${this.id}/comment`, {
              headers: {Authorization: `Bearer ${store.state.token}`},}
            )
              .then(response => {
                for(const comment of response.data.comments){
                    this.allComments.push(comment)
                }
              })
              window.location.reload()      
        }) 
        .catch(error => {console.log('An error occurred:', error.response);})
    },

    messageLien() {
      this.$router.push('/message')
    },

    userChange() {
      this.changeContent = true
    },

    liked() {
      this.usersLiked = []
      axios.post(`http://localhost:3000/message/${this.id}/like`, {
        userId: store.state.userId,
        msgId: this.id },
        {headers: {Authorization: `Bearer ${store.state.token}`},}
        )
          .then(() => {
            axios.get(`http://localhost:3000/message/${this.id}/like`, {
            headers: {Authorization: `Bearer ${store.state.token}`},}
            )
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
            .catch(error => {console.log('An error occurred:', error.response);})
          }) 
          .catch(error => {console.log('An error occurred:', error.response);})
    },

    disliked() {
      this.usersLiked = []
        axios.delete(`http://localhost:3000/message/${this.id}/like`, {
          headers: {Authorization: `Bearer ${store.state.token}`},}
        )
          .then(() => {
            axios.get(`http://localhost:3000/message/${this.id}/like`, {
            headers: {Authorization: `Bearer ${store.state.token}`},}
            )
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
            .catch(error => {console.log('An error occurred:', error.response);})
          }) 
          .catch(error => {console.log('An error occurred:', error.response);})
    },

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
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: "Le message n'a pas pu être supprimé, veuillez réessayer plus tard !",
              showConfirmButton: false,
              timer: 2500
            })
            console.log('An error occurred:', error.response);})
      },

    updateMessage() {
      axios.put(`http://localhost:3000/message/${this.id}`, {
      content: this.modifyContent,
      userId: store.state.userId},
        {headers: {Authorization: `Bearer ${store.state.token}`},}
      )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Message modifié',
            showConfirmButton: false,
            timer: 1000
          })
          window.location.reload()
        }) 
        .catch(error => {
            Swal.fire({
              icon: 'error',
              title: "Le message n'a pas pu être modifié, veuillez réessayer plus tard !",
              showConfirmButton: false,
              timer: 1000
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
      axios.get(`http://localhost:3000/message/${this.id}`, {
        headers: {Authorization: `Bearer ${store.state.token}`},}
      )
        .then(message => {
          this.message = message.data.message
          this.modifyContent = message.data.content
        })
          .then(() => {
            axios.get(`http://localhost:3000/message/${this.id}/comment`, {
            headers: {Authorization: `Bearer ${store.state.token}`},}
            )
              .then(response => {
                for(const comment of response.data.comments){      
                    this.allComments.push(comment)
                }
              })      
              .catch(error => {console.log('An error occurred:', error.response);})
          })
          .then(() => {
            axios.get(`http://localhost:3000/message/${this.id}/like`, {
            headers: {Authorization: `Bearer ${store.state.token}`},}
            )
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
              .catch(error => {console.log('An error occurred:', error.response);})
          }) 
          .catch(error => {console.log('An error occurred:', error.response);})
    },
}
</script>

<style scoped>
/* Ajout de la couleur verte quand l'utilisateur à liké */
#like {
  color: green;
}
/* Couleur rouge si l'utilisateur n'a pas liké le message */
#dislike {
  color: red;
}
/* Couleur rouge pour l'icone de suppression */
.sup {
  color: red;
}
/* Couleur vert pour la l'icone de modification du message */
.edit {
  color: green;
}
.haut {
  height: 100vh;
}
.haut:fullscreen {
    height: 100%;
}
</style>