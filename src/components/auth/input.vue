<script setup>
defineProps([
    'model',
    'id', 
    "type"
])
defineEmits(['valueChange'])
</script>

<template>
    <input :type="type" :id="id" :value="model" @input="$emit('valueChange', $event.target.value)" class="input_style" />
</template>

<style> 
.input_style {
    padding: 0.5rem;
    border-radius: 0.3rem;
    border: 2px solid blue;
}
</style>
