<template>
  <div>
    <input
        type="password"
        name="password"
        id="password"
        placeholder="password "
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