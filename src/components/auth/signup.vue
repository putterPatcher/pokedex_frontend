<script setup>
import { BButton, useToast } from 'bootstrap-vue-next';
import { ref } from 'vue';
import Label from './label.vue';
import Input from './input.vue';
import { signup } from '@/requests/auth_requests';

const emit = defineEmits(['toggleRef'])

const { create } = useToast()

const username = ref("")
const name = ref("")
const email = ref("")
const password = ref("")

const change_username = (value) => {
    username.value = value
}

const change_name = (value) => {
    name.value = value
}

const change_email = (value) => {
    email.value = value
}

const change_password = (value) => {
    password.value = value
}

const submit_handler = async () => {
    const data = await signup({ name: name.value, email: email.value, username: username.value, password: password.value })
    if (data.success) {
        create({
            title: "Signed up successfully",
            variant: "success",
            modelValue: 1500,
            progressProps: {
                variant: "danger",
            },
            body: data.message
        })
        setTimeout(() => {
            emit('toggleRef')
        }, 1500)
    } else {
        create({
            title: "Error signing up.",
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
    <div style="padding: 0rem 3rem 1rem 3rem;display: flex;flex-direction: column;align-items: center;">
        <h2 style="color: palevioletred; font-weight: 700;">Sign Up</h2>
        <div style="display: flex;flex-direction: column;gap: 0.6rem;align-items: stretch;width: 50vw;">
            <div class="input_label">
                <Label id="username" name="User Name" />
                <Input type="text" id="username" :model="username" @value-change="change_username" />
            </div>
            <div class="input_label">
                <Label id="name" name="Name" />
                <Input type="text" id="name" :model="name.value" @value-change="change_name"/>
            </div>
            <div class="input_label">
                <Label id="email" name="Email" />
                <Input type="email" id="email" :model="email.value" @value-change="change_email"/>
            </div>
            <div class="input_label">
                <Label id="password" name="Password" />
                <Input type="password" id="password" :model="password.value" @value-change="change_password"/>
            </div>
            <BButton variant="primary" @click="submit_handler">Sign Up</BButton>
        </div>
    </div>
</template>

<style scoped>
.input_label {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}
</style>