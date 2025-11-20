<script setup>
import { BButton } from 'bootstrap-vue-next';
import Template_body from '../template_body.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { addPokemon, getPokemon } from '@/requests/pokedex_requests';
import { editPokemon } from '@/requests/user_requests';

const emits = defineEmits(['editFalse'])
const props = defineProps([ 'id' ])

const details = reactive({})

const router = useRouter()

const handle_input_change = (field, value) => {
    if (field == 'name') {
        details.name = value
    } else if (field == 'img') {
        details.img = value
    } else if (field == 'height') {
        details.height = value
    } else if (field == 'weight') {
        details.weight = value
    } else if (field == 'type') {
        details.type = value
    } else if (field == 'next_evolution') {
        details.next_evolution = value
    } else if (field == 'weaknesses') {
        details.weaknesses = value
    } else if (field == 'candy') {
        details.candy = value
    } else if (field == 'candy_count') {
        details.candy_count = value
    } else if (field == 'egg') {
        details.egg = value
    } else if (field == 'spawn_chance') {
        details.spawn_chance = value
    } else if (field == 'spawn_time') {
        details.spawn_time = value
    } else if (field == 'avg_spawns') {
        details.avg_spawns = value
    } else if (field == 'multipliers') {
        details.multipliers = value
    }
}

const handle_submit = async () => {
    if (details.name == "") {
        alert("Name field is empty.")
    } else if (details.img == "") {
        alert("Image URL is empty.")
    } else if (details.height == "") {
        alert("Height field is empty.")
    } else if (details.weight == "") {
        alert("Weight field is empty.")
    } else if (details.type == "") {
        alert("Type field is empty")
    } else {
        details.type = details.type.split(",").map(item => item.trim())
        details.next_evolution = details.next_evolution.split(",").map(item => item.trim()).map(item => ({ name: item }))
        details.weaknesses = details.weaknesses.split(",").map(item => item.trim())
        details.multipliers = details.multipliers.split(",").map(item => parseFloat(item))
        details.jwt = localStorage.getItem('jwt')
    }
    const res = await editPokemon(details)
    if (res.success) {
        emits('editFalse')
    } else {
        alert(res.message)
    }
}

onMounted(async () => {
    const res = await getPokemon(props.id)
    if (res.success) {
        const data = res.data
        details.name = data.name
        details.img = data.img
        details.height = data.height
        details.weight = data.weight
        details.type = data.type.join(", ")
        details.next_evolution = data.next_evolution.map(item => item.name).join(", ")
        details.weaknesses = data.weaknesses.join(", ")
        details.candy = data.candy
        details.candy_count = data.candy_count
        details.egg = data.egg
        details.spawn_chance = data.spawn_chance
        details.spawn_time = data.spawn_time
        details.avg_spawns = data.avg_spawns
        details.multipliers = data.multipliers.join(", ")
        details._id = data._id
    } else {
        alert(res.message)
    }

})

</script>

<template>
        <h3 style="color: bisque;font-weight: 700;text-align: center;padding-bottom: 0.5rem;">Edit Pokemon</h3>
        <div v-if="details != null"
            style="gap: 1rem;align-items: center;color: white;display: grid;grid-template-columns: repeat(2, 1fr);padding-bottom: 2rem;">
            <span class="key">Name:</span>
            <input :value="details.name" type="text" class="value"
                @input="handle_input_change('name', $event.target.value)" required placeholder="Required*" />
            <span class="key">Image:</span>
            <input :value="details.img" type="text" class="value" @input="handle_input_change('img', $event.target.value)" required
                placeholder="Required*" />
            <span class="key">Height:</span>
            <input :value="details.height" type="number" class="value" @input="handle_input_change('height', $event.target.value)" required
                placeholder="Required*" />
            <span class="key">Weight:</span>
            <input :value="details.weight" type="number" class="value" @input="handle_input_change('weight', $event.target.value)" required
                placeholder="Required*" />
            <span class="key">Type:</span>
            <input :value="details.type" type="text" class="value" @input="handle_input_change('type', $event.target.value)" required
                placeholder="Required*" />
            <span class="key">Next Evolution:</span>
            <input :value="details.next_evolution" type="text" class="value" @input="handle_input_change('next_evolution', $event.target.value)" />
            <span class="key">Weaknesses:</span>
            <input :value="details.weaknesses" type="text" class="value" @input="handle_input_change('weaknesses', $event.target.value)" />
            <span class="key">Candy:</span>
            <input :value="details.candy" type="text" class="value" @input="handle_input_change('candy', $event.target.value)" />
            <span class="key">Candy Count:</span>
            <input :value="details.candy_count" type="number" class="value"
                @input="handle_input_change('candy_count', $event.target.value)" />
            <span class="key">Egg:</span>
            <input :value="details.egg" type="text" class="value" @input="handle_input_change('egg', $event.target.value)" />
            <span class="key">Spawn Chance:</span>
            <input :value="details.spawn_chance" type="number" class="value"
                @input="handle_input_change('spawn_chance', $event.target.value)" />
            <span class="key">Spawn Time:</span>
            <input :value="details.spawn_time" type="text" class="value" @input="handle_input_change('spawn_time', $event.target.value)" />
            <span class="key">Average Spawns:</span>
            <input :value="details.avg_spawns" type="number" class="value"
                @input="handle_input_change('avg_spawns', $event.target.value)" />
            <span class="key">Multipliers:</span>
            <input :value="details.multipliers" type="text" class="value" @input="handle_input_change('multipliers', $event.target.value)" />
            <BButton style="width: 200px;justify-self: center;" variant="outline-success"
                @click="handle_submit">Update</BButton>
            <BButton style="width: 200px;justify-self: center;" variant="outline-danger"
                @click="$emit('editFalse')">Cancel</BButton>
        </div>
</template>

<style>
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
