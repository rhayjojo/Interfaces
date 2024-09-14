<template>
    <Listbox v-model="civiliity">
        <ListboxOptions>
            <ListboxOption v-for="civiliity in civilities" 
            :key="civiliity"
            value="civiliity"
            as="template"
            >
            </ListboxOption>
        </ListboxOptions>
    </Listbox>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { ref } from 'vue';
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@headlessui/vue'

  const civilities = ['Cameroonian', 'French', 'German']
  const civiliity = ref(civilities[0])

</script>
