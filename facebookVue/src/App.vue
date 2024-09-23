<template>
  <div>
    <navBar/>
  <router-view />
  </div>
</template>

<script setup lang="ts">
  import navBar from  '@/components/navBar.vue'
</script>