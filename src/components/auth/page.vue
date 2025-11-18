<script setup>
import { getPokedex } from '../../requests/pokedex_requests'
import signup from './signup.vue';
import login from './login.vue';
import { ref } from 'vue';
import { BButton } from 'bootstrap-vue-next';
import Template_body from '../template_body.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const login_ref = ref(false)

const toggle_login = () => {
    login_ref.value = !login_ref.value
}

const toggle_to_login = () => {
    login_ref.value = true
}
</script>

<template>
    <Template_body>
        <div style="display: flex;gap: 1rem; justify-content: end;">
            <BButton variant="success" @click="() => router.push({ 'path': '/home' })">Pokedex</BButton>
            <BButton variant="outline-success" @click="toggle_login">{{ !login_ref ? "Login" : "Signup" }}</BButton>
        </div>
        <login v-if="login_ref"></login>
        <signup v-else @toggle-ref="toggle_to_login"></signup>
    </Template_body>
</template>

<style></style>