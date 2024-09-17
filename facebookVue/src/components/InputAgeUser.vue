<template>
  <div>
    <input
        type="date"
        name="date"
        id="date"
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