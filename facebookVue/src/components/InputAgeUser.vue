<template>
  <div>
    <input
        type="date"
        name="birthDate"
        id="birthDate"
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