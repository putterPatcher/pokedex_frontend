<script setup>
import { getDetails } from '@/requests/user_requests';
import { onMounted, ref } from 'vue';
import Template_body from '../template_body.vue';

const details = ref(null)

onMounted(async () => {
    const res = await getDetails()
    if (res.success) {
        details.value = res.data
    } else {
        alert(res.message)
    }
})

</script>

<template>
    <Template_body>
        <div style="text-align: center;padding-bottom: 3rem;">
            <img src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" height="200px" width="200px" style="border-radius: 50%;border: 7px solid indigo;" />
        </div>
        <div v-if="details != null"
            style="align-items: center;color: white;display: grid;grid-template-columns: repeat(2, 1fr);padding-bottom: 2rem;">
            <span class="key">Username:</span>
            <span class="value">{{ details.username }}</span>
            <span class="key">Name:</span>
            <span class="value">{{ details.name }}</span>
            <span class="key">Email:</span>
            <span class="value">{{ details.email }}</span>
        </div>
    </Template_body>
</template>

<style>
.key {
    font-weight: 700;
    font-size: 24px;
    justify-self: end;
    padding-right: 0.6rem;
}

.value {
    font-weight: 500;
    font-size: 24px;
    justify-self: start;
}
</style>
