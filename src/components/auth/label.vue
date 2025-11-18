<script setup>
defineProps([
    'name',
    'id'
])
</script>

<template>
    <label class="label_style" :for="id">{{ name }}</label>
</template>

<style>
.label_style {
    font-size: medium;
    color: white;
}
</style>
