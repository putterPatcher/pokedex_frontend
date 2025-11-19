<script setup>
import { BButton } from 'bootstrap-vue-next';
import Template_body from '../template_body.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getPokemon } from '@/requests/pokedex_requests';

const jwt = localStorage.getItem('jwt')

const details = ref(null)

const router = useRouter()

const route = useRoute()

const to_home = () => {
    router.push({ "path": "/home" })
}

const handle_collection = () => {
    if (jwt) {
        router.push({ "path": "/user" })
    } else {
        router.push({ "path": "/" })
    }
}

onMounted(async () => {
    const res = await getPokemon(route.params.id)
    details.value = res.data
})

</script>

<template>
    <Template_body>
        <div style="display: flex;gap: 1rem;justify-content: end;">
            <BButton variant="success" @click="to_home">Pokedex</BButton>
            <BButton @click="handle_collection">{{ jwt ? "Account" : "Login" }}</BButton>
        </div>
        <div v-if="details != null"
            style="align-items: center;color: white;display: grid;grid-template-columns: repeat(2, 1fr);padding-bottom: 2rem;">
            <span style="font-weight: 700;font-size: 24px;justify-self: end;padding-right: 0.6rem;">Name:</span>
            <span style="font-weight: 500;font-size: 24px;justify-self: start;">{{ details.name }}</span>
            <img style="grid-column: 1 / span 2;justify-self: center;" alt="No image" :src="details.img"
                width="170px" />
            <span class="key">Height:</span>
            <span class="value">{{ details.height }} m</span>
            <span class="key">Weight:</span>
            <span class="value">{{ details.weight }} kg</span>
            <span class="key">Type:</span>
            <span class="value">{{ details.type.join(", ") }}</span>
            <span class="key">Next Evolution:</span>
            <span class="value">{{typeof (details.next_evolution) != "object" ? "None" :
                details.next_evolution.map((item) => item.name).join(", ")}}</span>
            <span class="key">Weaknesses:</span>
            <span class="value">{{ typeof (details.weaknesses) != "object" ? "None" : details.weaknesses.join(", ")
                }}</span>
            <span class="key">Candy:</span>
            <span class="value">{{ details.candy || "None" }}</span>
            <span class="key">Candy Count:</span>
            <span class="value">{{ details.candy_count || 0 }}</span>
            <span class="key">Egg:</span>
            <span class="value">{{ details.egg || "None" }}</span>
            <span class="key">Spawn Chance:</span>
            <span class="value">{{ details.spawn_chance || "None" }}</span>
            <span class="key">Spawn Time:</span>
            <span class="value">{{ details.spawn_time || "None" }}</span>
            <span class="key">Average Spawns:</span>
            <span class="value">{{ details.avg_spawns || "None" }}</span>
            <span class="key">Multipliers:</span>
            <span class="value">{{ details.multipliers == null ? "None" : details.multipliers.join(", ") }}</span>
        </div>
    </Template_body>
</template>

<style scoped>
.key {
    font-weight: 700;
    font-size: 18px;
    justify-self: end;
    padding-right: 0.6rem;
}

.value {
    font-weight: 500;
    font-size: 18px;
    justify-self: start;
}
</style>
