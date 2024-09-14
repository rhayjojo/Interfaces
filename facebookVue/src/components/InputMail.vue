<template>
    <div>
        <input type="email" v-model="email" @input="$emit('event-email', email)" required>
        <p v-if="props.errorMessageEmail">{{ props.errorMessageEmail }}</p>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import type { Ref } from 'vue';

    const email: Ref<string> = ref('');
    const errorMessageEmail : Ref<string> = ref('');
    const props = defineProps({
        errorMessageEmail: String
    });
</script>

<style scoped>

</style>