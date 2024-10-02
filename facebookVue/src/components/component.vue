<!-- InputField.vue (Composant Enfant) -->
<template>
  <div class="flex flex-col items-center text-black">
    <label :for="fieldId" class="text-gray-700">{{ label }}</label>
    <input
        :id="fieldId"
        :type="type"
        :placeholder="label"
        :name="fieldName"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
        :class="[
        'w-[97%] border-[1px] border-solid bg-white p-2 focus:outline-none rounded mt-2',
        errormessage ? 'border-red-700 focus:border-red-700' : 'focus:border-sky-400'
      ]"
    >
    <small v-if="errormessage" class="text-red-700">{{ errormessage }}</small>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
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
  type: {
    type: String,
    default: 'text'  // Can be 'text', 'password', etc.
  },
  modelValue: {
    type: String,
    default: ''
  },
  errormessage: {
    type: String,
    default: ''
  }
})
</script>
