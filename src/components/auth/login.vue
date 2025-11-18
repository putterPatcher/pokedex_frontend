<script setup>
import { BButton, useToast } from 'bootstrap-vue-next';
import Input from './input.vue';
import Label from './label.vue';
import { ref } from 'vue';
import { login } from '@/requests/auth_requests';
import { useRouter } from 'vue-router';

const router = useRouter()

const { create } = useToast()

const email = ref("")
const password = ref("")

const change_email = (value) => {
    email.value = value
}

const change_password = (value) => {
    password.value = value
}

const login_handler = async () => {
    const data = await login({ email: email.value, password: password.value })
    if (data.success) {
        create({
            title: "Logged in successfully",
            variant: "success",
            modelValue: 1500,
            progressProps: {
                variant: "danger",
            },
            body: data.message
        })
        console.log(data.data.jwt)
        localStorage.setItem("jwt", data.data.jwt)
        setTimeout(() => {
            router.push({"path": "/home"})
        }, 1500);
    } else {
        create({
            title: "Error logging in.",
            variant: "danger",
            modelValue: 3000,
            progressProps: {
                variant: "danger",
            },
            body: data.message
        })
    }
}
</script>

<template>
    <div style="padding: 3rem;display: flex;flex-direction: column;align-items: center;">
        <h2 style="color: palevioletred; font-weight: 700;">Login</h2>
        <div style="display: flex;flex-direction: column;gap: 1rem;align-items: stretch;width: 50vw;">
            <div class="input_label">
                <Label id="email" name="Email" />
                <Input type="email" id="email" :model="email" @value-change="change_email" />
            </div>
            <div class="input_label">
                <Label id="password" name="Password" />
                <Input type="password" id="password" :model="password" @value-change="change_password" />
            </div>
            <BButton variant="primary" @click="login_handler">Login</BButton>
        </div>
    </div>
</template>

<style scoped>
.input_label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>
