<template>
  <div class="flex flex-col items-center text-black">
      <input
          ref="myInput"
          type="text"
          :name="fieldName"
          :id="fieldId"
          :placeholder="placeholder"
          @input="$emit('update:modelValue', $event.target.value)"
          class="w-[97%] border-[1px] border-solid bg-white p-2 focus:outline-none rounded mt-6"
          :class="{
            'border-red-700': errormessage,
            'focus:border-sky-400 ': !errormessage,
            'focus:border-red-700': errormessage
          }"
          data-test="inputText"
      >
    <small data-test="errormessage" class="text-red-700" v-if="errormessage">{{ errormessage }}</small>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  placeholder: {
    type: String,
    required: true
  },
  fieldName: {
    type: String,
    required: true
  },
  fieldId: {
    type: String,
    required: true
  },
  errormessage: {
    type: String,
    default: ''
  }
})
</script>