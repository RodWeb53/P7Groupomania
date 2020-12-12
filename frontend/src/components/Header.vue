<template>
  <div>
    
    <nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
      
      <div class="navbar-brand"><img src="../assets/icon-left-font-monochrome-white.png" class="m-0 p-0" height="120" alt="logo groupomania">
      </div>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item" @click="accueil()">
            <a class="nav-link" href="#">
              <i class="fa fa-home"></i>
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
<!--          
          <li class="nav-item">
            <a class="nav-link" href="#">
              Notification
              <i class="fa fa-envelope-o">
                <span class="badge badge-danger">Compteur</span>
              </i>              
            </a>
          </li>
-->          
        </ul>

        <ul class="navbar-nav ">
          <li class="nav-item">
            <a class="nav-link" href="#">
              Se connecter
              <i class="fas fa-sign-in-alt"></i>
            </a>
          </li>

          <li class="nav-item" @click="signup()">
            <a class="nav-link" href="#">
              S'inscrire
              <i class="fas fa-door-open"></i>
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

  }
}
</script>
<style>

</style>