# Groupomania
OpenClassrooms Projet n°7 : Création d'un réseau social d'entreprise

## Définition du projet
Le projet est un réseau social d'entreprise ou l'on peut poster des messages.

Sur la page d'accueil du site il y 2 choix:
  - S'incrire
    - Information à fournir : Pseudo, Email, Mot de passe
  - Se connecter
    - Information à fournir : Email et mot de passe

Une fois connecté on arrive sur la page des "Posts"

La page fournit un header avec quatre possibilités :
  - Utilisateurs
    - Donne la liste de tous les utilisateurs du site avec des informations sur :
      - le nombre de messages, de commentaires et de Likes
      - il y a un lien pour voir tout les messages d'un utilisateur
      - et un lien vers le profil de l'utilisateur
  - Messages
    - Donne la liste de tous les messages en ordre décroissants avec les informations :
      - créateur et date du message.
      - nombre de likes et de commentaires
      - texte complet du message
      - lien vers les commentaires (possiblité d'ajouter un commentaire)
    - Fonctionnalité pour publié un Post
  - Profil
    - Si on est l'utilisateur, les fonctionnalités suivantes sont disponible:
      - Changer la photo de profil
      - Changer la Biographie
      - Changer le mot de passe
      - Supprimer le compte utilisateur et les messages associés
  - Déconnecter
    - Permet de se déconnecter du système proprement

### Prérequis
Avoir NODE JS et Mysql installé sur le poste

Vérifier que Mysql server tourne

#### Installation

1°) Cloner le dépôt

2°) Créez à la racine du dossier backend/ un ficher `.env` avec comme contenu :

-- Pour la clé TOKEN --
TOKEN=votre_token

-- Pour la base de données --
USER=nom_utilisateur
PASSWORD=votre_password
DB=nom_de_la_base

3°) Placez vous respectivement dans les dossiers backend et frontend et
lancez la commande `npm install` dans le terminal pour installer les extensions
qui sont utiles au fonctionnement du réseau

4°) Vérifiez les informations contenu dans le fichier
   `backend/config/config.json` ainsi que 
   `backend/config/db.js`

5°) Création de la base de données et migration des données
Dans le terminal, placez-vous dans le répertoire backend et lancer les commandes suivantes:

  `npx sequelize-cli db:create`

  `npx sequelize-cli db:migrate`

  `npx sequelize-cli db:seed:all`


6°) Ouvrez un premier terminal et placez vous dans le dossier backend/.
    Lancez la commande `npm start`

7°) Ouvrez un second terminal et placez vous dans le dossier frontend/.
    Lancez la commande `npm run serve`

8°) Ouvrez votre navigateur et rendez-vous à l'adresse:
    `http://localhost:8080`

9°) Vous pouvez créer votre utilisateur, sinon les utilisateurs suivants sont disponoble:

  `gabin@groupomania.com`
    `moderateur@groupomania.com`
      `rodolphe@groupomania.com`
        `romain@groupomania.com`
          `virginie@groupomania.com`
            `zoe@groupomania.com`
  
  Le mot de passe est identique pour tous les utilisateurs
    `GROUPomania2021`



