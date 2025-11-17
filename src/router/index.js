import AuthPage from '@/components/auth/page.vue'
import NotFound from '@/components/not_found_404.vue'
import AddPokimon from '@/components/pokidex/add_pokimon.vue'
import PokidexPage from '@/components/pokidex/page.vue'
import PokimonDetails from '@/components/pokidex/pokimon_details.vue'
import UserPage from '@/components/user/page.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", name: "Auth", component: AuthPage},
    {path: "/home", name: "Home", component: PokidexPage},
    {path: "/add_pokimon", name: "AddPokimon", component: AddPokimon},
    {path: "/pokimon/:id", name: "Pokimon", component: PokimonDetails},
    {path: "/user", name: "User", component: UserPage},
    {path: "/:pathMatch(.*)*", name: "404", component: NotFound}
  ],
})

export default router
