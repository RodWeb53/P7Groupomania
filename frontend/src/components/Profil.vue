<template>
  <div class="container mt-5">

    <div class="card-deck mb-3">
        <div class="card text-center">
            <div class="card-header"><h2>Photo profil</h2></div>
            <div class="card-body">
                <p><img class="w-25 ml-auto mr-auto" src="../assets/icon.png" alt="photo de profil"></p>
                
                <button class="btn btn-primary" >Changer Avatar</button>
            </div>
        </div>
        <div class="card text-center">
            <div class="card-header"><h2>Information profil</h2></div>
            <div class="card-body">
                <p>Email : champ dynamique</p>
                <h3>Votre Biographie</h3>
                <p>Récupération de la bio de la base de données</p>
                <div class="form-group">
                  <label for="bioTextarea">Nouvelle Biographie</label>
                  <textarea class="form-control" id="bioTextarea" rows="3"></textarea>
                  <button class="btn btn-primary mt-2" >Changer Biographie</button>
                </div>
                
            </div>
        </div>
    </div>

    
    <div class="card mb-3">
      <div class="card-header text-center">
        <h2>Changement mot de passe</h2>
      </div>


      <form action="" class="card-body  mt-3 w-75 ml-auto mr-auto">

        <div class="form-group">
          <label class="ml-2" for="passwordActuel">Mot de passe actuel</label>
          <input v-model="password" type="password" id="passwordActuel" class="form-control">
        </div>

        <div class="form-group">
          <label class="ml-2" for="passwordNew">Nouveau mot de passe</label>
          <input v-model="password" type="password" id="passwordNew" class="form-control">
        </div>
        
        <div class="form-group text-center">
          <button class="btn btn-primary" >Modification</button>
        </div>

      </form>
      
    </div>

    <div class="card-deck mb-3">
        <div class="card text-center">
            <div class="card-header"><h2>Suppression compte</h2></div>
            <div class="card-body">
                <p>Si vous voulez supprimer votre compte et tous les messages que vous avez postés, alors cliquez sur le bouton de suppression du compte</p>
                
                <button class="btn btn-danger" >Suppression compte</button>
            </div>
        </div>
        <div class="card text-center">
            <div class="card-header"><h2>Gestion des droits</h2></div>
            <div class="card-body">
                <p>Vos droits actuels sont : récupération de la bd</p>
                
               
                <button class="btn btn-primary mt-2" >Ajoutez moderateur</button>
                
            </div>
        </div>
    </div>

  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: 'Profil',
  data () {
    return{
      email: '',
      password: '',
    }
  },
  
  
}
</script>

<style scoped>

</style>