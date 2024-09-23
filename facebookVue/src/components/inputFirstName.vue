<template>
  <div class="flex flex-col items-center">
      <input
          ref="myInput"
          type="text"
          name="firstName"
          id="firstName"
          placeholder="firstName"
          @input="$emit('update:modelValue', $event.target.value)"
          class="w-[97%] border-[1px] border-solid bg-white p-2 focus:border-sky-400  focus:outline-none rounded mt-6"
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
  modelValue: string
}>();
</script>