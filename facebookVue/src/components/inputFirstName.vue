<template>
  <div>
    <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="firstName"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>