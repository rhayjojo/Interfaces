<template>
    <div>
        <input type="password" v-model="password" @input="$emit('event-password', password)"  required>
        <!-- <p v-if="props">{{ props }}</p> -->
    </div>
</template>

<script setup lang="ts">
    import  {ref} from 'vue'
    import type { Ref } from 'vue'

    const password : Ref<string> = ref('')
   
</script>
    

<style scoped>
    
</style>