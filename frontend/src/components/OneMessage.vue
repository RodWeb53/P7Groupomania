<template>
  <div class="container mt-3" v-if="$store.state.isUserLoggedIn">
    <div class="text-center">
      <router-link :to="`/message/`">
        <button class="btn btn-primary mb-3 float-left"><i class="fas fa-arrow-left"></i> Retour messages</button>
      </router-link>
      <button class="btn btn-primary mb-3" v-on:click="newComment = !newComment">Ajouter un commentaire</button>
    </div>
    <!-- ligne de card pour faire apparaitre les posts plus les commentaires -->
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
              <div class="col-5">
                <p>Créer par : {{ message.User.name }}</p>
                <p id="like" v-if="userLikeSearch" @click="disliked()"><i class="far fa-thumbs-up"></i> {{ totalLikes }}</p>
                <p id="dislike" v-else-if="!userLikeSearch" @click="liked()"><i class="far fa-thumbs-up"></i> {{ totalLikes }}</p>
              </div>
              <div class="col-4">
                <p>Le : {{ message.createdAt | formatDate }}</p>
              </div>
              <div class="col-1">
                <button type="button" class="btn btn-default btn-lg edit" v-if="message.User.userId === $store.state.userId" @click="userChange()"><i class="far fa-edit"></i></button>
                <button v-if="message.User.userId === $store.state.userId" type="button" class="btn btn-default btn-lg sup" @click="deleteMessage()"><i class="far fa-trash-alt"></i></button>
              </div>
            </div>
          </div>
          <div class="card-text mt-2">
            <!--Gestion de la modification du message d'origine -->
            <!-- /// Problématique en cours pour récupérer le message d'origine  \\\ -->
            <p v-if="!changeContent" style="white-space: pre" class="ml-2 mr-2">{{ message.content }}</p>
            <form v-else-if="changeContent" action="" class="card-body  mt-1 w-75 ml-auto mr-auto">

              <div class="form-group">
                <p>{{ message.content }}</p>
                <textarea class="form-control" name="content" id="texteMessage" rows="4" maxlength="500"  ></textarea>
              </div>

              <div class="form-group text-center mb-1">
                <button class="btn btn-primary" @click.prevent="updateMessage(message.messageId)">Publier la modification</button>
              </div>
            </form>
        </div>

          <!-- Zone pour la création du commentaire -->
        <div v-if="newComment" class="card">
          <h4 class="card-header text-center">Créez votre Commentaire</h4>
          <div class="row">
            <div class="col">
              <form action="" class="card-body  mt-1 w-75 ml-auto mr-auto">
                <div class="form-group">
                  <textarea class="form-control" name="content" id="texteMessage" rows="3" v-model="comment" maxlength="500" placeholder="Saisir un texte de 500 caractères maximum"></textarea>
                </div>
                <div class="form-group text-center mb-1">
                  <button class="btn btn-primary" @click.prevent="postComment()">Publier votre Commentaire</button>
                </div>
              </form>
            </div>
          </div>
        </div>
            <!-- Fin de la zone de création de commentaire -->
        </div>
      </div>
  </div>
  <!-- Affichage de tous les commentaires -->
  <div class="container mt-3">
    <div class="row" v-bind:key="index" v-for="(comment, index) in allComments">
      <div class="col" >
        <div class="card mt-1">
          <div class="card-header">
            <div class="row">
              <div class="col-2">
                <router-link :to="`/profil/${comment.userId}`">
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
                <button v-if="comment.User.userId === $store.state.userId" type="button" class="btn btn-default btn-lg sup" @click="deleteComment(comment.commentId)">
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
      content: 'essai'
    }
  },
  methods : {
    postComment() {
      axios.post(`http://localhost:3000/message/${this.id}/comment`, {
        comment: this.comment,
        userId: store.state.userId },
       { headers: {Authorization: `Bearer ${store.state.token}`},}
      )
        .then((comment) => {
          console.log(comment)
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
                  console.log(response)
                  for(const comment of response.data.comments){
                      this.allComments.push(comment)
                  }
              })      
          }) 
          .catch(error => {console.log('An error occurred:', error.response);})
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
                console.log(response)
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
            .catch(error => {
              console.log('An error occurred:', error.response);
            })
          }) 
          .catch(error => {
            console.log('An error occurred:', error.response);
          })

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
                console.log(response)
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
            .catch(error => {
              console.log('An error occurred:', error.response);
            })
          }) 
          .catch(error => {
            console.log('An error occurred:', error.response);
          })
    },

//    allMessages(){
//        this.$route.push('/message/')
//    },


    deleteMessage() {
      Swal.fire({
        title: 'Suppression du message ?',
        text: "Attention il est impossible de revenir en arrière !",
        icon: 'warning',
        confirmButtonText: 'Oui, je suis sur!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
            
          }).then((result) => {
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
              // Handle error.
              Swal.fire({
                icon: 'error',
                title: "Le message n'a pas pu être supprimé, veuillez réessayer plus tard !",
                showConfirmButton: false,
                timer: 2500
              })
              console.log('An error occurred:', error.response);
          })
      },
    updateMessage() {
        axios.put(`http://localhost:3000/message/${this.id}`, {
        content: this.message.content},
          {headers: {Authorization: `Bearer ${store.state.token}`},}
        )
          .then((message) => {
            console.log(message)
            Swal.fire({
              icon: 'success',
              title: 'Message modifié',
              showConfirmButton: false,
              timer: 1000
            })
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
            
          }).then((result) => {
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
                  console.log(response)
                  for(const comment of response.data.comments){
                      this.allComments.push(comment)
                  }
              })      
              .catch(error => {
                console.log('An error occurred:', error.response);
              })
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
        ...mapState(['isAdmin', 'userId']),
    },
        mounted() {
          axios.get(`http://localhost:3000/message/${this.id}`, {
              headers: {Authorization: `Bearer ${store.state.token}`},}
          )
          .then(message => {
              console.log(message.data)
              this.message = message.data.message
          })
          .then(() => {
            axios.get(`http://localhost:3000/message/${this.id}/comment`, {
            headers: {Authorization: `Bearer ${store.state.token}`},}
            )
              .then(response => {
                  console.log(response)
                  for(const comment of response.data.comments){
                      this.allComments.push(comment)
                  }
              })      
                .catch(error => {
                  console.log('An error occurred:', error.response);
                })
          })
          .then(() => {
            axios.get(`http://localhost:3000/message/${this.id}/like`, {
            headers: {Authorization: `Bearer ${store.state.token}`},}
            )
              .then(response => {
                  console.log(response)
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
                .catch(error => {
                  console.log('An error occurred:', error.response);
                })
          }) 
          .catch(error => {
            console.log('An error occurred:', error.response);
          })
    }

}
</script>

<style scoped>
#like {
  color: green;
}
#dislike {
  color: red;
}
.sup {
  color: red;
}
.edit {
  color: green;
}
</style>