<script setup>
import { onMounted, ref } from 'vue';
import Template_body from '../template_body.vue';
import { deletePokemon, getCollection } from '@/requests/user_requests';
import { BButton } from 'bootstrap-vue-next';
import { useRouter } from 'vue-router';

const emit = defineEmits(['editTrue', 'pokemonId'])

const router = useRouter()

const pokemons = ref(null)

const to_details = (id) => {
    router.push({ "path": `/pokemon/${id}` })
}

const handle_edit = (id) => {
    emit("pokemonId", id)
    emit('editTrue')
}

const handle_delete = async (id, name) => {
    if (confirm(`Delete "${name}". Are you sure?`)) {
        const res = await deletePokemon({ jwt: localStorage.getItem('jwt'), _id: id })
        if (res.success) {
            const res = await getCollection()
            if (res.success) {
                pokemons.value = res.data
            } else {
                alert(res.message)
            }
        } else {
            alert(res.message)
        }
    }
}

onMounted(async () => {
    const res = await getCollection()
    if (res.success) {
        pokemons.value = res.data
    } else {
        alert(res.message)
    }
})
</script>

<template>
    <Template_body style="text-align: center; color: white;">
        <h3 style="text-align: center;font-weight: 700;color: white;">Collection</h3>
        <div v-if="pokemons" class="hide-scrollbar"
            style="display: flex; gap: 1rem; flex-wrap: wrap;overflow-y: scroll; height:92%; justify-content: center;">
            <div v-for="item in pokemons"
                style="width: 15rem;height: 15rem;border: solid greenyellow;border-radius: 0.3rem;padding: 0.3rem;"
                :id="item._id">
                <img :src="item.img" height="75px" width="75px" />
                <h5>{{ item.name }}</h5>
                <div style="display: flex;flex-direction: column;padding-bottom: 0.3rem;">
                    <span class="p_font">Type: {{ item.type.join(", ") }}</span>
                    <span class="p_font">Height: {{ item.height }} m</span>
                    <span class="p_font">Weight: {{ item.weight }} kg</span>
                </div>
                <div style="display: flex;gap:0.4rem;justify-content: center;">
                    <BButton size="sm" variant="info" @click="to_details(item._id)">Details</BButton>
                    <BButton @click="handle_edit(item._id)" variant="primary">Edit</BButton>
                    <BButton variant="danger" @click="handle_delete(item._id, item.name)">Delete</BButton>
                </div>
            </div>
        </div>
    </Template_body>
</template>

<style>
.hide-scrollbar {

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.p_font {
    font-size: small;
}
</style>
