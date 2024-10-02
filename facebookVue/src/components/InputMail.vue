<template>
  <div class="text-black">
<!--    <div class="label">-->
<!--      <span class="label-text text-2xl text-black text-center">What is your firstName?</span>-->
<!--    </div>-->
    <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-[97%] border-[1px] border-solid bg-white p-2 focus:outline-none rounded mt-3"
        :class="{
            'border-red-700': errormessage,
            'focus:border-sky-400 ': !errormessage,
            'focus:border-red-700': errormessage
          }"
        data-test="email"
    >
    <small data-test="email" class="text-red-700" v-if="errormessage">{{ errormessage }}</small>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  errormessage
}>()
</script>