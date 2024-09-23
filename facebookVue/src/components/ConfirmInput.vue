<template>
  <div>
    <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="confirm password "
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-[97%] border-[1px] border-solid bg-white p-2 focus:border-sky-400  focus:outline-none rounded mt-3"
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()
</script>