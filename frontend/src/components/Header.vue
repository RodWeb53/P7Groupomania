<template>
  <div>
    <!-- /// Barre de navigation pour la version desktop et mobile \\\ -->
    <nav id="barnav" class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar-brand"><img src="../assets/Groupomania-recadre.png" class="m-0 p-0" height="50" alt="logo groupomania">
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- lien vers la page d'accueil pour tout les utilisateurs -->
          <li class="nav-item" @click="accueil()">
            <a class="nav-link" href="#">
              <i class="fa fa-home"></i>
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <!-- /// Affichage des options si l'utilisateur est connecté au reseau social \\\ -->
        <!-- lien vers la liste des utilisateurs du réseau social -->
        <ul v-if="$store.state.isUserLoggedIn" class="navbar-nav ">
           <li class="nav-item" @click="usersAll()">
            <a class="nav-link" href="#">
              Utilisateurs
              <i class="fas fa-users"></i>
            </a>
          </li>
          <!-- lien vers la liste des messages -->
          <li class="nav-item" @click="message()">
            <a class="nav-link" href="#">
              Messages
              <i class="fas fa-sign-in-alt"></i>
            </a>
          </li>
          <!-- lien vers le profil de l'utilisateur connecté -->
          <li v-if="$store.state.isUserLoggedIn" class="nav-item" @click="profil()">
            <a class="nav-link" href="#">
              Profil
              <i class="far fa-id-card"></i>
            </a>
          </li>
        </ul>
        <!-- /// Fin des options pour les utilisateurs connectés \\\ -->

        <!-- /// Option pour la connexion et l'inscription \\\ -->
        <!-- lien vers login pour les utilisateurs du reseau social-->
        <ul v-if="!$store.state.isUserLoggedIn" class="navbar-nav ">
          <li class="nav-item" @click="login()">
            <a class="nav-link" href="#">
              Se connecter
              <i class="fas fa-sign-in-alt"></i>
            </a>
          </li>
          <!-- lien vers l'inscripton pour les utilisateurs non inscrit au réseau social -->
          <li v-if="!$store.state.isUserLoggedIn" class="nav-item" @click="signup()">
            <a class="nav-link" href="#">
              S'inscrire
              <i class="fas fa-door-open"></i>
            </a>
          </li>
        </ul>
        <!-- /// Fin des options de connexion et d'inscription  -->

        <!-- lien vers la deconnection pour les utilisateurs connectés -->
        <ul v-if="$store.state.isUserLoggedIn" class="navbar-nav ">
          <li class="nav-item" @click="logout()">
            <a class="nav-link" href="#">
              Déconnecter
              <i class="fas fa-sign-out-alt"></i>
            </a>
          </li>
        </ul>    
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',

  methods: {
    accueil(){
      this.$router.push('/')
    },
    signup() {
      this.$router.push('/signup')
    },
    login() {
      this.$router.push('/login')
    },
    usersAll() {
      this.$router.push('/usersAll')
    },
    profil() {
          if (this.$route.path == `/profil/${this.$store.state.userId}`) {
            window.location.reload()
          } else {
            this.$router.push(`/profil/${this.$store.state.userId}`)
          }
    },
    message() {
      this.$router.push('/message')
    },
    logout(){
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setModerateur', false)
      this.$router.push('/')
    },
  }
}
</script>

<style scoped>

</style>
