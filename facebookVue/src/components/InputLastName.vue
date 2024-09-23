<template>
  <div class="flex flex-col items-center">
<!--    <div class="label">-->
<!--      <span class="label-text text-2xl text-black text-center">What is your firstName?</span>-->
<!--    </div>-->
    <input
        type="text"
        name="lastName"
        id="lastName"
        :value="modelValue"
        placeholder="lastName"
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
