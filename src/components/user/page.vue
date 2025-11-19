<script setup>
import { BButton } from 'bootstrap-vue-next';
import Template_body from '../template_body.vue';
import Details from './details.vue';
import Collection from './collection.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '@/requests/auth_requests';
import EditPokemon from './edit_pokemon.vue';

const show_details = ref(true)

const edit = ref(false)

const idRef = ref(null)

const jwt = localStorage.getItem('jwt')

const router = useRouter()

const toggle_show_details = () => {
  edit.value = false
  show_details.value = !show_details.value
}

const to_home = () => {
  router.push({ "path": "/home" })
}

const handle_logout = async () => {
  const jwt = localStorage.getItem('jwt')
  const data = await logout({ jwt })
  if (data.success) {
    localStorage.removeItem('jwt')
    router.push({ "path": "/home" })
  }
}

const edit_true_handler = () => {
  edit.value = true
}

const edit_false_handler = () => {
  edit.value = false
}

const pokemon_id_handler = (id) => {
  idRef.value = id
}

const to_login = () => {
  router.push({ "path": "/" })
}

</script>

<template>
  <Template_body v-if="jwt">
    <div style="display: flex;flex-direction: column;gap: 2rem">
      <div style="display: flex;gap: 1rem;justify-content: right;">
        <BButton variant="light" @click="toggle_show_details">{{ show_details ? "Collection" : "Details" }}
        </BButton>
        <BButton variant="primary" @click="to_home">Pokemon</BButton>
        <BButton variant="danger" @click="handle_logout">Logout</BButton>
      </div>
      <div v-if="edit">
        <EditPokemon v-on:edit-false="edit_false_handler" :id="idRef"  />
      </div>
      <div v-else>
        <Details v-if="show_details" />
        <Collection v-else @edit-true="edit_true_handler" @pokemon-id="pokemon_id_handler" />
      </div>
    </div>
  </Template_body>
  <div v-else
    style="color: white;font-size: 48px; background-color: black; height: 85vh;padding-top: 30vh;text-align: center;">
    <p>Login First</p>
    <BButton @click="to_login" variant="warning">Login</BButton>
  </div>
</template>

<style></style>
