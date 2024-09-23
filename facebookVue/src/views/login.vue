<template>
    <div>
        <InputUsername />
        <InputPassWord />
        <buttonLoging />
        <router-link to="forgetPassWord">forgot password ?</router-link>
    </div>
</template>

<script setup lang="ts">
import InputUsername from '@/components/InputLastName.vue';
import InputPassWord from '@/components/InputPassWord.vue';
import buttonLoging from  '@/components/buttonLoging.vue'

</script>

<style scoped>

</style>