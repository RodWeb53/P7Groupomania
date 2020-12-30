import Accueil from '../components/Accueil.vue'
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import Message from '../components/Message.vue'
import Profil from '../components/Profil.vue'
import OneMessage from '../components/OneMessage.vue'

export default [
  {path: '/', component: Accueil},
  {path: '/signup', component: SignUp},
  {path: '/login', component: Login},
  {path: '/profil', component: Profil},
  {path: '/message', component: Message},
  {path: '/message/:id', component: OneMessage}
]