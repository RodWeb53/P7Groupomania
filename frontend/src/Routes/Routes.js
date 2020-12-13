import Accueil from '../components/Accueil.vue'
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import Message from '../components/Message.vue'

export default [
  {path: '/', component: Accueil},
  {path: '/signup', component: SignUp},
  {path: '/login', component: Login},
  {path: '/message', component: Message}
]