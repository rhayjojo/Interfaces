<template>
  <div>
    <input
        type="password"
        name="password"
        id="password"
        placeholder="password "
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-[97%] border-[1px] bg-white p-2 focus:border-sky-400  focus:outline-none rounded mt-3"
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()
</script>