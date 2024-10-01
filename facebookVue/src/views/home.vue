<template>
  <div class="flex justify-center items-center h-screen">
    <h1 class="text-5xl font-bold animate-bounce">WELCOME HOME</h1>
  </div>
</template>

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
