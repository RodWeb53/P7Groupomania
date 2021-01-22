<template>
  <div class="container haut pt-5 pb-5 mt-5 mb-4" v-if="$store.state.isUserLoggedIn"  >
    <div class="card-deck mb-3">
        <div class="card text-center">
            <!-- /// Affichage pour l'Avatar du profil et modification si on est l'utilisateur \\\ -->
            <div class="card-header">
              <h2>Photo profil
                <!-- Boutons flèches pour faire apparaitre ou enlever la card -->
                <button v-on:click="avatarTrue()" class="btn btn-secondary btn-xs mb-2 ml-2  float-right"><i class="fas fa-arrow-down"></i></button>
                <button v-on:click="avatarFalse()" class="btn btn-secondary btn-xs mb-2 ml-2 float-right"><i class="fas fa-arrow-up"></i></button>
              </h2>   
            </div>
            <div v-if="avatarTest" class="card-body" >
                <p><img class="w-25 ml-auto mr-auto" :src="user.avatar" alt="photo de profil"></p>
                <!-- On fait apparaitre la modification de l'avatar si on est l'utilisateur -->
                <div v-if="$store.state.userId == user.userId">
                  <p>
                    <input class="mt-4" @change="onFileChange()" type="file" ref="file" name="image" id="File" accept=".jpg, .jpeg, .gif, .png" >
                  </p>
                  <button @click="updateAvatar()" class="btn btn-primary mt-4" >Changer Avatar</button>
                </div>
            </div>
        </div>
        <!-- /// Information sur le profil et modification de la biographie de la personne \\\ -->
        <div class="card text-center">
            <div class="card-header">
              <h2>Information profil
                <!-- Boutons flèches pour faire apparaitre ou enlever la card -->
                <button v-on:click="profilTrue()" class="btn btn-secondary btn-xs mb-2 ml-2  float-right"><i class="fas fa-arrow-down"></i></button>
                <button v-on:click="profilFalse()" class="btn btn-secondary btn-xs mb-2 ml-2 float-right"><i class="fas fa-arrow-up"></i></button>
              </h2>
            </div>
            <div v-if="profil" class="card-body">
              <p>Pseudo : {{ user.name }} </p>
              <p>Email : {{  user.email }}</p>
              <h4>Votre Biographie</h4>
              <!-- Si on est l'utilisateur on affiche une Textarea pour la modification de la Bio -->
              <div v-if="$store.state.userId == user.userId" class="form-group">
                <label for="bioTextarea">Mettre à jour votre Biographie</label>
                <textarea class="form-control" name="changeBio" id="bioTextarea" v-model="changeBio" rows="4"></textarea>
                <button @click="updateProfil()" class="btn btn-primary mt-2" >Changer Biographie</button>
              </div>
              <!-- Sinon on affiche la Bio dans un paragraphe -->
              <div v-else>
                <p> {{ user.bio }} </p>
              </div>
            </div>
        </div>
    </div>
    <!-- /// Changement du mot de passe si on est l'utilisateur \\\ -->
    <div v-if="$store.state.userId == user.userId" class="card mb-3">
      <div class="card-header text-center">
        <h2>Changement mot de passe
          <!-- Boutons flèches pour faire apparaitre ou enlever la card -->
          <button v-on:click="passeTrue()" class="btn btn-secondary btn-xs mb-2 ml-2  float-right"><i class="fas fa-arrow-down"></i></button>
          <button v-on:click="passeFalse()" class="btn btn-secondary btn-xs mb-2 ml-2 float-right"><i class="fas fa-arrow-up"></i></button>
        </h2>
      </div>
      <!-- Formulaire pour le changement du mot de passe -->
      <form v-if="passe" action="" class="card-body  mt-3 w-75 ml-auto mr-auto">
        <div class="form-group">
          <label class="ml-2" for="password">Mot de passe actuel</label>
          <input v-model="password" type="password" id="password" class="form-control">
        </div>
        <div class="form-group">
          <label class="ml-2" for="changePassword">Nouveau mot de passe</label>
          <input v-model="changePassword" type="password" id="changePassword" class="form-control">
        </div>
        <div class="form-group text-center">
          <button @click="updateModifyPass()" class="btn btn-primary" >Modification</button>
        </div>
      </form>
    </div>
    <!-- /// Gestion de la suppression du compte \\\ -->
    <div v-if="$store.state.userId == user.userId || $store.state.isModerateur" class="card-deck mb-3">
        <div class="card text-center">
            <div class="card-header">
              <h2>Suppression compte
                <!-- Boutons flèches pour faire apparaitre ou enlever la card -->
                <button v-on:click="deletTrue()" class="btn btn-secondary btn-xs mb-2 ml-2  float-right"><i class="fas fa-arrow-down"></i></button>
                <button v-on:click="deletFalse()" class="btn btn-secondary btn-xs mb-2 ml-2 float-right"><i class="fas fa-arrow-up"></i></button>
              </h2>
            </div>
            <div v-if="delet" class="card-body">
                <p>Si vous voulez supprimer votre compte et tous les messages que vous avez postés, alors cliquez sur le bouton de suppression du compte</p>  
                <button @click="deleteProfil()" class="btn btn-danger" >Suppression compte</button>
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
  name: 'Profil',
  data () {
    return{
      id: this.$route.params.id,
      user: [],
      password: '',
      profil: true,
      passe: false,
      delet: false,
      law: false,
      avatar:'',
      avatarTest: true,
      changeBio: '',
      changePassword:'',
      newAvatar: '/images/avatar-default.png',
      file: null,
    }
  },
  methods: {
    //Fonction pour la gestion des flèches d'ouverture et fermeture des cards
    passeTrue() {
      this.passe = true;
    },
    passeFalse() {
      this.passe = false;
    },
    deletTrue() {
      this.delet = true;
    },
    deletFalse() {
      this.delet = false;
    },
    lawTrue() {
      this.law = true;
    },
    lawFalse() {
      this.law = false;
    },
    profilTrue() {
      this.profil = true;
    },
    profilFalse() {
      this.profil = false;
    },
    avatarTrue() {
      this.avatarTest = true;
    },
    avatarFalse() {
      this.avatarTest = false;
    },
    // méthodes pour le changement de la Biographie du User
    updateProfil() {
        axios.put(`http://localhost:3000/profil/${this.id}`, {
          bio: this.changeBio,
          userId: store.state.userId},
        {headers: {Authorization: `Bearer ${store.state.token}`},}
      )
      .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Profil mis à jour',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push(`/profil/${this.id}`)
          window.location.reload()
      }) 
      .catch(error => {
        Swal.fire({
          icon: 'error',
            title: "Le profil n'a pas pu être mis à jour, veuillez réessayer !",
            showConfirmButton: false,
            timer: 1500
          })
          console.log('An error occurred:', error.response);
      })
    },

    //Méthodes pour le changement du mot de passe User
    updateModifyPass() {
      axios.put(`http://localhost:3000/profil/${this.id}/passModify`, {
          password: this.password,
          changePassword: this.changePassword,
          userId: store.state.userId},
        {headers: {Authorization: `Bearer ${store.state.token}`},}
      )
      .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'mot de passe mis à jour !',
            showConfirmButton: false,
            timer: 1500
          }),
          this.$store.dispatch('setToken', null)
          this.$store.dispatch('setUser', null)
          this.$store.dispatch('setModerateur', false)
          this.$router.push('/')
          window.location.reload()
      }) 
      .catch(error => {
        Swal.fire({
          icon: 'error',
            title: "Le mot de passe ne peut pas pu être mis à jour, veuillez réessayer !",
            showConfirmButton: false,
            timer: 1500
          })
          console.log('An error occurred:', error.response);
      })
    },

    // Méthodes pour la suppression du compte User
    deleteProfil() {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
          text: "Vous me pourrez pas revenir en arrière !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, supprimer le compte!'
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Compte supprimé!',
              icon: 'success',
              timer: 1500
            })
            axios.delete(`http://localhost:3000/profil/${this.id}`, {
              headers: {Authorization: `Bearer ${store.state.token}`},}
            )
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$store.dispatch('setModerateur', false)
            this.$router.push('/')
          }
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: "Le compte n'a pas pu être supprimé, veuillez réessayer !",
            showConfirmButton: false,
            timer: 1500
          })
          console.log('An error occurred:', error.response);
        })
    },

    // Méthodes pour le changement de l'avatar du User
    onFileChange() {
      this.file = this.$refs.file.files[0];
      this.newAvatar = URL.createObjectURL(this.file)

    },

    updateAvatar() {
      const formData = new FormData()
      formData.append("image", this.file);
      axios.put(`http://localhost:3000/profil/${this.id}/changeAvatar`, formData, {
        avatar: this.newAvatar,
        userId: store.state.userId},
      {headers: {Authorization: `Bearer ${store.state.token}`},}
      )
      .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Profil mis à jour',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push(`/profil/${this.id}`)
          window.location.reload()
      }) 
      .catch(error => {
        Swal.fire({
          icon: 'error',
            title: "Le profil n'a pas pu être mis à jour, veuillez réessayer !",
            showConfirmButton: false,
            timer: 1500
          })
          console.log('An error occurred:', error.response);
      })
    },
  },

  mounted() {
   axios.get(`http://localhost:3000/profil/${this.id}`, {
      headers: {Authorization: `Bearer ${store.state.token}`}}
      )
      .then(profil => {
        this.user = profil.data
        this.changeBio = profil.data.bio
      })   
      .catch(error => {
        console.log('An error occurred:', error.response);
      })
  },
 
  computed: {
      ...mapState(['isModerateur', 'userId'])
  },
}



</script>

<style scoped>

.haut {
  height: 100vh;
}

</style>