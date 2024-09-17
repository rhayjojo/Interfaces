<template>
  <div>
    <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="lastName"
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
