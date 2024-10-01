<template>
  <div class="flex flex-col items-center text-black text-black">
      <input
          ref="myInput"
          type="text"
          name="firstName"
          id="firstName"
          placeholder="firstName"
          @input="$emit('update:modelValue', $event.target.value)"
          class="w-[97%] border-[1px] border-solid bg-white p-2 focus:outline-none rounded mt-6"
          :class="{
            'border-red-700': errormessage,
            'focus:border-sky-400 ': !errormessage,
            'focus:border-red-700': errormessage
          }"
          data-test="firstname"
      >
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';

const myInput = ref(null)
onMounted(() => {
  if(myInput.value){
    myInput.value.focus()
  }
})
const props = defineProps<{
  errormessage: string
  modelValue: string
}>();
</script>