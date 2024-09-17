<template>
  <div>
    <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()
</script>