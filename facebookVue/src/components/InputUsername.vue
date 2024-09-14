<template>
    <div>
        <input type="text" name="username" id="username" placeholder="username" v-model="username" @input="$emit('event-username', username)" required>
    </div>
</template>

<script setup lang="ts">
    import {ref} from 'vue'
    const username = ref('')
</script>

<style scoped>

</style>