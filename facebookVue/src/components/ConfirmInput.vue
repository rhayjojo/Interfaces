<template>
    <div>
        <input type="password" v-model="confirmPassword" @input="$emit('event-confirmPw', confirmPassword)" required>
    </div>
</template>

<script setup lang="ts">
    import {ref} from 'vue'
    import type { Ref } from 'vue'

    const confirmPassword:Ref<string> = ref('')
    const props = defineProps({
        errorMesageConfirmPassword: String,
    })


</script>

<style scoped>

</style>