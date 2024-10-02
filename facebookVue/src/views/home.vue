<template>
  <div class="flex justify-center items-center h-screen">
    <h1 class="text-5xl font-bold animate-bounce">{{ welcomeHome }}</h1>
  </div>
</template>
<script setup lang="ts">
  const welcomeHome = t('message.welcomeHome')
</script>
<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 2s ease-in-out;
}
</style>
