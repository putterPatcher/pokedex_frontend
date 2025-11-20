<script setup>
import { getPokedex, filterPokemon } from '@/requests/pokedex_requests';
import { BButton } from 'bootstrap-vue-next';
import { onMounted, reactive, ref } from 'vue';
import Template_body from '../template_body.vue';
import { useRouter } from 'vue-router';


const pokedex = reactive({ pokemons: null })

const logged_in = ref(false)

const filter_data = { name: "", height: { max: "", min: "" }, weight: { max: "", min: "" }, candy_count: { max: "", min: "" }, spawn_chance: { max: "", min: "" }, avg_spawns: { max: "", min: "" } }

const filters = reactive({ filters: filter_data })

const filter_show = ref(false)

const router = useRouter()

const getPokedexData = async () => {
    const data = await getPokedex()
    filters.filters.height.max = Math.max(...data.data.map(item => item.height))
    filters.filters.height.min = Math.min(...data.data.map(item => item.height))
    filters.filters.weight.max = Math.max(...data.data.map(item => item.weight))
    filters.filters.weight.min = Math.min(...data.data.map(item => item.weight))
    filters.filters.candy_count.max = Math.max(...data.data.map(item => typeof(item.candy_count) == 'number' ? item.candy_count : 0))
    filters.filters.candy_count.min = Math.min(...data.data.map(item => typeof(item.candy_count) == 'number' ? item.candy_count : 0))
    filters.filters.spawn_chance.max = Math.max(...data.data.map(item => item.spawn_chance))
    filters.filters.spawn_chance.min = Math.min(...data.data.map(item => item.spawn_chance))
    filters.filters.avg_spawns.max = Math.max(...data.data.map(item => item.avg_spawns))
    filters.filters.avg_spawns.min = Math.min(...data.data.map(item => item.avg_spawns))
    pokedex.pokemons = data.data
}

const filterPokedexData = async (filters) => {
    const data = await filterPokemon(filters)
    pokedex.pokemons = data.data
}

const toggle_filter_button = () => {
    filter_show.value = !filter_show.value
}

const filter_submit_handler = async () => {
    await filterPokedexData(filters.filters)
}

const filter_reset_handler = async () => {
    filters.filters = filter_data
    await getPokedexData()
}

const go_to_page = () => {
    if (logged_in.value) {
        router.push({ "path": '/add_pokemon' })
    } else {
        router.push({ "path": "/" })
    }
}

onMounted(async () => {
    if (localStorage.getItem("jwt")) {
        logged_in.value = true
    } else {
        logged_in.value = false
    }
    await getPokedexData()
})

const to_account = () => {
    if (localStorage.getItem('jwt')) {
        router.push({ 'path': '/user' })
    }
}

const to_details = (id) => {
    router.push({ "path": `/pokemon/${id}` })
}

</script>

<template>
    <Template_body style="text-align: center; color: white;">
        <div class="two_buttons">
            <BButton v-if="logged_in" @click="to_account">Account</BButton>
            <BButton variant="danger" @click="toggle_filter_button">Filter</BButton>
            <BButton variant="success" @click="go_to_page">{{ logged_in ? "Add Pokemon" : "Sign Up" }}</BButton>
        </div>
        <div v-if="filter_show"
            style="border: 3px solid white;border-radius: 1rem;position: fixed; text-align: center;height: 64vh;width: fit-content;background-color: darkred; color: white;padding: 1rem;margin-left: 1rem;margin-right: 1rem;right: 0rem;">
            <div class="hide-scrollbar" style="overflow-y: scroll;height: 100%;">
                <div class="filter_forms">
                    <label>Name:</label>
                    <input class="filter_form" type="text" v-model="filters.filters.name" />
                </div>
                <br />
                <div class="filter_forms">
                    <label>Height:</label>
                    <div class="filter_form">
                        <label>Min</label>
                        <input type="number" v-model="filters.filters.height.min" />
                        <label>Max</label>
                        <input type="number" v-model="filters.filters.height.max" />
                    </div>
                </div>
                <br />
                <div class="filter_forms">
                    <label>Weight:</label>
                    <div class="filter_form">
                        <label>Min</label>
                        <input type="number" v-model="filters.filters.weight.min" />
                        <label>Max</label>
                        <input type="number" v-model="filters.filters.weight.max" />
                    </div>
                </div>
                <br />
                <div class="filter_forms">
                    <label>Candy Count:</label>
                    <div class="filter_form">
                        <label>Min</label>
                        <input type="number" v-model="filters.filters.candy_count.min" />
                        <label>Max</label>
                        <input type="number" v-model="filters.filters.candy_count.max" />
                    </div>
                </div>
                <br />
                <div class="filter_forms">
                    <label>Spawn Chance:</label>
                    <div class="filter_form">
                        <label>Min</label>
                        <input type="number" v-model="filters.filters.spawn_chance.min" />
                        <label>Max</label>
                        <input type="number" v-model="filters.filters.spawn_chance.max" />
                    </div>
                </div>
                <br />
                <div class="filter_forms">
                    <label>Avg. Spawns:</label>
                    <div class="filter_form">
                        <label>Min</label>
                        <input type="number" v-model="filters.filters.avg_spawns.min" />
                        <label>Max</label>
                        <input type="number" v-model="filters.filters.avg_spawns.max" />
                    </div>
                </div>
                <div class="two_buttons" style="padding-bottom: 0rem;padding-top: 0.5rem;">
                    <BButton @click="filter_submit_handler" variant="outline-success">Apply</BButton>
                    <BButton @click="filter_reset_handler" variant="outline-info">Reset</BButton>
                </div>
            </div>
        </div>
        <div class="hide-scrollbar"
            style="display: flex; gap: 1rem; flex-wrap: wrap;overflow-y: scroll; height:92%; justify-content: center;">
            <div v-for="item in pokedex.pokemons"
                style="width: 15rem;height: 15rem;border: solid greenyellow;border-radius: 0.3rem;padding: 0.3rem;"
                :id="item._id">
                <img :src="item.img" height="75px" width="75px" />
                <h5>{{ item.name }}</h5>
                <div style="display: flex;flex-direction: column;padding-bottom: 0.3rem;">
                    <span class="p_font">Type: {{ item.type.join(", ") }}</span>
                    <span class="p_font">Height: {{ item.height }} m</span>
                    <span class="p_font">Weight: {{ item.weight }} kg</span>
                </div>
                <BButton size="sm" variant="info" @click="to_details(item._id)">Details</BButton>
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

.filter_form {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    grid-column: 2 / span 4;
    flex-wrap: wrap ;
}

label {
    margin-bottom: 0rem !important;
}

.two_buttons {
    display: flex;
    justify-content: right;
    padding-bottom: 0.5rem;
    gap: 0.7rem;
    padding-right: 0.3rem;
}

.filter_forms {
    display: grid;
    justify-items: left;
    grid-auto-flow: column;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
}
</style>
