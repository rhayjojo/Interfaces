<template>
  <div class="relative w-full text-black">
    <input
        :type="showPassword ? 'text' : 'password'"
        name="password"
        id="password"
        placeholder="password"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-[97%] border-[1px] bg-white p-2 focus:outline-none rounded mt-3"
        :class="{
        'border-red-700': errormessage,
        'focus:border-sky-400': !errormessage,
        'focus:border-red-700': errormessage
      }"
        data-test="password"
    >
    <span id="toggle-password"  class="absolute right-3 top-[22px] cursor-pointer" @click="togglePasswordVisibility" >
      <EyeIcon  v-if="!showPassword" class="w-5 h-5 text-blue-800"/>
      <EyeSlashIcon v-else class="w-5 h-5 text-blue-800"/>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {EyeIcon, EyeSlashIcon} from '@heroicons/vue/20/solid'
const props = defineProps<{
  errormessage: boolean,
  modelValue: string
}>();

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
